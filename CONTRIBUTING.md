# Contributing / 参与维护

Thank you for helping improve this independent, unofficial War Thunder vehicle atlas.

感谢协助完善本非官方《战争雷霆》已转交开发者载具图鉴。

## Before submitting a correction / 提交前

- Include the **exact record ID** from `data/vehicles.json`, the model/variant name, and which field is wrong.
- Provide the **original vehicle suggestion URL** and, for claims of a developer-passed date, a link to the **corresponding official monthly passed-to-developers report**.
- For "already implemented" reports, link the relevant **official War Thunder Wiki or update notes**, identify the exact variant and national tree, and check event, premium, squadron, hidden, and regular research vehicles. Similar family names are not sufficient.
- State the date checked. Distinguish documented facts, approximate information, and the project's predicted RB. Do not invent missing transfer months.
- For images, provide author/rights holder, original image source, license or written permission, and required credit. Public visibility does not imply redistribution permission.

## Editing data / 数据修改

The canonical dataset is `data/vehicles.json`. The published `index.html` embeds the **same complete JSON** so it can open offline. When changing a vehicle, update both copies and the static fallback catalog, maintaining correct card and header counts.

Keep already verified vehicle identities and provenance. Before deleting/merging possible duplicates, compare exact gun, turret, equipment, national tree, and original passed-to-developers reports. Preserve all valid original and monthly source links when merging.

### Validation / 校验

Run:

```sh
python3 scripts/validate_atlas.py
```

The same validation runs through GitHub Actions. For display changes, manually check mobile and desktop layout, language switching, filtering, pagination, and offline use. The static catalog must remain readable without JavaScript.

## Scope and licensing / 范围与授权

New original display code in this repository is offered under the repository's MIT `LICENSE`. This does **not** grant licenses to War Thunder game assets, official forum posts, or third-party photographs. See `IMAGE_RIGHTS.md`.

Use GitHub Issues for specific corrections and link primary evidence where possible. Do not include personal or confidential information or materials shared without authorization.
