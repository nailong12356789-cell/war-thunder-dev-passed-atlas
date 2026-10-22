#!/usr/bin/env python3
"""Validate consistency of the War Thunder offline atlas and its JSON dataset."""
from __future__ import annotations
import argparse
from collections import Counter
import json
import re
from pathlib import Path

def validate(html_path: Path, json_path: Path) -> None:
    html = html_path.read_text(encoding="utf-8")
    data = json.loads(json_path.read_text(encoding="utf-8"))
    match = re.search(r'<script id="atlas" type="application/json">(.*?)</script>', html, re.S)
    if match is None:
        raise AssertionError("Missing embedded atlas JSON")
    embedded = json.loads(match.group(1))
    assert embedded == data, "Embedded index.html data differs from data/vehicles.json"
    assert isinstance(data, list) and data, "Dataset must contain records"
    ids = [row.get("id") for row in data]
    assert all(ids) and len(ids) == len(set(ids)), "Duplicate/missing vehicle IDs"
    assert all(row.get("kind") in {"G", "A", "H"} for row in data), "Unknown vehicle type"
    assert all(row.get("name") and row.get("country") for row in data), "Missing name/country"
    assert all(row.get("status") in {"main", "pending"} for row in data), "Unknown status"
    assert html.count("<details><summary>") == len(data), "Static fallback count mismatch"

    kind = Counter(row["kind"] for row in data)
    expected = [len(data), kind["G"], kind["A"], kind["H"],
                sum(row["status"] == "pending" for row in data)]
    displayed = [int(v.replace(",", "")) for v in
                 re.findall(r'<div class="stat"><b>([\d,]+)</b>', html)]
    assert displayed == expected, f"Header statistics wrong: {displayed} vs {expected}"

    jaguars = [r for r in data if r.get("group") == "中国"
               and r["kind"] == "G" and "jaguar" in r["name"].casefold()]
    assert len(jaguars) == 1, "Chinese Jaguar MBT must appear once"
    sources = jaguars[0].get("historical_sources") or []
    assert any(src.get("month") == "2021-02" and src.get("suggestion_url")
               and src.get("monthly_url") for src in sources), "Historic Jaguar provenance missing"

    missing = [row["id"] for row in data if not row.get("month")]
    # Unverified dates must remain explicitly labeled in interactive and static views.
    assert all(row["status"] == "pending" for row in data if not row.get("month")), \
        "Entries with missing transfer dates must be pending verification"
    static_unknown = html.count("</summary><p> 转交月份待核实 · ")
    assert static_unknown == len(missing), \
        f"Missing-date labels in static catalog: {static_unknown} vs {len(missing)}"
    assert "year===\'unknown\'" in html and "Date unverified" in html, \
        "Interactive missing-date year filter or bilingual date label missing"
    assert "records.flatMap(r=>[r.month,...(r.historical_sources||[])" in html, \
        "Historic dev-passed months omitted from year options"
    print(f"OK: {len(data)} total; Ground={kind['G']} Air={kind['A']} Heli={kind['H']}; "
          f"pending={expected[-1]}; missing dates={len(missing)}")
    if missing:
        print("WARNING: Missing transfer month: " + ", ".join(missing))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--html", type=Path, default=Path("index.html"))
    parser.add_argument("--json", type=Path, default=Path("data/vehicles.json"))
    args = parser.parse_args()
    validate(args.html, args.json)
