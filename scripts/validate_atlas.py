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
