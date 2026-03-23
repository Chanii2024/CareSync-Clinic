
/**
 * Patient Tabs Module
 * Handles rendering and logic for: Upcoming Visits, Health Records, Billing, and Messages.
 */

(function() {
    // Upcoming Visits
    function renderAppointments() {
        const appointments = [
            {
                id: 'APT-102',
                doctor: 'Dr. Rohan Silva',
                specialty: 'Cardiology',
                date: '24',
                month: 'MAR',
                time: '09:30 AM',
                status: 'confirmed',
                fullDate: new Date(new Date().setDate(new Date().getDate() + 2))
            },
            {
                id: 'APT-103',
                doctor: 'Dr. Priya Sharma',
                specialty: 'Dermatology',
                date: '28',
                month: 'MAR',
                time: '04:00 PM',
                status: 'pending',
                fullDate: new Date(new Date().setDate(new Date().getDate() + 6))
            }
        ];

        const mainViewContent = document.getElementById('mainViewContent');
        if (!mainViewContent) return;

        mainViewContent.innerHTML = `
            <div class="appointments-container animate-fade-in">
                <div class="flex-between mb-6">
                    <h3>My Upcoming Visits</h3>
                    <button class="btn btn-primary" onclick="window.app.switchView('booking')">+ New Appointment</button>
                </div>
                
                <div class="appointment-card-list">
                    ${appointments.map(apt => `
                        <div class="apt-item animate-slide-up">
                            <div class="apt-info">
                                <div class="apt-date-box">
                                    <span class="day">${apt.date}</span>
                                    <span class="month">${apt.month}</span>
                                </div>
                                <div class="apt-details">
                                    <h4>${apt.doctor}</h4>
                                    <p>${apt.specialty} • ${apt.time}</p>
                                    <div class="pending-time">
                                        <i class="fas fa-clock"></i> 
                                        <span>Starts in: ${calculatePendingTime(apt.fullDate)}</span>
                                    </div>
                                </div>
                            </div>
                            <div class="apt-actions">
                                <div class="flex gap-4">
                                    <span class="status-badge ${apt.status}">${apt.status}</span>
                                    <div class="action-btns">
                                        <button class="btn btn-outline small" onclick="window.app.switchView('booking')">Reschedule</button>
                                        <button class="btn btn-danger small" onclick="window.app.showAptAction('Cancel', '${apt.id}')">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>

                <div class="past-summaries mt-10">
                    <h3 class="mb-4">Recent Care Instructions</h3>
                    <div class="grid-2">
                        <div class="summary-card card">
                            <div class="flex-between mb-2">
                                <span class="text-sm font-bold text-muted">Last Visit: 15 Mar 2026</span>
                                <span class="badge secondary">Cardio</span>
                            </div>
                            <p class="mb-4"><strong>Dr. Rohan Silva:</strong> Patient shows improved heart rhythm. Continue Metformin 500mg.</p>
                            <div class="alert info p-3 text-sm">
                                <i class="fas fa-lightbulb"></i> Avoid spicy foods and maintain 30m walk.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function calculatePendingTime(targetDate) {
        const now = new Date();
        const diff = targetDate - now;
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        if (days > 0) return `${days}d ${hours}h`;
        if (hours > 0) return `${hours}h remaining`;
        return "Soon";
    }

    // Health Records
    function renderRecords() {
        const mainViewContent = document.getElementById('mainViewContent');
        mainViewContent.innerHTML = `
            <div class="records-container animate-fade-in">
                <div class="records-tabs mb-6">
                    <button class="tab active" onclick="window.app.switchRecordTab('history')">Medical History</button>
                    <button class="tab" onclick="window.app.switchRecordTab('prescriptions')">Prescriptions</button>
                </div>
                <div id="recordTabContent">
                    ${getHistoryHTML()}
                </div>
            </div>
        `;
    }

    function getHistoryHTML() {
        return `
            <div class="records-list card">
                <h3>Past Visit History</h3>
                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Reason</th>
                                <th>Diagnosis / Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>15 Mar 2026</td>
                                <td>Dr. Rohan Silva</td>
                                <td>Routine Cardiac Follow-up</td>
                                <td><span class="status-badge confirmed">Stable</span> <button class="btn btn-link small">View Report</button></td>
                            </tr>
                            <tr>
                                <td>02 Feb 2026</td>
                                <td>Dr. Priya Sharma</td>
                                <td>Skin Rash Assessment</td>
                                <td><span class="status-badge confirmed">Resolved</span> <button class="btn btn-link small">View Report</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function getPrescriptionHTML() {
        return `
            <div class="prescriptions-grid mt-4">
                <div class="prescription-card card animate-slide-up">
                    <div class="rx-header flex-between">
                        <div class="flex-center gap-4">
                            <div class="rx-icon bg-primary text-white p-3 border-radius"><i class="fas fa-file-prescription"></i></div>
                            <div>
                                <h4>Rx #98210</h4>
                                <span class="text-xs text-muted">15 Mar 2026 • Dr. Rohan Silva</span>
                            </div>
                        </div>
                        <span class="status-badge confirmed">Active</span>
                    </div>
                    <div class="rx-body py-4 mt-4 border-t border-b">
                        <ul class="med-list">
                            <li class="py-2 flex-between">
                                <span><strong>Metformin 500mg</strong> (30 Tablets)</span>
                                <span class="text-sm">1 daily after dinner</span>
                            </li>
                            <li class="py-2 flex-between">
                                <span><strong>Atorvastatin 20mg</strong> (15 Tablets)</span>
                                <span class="text-sm">1 daily at night</span>
                            </li>
                        </ul>
                    </div>
                    <div class="rx-footer flex-between mt-4">
                        <span class="text-sm text-success font-bold">Dispensed at Hospital Pharmacy</span>
                        <button class="btn btn-primary small"><i class="fas fa-download"></i> Download PDF</button>
                    </div>
                </div>
            </div>
        `;
    }

    function switchRecordTab(tab) {
        const content = document.getElementById('recordTabContent');
        if (!content) return;
        
        if (tab === 'history') content.innerHTML = getHistoryHTML();
        if (tab === 'prescriptions') content.innerHTML = getPrescriptionHTML();
        
        document.querySelectorAll('.records-tabs .tab').forEach(t => {
            t.classList.toggle('active', t.textContent.toLowerCase().includes(tab));
        });
    }

    // Billing & Pharmacy
    function renderBilling() {
        const bills = [
            { id: 'INV-8821', date: '20 Mar 2026', type: 'Consultation', amount: '2,500.00', status: 'Paid' },
            { id: 'INV-9902', date: '15 Mar 2026', type: 'Pharmacy', amount: '1,250.00', status: 'Paid' },
            { id: 'INV-1022', date: 'Today', type: 'Pharmacy', amount: '850.00', status: 'Pending' }
        ];

        const mainViewContent = document.getElementById('mainViewContent');
        mainViewContent.innerHTML = `
            <div class="billing-container animate-fade-in">
                <div class="flex-between mb-6">
                    <h3>Billing & Pharmacy Dues</h3>
                    <div class="total-due-badge">
                        <span class="text-sm">Total Pending:</span>
                        <span class="amount text-error font-bold ml-2">LKR 850.00</span>
                    </div>
                </div>

                <div class="billing-table-card card">
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Invoice ID</th>
                                    <th>Date</th>
                                    <th>Description</th>
                                    <th>Amount (LKR)</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${bills.map(bill => `
                                    <tr>
                                        <td><strong>#${bill.id}</strong></td>
                                        <td>${bill.date}</td>
                                        <td>${bill.type}</td>
                                        <td class="font-bold">${bill.amount}</td>
                                        <td><span class="status-badge ${bill.status.toLowerCase()}">${bill.status}</span></td>
                                        <td>
                                            ${bill.status === 'Pending' 
                                                ? `<button class="btn btn-primary small" onclick="window.app.showPaymentModal('${bill.id}', '${bill.amount}')">Pay Now</button>` 
                                                : `<button class="btn btn-link small"><i class="fas fa-download"></i> Receipt</button>`}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    // Messages / Chat
    function renderMessages() {
        const mainViewContent = document.getElementById('mainViewContent');
        mainViewContent.innerHTML = `
            <div class="messages-container animate-fade-in">
                <div class="chat-sidebar">
                    <div class="chat-sidebar-header"><h3>Messages</h3></div>
                    <div class="chat-list">
                        <div class="chat-item active">
                            <img src="https://ui-avatars.com/api/?name=Dr+Silva&background=20c997&color=fff" class="avatar-sm">
                            <div class="chat-item-info"><h5>Dr. Rohan Silva</h5><p>Feeling much better...</p></div>
                        </div>
                        <div class="chat-item">
                            <img src="https://ui-avatars.com/api/?name=Support&background=1e293b&color=fff" class="avatar-sm">
                            <div class="chat-item-info"><h5>CareSync Support</h5><p>Insurance verified...</p></div>
                        </div>
                    </div>
                </div>
                <div class="chat-main">
                    <div class="chat-main-header header-padding">
                        <div class="flex-center gap-4">
                            <img src="https://ui-avatars.com/api/?name=Dr+Silva&background=20c997&color=fff" class="avatar-sm">
                            <div><h4>Dr. Rohan Silva</h4><span class="status online">Online</span></div>
                        </div>
                    </div>
                    <div class="chat-messages-area p-6" id="chatArea">
                        <div class="msg-bubble received">Hello Chamath, how are you feeling today?</div>
                        <div class="msg-bubble sent">Better, but had some mild headache.</div>
                    </div>
                    <div class="chat-input-area p-4">
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

    // Expose to window.app
    Object.assign(window.app, {
        renderAppointments,
        renderRecords,
        renderBilling,
        renderMessages,
        switchRecordTab,
        sendChatMessage
    });
})();
