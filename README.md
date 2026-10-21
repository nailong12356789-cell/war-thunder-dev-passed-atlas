# War Thunder — Dev-Passed Vehicle Atlas (V10.1 · 中文 / English)

**《战争雷霆》已转交开发者载具图鉴｜独立非官方社区项目**

收录官方论坛“已转交开发者”的载具候选，并提供国家、类别、年份、预计历史模式战斗评级（RB）和状态筛选。支持 iPhone / Windows **离线打开 `index.html`**，不需要安装依赖或搭建服务器。**V10.1 已加入中文 / English 一键切换、浏览器语言自动识别以及中英文搜索。**源文件数据核查截至 **2026-10-10**。

- **1,185** 条候选记录：陆战 **552** / 空战 **527** / 直升机 **106**。
- **597** 条状态仍待核实；转交开发者不代表已经确定实装。
- RB 为项目自制预测，不是官方 War Thunder 数据。
- 采用原始 V10 的数据，附 `data/vehicles.json` 便于程序化使用。
- 本开源准备版**不打包原始第三方图片**，仅保留来源链接和许可信息。详见 [IMAGE_RIGHTS.md](IMAGE_RIGHTS.md)。

## 使用方法 / How to use

**V10.1 新增中文 / English 一键切换**：根据浏览器语言自动选择，也可以手动切换；英文版的 RB 分析是保守结构化摘要，点击 “Original analysis (Chinese)” 可查看完整中文原文。详情见 [TRANSLATION.md](TRANSLATION.md)。

**English:** Open `index.html` to browse offline with no installation. Use the 中文 / English switch to change the interface language. Search accepts English nation names and Chinese/English vehicle aliases. Technical notes in English are structured summaries, not complete verified translations; expand “Original analysis (Chinese)” for the exact original text.

打开 [`index.html`](index.html) 即可离线浏览：搜索、筛选、排序和卡片列表在允许 JavaScript 的浏览器中正常工作。点击页面顶部的 **中文 / English** 切换语言，浏览器语言为中文时优先显示中文，其他语言默认英文（本地保存上次选择）。iOS「文件」快速预览可能禁用 JavaScript，此时页面会显示**中文版**完整静态载具目录。英文技术分析为结构化概要，原始中文分析可以展开查看，并非逐条完全英译。原始建议与图片来源链接需要联网。

## 在线查看 / GitHub Pages

仓库管理员可在 **Settings → Pages → Build and deployment** 中选择 **Deploy from a branch**，然后选 **main** 与 **/(root)**，点击 **Save**。本站是纯静态 HTML，无构建步骤；仓库内的 `.nojekyll` 避免默认 Jekyll 处理。**未启用 Pages 前，不要把预期网址当作已经上线。**

## 数据的来源与限制

数据基于已有 V10 单文件离线图鉴整理，并非在本仓库中逐条重新核实。截至源文件日期，历史月报仍有缺口，已转交状态、配置差异、是否正式实装和 RB 都应逐条复核。请勿把待核实资料当成官方确认信息。

本项目与 Gaijin Entertainment、War Thunder 和 OpenAI 无隶属、授权或赞助关系。该开源工程只表示项目代码/整理工作的开放，不代表获得第三方图片、论坛帖子或游戏资产的版权许可。


## 当前维护任务 / Maintenance roadmap

这个仓库刚开始公开发布，尚无可核实的长期用户量、下载量或维护历史；欢迎社区参与核查。

- [核对 597 条待核实载具记录](https://github.com/nailong12356789-cell/war-thunder-dev-passed-atlas/issues/1)
- [逐张核实图像授权，再决定是否重新加入离线照片](https://github.com/nailong12356789-cell/war-thunder-dev-passed-atlas/issues/2)
- [校对英文载具名称和技术分析](https://github.com/nailong12356789-cell/war-thunder-dev-passed-atlas/issues/3)

## 参与开发

欢迎创建 Issue 报告型号、转交月份、图片来源、国家归属和是否实装的错误；提供官方 Wiki、官方论坛或可信资料链接。提交修复时请说明证据与核实日期，避免无来源推测。参见 [CONTRIBUTING.md](CONTRIBUTING.md)。

## 许可说明

`index.html` 的新编写展示代码使用 [MIT License](LICENSE)；数据字段与出处保留在 `data/vehicles.json` 供核对，不对第三方事实性数据、论坛内容或外部链接主张版权。外部图片未被纳入本仓库；请遵循原权利人的许可。

## English summary

**Version 10.1 is bilingual.** Open [`index.html`](index.html) to switch between **中文** and **English**. The UI, filters, nations, statuses and searches support English; projected RB descriptions are cautious English summaries rather than full technical translations. The original Chinese reasoning is expandable on every card. Language preference is saved locally. If JavaScript is blocked, a static Chinese catalog remains available.

This is an independent, unofficial, bilingual Chinese/English offline-first atlas for War Thunder vehicle suggestions passed to the developers. It includes 1,185 candidate entries and community-projected RB values, not official game ratings. A number of entries remain unverified. All third-party image binaries have been excluded from the public starter release while source links and licensing metadata are retained. Open `index.html` directly in a browser to browse offline. Interface source: `src/app.js` (rebuild using `npm run build`).