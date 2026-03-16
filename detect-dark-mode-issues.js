// 检测元素的CSS样式来源
// 请复制以下代码到浏览器控制台(F12 -> Console)运行

(function() {
    console.log('=== 检测下划线样式元素 ===\n');

    // 1. 查找包含指定文字的元素
    const targetTexts = [
        'VibeCoding成游戏开发热点',
        'MuleRun平台支持游戏开发'
    ];

    const foundElements = [];

    // 通过文字内容查找元素
    function findElementsByText(text) {
        const walker = document.createTreeWalker(
            document.body,
            NodeFilter.SHOW_TEXT,
            null,
            false
        );

        const results = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.textContent.includes(text)) {
                results.push(node.parentElement);
            }
        }
        return results;
    }

    targetTexts.forEach(text => {
        const elements = findElementsByText(text);
        if (elements.length > 0) {
            console.log(`找到包含 "${text}" 的元素:`);
            elements.forEach((el, index) => {
                console.log(`  [${index}] <${el.tagName.toLowerCase()}>`);
                console.log(`      class: ${el.className}`);
                console.log(`      style: ${el.getAttribute('style') || '(无)'}`);

                // 检查是否有 outline-underline 类
                if (el.classList.contains('outline-underline')) {
                    console.log('      ✓ 包含 outline-underline 类');
                }

                // 检查 computed style
                const computed = window.getComputedStyle(el);
                console.log(`      backgroundImage: ${computed.backgroundImage}`);
                console.log(`      textDecoration: ${computed.textDecoration}`);
                console.log(`      boxDecorationBreak: ${computed.boxDecorationBreak || '(不支持)'}`);

                foundElements.push(el);
            });
        } else {
            console.log(`未找到包含 "${text}" 的元素`);
        }
        console.log('');
    });

    // 2. 查找所有包含 outline-underline 的元素
    console.log('=== 查找所有 outline-underline 元素 ===\n');
    const outlineElements = document.querySelectorAll('.outline-underline, [class*="outline-underline"]');
    console.log(`找到 ${outlineElements.length} 个包含 outline-underline 的元素`);

    outlineElements.forEach((el, index) => {
        console.log(`[${index}] <${el.tagName.toLowerCase()}>`);
        console.log(`    class: ${el.className}`);
        const computed = window.getComputedStyle(el);
        console.log(`    backgroundImage: ${computed.backgroundImage}`);
        console.log(`    textDecoration: ${computed.textDecoration}`);
        console.log('');
    });

    // 3. 检测背景图渐变样式
    console.log('=== 查找使用 linear-gradient 背景的元素 ===\n');
    const allElements = document.querySelectorAll('*');
    const gradientElements = [];

    allElements.forEach(el => {
        const computed = window.getComputedStyle(el);
        if (computed.backgroundImage && computed.backgroundImage.includes('linear-gradient')) {
            gradientElements.push({
                element: el,
                bg: computed.backgroundImage
            });
        }
    });

    console.log(`找到 ${gradientElements.length} 个使用渐变背景的元素`);
    gradientElements.slice(0, 20).forEach((item, index) => {
        console.log(`[${index}] <${item.element.tagName.toLowerCase()}>`);
        console.log(`    class: ${item.element.className}`);
        console.log(`    backgroundImage: ${item.bg}`);
    });

    console.log('\n=== 检测完成 ===');
})();
