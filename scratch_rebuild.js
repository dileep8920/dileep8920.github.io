const fs = require('fs');

try {
    let indexHtml = fs.readFileSync('index.html', 'utf8');
    let styleCss = fs.readFileSync('css/style.css', 'utf8');
    let scriptJs = fs.readFileSync('js/script.js', 'utf8');

    // 1. Inject HTML
    const htmlSnippet = `
    <!-- AI Chatbot Assistant Widget -->
    <div class="chatbot-widget-container" id="chatbotWidget">
        <button class="chatbot-trigger" id="chatbotTrigger" type="button" aria-label="Open AI Assistant">
            <div class="chatbot-trigger-icon"><i class='bx bx-bot'></i></div>
            <div class="chatbot-trigger-pulse"></div>
            <span class="chatbot-badge">AI</span>
        </button>

        <div class="chatbot-window" id="chatbotWindow">
            <div class="chatbot-header">
                <div class="chatbot-header-info">
                    <div class="chatbot-avatar"><i class='bx bx-bot'></i><span class="status-dot online"></span></div>
                    <div class="chatbot-header-text">
                        <h4>Dileep AI Assistant</h4>
                        <span class="status-text">Online - Portfolio Knowledge Base</span>
                    </div>
                </div>
                <div class="chatbot-header-actions">
                    <button class="chatbot-btn-clear" id="chatbotClear" title="Clear Chat"><i class='bx bx-trash'></i></button>
                    <button class="chatbot-btn-close" id="chatbotClose" title="Close"><i class='bx bx-x'></i></button>
                </div>
            </div>
            
            <div class="chatbot-body" id="chatbotMessages">
                <div class="chat-message bot">
                    <div class="chat-avatar"><i class='bx bx-bot'></i></div>
                    <div class="chat-bubble"><p>👋 Hello! I'm Dileep's AI Assistant. You can ask about his skills, experience at Meritto, awards, or projects!</p></div>
                </div>
            </div>

            <div class="chatbot-chips-container" id="chatbotChips">
                <button class="chat-chip" type="button" data-question="Top Skills">Top Skills</button>
                <button class="chat-chip" type="button" data-question="Awards">Awards</button>
                <button class="chat-chip" type="button" data-question="Meritto Experience">Meritto Experience</button>
            </div>

            <form class="chatbot-input-form" id="chatbotForm">
                <input type="text" id="chatbotInput" placeholder="Ask a question..." autocomplete="off" required>
                <button type="submit" id="chatbotSend"><i class='bx bx-paper-plane'></i></button>
            </form>
        </div>
    </div>
    <!-- Scripts -->`;
    
    if (!indexHtml.includes('chatbot-widget-container')) {
        indexHtml = indexHtml.replace('<!-- Scripts -->', htmlSnippet);
        fs.writeFileSync('index.html', indexHtml);
    }

    // 2. Inject CSS
    const cssSnippet = `
/* ========================================
   FLOATING AI CHATBOT WIDGET STYLES
   ======================================== */
.chatbot-widget-container { position: fixed; bottom: 2rem; right: 2rem; z-index: 9999999; }
.chatbot-trigger { position: relative; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, rgba(0, 255, 136, 0.95), rgba(0, 180, 216, 0.95)); border: 1px solid rgba(255,255,255,0.5); display: flex; align-items: center; justify-content: center; cursor: pointer; box-shadow: 0 10px 30px rgba(0,255,136,0.4); }
.chatbot-trigger * { pointer-events: none; }
.chatbot-trigger-icon { font-size: 1.8rem; color: #06080E; }
.chatbot-trigger-pulse { position: absolute; inset: -4px; border-radius: 50%; border: 2px solid #00FF88; pointer-events: none; animation: chatbotPulse 2s infinite; }
@keyframes chatbotPulse { 0% { transform: scale(1); opacity: 0.8; } 100% { transform: scale(1.4); opacity: 0; } }
.chatbot-badge { position: absolute; top: -2px; right: -2px; background: #06080E; color: #00FF88; border: 1px solid #00FF88; font-size: 0.65rem; font-weight: 800; padding: 2px 6px; border-radius: 10px; }
.chatbot-window { position: absolute; bottom: 75px; right: 0; width: 380px; max-width: calc(100vw - 3rem); height: 520px; max-height: calc(100vh - 8rem); background: rgba(10, 14, 24, 0.95); backdrop-filter: blur(24px); border: 1px solid rgba(0,255,136,0.3); border-radius: 24px; box-shadow: 0 25px 60px rgba(0,0,0,0.8); display: flex; flex-direction: column; opacity: 0; visibility: hidden; pointer-events: none; transform: translateY(20px) scale(0.95); transition: all 0.35s ease; z-index: 99; }
.chatbot-window.active { opacity: 1 !important; visibility: visible !important; pointer-events: auto !important; transform: translateY(0) scale(1) !important; display: flex !important; }
.chatbot-header { display: flex; justify-content: space-between; padding: 1rem 1.25rem; border-bottom: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.03); align-items: center; }
.chatbot-header-info { display: flex; align-items: center; gap: 12px; }
.chatbot-avatar { position: relative; width: 36px; height: 36px; border-radius: 50%; background: linear-gradient(135deg, #00FF88, #00B4D8); display: flex; align-items: center; justify-content: center; color: #000; font-size: 1.2rem; }
.status-dot { position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #0A0E18; }
.status-dot.online { background: #00FF88; }
.chatbot-header-text h4 { font-size: 0.95rem; margin: 0; color: #FFF; }
.chatbot-header-text .status-text { font-size: 0.72rem; color: rgba(255,255,255,0.6); }
.chatbot-header-actions { display: flex; gap: 8px; }
.chatbot-btn-clear, .chatbot-btn-close { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); width: 30px; height: 30px; border-radius: 8px; color: #FFF; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.2s; }
.chatbot-btn-clear:hover { color: #00FF88; } .chatbot-btn-close:hover { background: #FF5F56; }
.chatbot-body { flex: 1; padding: 1.25rem 1rem; overflow-y: auto; display: flex; flex-direction: column; gap: 1rem; }
.chat-message { display: flex; gap: 10px; max-width: 85%; }
.chat-message.bot { align-self: flex-start; }
.chat-message.user { align-self: flex-end; flex-direction: row-reverse; }
.chat-avatar { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.9rem; background: rgba(255,255,255,0.1); color: #FFF; flex-shrink: 0; }
.chat-message.bot .chat-avatar { background: linear-gradient(135deg, #00FF88, #00B4D8); color: #000; }
.chat-bubble { padding: 10px 14px; border-radius: 14px; font-size: 0.85rem; line-height: 1.4; color: #FFF; }
.chat-message.bot .chat-bubble { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-top-left-radius: 4px; }
.chat-message.user .chat-bubble { background: rgba(0,255,136,0.15); border: 1px solid rgba(0,255,136,0.3); border-top-right-radius: 4px; color: #00FF88; }
.typing-dots span { display: inline-block; width: 6px; height: 6px; background: #00FF88; border-radius: 50%; margin: 0 2px; animation: typePulse 1.4s infinite; }
.typing-dots span:nth-child(2) { animation-delay: 0.2s; } .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
@keyframes typePulse { 0%, 100% { transform: scale(1); opacity: 0.4; } 50% { transform: scale(1.2); opacity: 1; } }
.chatbot-chips-container { display: flex; gap: 6px; padding: 8px 1rem; overflow-x: auto; border-top: 1px solid rgba(255,255,255,0.05); }
.chatbot-chips-container::-webkit-scrollbar { display: none; }
.chat-chip { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.6); font-size: 0.75rem; padding: 5px 12px; border-radius: 20px; cursor: pointer; white-space: nowrap; transition: 0.2s; }
.chat-chip:hover { background: rgba(0,255,136,0.15); color: #00FF88; border-color: rgba(0,255,136,0.4); }
.chatbot-input-form { display: flex; gap: 8px; padding: 10px 1rem; border-top: 1px solid rgba(255,255,255,0.1); background: rgba(6, 8, 14, 0.95); }
.chatbot-input-form input { flex: 1; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; padding: 8px 14px; color: #FFF; outline: none; }
.chatbot-input-form input:focus { border-color: #00FF88; }
.chatbot-input-form button { width: 36px; height: 36px; border-radius: 50%; background: #00FF88; border: none; color: #000; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center;}
`;
    if (!styleCss.includes('chatbot-widget-container')) {
        styleCss += '\n' + cssSnippet;
        fs.writeFileSync('css/style.css', styleCss);
    }

    // 3. Inject JS
    const jsSnippet = `
function initDileepAIChatbot() {
    const trigger = document.getElementById('chatbotTrigger');
    const windowEl = document.getElementById('chatbotWindow');
    const closeBtn = document.getElementById('chatbotClose');
    const clearBtn = document.getElementById('chatbotClear');
    const form = document.getElementById('chatbotForm');
    const input = document.getElementById('chatbotInput');
    const messagesEl = document.getElementById('chatbotMessages');
    const chipsContainer = document.getElementById('chatbotChips');

    if (!trigger || !windowEl) return;

    window.toggleDileepChatbot = (forceState) => {
        if (typeof forceState === 'boolean') {
            windowEl.classList.toggle('active', forceState);
        } else {
            windowEl.classList.toggle('active');
        }
    };

    trigger.addEventListener('click', () => window.toggleDileepChatbot());
    if (closeBtn) closeBtn.addEventListener('click', () => window.toggleDileepChatbot(false));

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag));
    }

    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function addUserMessage(text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'chat-message user';
        msgDiv.innerHTML = \`
            <div class="chat-avatar"><i class='bx bx-user'></i></div>
            <div class="chat-bubble"><p>\${escapeHTML(text)}</p></div>
        \`;
        messagesEl.appendChild(msgDiv);
        scrollToBottom();
    }

    const knowledgeBase = [
        { keywords: ['skill', 'skills', 'stack', 'technology', 'tech', 'languages', 'java', 'spring', 'aws'], response: \`<p>🚀 <strong>Core Technical Skills:</strong></p><ul><li><strong>Languages:</strong> Core Java, Spring Boot, JavaScript (ES6+), SQL, HTML5/CSS3</li><li><strong>Backend:</strong> REST APIs, Hibernate, Microservices</li><li><strong>Cloud:</strong> AWS (EC2, RDS), CI/CD Automation</li></ul>\` },
        { keywords: ['experience', 'work', 'meritto', 'company'], response: \`<p>💼 <strong>Career at Meritto (3+ Years):</strong></p><ul><li><strong>Implementation Specialist III (2024–Present):</strong> Leading technical execution & SaaS architecture.</li><li><strong>SaaS Developer II:</strong> Automated deployments & cloud management.</li><li><strong>Junior Developer:</strong> Onboarded 50+ enterprise SaaS clients.</li></ul>\` },
        { keywords: ['project', 'projects', 'works', 'portfolio'], response: \`<p>🛠️ <strong>Featured Projects:</strong></p><ul><li><strong>SaaS Client Onboarding Engine:</strong> Onboarded 50+ enterprise clients.</li><li><strong>NIAA Chatbot CI/CD Pipeline:</strong> 75% setup timeline reduction.</li></ul>\` },
        { keywords: ['contact', 'email', 'phone', 'reach', 'hire'], response: \`<p>📞 <strong>Get in Touch:</strong></p><ul><li>📧 <strong>Email:</strong> dileepkumary669@gmail.com</li><li>📱 <strong>Phone:</strong> +91 89202 85748</li></ul>\` }
    ];

    function matchKnowledge(query) {
        const q = query.toLowerCase();
        for (const item of knowledgeBase) {
            for (const key of item.keywords) {
                if (q.includes(key)) return item.response;
            }
        }
        return \`<p>I can help you learn more about Dileep's <strong>3+ years experience</strong>, <strong>skills</strong>, <strong>awards</strong>, or <strong>projects</strong>!</p>\`;
    }

    function addBotResponse(queryText) {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'chat-message bot typing-msg';
        typingDiv.innerHTML = \`<div class="chat-avatar"><i class='bx bx-bot'></i></div><div class="chat-bubble"><div class="typing-dots"><span></span><span></span><span></span></div></div>\`;
        messagesEl.appendChild(typingDiv);
        scrollToBottom();

        const matched = matchKnowledge(queryText);

        setTimeout(() => {
            typingDiv.remove();
            const msgDiv = document.createElement('div');
            msgDiv.className = 'chat-message bot';
            msgDiv.innerHTML = \`<div class="chat-avatar"><i class='bx bx-bot'></i></div><div class="chat-bubble">\${matched}</div>\`;
            messagesEl.appendChild(msgDiv);
            scrollToBottom();
        }, 600);
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const text = input.value.trim();
        if (!text) return;
        addUserMessage(text);
        input.value = '';
        addBotResponse(text);
    });

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            messagesEl.innerHTML = \`
                <div class="chat-message bot">
                    <div class="chat-avatar"><i class='bx bx-bot'></i></div>
                    <div class="chat-bubble"><p>👋 Chat cleared! How else can I assist you?</p></div>
                </div>
            \`;
        });
    }

    if (chipsContainer) {
        chipsContainer.addEventListener('click', (e) => {
            const chip = e.target.closest('.chat-chip');
            if (chip) {
                const question = chip.getAttribute('data-question') || chip.textContent;
                addUserMessage(question);
                addBotResponse(question);
            }
        });
    }
}

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    initDileepAIChatbot();
} else {
    document.addEventListener('DOMContentLoaded', initDileepAIChatbot);
    window.addEventListener('load', initDileepAIChatbot);
}
`;
    
    if (!scriptJs.includes('initDileepAIChatbot')) {
        // First fix the null bug in scriptJs (currentYear)
        scriptJs = scriptJs.replace(
            "document.getElementById('currentYear').textContent = new Date().getFullYear();", 
            "const yearEl = document.getElementById('currentYear'); if (yearEl) yearEl.textContent = new Date().getFullYear();"
        );
        scriptJs += '\n' + jsSnippet;
        fs.writeFileSync('js/script.js', scriptJs);
    }

    console.log("Success");
} catch (e) {
    console.error(e);
}
