# V10 初步审计和发布说明

- 用户上传的完整原始 HTML：134,318,618 字节（约 128.1 MiB）
- 解析到 1185 条载具。陆战 552；空战 527；直升机 106。
- 数据状态：588 条列入主图鉴，597 条仍待核实；尚未逐条重新核对官方游戏资料。
- 完整 V10 有 1185 份图片记录，原文件嵌入图片不适合未经许可公开分发。
- 本公开准备版保留载具数据和来源链接，但没有离线实物照片，方便先公开代码和可搜索资料库。
- 这仅是准备版，未取得 GitHub 上已有用户或持续维护证据，不能保证通过 OpenAI 申请。
- 本仓库已公开发布，包含可离线打开的网页及 1,185 条机器可读的载具数据。

## V10.1 · 中文 / English

- 中文与英文界面切换，自动选择浏览器语言，可保存本地语言偏好。
- 中文 / English 国家名与类别名、双语搜索、状态、RB 筛选和分页。
- 英文技术分析为简要概述，保留逐条可展开的中文原始分析；不代表完整英译或已逐条审核。
- 1,185 条载具及来源链接仍为同一套离线数据，不额外下载资源。
- 使用无网络依赖的 Chromium 自动测试：语言切换、搜索、以色列国家筛选、权重筛选、重置及翻页无脚本错误。
- 后续需要社区复核英文摘要、图片授权、具体配置与游戏实装状态。


## V10.1 bilingual release

- Added an English / 中文 interface, including nation, vehicle type, status, search, RB filters, and pagination.
- Automatically chooses browser language where no preference is saved; manual language toggle is available.
- Maintains all 1,185 records and their original Chinese analyses, with conservative structured English summaries shown alongside expandable Chinese source text.
- English full technical translations and Chinese qualifiers in 64 titles still require editorial review (Issue #3).
- Offline HTML and source code are MIT-licensed; embedded third-party photos remain excluded pending rights review.
- Bilingual functionality was smoke-tested locally in Chromium, including search, filtering, pagination, and language persistence.
