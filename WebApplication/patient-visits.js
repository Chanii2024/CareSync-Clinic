
/**
 * Patient Module: Upcoming Visits
 */
(function() {
    window.app = window.app || {};

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
            },
            {
                id: 'APT-104',
                doctor: 'Dr. Amal Perera',
                specialty: 'General Medicine',
                date: '05',
                month: 'APR',
                time: '10:00 AM',
                status: 'confirmed',
                fullDate: new Date(new Date().setDate(new Date().getDate() + 14))
            },
            {
                id: 'APT-105',
                doctor: 'City Lab',
                specialty: 'Blood Test Profile',
                date: '10',
                month: 'APR',
                time: '07:30 AM',
                status: 'pending',
                fullDate: new Date(new Date().setDate(new Date().getDate() + 19))
            }
        ];

        const mainViewContent = document.getElementById('mainViewContent');
        if (!mainViewContent) return;

        mainViewContent.innerHTML = `
            <div class="patient-tab-container animate-fade-in">
                <div class="flex-between mb-6">
                    <h3>My Upcoming Visits</h3>
                    <button class="btn btn-primary" onclick="window.app.switchView('booking')">+ New Appointment</button>
                </div>

                <div class="cta-banner p-4 mb-6 bg-light border-radius flex-between animate-slide-up" style="border-left: 4px solid var(--accent)">
                    <div>
                        <h4 class="text-primary">Due for a Checkup?</h4>
                        <p class="text-sm text-muted">It’s been 6 months since your last full body checkup.</p>
                    </div>
                    <button class="btn btn-outline small" onclick="window.app.switchView('booking')">Schedule Now</button>
                </div>
                
                <div class="appointment-card-list">
                    ${appointments.map(apt => `
                        <div class="apt-item animate-slide-up" onclick="window.app.showAptDetail('${apt.id}')" style="cursor: pointer;">
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
                            <div class="apt-actions" onclick="event.stopPropagation()">
                                <div class="flex gap-4">
                                    <span class="status-badge ${apt.status}">${apt.status}</span>
                                    <div class="action-btns">
                                        <button class="btn btn-outline small" onclick="window.app.showAptAction('Reschedule', '${apt.id}')">Reschedule</button>
                                        <button class="btn btn-danger small" onclick="window.app.showAptAction('Cancel', '${apt.id}')">Cancel</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
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

    function showAptDetail(aptId) {
        const overlay = document.getElementById('customModalOverlay');
        if (!overlay) return;

        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="modal-header"><h3>Appointment Details</h3></div>
                <div class="modal-body">
                    <div class="detail-grid gap-6">
                        <div class="flex gap-4 mb-6">
                            <img src="https://ui-avatars.com/api/?name=Dr+Silva&background=1a365d&color=fff" class="avatar-lg border-radius">
                            <div>
                                <h4 class="text-primary">Dr. Rohan Silva</h4>
                                <p class="text-muted">Senior Consultant • Cardiology</p>
                                <span class="status-badge confirmed mt-2">Verified Professional</span>
                            </div>
                        </div>
                        <div class="info-strip bg-light p-4 border-radius">
                            <div class="flex-between mb-2"><span>Type:</span><strong>In-Person Consultation</strong></div>
                            <div class="flex-between mb-2"><span>Location:</span><strong>City Hospital, Floor 3</strong></div>
                            <div class="flex-between"><span>Reference:</span><strong>#${aptId}</strong></div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="window.app.closeCustomModal()">Got it</button>
                </div>
            </div>
        `;
        overlay.classList.add('active');
    }

    function showAptAction(action, aptId) {
        const modalId = 'customModalOverlay';
        let overlay = document.getElementById(modalId);
        
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = modalId;
            overlay.className = 'custom-modal-overlay';
            document.body.appendChild(overlay);
        }

        const isCancel = action === 'Cancel';
        
        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="modal-header">
                    <h3>${action} Appointment</h3>
                </div>
                <div class="modal-body">
                    <p>Are you sure you want to ${action.toLowerCase()} appointment <strong>${aptId}</strong>?</p>
                    ${isCancel ? `
                        <div class="form-group mt-4">
                            <label>Reason for Cancellation</label>
                            <select class="custom-select" id="cancelReason">
                                <option>Personal Emergency</option>
                                <option>Feeling Better</option>
                                <option>Schedule Conflict</option>
                                <option>Found Another Clinic</option>
                            </select>
                        </div>
                    ` : `
                        <div class="form-group mt-4">
                            <label>New Requested Date</label>
                            <input type="date" id="rescheduleDate" class="form-control" required>
                        </div>
                    `}
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="window.app.closeCustomModal()">Go Back</button>
                    <button class="btn ${isCancel ? 'btn-danger' : 'btn-primary'}" id="confirmModalBtn">Confirm ${action}</button>
                </div>
            </div>
        `;

        overlay.classList.add('active');
        
        document.getElementById('confirmModalBtn').onclick = () => {
             if (!isCancel) {
                const dateVal = document.getElementById('rescheduleDate').value;
                if (!dateVal) {
                    window.app.showToast('Error', 'Please select a new date', 'error');
                    return;
                }
            }
            window.app.closeCustomModal();
            window.app.showToast('Success', `Appointment ${aptId} ${action.toLowerCase()}ed successfully.`, 'success');
        };
    }

    Object.assign(window.app, {
        renderAppointments,
        showAptAction,
        showAptDetail
    });
})();
