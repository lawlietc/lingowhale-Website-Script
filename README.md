# LingoWhale Dark Mode

为 LingoWhale（语鲸）网站开发的暗黑模式油猴脚本。

## 关于 LingoWhale（语鲸）

LingoWhale（语鲸）是由北京深言科技与清华大学NLP实验室联合开发的AI智能阅读与信息管理工具。该应用依托自研的 LingoWhale-8B 大模型，旨在解决信息爆炸时代用户高效获取与消化知识的痛点。

### 主要功能
- AI智能阅读与信息提取
- 文章摘要自动生成
- 多语言翻译支持
- 知识管理助手

### 官方网站
- Web: [lingowhale.com](https://lingowhale.com)

## 脚本功能

本脚本为 LingoWhale 网站提供以下暗黑模式优化：

### ✨ 特性
- 🌙 全站暗黑模式支持
- 🖼️ 文章/正文内图片保持原色，不被处理
- 📱 支持响应式设计
- 🔄 自动适配动态加载内容
- 🌐 支持iframe内部内容

### 🎯 适配内容
- 页面背景和文字颜色
- 导航栏和侧边栏
- 卡片组件（频道、视频、课程等）
- 按钮、输入框、链接
- 标题、段落、列表
- 下拉菜单、标签、表格
- 滚动条样式
- 模态框和弹窗

## 安装方法

### 方法一：Tampermonkey（推荐）

1. 安装 [Tampermonkey](https://www.tampermonkey.net/) 浏览器扩展
2. 点击扩展图标 → 添加新脚本
3. 将 [lingowhale-dark-mode.user.js](lingowhale-dark-mode.user.js) 文件内容复制粘贴进去
4. 保存后访问 [lingowhale.com](https://lingowhale.com) 即可生效

### 方法二：直接安装

1. 访问 [lingowhale-dark-mode.user.js](lingowhale-dark-mode.user.js)
2. 点击 "Raw" 按钮
3. 浏览器会自动识别为油猴脚本并提示安装

## 使用说明

脚本会在访问 LingoWhale 网站时自动应用暗黑模式。刷新页面即可看到效果。

如遇到问题，请尝试：
1. 重新加载 Tampermonkey 脚本
2. 清除浏览器缓存后刷新页面

## 更新日志

### v1.0
- 初始版本
- 支持全站暗黑模式
- 文章图片保持原色
- 支持iframe内部内容
- 自动适配动态加载内容

## 许可证

MIT License - 见 [LICENSE](LICENSE) 文件

## 作者

[lawlietc](https://github.com/lawlietc)
