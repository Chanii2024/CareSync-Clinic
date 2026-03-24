// Doctor Daily Queue Logic
window.app = window.app || {};

// Mock Data for the Queue
const dailyQueueData = [
    { id: 101, time: '09:00 AM', name: 'John Silva', age: 45, reason: 'Follow-up on hypertension', status: 'Completed', type: 'Returning', urgent: false },
    { id: 102, time: '09:20 AM', name: 'Nimal Perera', age: 62, reason: 'Severe chest pain radiating to arm', status: 'In Progress', type: 'New', urgent: true },
    { id: 103, time: '09:40 AM', name: 'Maria Fernando', age: 28, reason: 'Routine prenatal checkup', status: 'Waiting', type: 'Returning', urgent: false },
    { id: 104, time: '10:00 AM', name: 'Amal Peris', age: 35, reason: 'Persistent fever and cough', status: 'Waiting', type: 'New', urgent: false },
    { id: 105, time: '10:30 AM', name: 'Sunil Jayawardena', age: 70, reason: 'Diabetic foot ulcer assessment', status: 'Scheduled', type: 'Returning', urgent: true }
];

window.app.renderDocDashboard = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    
    // Calculate metrics
    const total = dailyQueueData.length;
    const completed = dailyQueueData.filter(p => p.status === 'Completed').length;
    const waiting = dailyQueueData.filter(p => p.status === 'Waiting').length;
    const inProgress = dailyQueueData.filter(p => p.status === 'In Progress').length;

    let queueHtml = `
        <div class="queue-dashboard-container animate-fade-in" style="max-width: 1200px; margin: 0 auto;">
            <div class="flex-between mb-6">
                <h1 style="font-size: 24px; color: var(--primary); font-weight: 700;">Daily Patient Queue</h1>
                <div class="text-muted" style="font-weight: 600;">
                    <i class="fas fa-calendar-day"></i> Today, ${new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
            </div>

            <!-- Metrics Grid -->
            <div class="grid-4 mb-6">
                <div class="card" style="padding: 20px; text-align: center;">
                    <div style="font-size: 1.75rem; color: var(--primary); font-weight: 700;">${total}</div>
                    <div class="text-muted text-sm mt-1">Total Scheduled</div>
                </div>
                <div class="card" style="padding: 20px; text-align: center;">
                    <div style="font-size: 1.75rem; color: var(--text-main); font-weight: 700;">${waiting}</div>
                    <div class="text-muted text-sm mt-1">Waiting</div>
                </div>
                <div class="card" style="padding: 20px; text-align: center;">
                    <div style="font-size: 1.75rem; color: var(--text-main); font-weight: 700;">${inProgress}</div>
                    <div class="text-muted text-sm mt-1">In Progress</div>
                </div>
                <div class="card" style="padding: 20px; text-align: center;">
                    <div style="font-size: 1.75rem; color: var(--text-main); font-weight: 700;">${completed}</div>
                    <div class="text-muted text-sm mt-1">Completed</div>
                </div>
            </div>

            <!-- Queue List -->
            <div class="card p-0">
                <div class="p-4" style="border-bottom: 1px solid var(--border-color); background: var(--bg-main);">
                    <h3 style="color: var(--primary); font-size: 1.1rem;"><i class="fas fa-list-ol"></i> Up Next</h3>
                </div>
                <div class="queue-list" style="display: flex; flex-direction: column;">
    `;

    dailyQueueData.forEach((patient, index) => {
        let statusBadge = '';
        if (patient.status === 'Completed') statusBadge = '<span style="background: #e2e8f0; color: #64748b; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;"><i class="fas fa-check"></i> Completed</span>';
        else if (patient.status === 'Waiting') statusBadge = '<span style="background: rgba(245, 158, 11, 0.15); color: #d97706; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;"><i class="fas fa-hourglass-half"></i> Waiting</span>';
        else if (patient.status === 'In Progress') statusBadge = '<span style="background: rgba(59, 130, 246, 0.15); color: #2563eb; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;"><i class="fas fa-spinner fa-spin"></i> In Progress</span>';
        else statusBadge = '<span style="background: #f1f5f9; color: var(--text-muted); padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;"><i class="far fa-clock"></i> Scheduled</span>';

        let typeBadge = patient.type === 'New' 
            ? '<span style="background: rgba(32, 201, 151, 0.15); color: var(--accent-hover); font-size: 0.7rem; padding: 2px 6px; border-radius: 6px; font-weight: bold;">NEW</span>' 
            : '<span style="background: #e2e8f0; color: #64748b; font-size: 0.7rem; padding: 2px 6px; border-radius: 6px; font-weight: bold;">RETURNING</span>';

        let urgentFlag = patient.urgent ? `<span style="color: #ef4444; font-size: 0.75rem; font-weight: 600; border: 1px solid #ef4444; padding: 2px 6px; border-radius: 4px; margin-top: 4px; display: inline-block;">URGENT</span>` : '';

        let ActionBtn = '';
        if (patient.status !== 'Completed') {
            ActionBtn = `<button class="btn btn-primary small" onclick="window.app.startConsultation(${patient.id}, '${patient.name.replace(/'/g, "\\'")}')">Start Cons.</button>`;
        } else {
            ActionBtn = `<button class="btn btn-outline small" onclick="window.app.startConsultation(${patient.id}, '${patient.name.replace(/'/g, "\\'")}')">View Notes</button>`;
        }

        queueHtml += `
            <div class="queue-item p-4" style="border-bottom: 1px solid var(--border-color); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 20px; transition: background 0.2s;">
                <div style="display: flex; gap: 20px; align-items: center; flex: 1; min-width: 300px;">
                    <div style="font-weight: 700; color: var(--primary); font-size: 1.05rem; min-width: 80px; text-align: left; padding-right: 20px; border-right: 1px solid var(--border-color);">
                        ${patient.time}
                    </div>
                    
                    <div style="display: flex; gap: 15px; align-items: center;">
                        <img src="https://ui-avatars.com/api/?name=${patient.name.replace(' ', '+')}&background=e2e8f0&color=475569&rounded=true" style="width: 48px; height: 48px; border-radius: 50%;">
                        <div>
                            <div style="font-weight: 700; color: var(--text-main); font-size: 1.05rem; display: flex; align-items: center; gap: 10px;">
                                ${patient.name} ${typeBadge}
                            </div>
                            <div class="text-muted text-sm" style="margin-top: 4px;">${patient.age} yrs &bull; ${patient.reason}</div>
                            ${urgentFlag}
                        </div>
                    </div>
                </div>

                <div style="display: flex; align-items: center; gap: 15px; justify-content: flex-end;">
                    ${statusBadge}
                    ${ActionBtn}
                </div>
            </div>
        `;
    });

    queueHtml += `
                </div>
            </div>
        </div>
        <style>
            .queue-item:hover { background: #f8fafc; cursor: pointer; }
            @media (max-width: 768px) {
                .grid-4 { grid-template-columns: repeat(2, 1fr) !important; }
            }
            @media (max-width: 480px) {
                .queue-item { flex-direction: column; align-items: flex-start !important; gap: 10px; }
                .queue-item > div { width: 100%; justify-content: space-between; }
                .queue-item .btn { width: 100%; }
            }
        </style>
    `;

    mainViewContent.innerHTML = queueHtml;
};

// Global function to route to Consultation
window.app.startConsultation = function(patientId, patientName) {
    if (window.app.showToast) {
        window.app.showToast('Loading', `Opening consultation file for ${patientName}...`, 'info');
    }
    // Route to the consultation view logic defined in doctor-consultation.js
    setTimeout(() => {
        if(window.app.renderDocConsultation) {
            window.app.renderDocConsultation(patientId);
            
            // Highlight 'Daily Queue' or similar active state in Sidebar
            const items = document.querySelectorAll('.nav-item');
            items.forEach(nav => nav.classList.remove('active'));
            const activeNav = document.querySelector('.nav-item[data-view="doc-dashboard"]');
            if (activeNav) activeNav.classList.add('active');
            
            document.getElementById('viewTitle').textContent = `Consulting: ${patientName}`;
        }
    }, 400); // Slight delay for premium feel
};
