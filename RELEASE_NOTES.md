# V10 初步审计和发布说明

- 用户上传的完整原始 HTML：134,318,618 字节（约 128.1 MiB）
- 原始 V10 解析到 1185 条载具；去重后公开版保留 1184 条。陆战 551；空战 527；直升机 106。
- 数据状态：588 条列入主图鉴，596 条仍待核实；尚未逐条重新核对官方游戏资料。
- 完整 V10 有 1185 份图片记录，原文件嵌入图片不适合未经许可公开分发。
- 本公开准备版保留载具数据和来源链接，但没有离线实物照片，方便先公开代码和可搜索资料库。
- 这仅是准备版，未取得 GitHub 上已有用户或持续维护证据，不能保证通过 OpenAI 申请。
- 本仓库已公开发布，包含可离线打开的网页及 1,184 条机器可读的载具数据。

## V10.1 · 中文 / English

- 中文与英文界面切换，自动选择浏览器语言，可保存本地语言偏好。
- 中文 / English 国家名与类别名、双语搜索、状态、RB 筛选和分页。
- 英文技术分析为简要概述，保留逐条可展开的中文原始分析；不代表完整英译或已逐条审核。
- 中英双语版本共用同一份数据；2026-10-22 去重后公开版现有 1,184 条载具，不额外下载资源。
- 使用无网络依赖的 Chromium 自动测试：语言切换、搜索、以色列国家筛选、权重筛选、重置及翻页无脚本错误。
- 后续需要社区复核英文摘要、图片授权、具体配置与游戏实装状态。


## V10.1 bilingual release

- Added an English / 中文 interface, including nation, vehicle type, status, search, RB filters, and pagination.
- Automatically chooses browser language where no preference is saved; manual language toggle is available.
- Shares one dataset across both languages; the public catalog contains 1,184 records after the October 22 Jaguar deduplication, with original Chinese analyses preserved.
- English full technical translations and Chinese qualifiers in 64 titles still require editorial review (Issue #3).
- Offline HTML and source code are MIT-licensed; embedded third-party photos remain excluded pending rights review.
- Bilingual functionality was smoke-tested locally in Chromium, including search, filtering, pagination, and language persistence.

## 2026-10-22：Jaguar 同型去重

- 中国线 2021-02 `Jaguar MBT` 与 2025-07 `Jaguar Main Battle Tank` 按同一基础车型合并。
- 两个来源及旧月报存档均保留于 `related_suggestions`；RB 9.0/9.3 的差异已标记为待核。
- 美国线 2026-07 的另一个建议按不同国家归属保留，未来若有证据区分实车配置再更新。
- 去重后：总计 1,184；陆战 551；空战 527；直升机 106；待核实 596。

## Continuous validation

- Added `scripts/validate_atlas.py` and a GitHub Actions workflow to compare machine-readable data with the embedded offline catalog, check vehicle identifiers, and validate summary counters.
- Warnings about missing dev-passed months or same-name suggestions require human review; no unsupported automatic removals.
