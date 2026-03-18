// ==UserScript==
// @name         LingoWhale Website Script
// @namespace    http://tampermonkey.net/
// @version      1.4
// @description  LingoWhale 网页脚本 - 暗黑模式 + 自定义标题 + 移除浮动工具栏
// @author       LawlietC
// @match        https://lingowhale.com/*
// @grant        GM_addStyle
// @grant        GM_registerMenuCommand
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-end
// ==/UserScript==

(function() {
    'use strict';

    // 功能开关
    const enableCustomTitle = GM_getValue('enableCustomTitle', true);
    const enableRemoveToolbar = GM_getValue('enableRemoveToolbar', true);

    // 注册菜单开关
    GM_registerMenuCommand(
        (enableCustomTitle ? '✓' : '✗') + ' 网页标题改为文章标题（会导致页面刷新）',
        function() {
            const newValue = !GM_getValue('enableCustomTitle', true);
            GM_setValue('enableCustomTitle', newValue);
            location.reload();
        }
    );

    GM_registerMenuCommand(
        (enableRemoveToolbar ? '✓' : '✗') + ' 移除浮动工具栏并保护右键选区',
        function() {
            const newValue = !GM_getValue('enableRemoveToolbar', true);
            GM_setValue('enableRemoveToolbar', newValue);
            if (newValue) {
                initRemoveToolbar();
            }
        }
    );

    // 将网页标题设置为特定元素的文字（仅限 reader 页面）
    function updatePageTitle() {
        if (!GM_getValue('enableCustomTitle', true)) return;
        if (!window.location.pathname.startsWith('/reader/')) return;
        
        const titleElement = document.querySelector("#dashboard-reader-content > div > div.panel-group-doc-info.relative > div > div.absolute.top-0.left-0.z-\\[1000\\].w-full.px-5.bg-\\[\\#fafafa\\].backdrop-blur-sm > div > div.flex.flex-1.items-center.min-w-0 > div.text-zinc-900.font-semibold.leading-\\[30px\\].text-ellipsis.overflow-hidden.whitespace-nowrap");
        
        if (titleElement && titleElement.textContent.trim()) {
            document.title = titleElement.textContent.trim();
        }
    }

    // 页面加载后尝试获取标题
    function tryUpdateTitle() {
        updatePageTitle();
        setTimeout(updatePageTitle, 500);
        setTimeout(updatePageTitle, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryUpdateTitle);
    } else {
        tryUpdateTitle();
    }

    const darkModeStyles = `
        /* 基础背景和文字颜色 */
        html, body {
            background-color: #1a1a1a !important;
            color: #e0e0e0 !important;
            border-color: #404040 !important;
        }

        /* 主容器 */
        #__nuxt, #app, main, .container, .content, .page-content {
            background-color: #1a1a1a !important;
            color: #e0e0e0 !important;
        }

        /* 覆盖所有边框颜色 - 去掉边框 */
        *, *::before, *::after {
            border-color: transparent !important;
            border: none !important;
        }

        /* 保留特定边框样式（如果有的话） */
        [class*="border-"] {
            border-color: transparent !important;
        }

        /* 覆盖透明背景的文字颜色（暗色文字看不清） */
        .text-zinc-800, .text-zinc-700, .text-zinc-600, .text-gray-800, .text-gray-700, .text-gray-600, .text-neutral {
            color: #e0e0e0 !important;
        }

        /* 覆盖所有深色文字颜色 */
        [class*="text-"][class*="#1a1a1a"], [class*="text-[#1a1a1a]"], strong, [class*="text-black"], [class*="text-gray-900"], [class*="text-gray-500"] {
            color: #e0e0e0 !important;
        }

        /* DeepLang Header 组件 */
        deeplang-header, .deeplang-header, .deeplang-header-h1, .deeplang-header-extra, .deeplang-header-extra-box, .deeplang-header-extra-left {
            color: #e0e0e0 !important;
            background-color: #1a1a1a !important;
        }

        /* DeepLang Header H1 特别处理 */
        div.deeplang-header-h1 {
            color: #e0e0e0 !important;
            background-color: #1a1a1a !important;
        }

        /* Ant Design 输入框 */
        .ant-input-affix-wrapper, .ant-input, .ant-input-number {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
            border-color: #404040 !important;
        }

        /* 覆盖所有div的背景色（保留图片） */
        div:not(img):not(picture):not(a) {
            background-color: #1a1a1a !important;
        }

        /* 导航栏 */
        nav, .navbar, .header, .top-bar {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
        }

        /* 侧边栏 */
        aside, .sidebar, .side-bar, div.sidebar, div.side-bar, [class*="sidebar"], [class*="side-bar"] {
            background-color: #1a1a1a !important;
            color: #e0e0e0 !important;
        }

        /* 侧边栏容器 */
        .sidebar-container, .sidebar-wrapper, .side-bar-container, .side-bar-wrapper, [class*="sidebar-container"], [class*="sidebar-wrapper"], [class*="side-bar-container"], [class*="side-bar-wrapper"] {
            background-color: #1a1a1a !important;
            color: #e0e0e0 !important;
        }

        /* 侧边栏内部元素 */
        .sidebar *:not(img), .side-bar *:not(img), [class*="sidebar"] *:not(img), [class*="side-bar"] *:not(img) {
            color: #e0e0e0 !important;
        }

        /* 特定侧边栏aside */
        aside.flex.flex-col.justify-between.self-stretch.pt-1.pb-2.max-w-\[40px\] {
            background-color: #1a1a1a !important;
        }

        /* 特定侧边栏div */
        div.flex.flex-col.justify-between.border-r.px-5.py-6.relative, div[class*="bg-"][class*="fafafa"] {
            background-color: #1a1a1a !important;
            border-color: #404040 !important;
        }

        /* 覆盖所有亮色背景 */
        [class*="bg-white"], [class*="bg-gray"], [class*="bg-light"], [class*="bg-"][class*="fafafa"], [class*="bg-"][class*="ffffff"] {
            background-color: #242424 !important;
        }

        /* 覆盖边框颜色 */
        [class*="border"][class*="gray"], [class*="border"][class*="light"], [class*="border"][class*="white"] {
            border-color: #404040 !important;
        }

        /* 覆盖特定内容区域div */
        div.relative.flex.flex-col.pt-6.pl-8, div[class*="flex-col"][class*="pt-"][class*="pl-"] {
            background-color: #1a1a1a !important;
        }

        /* 更通用的内容区域覆盖 */
        main > div, .content > div, .page-content > div {
            background-color: #1a1a1a !important;
        }

        /* 卡片组件 */
        .card, .channel-card, .video-card, .lesson-card, .course-card {
            background-color: #1A1A1A !important;
            color: #e0e0e0 !important;
            border-color: #404040 !important;
        }

        /* 按钮 */
        button, .btn, .button {
            background-color: #404040 !important;
            color: #e0e0e0 !important;
            border-color: #555555 !important;
        }

        button:hover, .btn:hover, .button:hover {
            background-color: #505050 !important;
        }

        /* 输入框 */
        input, textarea, select, .input, .search-input {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
            border-color: #404040 !important;
        }

        /* 链接 */
        a {
            color: #7cb3f1 !important;
        }

        a:hover {
            color: #9ac4f5 !important;
        }

        /* 下划线样式 */
        .outline-underline {
            box-decoration-break: clone !important;
            -webkit-box-decoration-break: clone !important;
            background-image: linear-gradient(#24272d, #e3ebfb) !important;
        }

        /* 标题 */
        h1, h2, h3, h4, h5, h6, .title, .heading {
            color: #ffffff !important;
        }

        /* 段落文字 */
        p, span, div:not(.card):not(.channel-card):not(.video-card):not(.lesson-card):not(.course-card):not(.sidebar):not(nav) {
            color: #e0e0e0 !important;
        }

        /* 列表 */
        ul, ol, li {
            color: #e0e0e0 !important;
        }

        /* 分割线 */
        hr, .divider {
            border-color: #404040 !important;
        }

        /* 图标 */
        svg, .icon {
            fill: #e0e0e0 !important;
            color: #e0e0e0 !important;
        }

        /* 下拉菜单 */
        .dropdown, .menu, .popup {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
        }

        /* 标签 */
        .tag, .badge, .label {
            background-color: #404040 !important;
            color: #e0e0e0 !important;
        }

        /* 模态框 */
        .modal, .dialog, .overlay {
            background-color: rgba(0, 0, 0, 0.8) !important;
        }

        .modal-content, .dialog-content {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
        }

        /* 表格 */
        table, th, td {
            background-color: #2d2d2d !important;
            color: #e0e0e0 !important;
            border-color: #404040 !important;
        }

        /* 滚动条 */
        ::-webkit-scrollbar {
            background-color: #2d2d2d !important;
        }

        ::-webkit-scrollbar-thumb {
            background-color: #505050 !important;
        }

        /* 文章/正文内容区域 - 图片不处理 */
        article, .article, .post, .content-body, .post-content, .article-content, .entry-content, section {
            background-color: #1a1a1a !important;
        }

        /* 确保文章内的图片保持原样 */
        article img, .article img, .post img, .content-body img, .post-content img, .article-content img, .entry-content img, section img,
        article picture, .article picture, .post picture, .content-body picture, .post-content picture, .article-content picture, .entry-content picture, section picture {
            filter: none !important;
            opacity: 1 !important;
            brightness: 1 !important;
            contrast: 1 !important;
        }

        /* 排除图片被变暗 */
        img {
            filter: none !important;
        }

        /* 视频播放器 */
        video, .video-player {
            background-color: #000 !important;
        }

        /* 用户头像 */
        .avatar, .user-avatar, .profile-image, img[alt*="avatar"], img[alt*="Avatar"], img[alt*="头像"] {
            filter: none !important;
        }

        /* Logo */
        .logo, img[alt*="logo"], img[alt*="Logo"] {
            filter: none !important;
        }

        /* 背景图片 */
        .bg-image, [style*="background-image"] {
            opacity: 0.9;
        }

        /* 隐藏底部固定元素 */
        div.h-\[50px\].w-3\/5.absolute.left-8.bottom-0.z-20,
        div.w-full.h-\[100px\].fixed.bottom-0 {
            display: none !important;
        }

        /* 今日更新列表背景 */
        ul.space-y-4 > div, ul.space-y-4 > div > div {
            background-color: #1a1a1a !important;
        }

        /* 列表项背景 */
        ul.space-y-4 > div > div.flex.p-2 {
            background-color: #1A1A1A !important;
        }

        /* 今日更新列表中的具体项 */
        #subscription-content ul li div.w-full.p-1.overflow-hidden,
        #subscription-content ul div.w-full.p-1.overflow-hidden {
            background-color: #1A1A1A !important;
        }

        /* 列表项内部元素 */
        #subscription-content > div > main > div > div > div.relative.flex.grow.w-full > main > div.w-3\/5.flex.flex-col.flex-1.justify-between > ul > div:nth-child(1) > div:nth-child(6) > div.w-full.p-1.overflow-hidden > div,
        #subscription-content ul > div > div.w-full.p-1.overflow-hidden > div {
            background-color: transparent !important;
        }

        /* 列表项标题和时间文字 */
        #subscription-content div.text-neutral-7,
        .text-neutral-7 {
            color: #e0e0e0 !important;
        }

        #subscription-content div.text-neutral-400,
        .text-neutral-400 {
            color: #a0a0a0 !important;
        }

        /* 订阅内容区域背景 */
        div.flex-1.w-full.flex.flex-col.min-w-\[780px\].bg-white {
            background-color: #1a1a1a !important;
        }

        /* 列表项背景 */
        #subscription-content div.w-full.p-1.overflow-hidden,
        div.w-full.p-1.overflow-hidden {
            background-color: #1A1A1A !important;
        }

        /* 列表项标题 */
        div.text-neutral-7 {
            color: #e0e0e0 !important;
        }

        /* 列表项时间 */
        div.text-neutral-400 {
            color: #a0a0a0 !important;
        }

        /* 列表项摘要 */
        div.text-secondary {
            color: #b0b0b0 !important;
        }
    `;

    GM_addStyle(darkModeStyles);

    // 隐藏底部固定元素
    function hideBottomElements() {
        const allDivs = document.querySelectorAll('div');
        allDivs.forEach(div => {
            const classList = div.className;
            if (classList.includes('h-[50px]') && classList.includes('w-3/5') && classList.includes('absolute') && classList.includes('bottom-0')) {
                div.style.display = 'none';
            }
            if (classList.includes('h-[100px]') && classList.includes('fixed') && classList.includes('bottom-0')) {
                div.style.display = 'none';
            }
        });
    }

    // 初始隐藏
    hideBottomElements();

    // 修复深色文字颜色
    function fixDarkText() {
        // 修复所有包含 #1a1a1a 的文字颜色
        const allElements = document.querySelectorAll('*');
        allElements.forEach(el => {
            const style = window.getComputedStyle(el);
            const color = style.color;
            const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
            if (rgbMatch) {
                const r = parseInt(rgbMatch[1]);
                const g = parseInt(rgbMatch[2]);
                const b = parseInt(rgbMatch[3]);
                if (r < 100 && g < 100 && b < 100) {
                    el.style.color = '#e0e0e0';
                }
            }
        });

        // 强制修复特定元素
        const strongElements = document.querySelectorAll('strong');
        strongElements.forEach(el => {
            el.style.color = '#e0e0e0';
        });

        const headerElements = document.querySelectorAll('deeplang-header, .deeplang-header, .deeplang-header-h1');
        headerElements.forEach(el => {
            el.style.color = '#e0e0e0';
            el.style.backgroundColor = '#1a1a1a';
        });
    }

    // 修复iframe内部的内容
    function fixIframeContent() {
        const iframes = document.querySelectorAll('iframe');
        iframes.forEach(iframe => {
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
                if (iframeDoc) {
                    // 注入CSS样式到iframe
                    const styleEl = iframeDoc.createElement('style');
                    styleEl.textContent = `
                        html, body, * {
                            color: #e0e0e0 !important;
                            background-color: #1a1a1a !important;
                            border-color: #404040 !important;
                        }
                        .deeplang-header, .deeplang-header-h1, .deeplang-header-extra, .deeplang-header-extra-box {
                            color: #e0e0e0 !important;
                            background-color: #1a1a1a !important;
                        }
                        .text-sm, .text-neutral, [class*="text-"] {
                            color: #e0e0e0 !important;
                        }
                        img, picture {
                            filter: none !important;
                        }
                    `;
                    if (!iframeDoc.getElementById('dark-mode-style')) {
                        styleEl.id = 'dark-mode-style';
                        iframeDoc.head.appendChild(styleEl);
                    }

                    // 强制修复所有深色文字
                    const allElements = iframeDoc.querySelectorAll('*');
                    allElements.forEach(el => {
                        const style = window.getComputedStyle(el);
                        const color = style.color;
                        const rgbMatch = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
                        if (rgbMatch) {
                            const r = parseInt(rgbMatch[1]);
                            const g = parseInt(rgbMatch[2]);
                            const b = parseInt(rgbMatch[3]);
                            if (r < 100 && g < 100 && b < 100) {
                                el.style.color = '#e0e0e0';
                            }
                        }
                    });
                }
            } catch (e) {
                console.log('无法访问iframe:', e.message);
            }
        });
    }

    // 初始修复
    fixDarkText();
    fixIframeContent();

    // 监听动态加载的内容
    const observer = new MutationObserver((mutations) => {
        GM_addStyle(darkModeStyles);
        hideBottomElements();
        fixDarkText();
        fixIframeContent();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    // 移除浮动工具栏并保护右键选区
    function initRemoveToolbar() {
        if (!GM_getValue('enableRemoveToolbar', true)) return;
        if (!window.location.pathname.startsWith('/reader/')) return;

        const selectionStore = {
            top: { range: null, text: '' },
            iframes: new Map()
        };

        function removeAllToolbars() {
            const toolbarSelectors = [
                '.toolbar',
                '#toolbar-text',
                '#translate-btn',
                '[id*="toolbar"]',
                '[class*="toolbar"]'
            ];

            toolbarSelectors.forEach(selector => {
                try {
                    document.querySelectorAll(selector).forEach(el => {
                        if (el.classList.contains('absolute') &&
                            el.classList.contains('h-8') &&
                            el.classList.contains('user-select-none')) {
                            el.remove();
                        }
                    });
                } catch (e) {}
            });

            document.querySelectorAll('.absolute.h-8.flex-col.user-select-none').forEach(el => {
                if (el.classList.contains('toolbar')) {
                    el.remove();
                }
            });

            document.querySelectorAll('[class*="toolbar"][class*="absolute"]').forEach(el => {
                el.remove();
            });
        }

        function saveSelection(doc) {
            const sel = doc.getSelection();
            if (sel.rangeCount > 0 && sel.toString().length > 0) {
                try {
                    return { range: sel.getRangeAt(0).cloneRange(), text: sel.toString() };
                } catch(e) {}
            }
            return null;
        }

        function restoreSelection(doc, saved) {
            if (!saved || !saved.range) return false;
            try {
                const sel = doc.getSelection();
                sel.removeAllRanges();
                sel.addRange(saved.range);
                return true;
            } catch (e) { return false; }
        }

        function setupTopDocument() {
            document.addEventListener('selectionchange', function() {
                const saved = saveSelection(document);
                if (saved) selectionStore.top = saved;
            });

            document.addEventListener('mouseup', function(e) {
                if (e.button === 0) {
                    setTimeout(() => {
                        const saved = saveSelection(document);
                        if (saved) selectionStore.top = saved;
                    }, 10);
                }
            }, true);

            document.addEventListener('mousedown', function(e) {
                if (e.button === 0) {
                    setTimeout(() => {
                        const saved = saveSelection(document);
                        if (saved) selectionStore.top = saved;
                    }, 10);
                }
            }, true);

            document.addEventListener('contextmenu', function(e) {
                if (selectionStore.top.text) {
                    restoreSelection(document, selectionStore.top);
                }
            }, true);
        }

        function setupIframeEvents() {
            const iframes = document.querySelectorAll('iframe');
            iframes.forEach((frame, i) => {
                try {
                    const frameDoc = frame.contentDocument || frame.contentWindow.document;
                    if (!selectionStore.iframes.has(i)) {
                        selectionStore.iframes.set(i, { range: null, text: '' });
                    }

                    frameDoc.addEventListener('selectionchange', function() {
                        const saved = saveSelection(frameDoc);
                        if (saved) selectionStore.iframes.set(i, saved);
                    });

                    frameDoc.addEventListener('mouseup', function(e) {
                        if (e.button === 0) {
                            setTimeout(() => {
                                const saved = saveSelection(frameDoc);
                                if (saved) selectionStore.iframes.set(i, saved);
                            }, 10);
                        }
                    }, true);

                    frameDoc.addEventListener('mousedown', function(e) {
                        if (e.button === 0) {
                            setTimeout(() => {
                                const saved = saveSelection(frameDoc);
                                if (saved) selectionStore.iframes.set(i, saved);
                            }, 10);
                        }
                    }, true);

                    frameDoc.addEventListener('contextmenu', function(e) {
                        const saved = selectionStore.iframes.get(i);
                        if (saved && saved.text) {
                            restoreSelection(frameDoc, saved);
                        }
                    }, true);

                } catch(e) {}
            });
        }

        function addCSS() {
            const style = document.createElement('style');
            style.id = 'remove-toolbar-style';
            style.textContent = `
                .toolbar, #toolbar-text, #translate-btn,
                [class*="toolbar"][class*="absolute"],
                [id*="toolbar"][class*="absolute"] {
                    display: none !important;
                    visibility: hidden !important;
                    opacity: 0 !important;
                    pointer-events: none !important;
                }
                body, #reader-content, .reader-content, [class*="reader"] {
                    -webkit-user-select: text !important;
                    -moz-user-select: text !important;
                    -ms-user-select: text !important;
                    user-select: text !important;
                }
            `;
            const existing = document.getElementById('remove-toolbar-style');
            if (existing) existing.remove();
            document.head.appendChild(style);
        }

        removeAllToolbars();

        const toolbarObserver = new MutationObserver(function() {
            removeAllToolbars();
        });
        toolbarObserver.observe(document.body, { childList: true, subtree: true });

        setupTopDocument();
        setupIframeEvents();
        addCSS();

        const iframeObserver = new MutationObserver(function() {
            setupIframeEvents();
        });
        iframeObserver.observe(document.body, { childList: true, subtree: true });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initRemoveToolbar);
    } else {
        initRemoveToolbar();
    }

})();
