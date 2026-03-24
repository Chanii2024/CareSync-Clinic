// Doctor Lab Results Management Logic
window.app = window.app || {};

const labResultsData = [
    { id: 'LR001', patient: 'Nimal Perera', age: 62, test: 'Full Blood Count (FBC)', orderedDate: '20 Mar 2026', status: 'Pending', results: null },
    { id: 'LR002', patient: 'John Silva', age: 45, test: 'Lipid Profile', orderedDate: '18 Mar 2026', status: 'Ready', results: [
        { name: 'Total Cholesterol', value: '220', unit: 'mg/dL', ref: '< 200', flag: 'H' },
        { name: 'LDL Cholesterol', value: '150', unit: 'mg/dL', ref: '< 130', flag: 'H' },
        { name: 'HDL Cholesterol', value: '42', unit: 'mg/dL', ref: '> 40', flag: '' },
        { name: 'Triglycerides', value: '180', unit: 'mg/dL', ref: '< 150', flag: 'H' },
        { name: 'VLDL', value: '36', unit: 'mg/dL', ref: '5 - 40', flag: '' }
    ] },
    { id: 'LR003', patient: 'Maria Fernando', age: 28, test: 'HbA1c', orderedDate: '15 Mar 2026', status: 'Ready', results: [
        { name: 'HbA1c', value: '5.4', unit: '%', ref: '4.0 - 5.6', flag: '' },
        { name: 'Estimated Avg. Glucose', value: '108', unit: 'mg/dL', ref: '68 - 118', flag: '' }
    ] },
    { id: 'LR004', patient: 'Sunil Jayawardena', age: 70, test: 'Urine Full Report (UFR)', orderedDate: '22 Mar 2026', status: 'Pending', results: null },
    { id: 'LR005', patient: 'Amal Peris', age: 35, test: 'Full Blood Count (FBC)', orderedDate: '10 Mar 2026', status: 'Reviewed', results: [
        { name: 'WBC', value: '7.2', unit: 'x10⁹/L', ref: '4.0 - 11.0', flag: '' },
        { name: 'RBC', value: '4.8', unit: 'x10¹²/L', ref: '4.5 - 5.5', flag: '' },
        { name: 'Hemoglobin', value: '14.2', unit: 'g/dL', ref: '13.5 - 17.5', flag: '' },
        { name: 'Hematocrit', value: '42', unit: '%', ref: '38 - 50', flag: '' },
        { name: 'Platelets', value: '250', unit: 'x10⁹/L', ref: '150 - 400', flag: '' },
        { name: 'MCV', value: '88', unit: 'fL', ref: '80 - 100', flag: '' },
        { name: 'MCH', value: '29.5', unit: 'pg', ref: '27 - 33', flag: '' }
    ] }
];

window.app.renderDocLabs = function() {
    const mainViewContent = document.getElementById('mainViewContent');

    const pending = labResultsData.filter(l => l.status === 'Pending').length;
    const ready = labResultsData.filter(l => l.status === 'Ready').length;
    const reviewed = labResultsData.filter(l => l.status === 'Reviewed').length;

    let html = `
        <div class="labs-container animate-fade-in" style="max-width: 1200px; margin: 0 auto;">
            <div class="flex-between mb-6" style="flex-wrap: wrap; gap: 15px;">
                <div>
                    <h1 style="font-size: 24px; color: var(--primary); font-weight: 700; margin-bottom: 5px;">Lab Results</h1>
                    <div class="text-muted text-sm">Track and review patient investigation reports.</div>
                </div>
                <div style="display: flex; gap: 15px; flex-wrap: wrap;">
                    <div class="card" style="padding: 12px 20px; text-align: center; min-width: 100px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${pending}</div>
                        <div class="text-muted text-sm">Pending</div>
                    </div>
                    <div class="card" style="padding: 12px 20px; text-align: center; min-width: 100px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${ready}</div>
                        <div class="text-muted text-sm">Ready</div>
                    </div>
                    <div class="card" style="padding: 12px 20px; text-align: center; min-width: 100px;">
                        <div style="font-size: 1.5rem; font-weight: 700; color: var(--text-main);">${reviewed}</div>
                        <div class="text-muted text-sm">Reviewed</div>
                    </div>
                </div>
            </div>

            <!-- Filter Tabs -->
            <div style="display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 25px;">
                <button class="btn btn-primary small lab-filter-btn active" onclick="window.app.filterLabs('all', this)">All</button>
                <button class="btn btn-outline small lab-filter-btn" onclick="window.app.filterLabs('Pending', this)">Pending</button>
                <button class="btn btn-outline small lab-filter-btn" onclick="window.app.filterLabs('Ready', this)">Ready to Review</button>
                <button class="btn btn-outline small lab-filter-btn" onclick="window.app.filterLabs('Reviewed', this)">Reviewed</button>
            </div>

            <!-- Lab Results Table -->
            <div class="card p-0" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; min-width: 700px;" id="labsTable">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border-color); text-align: left; background: var(--bg-main);">
                            <th class="p-4 text-muted font-bold text-sm">Lab ID</th>
                            <th class="p-4 text-muted font-bold text-sm">Patient</th>
                            <th class="p-4 text-muted font-bold text-sm">Test</th>
                            <th class="p-4 text-muted font-bold text-sm">Ordered</th>
                            <th class="p-4 text-muted font-bold text-sm">Status</th>
                            <th class="p-4 text-muted font-bold text-sm" style="text-align: right;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    labResultsData.forEach(lab => {
        let statusBadge = '';
        if (lab.status === 'Pending') statusBadge = '<span style="background: rgba(245, 158, 11, 0.12); color: #d97706; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;"><i class="fas fa-hourglass-half"></i> Pending</span>';
        else if (lab.status === 'Ready') statusBadge = '<span style="background: rgba(59, 130, 246, 0.12); color: #2563eb; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;"><i class="fas fa-flask"></i> Ready</span>';
        else statusBadge = '<span style="background: rgba(16, 185, 129, 0.12); color: #059669; padding: 4px 10px; border-radius: 20px; font-size: 0.75rem; font-weight: 700;"><i class="fas fa-check-circle"></i> Reviewed</span>';

        let actionBtn = '';
        if (lab.status === 'Ready') {
            actionBtn = `<button class="btn btn-primary small" onclick="window.app.viewLabResult('${lab.id}')">Review Now</button>`;
        } else if (lab.status === 'Reviewed') {
            actionBtn = `<button class="btn btn-outline small" onclick="window.app.viewLabResult('${lab.id}')">View Report</button>`;
        } else {
            actionBtn = `<span class="text-muted text-sm">Awaiting Lab</span>`;
        }

        html += `
                        <tr class="lab-row" data-status="${lab.status}" style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                            <td class="p-4 text-sm font-bold" style="color: var(--primary);">${lab.id}</td>
                            <td class="p-4">
                                <div style="display: flex; align-items: center; gap: 10px;">
                                    <img src="https://ui-avatars.com/api/?name=${lab.patient.replace(' ', '+')}&background=e2e8f0&color=475569&rounded=true" style="width: 32px; height: 32px; border-radius: 50%;">
                                    <div>
                                        <div style="font-weight: 600; color: var(--text-main); font-size: 0.9rem;">${lab.patient}</div>
                                        <div class="text-muted" style="font-size: 0.75rem;">${lab.age} yrs</div>
                                    </div>
                                </div>
                            </td>
                            <td class="p-4 text-sm">${lab.test}</td>
                            <td class="p-4 text-sm text-muted">${lab.orderedDate}</td>
                            <td class="p-4">${statusBadge}</td>
                            <td class="p-4" style="text-align: right;">${actionBtn}</td>
                        </tr>
        `;
    });

    html += `
                    </tbody>
                </table>
                <div id="noLabsMsg" class="p-6 text-center text-muted" style="display: none;">No lab results match this filter.</div>
            </div>
        </div>
    `;

    mainViewContent.innerHTML = html;
};

// Filter tabs logic
window.app.filterLabs = function(status, btnEl) {
    const rows = document.querySelectorAll('.lab-row');
    let visibleCount = 0;

    rows.forEach(row => {
        if (status === 'all' || row.dataset.status === status) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    document.getElementById('noLabsMsg').style.display = visibleCount === 0 ? 'block' : 'none';

    // Update active tab styling
    document.querySelectorAll('.lab-filter-btn').forEach(btn => {
        btn.className = 'btn btn-outline small lab-filter-btn';
    });
    btnEl.className = 'btn btn-primary small lab-filter-btn active';
};

// View Lab Result Modal — Clinical Lab Sheet Template
window.app.viewLabResult = function(labId) {
    const lab = labResultsData.find(l => l.id === labId);
    if (!lab || !lab.results) {
        window.app.showToast('No Results', 'Lab results are not yet available for this test.', 'warning');
        return;
    }

    let tableRows = '';
    lab.results.forEach(r => {
        let flagHtml = '';
        if (r.flag === 'H') flagHtml = '<span style="color: #ef4444; font-weight: 700; font-size: 0.75rem;">HIGH</span>';
        else if (r.flag === 'L') flagHtml = '<span style="color: #3b82f6; font-weight: 700; font-size: 0.75rem;">LOW</span>';
        else flagHtml = '<span style="color: #10b981; font-size: 0.75rem;">Normal</span>';

        tableRows += `
            <tr style="border-bottom: 1px solid var(--border-color);">
                <td style="padding: 10px 12px; font-weight: 600; color: var(--text-main); font-size: 0.85rem;">${r.name}</td>
                <td style="padding: 10px 12px; font-weight: 700; color: var(--text-main); font-size: 0.9rem; text-align: right;">${r.value} <span class="text-muted" style="font-weight: 400; font-size: 0.8rem;">${r.unit}</span></td>
                <td style="padding: 10px 12px; color: var(--text-muted); font-size: 0.8rem; text-align: center;">${r.ref}</td>
                <td style="padding: 10px 12px; text-align: center;">${flagHtml}</td>
            </tr>
        `;
    });

    const modalContainer = document.createElement('div');
    modalContainer.id = 'labResultModal';
    modalContainer.innerHTML = `
        <div class="auth-overlay active" style="display: flex; align-items: center; justify-content: center; background: rgba(15, 23, 42, 0.6); backdrop-filter: blur(4px);">
            <div class="login-card animate-slide-up" style="max-width: 650px; width: 95%;">
                <button class="modal-close" onclick="document.getElementById('labResultModal').remove()"><i class="fas fa-times"></i></button>
                
                <!-- Report Header -->
                <div style="text-align: center; margin-bottom: 20px; padding-bottom: 15px; border-bottom: 2px solid var(--primary);">
                    <div style="font-size: 0.8rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 5px;">Laboratory Report</div>
                    <h3 style="color: var(--primary); font-size: 1.3rem; margin-bottom: 10px;">${lab.test}</h3>
                    <div style="display: flex; justify-content: center; gap: 25px; font-size: 0.8rem; color: var(--text-muted);">
                        <span><strong>Patient:</strong> ${lab.patient}</span>
                        <span><strong>Age:</strong> ${lab.age} yrs</span>
                        <span><strong>Date:</strong> ${lab.orderedDate}</span>
                    </div>
                </div>

                <!-- Results Table -->
                <div style="border: 1px solid var(--border-color); border-radius: 8px; overflow: hidden; margin-bottom: 20px;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: var(--bg-main); border-bottom: 2px solid var(--border-color);">
                                <th style="padding: 10px 12px; text-align: left; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Test</th>
                                <th style="padding: 10px 12px; text-align: right; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Result</th>
                                <th style="padding: 10px 12px; text-align: center; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Reference</th>
                                <th style="padding: 10px 12px; text-align: center; font-size: 0.75rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px;">Flag</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${tableRows}
                        </tbody>
                    </table>
                </div>

                <div style="display: flex; gap: 10px;">
                    ${lab.status === 'Ready' ? `<button class="btn btn-primary full-width" onclick="window.app.markLabReviewed('${lab.id}')"><i class="fas fa-check"></i> Mark as Reviewed</button>` : ''}
                    <button class="btn btn-outline full-width" onclick="document.getElementById('labResultModal').remove()">Close</button>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modalContainer);
};

// Mark as Reviewed
window.app.markLabReviewed = function(labId) {
    const lab = labResultsData.find(l => l.id === labId);
    if (lab) {
        lab.status = 'Reviewed';
        document.getElementById('labResultModal').remove();
        window.app.showToast('Lab Reviewed', `${lab.test} for ${lab.patient} has been marked as reviewed.`, 'success');
        window.app.renderDocLabs(); // Re-render to reflect state change
    }
};
