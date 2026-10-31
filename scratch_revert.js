const fs = require('fs');
const { execSync } = require('child_process');

try {
    const html = fs.readFileSync('index.html', 'utf8');
    const css = fs.readFileSync('css/style.css', 'utf8');
    const js = fs.readFileSync('js/script.js', 'utf8');

    const htmlChatbotMatch = html.match(/<!-- AI Chatbot Assistant Widget -->[\s\S]*?(?=<!-- Scripts -->)/);
    const htmlChatbotStr = htmlChatbotMatch ? htmlChatbotMatch[0] : '';

    const cssChatbotMatch = css.match(/\/\* ========================================\s*FLOATING AI CHATBOT WIDGET STYLES[\s\S]*/);
    const cssChatbotStr = cssChatbotMatch ? cssChatbotMatch[0] : '';

    const jsChatbotMatch = js.match(/function initDileepAIChatbot\(\) \{[\s\S]*/);
    const jsChatbotStr = jsChatbotMatch ? jsChatbotMatch[0] : '';

    console.log('Extracted HTML length:', htmlChatbotStr.length);
    console.log('Extracted CSS length:', cssChatbotStr.length);
    console.log('Extracted JS length:', jsChatbotStr.length);

    console.log('Checking out e7db7c8...');
    execSync('git checkout e7db7c8 -- index.html css/style.css js/script.js', { stdio: 'inherit' });

    let oldHtml = fs.readFileSync('index.html', 'utf8');
    let oldCss = fs.readFileSync('css/style.css', 'utf8');
    let oldJs = fs.readFileSync('js/script.js', 'utf8');

    // oldHtml structure usually ends with:
    //     <!-- Link To JS -->
    //     <script src="./js/script.js"></script>
    // </body>
    // </html>
    
    // Let's replace the closing </body> to inject it right before that.
    if (htmlChatbotStr) {
        oldHtml = oldHtml.replace('</body>', `    ${htmlChatbotStr}\n</body>`);
    }

    if (cssChatbotStr) {
        oldCss += `\n\n${cssChatbotStr}`;
    }

    if (jsChatbotStr) {
        oldJs += `\n\n${jsChatbotStr}\n\nif (document.readyState === 'complete' || document.readyState === 'interactive') {
    initDileepAIChatbot();
} else {
    document.addEventListener('DOMContentLoaded', initDileepAIChatbot);
    window.addEventListener('load', initDileepAIChatbot);
}`;
    }

    fs.writeFileSync('index.html', oldHtml);
    fs.writeFileSync('css/style.css', oldCss);
    fs.writeFileSync('js/script.js', oldJs);
    
    console.log('Restoration and injection complete!');
} catch (e) {
    console.error(e);
}
