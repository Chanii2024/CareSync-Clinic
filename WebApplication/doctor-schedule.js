// Doctor Schedule Logic
window.app = window.app || {};

let scheduleData = {
    total: 24,
    checkedIn: 8,
    completed: 6,
    waiting: 4,
    remaining: 10,
    appointments: [
        { time: '09:00', patient: 'John Silva', type: 'General Checkup', status: 'Completed', statusClass: 'text-muted' },
        { time: '09:20', patient: 'Nimal Perera', type: 'Diabetes Review', status: 'In Progress', statusClass: 'text-primary' },
        { time: '09:40', patient: 'Maria Fernando', type: 'Follow Up', status: 'Waiting', statusClass: 'text-warning' },
        { time: '10:00', patient: 'Amal Peris', type: 'Blood Pressure', status: 'Scheduled', statusClass: '' }
    ],
    blockedTimes: [
        { time: '12:00 – 13:00', reason: 'Lunch Break' },
        { time: '10:00 – 12:00', reason: 'Surgery' }
    ],
    leaves: [
        { date: '10 Jul – 15 Jul', reason: 'Medical Conference' }
    ],
    availability: {
        days: 'Monday – Friday',
        time: '09:00 – 17:00'
    }
};

window.app.renderDocSchedule = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    mainViewContent.innerHTML = `
        <div class="doctor-schedule-container" style="max-width: 1200px; margin: 0 auto;">
            <div class="flex-between mb-6">
                <h1 style="font-size: 24px; color: var(--primary); font-weight: 700;">Schedule Management</h1>
            </div>

            <!-- Availability -->
            <div class="card glass-card">
                <div class="flex-between" style="flex-wrap: wrap; gap: 15px;">
                    <div>
                        <div style="font-weight: 700; font-size: 1.1rem; color: var(--primary); margin-bottom: 4px;">My Availability</div>
                        <div class="subtitle text-muted" style="margin-bottom: 15px;">Manage your weekly consulting hours</div>
                        <button class="btn btn-primary small" onclick="window.app.openEditScheduleModal()">
                            <i class="fas fa-edit"></i> Edit Schedule
                        </button>
                    </div>
                    <div style="text-align: right; background: var(--bg-main); padding: 15px; border-radius: 12px; min-width: 200px;">
                        <div style="font-weight: 600; color: var(--primary);"><i class="far fa-calendar-alt"></i> ${scheduleData.availability.days}</div>
                        <div class="text-muted mt-2"><i class="far fa-clock"></i> ${scheduleData.availability.time}</div>
                    </div>
                </div>
            </div>

            <div class="grid-2">
                <!-- Queue Overview -->
                <div class="card outline-card">
                    <div style="font-weight: 700; color: var(--primary); margin-bottom: 15px;">Patient Queue Overview</div>
                    <div class="grid-2 gap-4 text-sm p-4" style="background: var(--bg-main); border-radius: 12px;">
                        <div class="font-bold full-width" style="color: var(--primary);">Total Appointments Today: ${scheduleData.total}</div>
                        <div><i class="fas fa-user-check green"></i> Checked In: ${scheduleData.checkedIn}</div>
                        <div><i class="fas fa-check-circle text-muted"></i> Completed: ${scheduleData.completed}</div>
                        <div><i class="fas fa-hourglass-half orange"></i> Waiting: ${scheduleData.waiting}</div>
                        <div><i class="fas fa-users" style="color: var(--primary);"></i> Remaining: ${scheduleData.remaining}</div>
                    </div>
                </div>

                <!-- Blocked Times -->
                <div class="card outline-card">
                    <div class="flex-between mb-4">
                        <div style="font-weight: 700; color: var(--primary);">Blocked Times</div>
                        <button class="btn btn-outline small" onclick="window.app.openBlockTimeModal()">+ Block Time</button>
                    </div>
                    <div style="display: flex; flex-direction: column; gap: 15px;">
                        ${scheduleData.blockedTimes.map(b => `
                            <div class="flex-between" style="background: var(--bg-main); border-radius: 10px; padding: 16px 20px;">
                                <span class="font-bold text-sm">${b.time}</span>
                                <span class="text-sm text-muted">${b.reason}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <div class="grid-2 mt-2" style="grid-template-columns: 2fr 1fr;">
                <!-- Today's Appointments -->
                <div class="card full-width-mobile" style="overflow-x: auto;">
                    <div style="font-weight: 700; color: var(--primary); margin-bottom: 20px;">Today's Appointments</div>
                    <table style="width: 100%; border-collapse: collapse; min-width: 500px;">
                        <thead>
                            <tr style="border-bottom: 1px solid var(--border-color); text-align: left; color: var(--text-muted); font-size: 0.85rem;">
                                <th class="pb-2">Time</th>
                                <th class="pb-2">Patient</th>
                                <th class="pb-2">Visit Type</th>
                                <th class="pb-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${scheduleData.appointments.map(a => `
                                <tr style="border-bottom: 1px solid #f1f5f9;">
                                    <td class="py-3 font-bold text-sm" style="color: var(--primary);">${a.time}</td>
                                    <td class="py-3 text-sm font-bold">${a.patient}</td>
                                    <td class="py-3 text-sm text-muted">${a.type}</td>
                                    <td class="py-3 text-sm font-bold ${a.statusClass}">${a.status}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>

                <!-- Leave Manager -->
                <div class="card full-width-mobile outline-card">
                    <div class="flex-between mb-4">
                        <div style="font-weight: 700; color: var(--primary);">Leave Manager</div>
                        <button class="btn btn-accent small" onclick="window.app.openAddLeaveModal()">+ Add Leave</button>
                    </div>
                    <div class="flex-column gap-4">
                        ${scheduleData.leaves.map(l => `
                            <div class="p-4" style="background: var(--bg-main); border-radius: 12px; border: 1px dashed var(--border-color);">
                                <div class="font-bold" style="color: var(--primary);"><i class="fas fa-calendar-times orange"></i> ${l.date}</div>
                                <div class="text-sm text-muted mt-1">${l.reason}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <style>
                @media (max-width: 768px) {
                    .grid-2 { grid-template-columns: 1fr !important; }
                    .full-width-mobile { grid-column: 1 / -1 !important; }
                }
                .text-primary { color: var(--primary) !important; }
                .text-warning { color: #f59e0b !important; }
                .text-muted { color: var(--text-muted) !important; }
                .pb-2 { padding-bottom: 8px !important; }
            </style>
        </div>

        <!-- Modals Container -->
        <div id="scheduleModalsContainer"></div>
    `;
};

// --- Modals and Validations ---

window.app.openEditScheduleModal = function() {
    const container = document.getElementById('scheduleModalsContainer');
    container.innerHTML = `
        <div class="auth-overlay active" style="display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);">
            <div class="login-card animate-slide-up" style="max-width: 500px; width: 90%;">
                <button class="modal-close" onclick="document.getElementById('scheduleModalsContainer').innerHTML=''"><i class="fas fa-times"></i></button>
                <h3 style="color: var(--primary); margin-bottom: 20px;">Edit Availability</h3>
                <form id="editScheduleForm" onsubmit="window.app.submitEditSchedule(event)">
                    <div class="form-group mb-4">
                        <label>Working Days</label>
                        <select id="schDays" class="custom-select">
                            <option value="Monday – Friday">Monday – Friday</option>
                            <option value="Mon, Wed, Fri">Mon, Wed, Fri</option>
                            <option value="Weekends Only">Weekends Only</option>
                            <option value="Everyday">Everyday</option>
                        </select>
                    </div>
                    <div class="grid-2 gap-4 mb-4">
                        <div class="form-group">
                            <label>Start Time</label>
                            <input type="time" id="schStart" required>
                        </div>
                        <div class="form-group">
                            <label>End Time</label>
                            <input type="time" id="schEnd" required>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary full-width mt-4">Save Schedule</button>
                </form>
            </div>
        </div>
    `;
};

window.app.submitEditSchedule = function(e) {
    e.preventDefault();
    const start = document.getElementById('schStart').value;
    const end = document.getElementById('schEnd').value;
    
    if (!start || !end) {
        window.app.showToast('Validation Error', 'Please select both start and end times.', 'error');
        return;
    }
    
    // Time validation (start < end)
    const [startH, startM] = start.split(':').map(Number);
    const [endH, endM] = end.split(':').map(Number);
    if (startH > endH || (startH === endH && startM >= endM)) {
        window.app.showToast('Logic Error', 'End time cannot be before or same as start time.', 'error');
        return;
    }
    
    scheduleData.availability.days = document.getElementById('schDays').value;
    scheduleData.availability.time = Math.round(startH) + ':' + (startM < 10 ? '0'+startM : startM) + ' – ' + Math.round(endH) + ':' + (endM < 10 ? '0'+endM : endM);
    
    document.getElementById('scheduleModalsContainer').innerHTML='';
    window.app.showToast('Schedule Updated', 'Your availability has been saved.', 'success');
    window.app.renderDocSchedule();
};

window.app.openBlockTimeModal = function() {
    const container = document.getElementById('scheduleModalsContainer');
    container.innerHTML = `
        <div class="auth-overlay active" style="display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);">
            <div class="login-card animate-slide-up" style="max-width: 500px; width: 90%;">
                <button class="modal-close" onclick="document.getElementById('scheduleModalsContainer').innerHTML=''"><i class="fas fa-times"></i></button>
                <h3 style="color: var(--primary); margin-bottom: 20px;">Block Time Slot</h3>
                <form id="blockTimeForm" onsubmit="window.app.submitBlockTime(event)">
                    <div class="grid-2 gap-4 mb-4">
                        <div class="form-group">
                            <label>Start Time</label>
                            <input type="time" id="blkStart" required>
                        </div>
                        <div class="form-group">
                            <label>End Time</label>
                            <input type="time" id="blkEnd" required>
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label>Reason</label>
                        <input type="text" id="blkReason" placeholder="e.g. Surgery, Break" required minlength="3" maxlength="30">
                    </div>
                    <button type="submit" class="btn btn-outline full-width mt-4" style="border-color: #ef4444; color: #ef4444;">Confirm Block</button>
                </form>
            </div>
        </div>
    `;
};

window.app.submitBlockTime = function(e) {
    e.preventDefault();
    const start = document.getElementById('blkStart').value;
    const end = document.getElementById('blkEnd').value;
    const reason = document.getElementById('blkReason').value.trim();
    
    if (!start || !end || !reason) {
        window.app.showToast('Validation Error', 'Fill all fields correctly.', 'error');
        return;
    }
    
    const [sH, sM] = start.split(':').map(Number);
    const [eH, eM] = end.split(':').map(Number);
    if (sH > eH || (sH === eH && sM >= eM)) {
        window.app.showToast('Time Error', 'End time must be after start time.', 'warning');
        return;
    }
    
    scheduleData.blockedTimes.push({ time: `${start} – ${end}`, reason: reason });
    
    document.getElementById('scheduleModalsContainer').innerHTML='';
    window.app.showToast('Time Blocked', `${start} to ${end} is now blocked in your calendar.`, 'success');
    window.app.renderDocSchedule();
};

window.app.openAddLeaveModal = function() {
    const container = document.getElementById('scheduleModalsContainer');
    container.innerHTML = `
        <div class="auth-overlay active" style="display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);">
            <div class="login-card animate-slide-up" style="max-width: 500px; width: 90%;">
                <button class="modal-close" onclick="document.getElementById('scheduleModalsContainer').innerHTML=''"><i class="fas fa-times"></i></button>
                <h3 style="color: var(--primary); margin-bottom: 20px;">Request/Add Leave</h3>
                <form id="leaveForm" onsubmit="window.app.submitAddLeave(event)">
                    <div class="grid-2 gap-4 mb-4">
                        <div class="form-group">
                            <label>From Date</label>
                            <input type="date" id="lvStart" required>
                        </div>
                        <div class="form-group">
                            <label>To Date</label>
                            <input type="date" id="lvEnd" required>
                        </div>
                    </div>
                    <div class="form-group mb-4">
                        <label>Reason</label>
                        <input type="text" id="lvReason" placeholder="e.g. Medical Conference, Vacation" required minlength="5">
                    </div>
                    <button type="submit" class="btn btn-accent full-width mt-4">Add Leave</button>
                </form>
            </div>
        </div>
    `;
};

window.app.submitAddLeave = function(e) {
    e.preventDefault();
    const start = document.getElementById('lvStart').value;
    const end = document.getElementById('lvEnd').value;
    const reason = document.getElementById('lvReason').value.trim();
    
    if (!start || !end || !reason) {
        window.app.showToast('Validation Error', 'Please complete the form.', 'error');
        return;
    }
    
    const d1 = new Date(start);
    const d2 = new Date(end);
    if (d1 > d2) {
        window.app.showToast('Date Error', 'To Date must be equal or after From Date.', 'error');
        return;
    }
    
    const fmt = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: 'short' });
    const formattedDate = d1.getTime() === d2.getTime() ? fmt.format(d1) : `${fmt.format(d1)} - ${fmt.format(d2)}`;
    
    scheduleData.leaves.push({ date: formattedDate, reason: reason });
    
    document.getElementById('scheduleModalsContainer').innerHTML='';
    window.app.showToast('Leave Added', 'Your leave request has been logged successfully.', 'success');
    window.app.renderDocSchedule();
};
