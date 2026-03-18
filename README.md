# LingoWhale Website Script

为 LingoWhale（语鲸）网站开发的油猴脚本，提供暗黑模式和阅读增强功能。

## 关于 LingoWhale（语鲸）

LingoWhale（语鲸）是由北京深言科技与清华大学NLP实验室联合开发的AI智能阅读与信息管理工具。

### 主要功能

- AI智能阅读与信息提取
- 文章摘要自动生成
- 多语言翻译支持

### 官方网站

- Web: [lingowhale.com](https://lingowhale.com)

## 脚本功能

### ✨ 特性

- 🌙 全站暗黑模式（自动适配动态内容）
- 🖼️ 文章图片保持原色
- 📖 Reader页面增强：移除浮动工具栏，右键选区保护
- 📝 自定义网页标题（将浏览器标题改为文章标题）

## 安装方法

### 方法一：Tampermonkey（推荐）

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击扩展图标 → 添加新脚本
3. 将 [lingowhale-Website-Script.user.js](lingowhale-Website-Script.user.js) 文件内容复制粘贴进去
4. 保存后访问 [lingowhale.com](https://lingowhale.com) 即可生效

### 方法二：直接安装

1. 访问 [lingowhale-Website-Script.user.js](lingowhale-Website-Script.user.js)
2. 点击 "Raw" 按钮
3. 浏览器会自动识别为油猴脚本并提示安装

## 使用说明

脚本会在访问 LingoWhale 网站时自动生效。刷新页面即可看到效果。

### 功能开关

在 Tampermonkey 扩展图标右键菜单中可以找到以下开关：

- **网页标题改为文章标题** - 将 reader 页面的浏览器标签标题改为文章标题
- **移除浮动工具栏并保护右键选区** - 移除选择文字后的浮动工具栏，右键时保持选区

## 更新日志

### v1.4

- 🆕 新增移除浮动工具栏功能
- 🆕 新增右键选区保护（右键菜单可显示文字选项）
- 支持iframe内部事件处理

### v1.3

- 🆕 新增网页标题改为文章标题功能（仅限 reader 页面）
- 脚本功能开关，此功能会导致每次加载页面会自动刷新一次，自行选择是否开启

### v1.2

- 优化暗色文字修复逻辑
- 修复底部固定元素显示问题

### v1.1

- 新增对订阅内容页面的支持
- 优化 iframe 内容修复

### v1.0

- 初始版本
- 支持全站暗黑模式

## 许可证

MIT License - 见 [LICENSE](LICENSE) 文件

***

## About LingoWhale

LingoWhale is an AI-powered intelligent reading and information management tool developed by Beijing Deepin Technology Co., Ltd. and the Tsinghua University NLP Lab.

### Key Features

- AI-powered reading and information extraction
- Automatic article summary generation
- Multilingual translation support

### Official Website

- Web: [lingowhale.com](https://lingowhale.com)

## Script Features

### ✨ Features

- 🌙 Full-site dark mode (auto-adapts to dynamic content)
- 🖼️ Keep original colors for article images
- 📖 Reader page enhancement: remove floating toolbar, right-click selection protection
- 📝 Custom webpage title (change browser title to article title)

## Installation

### Method One: Tampermonkey (Recommended)

1. Install the [Tampermonkey](https://www.tampermonkey.net/) browser extension
2. Click the extension icon → Add new script
3. Copy and paste the content from [lingowhale-Website-Script.user.js](lingowhale-Website-Script.user.js)
4. Save and visit [lingowhale.com](https://lingowhale.com) to activate

### Method Two: Direct Install

1. Visit [lingowhale-Website-Script.user.js](lingowhale-Website-Script.user.js)
2. Click the "Raw" button
3. Your browser will automatically recognize it as a userscript and prompt to install

## Usage

The script activates automatically when visiting LingoWhale. Refresh the page to see the effects.

### Feature Toggles

You can find the following toggles in the Tampermonkey extension icon context menu:

- **Custom Webpage Title** - Changes the browser tab title to the article title on reader pages
- **Remove Floating Toolbar & Protect Selection** - Removes the floating toolbar after text selection and preserves selection on right-click

## Changelog

### v1.4

- 🆕 Added floating toolbar removal feature
- 🆕 Added right-click selection protection (right-click menu shows text options)
- Added iframe internal event handling support

### v1.3

- 🆕 Added custom webpage title feature (reader pages only)
- Added script toggle, note this feature causes page refresh on load

### v1.2

- Optimized dark text repair logic
- Fixed bottom fixed element display issues

### v1.1

- Added subscription content page support
- Optimized iframe content repair

### v1.0

- Initial release
- Full-site dark mode support

## License

MIT License - See [LICENSE](LICENSE) file
