#!/usr/bin/env python3
"""Offline quality gate for the public War Thunder atlas.

Run: python scripts/validate_atlas.py
No external Python dependencies or network access required.
"""
from __future__ import annotations

import collections
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    index = (ROOT / "index.html").read_text(encoding="utf-8")
    records = json.loads((ROOT / "data/vehicles.json").read_text(encoding="utf-8"))

    m = re.search(r'<script id="atlas" type="application/json">([\s\S]*?)</script>', index)
    if m is None:
        errors.append("Embedded atlas JSON is missing.")
        embedded = []
    else:
        embedded = json.loads(m.group(1))

    if embedded != records:
        errors.append("data/vehicles.json does not match embedded index.html records.")

    # Prevent rebuilds from reverting fixes in the published bilingual UI.
    script_marker = "<script>\\n(function () {".replace("\\n", "\n")
    script_start = index.rfind(script_marker)
    script_end = index.find("</script></body></html>", script_start)
    if script_start < 0 or script_end < 0:
        errors.append("Could not locate the published bilingual app script.")
    else:
        embedded_app = index[script_start + len("<script>\n"):script_end].strip()
        source_app = (ROOT / "src/app.js").read_text(encoding="utf-8").strip()
        if embedded_app != source_app:
            errors.append("src/app.js and the published index.html script differ; run npm run build.")

    # Static fallback must remain complete for browsers that block JavaScript.
    fallback_start = index.find('<section class="fallback" id="fallback">')
    fallback_end = index.find("</section>", fallback_start)
    if fallback_start < 0 or fallback_end < 0:
        errors.append("Static fallback catalog is missing.")
    else:
        fallback_count = index[fallback_start:fallback_end].count("<details><summary>")
        if fallback_count != len(records):
            errors.append(f"Static fallback has {fallback_count} records, expected {len(records)}.")

    ids = [r.get("id") for r in records]
    duplicate_ids = [name for name, n in collections.Counter(ids).items() if n > 1]
    if duplicate_ids:
        errors.append(f"Duplicate record IDs: {duplicate_ids[:12]}")

    for i, rec in enumerate(records):
        for key in ("id", "name", "country", "group", "kind", "status"):
            if not rec.get(key):
                errors.append(f"Record #{i} missing {key}.")
        if rec.get("kind") not in ("G", "A", "H"):
            errors.append(f"Unknown vehicle kind in {rec.get('id')}.")
        if rec.get("status") not in ("main", "pending"):
            errors.append(f"Unknown review status in {rec.get('id')}.")
        # Month is the transfer-to-developers month, not the suggestion posting date.
        month = rec.get("month")
        if month and not re.fullmatch(r"\d{4}-(?:0[1-9]|1[0-2])", str(month)):
            errors.append(f"Invalid transfer month in {rec.get('id')}: {month!r}")
        history = rec.get("related_suggestions", [])
        if not isinstance(history, list):
            errors.append(f"Historical sources must be a list in {rec.get('id')}.")
        else:
            seen_history = set()
            for historic in history:
                if not isinstance(historic, dict):
                    errors.append(f"Malformed history record in {rec.get('id')}.")
                    continue
                when = historic.get("month")
                if not isinstance(when, str) or not re.fullmatch(r"\d{4}-(?:0[1-9]|1[0-2])", when):
                    errors.append(f"Invalid historical transfer month in {rec.get('id')}: {when!r}")
                for url_field in ("suggestion_url", "monthly_url"):
                    u = historic.get(url_field)
                    if not isinstance(u, str) or not u.startswith("https://"):
                        errors.append(f"Historic {url_field} missing/invalid in {rec.get('id')}.")
                identity = (when, historic.get("suggestion_url"))
                if identity in seen_history:
                    errors.append(f"Duplicate historical source in {rec.get('id')}: {identity!r}")
                seen_history.add(identity)

    counts = {
        "candidate vehicles": len(records),
        "ground vehicles": sum(r.get("kind") == "G" for r in records),
        "aircraft": sum(r.get("kind") == "A" for r in records),
        "helicopters": sum(r.get("kind") == "H" for r in records),
        "pending": sum(r.get("status") == "pending" for r in records),
    }
    stats = re.findall(r'<div class="stat"><b>([\d,]+)</b>', index)
    if len(stats) != 5:
        errors.append("Expected five visible homepage statistics.")
    else:
        displayed = [int(n.replace(",", "")) for n in stats]
        if displayed != list(counts.values()):
            errors.append(f"Homepage metrics {displayed} differ from dataset {list(counts.values())}.")

    china_jaguar = [
        r for r in records if r.get("country") == "中国"
        and r.get("name", "").strip().lower() in ("jaguar mbt", "jaguar main battle tank")
    ]
    if len(china_jaguar) != 1:
        errors.append(f"Expected one China Jaguar MBT entry; found {len(china_jaguar)}.")
    elif not any(src.get("month") == "2021-02"
                 for src in china_jaguar[0].get("related_suggestions", [])):
        errors.append("Merged China Jaguar is missing its historic 2021 source.")

    candidates = collections.defaultdict(list)
    for rec in records:
        key = (rec.get("country"), rec.get("name", "").strip().casefold())
        candidates[key].append(rec.get("id"))
        if not rec.get("month"):
            warnings.append(f"Missing dev-passed month: {rec.get('id')} ({rec.get('name')})")
    for key, values in candidates.items():
        if len(values) > 1:
            warnings.append(f"Potential exact-title duplicate (review, do not auto-delete): {key}: {values}")

    print("Atlas quality audit:", counts)
    print(f"Potential follow-up tasks: {len(warnings)}")
    for warning in warnings[:8]:
        print("WARN:", warning)
    if len(warnings) > 8:
        print(f"... {len(warnings) - 8} more warnings")
    for error in errors:
        print("ERROR:", error, file=sys.stderr)
    if errors:
        return 1
    print("PASS: record IDs, embedded data, visible metrics, and Jaguar merge are consistent.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
