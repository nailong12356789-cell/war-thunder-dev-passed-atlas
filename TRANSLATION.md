# Translation / 翻译说明

V10.1 introduces a Chinese/English language switch with automatic browser-language detection. The preferred language is retained locally when browser storage is available. The current public atlas contains 1,184 deduplicated candidate records, URLs, and RB estimates remain shared between both languages.

**Important accuracy limitation:** The English RB paragraph is an automatically structured **summary**, not a sentence-by-sentence translation of the original Chinese technical assessment. It exposes reference vehicles, available community-estimated RB values, and broad equipment categories already mentioned in the Chinese source. A collapsible **Original analysis (Chinese)** section retains the complete source reasoning. **No English technical summary should be treated as independently verified military/game data.**

English-facing names of nations, classes, filters and verification statuses are localized. Vehicle proper names are kept as recorded, except existing aliases remain searchable. Search accepts both Chinese and English nation/type names.

## Development / 开发

- Update the bilingual interface and summary logic in `src/app.js`.
- Run `npm run test` (checks JavaScript syntax) then `npm run build` to embed the app in the fully offline `index.html`.
- Open `index.html` locally to verify language switching, nation/type/RB/status filters, pagination, and the expanded Chinese source analysis.
- Update `data/vehicles.json` only with verifiable data and source citations. The data is also embedded into `index.html` for single-file offline use; any data update must synchronize both representations.
- Do not add third-party photos without documented redistribution rights. See `IMAGE_RIGHTS.md`.

A future reviewed translation of the individual technical notes may be contributed through a pull request with source references and domain-appropriate English terminology.
