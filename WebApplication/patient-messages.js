
/**
 * Patient Module: Messages
 */
(function() {
    window.app = window.app || {};

    function renderMessages() {
        const mainViewContent = document.getElementById('mainViewContent');
        mainViewContent.innerHTML = `
            <div class="messages-container animate-fade-in">
                <div class="chat-sidebar">
                    <div class="chat-sidebar-header"><h3>Messages</h3></div>
                    <div class="chat-list" id="chatList">
                        <div class="chat-item active" onclick="window.app.switchConversation('Dr. Rohan Silva', 'https://ui-avatars.com/api/?name=Dr+Silva&background=20c997&color=fff')">
                            <img src="https://ui-avatars.com/api/?name=Dr+Silva&background=20c997&color=fff" class="avatar-sm">
                            <div class="chat-item-info"><h5>Dr. Rohan Silva</h5><p>Checking in...</p></div>
                        </div>
                        <div class="chat-item" onclick="window.app.switchConversation('Dr. Priya Sharma', 'https://ui-avatars.com/api/?name=Dr+Priya&background=e83e8c&color=fff')">
                            <img src="https://ui-avatars.com/api/?name=Dr+Priya&background=e83e8c&color=fff" class="avatar-sm">
                            <div class="chat-item-info"><h5>Dr. Priya Sharma</h5><p>Your results are ready.</p></div>
                        </div>
                    </div>
                </div>
                <div class="chat-main">
                    <div class="chat-main-header header-padding">
                        <div class="flex-center gap-4">
                            <img src="https://ui-avatars.com/api/?name=Dr+Silva&background=20c997&color=fff" class="avatar-sm">
                            <h4>Dr. Rohan Silva</h4>
                        </div>
                        <div class="flex gap-4">
                            <button class="btn btn-link" onclick="window.app.showToast('Call', 'Initiating video call...', 'info')"><i class="fas fa-video"></i></button>
                            <button class="btn btn-link" onclick="window.app.showToast('Call', 'Initiating voice call...', 'info')"><i class="fas fa-phone"></i></button>
                        </div>
                    </div>
                    <div class="chat-messages-area p-6" id="chatArea">
                        <div class="msg-bubble received">Hello Chamath, how are you feeling?</div>
                    </div>
                    <div class="chat-input-area p-4">
                        <button class="btn btn-link px-2" onclick="window.app.showToast('Upload', 'Select a file to share with the doctor', 'info')">
                            <i class="fas fa-paperclip"></i>
                        </button>
                        <input type="text" id="chatInput" placeholder="Reply..." onkeypress="if(event.key==='Enter') window.app.sendChatMessage()">
                        <button class="btn btn-primary" onclick="window.app.sendChatMessage()"><i class="fas fa-paper-plane"></i></button>
                    </div>
                </div>
            </div>
        `;
        setTimeout(() => {
            const area = document.getElementById('chatArea');
            if(area) area.scrollTop = area.scrollHeight;
        }, 100);
    }

    function switchConversation(name, avatar) {
        const chatMainHeader = document.querySelector('.chat-main-header');
        if (chatMainHeader) {
            chatMainHeader.innerHTML = `
                <div class="flex-center gap-4">
                    <img src="${avatar}" class="avatar-sm">
                    <h4>${name}</h4>
                </div>
                <div class="flex gap-4">
                    <button class="btn btn-link" onclick="window.app.showToast('Call', 'Initiating video call...', 'info')"><i class="fas fa-video"></i></button>
                    <button class="btn btn-link" onclick="window.app.showToast('Call', 'Initiating voice call...', 'info')"><i class="fas fa-phone"></i></button>
                </div>
            `;
        }
        
        const chatArea = document.getElementById('chatArea');
        if (chatArea) {
            chatArea.innerHTML = `<div class="msg-bubble received">Hello, I'm ${name}. How can I help you today?</div>`;
        }

        document.querySelectorAll('.chat-item').forEach(item => {
            item.classList.toggle('active', item.querySelector('h5').textContent === name);
        });
    }

    function sendChatMessage() {
        const input = document.getElementById('chatInput');
        const area = document.getElementById('chatArea');
        if (!input || !input.value.trim()) return;

        const msg = document.createElement('div');
        msg.className = 'msg-bubble sent animate-slide-up';
        msg.textContent = input.value;
        area.appendChild(msg);
        input.value = '';
        area.scrollTop = area.scrollHeight;
    }

    Object.assign(window.app, {
        renderMessages, sendChatMessage, switchConversation
    });
})();
