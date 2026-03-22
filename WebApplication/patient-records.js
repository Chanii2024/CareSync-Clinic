
/**
 * Patient Module: Health Records
 */
(function() {
    window.app = window.app || {};

    function renderRecords() {
        const mainViewContent = document.getElementById('mainViewContent');
        mainViewContent.innerHTML = `
            <div class="patient-tab-container animate-fade-in">
                <div class="records-tabs mb-2">
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
            <div class="vitals-summary-card grid-3 gap-6 mb-8 animate-slide-up">
                <!-- Vitals Card 1 -->
                <div class="card p-5 border-0 shadow-sm bg-white border-radius">
                    <div class="flex-between mb-2">
                        <span class="text-xs text-muted font-bold uppercase" style="letter-spacing: 1px;">Blood Pressure</span>
                        <div class="icon-box p-2 border-radius-full" style="background: #fff5f5; color: var(--error);"><i class="fas fa-heartbeat"></i></div>
                    </div>
                    <div class="mt-1" style="text-align: left;">
                        <h2 class="font-bold text-dark" style="font-size: 1.6rem; margin:0;">120/80</h2>
                        <span class="text-xs font-medium text-success mt-1 block" style="display: block; color: #10b981;"><i class="fas fa-check-circle"></i> Optimal level</span>
                    </div>
                </div>
                <!-- Vitals Card 2 -->
                <div class="card p-5 border-0 shadow-sm bg-white border-radius">
                    <div class="flex-between mb-2">
                        <span class="text-xs text-muted font-bold uppercase" style="letter-spacing: 1px;">Blood Group</span>
                        <div class="icon-box p-2 border-radius-full" style="background: #f0f9ff; color: var(--info);"><i class="fas fa-tint"></i></div>
                    </div>
                    <div class="mt-1" style="text-align: left;">
                        <h2 class="font-bold text-dark" style="font-size: 1.6rem; margin:0;">O+</h2>
                        <span class="text-xs font-medium text-muted mt-1 block" style="display: block;">Universal Donor</span>
                    </div>
                </div>
                <!-- Vitals Card 3 -->
                <div class="card p-5 border-0 shadow-sm bg-white border-radius">
                    <div class="flex-between mb-2">
                        <span class="text-xs text-muted font-bold uppercase" style="letter-spacing: 1px;">Allergies</span>
                        <div class="icon-box p-2 border-radius-full" style="background: #fffbeb; color: #d97706;"><i class="fas fa-allergies"></i></div>
                    </div>
                    <div class="mt-1" style="text-align: left;">
                        <h2 class="font-bold text-dark" style="font-size: 1.6rem; margin:0;">Penicillin</h2>
                        <span class="text-xs font-medium text-error mt-1 block" style="display: block; color: #ef4444;"><i class="fas fa-exclamation-triangle"></i> Severe Allergy</span>
                    </div>
                </div>
            </div>

            <div class="records-list card animate-slide-up">
                <h3>Past Visit History</h3>
                <div class="table-responsive mt-4">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Doctor</th>
                                <th>Reason</th>
                                <th>Status</th>
                                <th style="text-align: right;">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>15 Mar 2026</td>
                                <td>Dr. Rohan Silva</td>
                                <td>Cardiac Follow-up</td>
                                <td><span class="status-badge confirmed">Stable</span></td>
                                <td style="text-align: right;"><button class="btn btn-link small" onclick="window.app.showReportDetail('RPT-1033')">View Report</button></td>
                            </tr>
                            <tr>
                                <td>02 Feb 2026</td>
                                <td>Dr. Priya Sharma</td>
                                <td>Skin Allergy</td>
                                <td><span class="status-badge confirmed">Resolved</span></td>
                                <td style="text-align: right;"><button class="btn btn-link small" onclick="window.app.showReportDetail('RPT-0921')">View Report</button></td>
                            </tr>
                            <tr>
                                <td>15 Jan 2026</td>
                                <td>Dr. Amal Perera</td>
                                <td>Annual Physical</td>
                                <td><span class="status-badge confirmed">Clear</span></td>
                                <td style="text-align: right;"><button class="btn btn-link small" onclick="window.app.showReportDetail('RPT-0845')">View Report</button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function getPrescriptionHTML() {
        return `
            <div class="prescriptions-grid mt-4 grid-2 gap-4">
                <div class="prescription-card card animate-slide-up">
                    <div class="rx-header flex-between">
                        <div class="flex-center gap-4">
                            <div class="rx-icon bg-primary text-white p-3 border-radius"><i class="fas fa-file-prescription"></i></div>
                            <div>
                                <h4>Rx #98210</h4>
                                <span class="text-xs text-muted">15 Mar 2026 • Dr. Rohan Silva</span>
                                <div class="mt-2"><button class="btn btn-link small p-0" onclick="window.app.showRxDetail('RX-98210')">View Dosage Info</button></div>
                            </div>
                        </div>
                        <span class="status-badge confirmed">Dispensed</span>
                    </div>
                </div>
                <div class="prescription-card card animate-slide-up" style="animation-delay: 0.1s;">
                    <div class="rx-header flex-between">
                        <div class="flex-center gap-4">
                            <div class="rx-icon bg-secondary text-white p-3 border-radius"><i class="fas fa-history"></i></div>
                            <div>
                                <h4>Rx #85102</h4>
                                <span class="text-xs text-muted">02 Feb 2026 • Dr. Priya Sharma</span>
                                <div class="mt-2"><button class="btn btn-link small p-0" onclick="window.app.showRxDetail('RX-85102')">View Dosage Info</button></div>
                            </div>
                        </div>
                        <span class="status-badge text-muted border">Completed</span>
                    </div>
                </div>
            </div>
        `;
    }

    function showReportDetail(reportId) {
        let overlay = document.getElementById('customModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'customModalOverlay';
            overlay.className = 'custom-modal-overlay';
            document.body.appendChild(overlay);
        }
        
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0', left: '0', right: '0', bottom: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '44px 16px',
            overflowY: 'auto',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: '2000',
            opacity: '0',
            pointerEvents: 'none',
            transition: 'all 0.35s ease'
        });

        overlay.innerHTML = `
            <div class="custom-modal" style="width: 100%; max-width: 650px; border-radius: 32px; background: white; padding: 24px; box-shadow: 0 40px 80px -12px rgba(0,0,0,0.6); margin-top: auto; margin-bottom: auto; transform: translateY(40px); transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;">
                <div class="modal-header flex-between mb-4" style="align-items: flex-start; justify-content: space-between; display: flex;">
                    <h3 class="text-primary font-bold m-0" style="font-size: 1.5rem; line-height: 1.2;">Medical Report: ${reportId}</h3>
                    <button class="btn-icon" onclick="window.app.closeCustomModal()" style="background: #f1f5f9; border: none; width: 40px; height: 40px; border-radius: 12px; cursor: pointer; display: flex; align-items: center; justify-content: center;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="report-box p-4" style="background: #fdfdfd; border-radius: 20px; border: 1px solid #edf2f7;">
                        <div class="flex-between mb-6" style="gap: 16px; flex-wrap: wrap; display: flex; justify-content: space-between; align-items: center;">
                            <div>
                                <h4 class="text-dark font-bold mb-1" style="font-size: 1.1rem; color: var(--primary);">Cardiac Stress Test Results</h4>
                                <span class="text-xs text-muted">Test Protocol: Bruce Protocol (Treadmill)</span>
                            </div>
                            <div class="flex-center gap-2" style="background: #e6fffa; color: #0694a2; padding: 10px 18px; border-radius: 99px; border: 1px solid #b2f5ea; flex-shrink: 0; display: flex; align-items: center;">
                                <i class="fas fa-check-circle" style="font-size: 1rem;"></i>
                                <span style="font-size: 0.8rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px;">Normal</span>
                            </div>
                        </div>

                        <div class="grid-2 mb-6" style="display: grid; gap: 16px; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));">
                            <div class="p-5 border-radius" style="background: #f0f9ff; border: 1px solid #e0f2fe; border-radius: 16px;">
                                <span class="text-xs text-accent font-bold uppercase block mb-1" style="letter-spacing: 0.5px; opacity: 0.8; color: var(--accent); display: block;">Resting Rhythm</span>
                                <span class="text-lg text-primary font-bold block" style="font-size: 1.125rem; color: var(--primary); display: block;">Normal Sinus</span>
                            </div>
                            <div class="p-5 border-radius" style="background: #f0f9ff; border: 1px solid #e0f2fe; border-radius: 16px;">
                                <span class="text-xs text-accent font-bold uppercase block mb-1" style="letter-spacing: 0.5px; opacity: 0.8; color: var(--accent); display: block;">Peak BP</span>
                                <span class="text-lg text-primary font-bold block" style="font-size: 1.125rem; color: var(--primary); display: block;">120/80 mmHg</span>
                            </div>
                            <div class="p-5 border-radius" style="background: #f0f9ff; border: 1px solid #e0f2fe; border-radius: 16px;">
                                <span class="text-xs text-accent font-bold uppercase block mb-1" style="letter-spacing: 0.5px; opacity: 0.8; color: var(--accent); display: block;">Max Heart Rate</span>
                                <span class="text-lg text-primary font-bold block" style="font-size: 1.125rem; color: var(--primary); display: block;">165 bpm <small style="font-size: 0.75rem; opacity: 0.8;">(85% max)</small></span>
                            </div>
                            <div class="p-5 border-radius" style="background: #f0f9ff; border: 1px solid #e0f2fe; border-radius: 16px;">
                                <span class="text-xs text-accent font-bold uppercase block mb-1" style="letter-spacing: 0.5px; opacity: 0.8; color: var(--accent); display: block;">Exercise Time</span>
                                <span class="text-lg text-primary font-bold block" style="font-size: 1.125rem; color: var(--primary); display: block;">09m 30s</span>
                            </div>
                        </div>
                        
                        <div class="p-6 border-radius shadow-sm" style="background: linear-gradient(to right, #f0f9ff, #ffffff); border-left: 5px solid var(--accent); margin-top: 24px; border-radius: 12px;">
                            <div class="flex-center gap-3 mb-3" style="display: flex; align-items: center; gap: 12px;">
                                <div class="icon-box-sm bg-accent p-2 border-radius-full" style="background: #e6fffa; color: var(--accent); width: 32px; height: 32px; display: flex; align-items: center; justify-content: center; border-radius: 50%;">
                                    <i class="fas fa-user-md" style="font-size: 1rem;"></i>
                                </div>
                                <span class="text-xs text-primary font-bold uppercase" style="letter-spacing: 1.2px; color: var(--primary); font-size: 0.7rem;">Physician's Conclusion</span>
                            </div>
                            <p class="text-sm text-dark m-0" style="line-height: 1.8; font-weight: 500; color: #334155; padding-left: 4px; font-size: 0.9rem;">Normal exercise tolerance with no signs of myocardial ischemia during testing. Good functional capacity. Patient is cleared for routine non-cardiac surgery.</p>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-top: 32px; display: flex; justify-content: flex-end;">
                    <button class="btn btn-primary shadow-sm" onclick="window.app.closeCustomModal()" style="padding: 14px 40px; border-radius: 16px; font-weight: 700; background: var(--primary); color: white; border: none; cursor: pointer; transition: all 0.2s;">
                        Close Report
                    </button>
                </div>
            </div>
        `;

        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        
        // Trigger entrance animation
        setTimeout(() => {
            const modal = overlay.querySelector('.custom-modal');
            if(modal) modal.style.transform = 'translateY(0)';
        }, 10);
    }

    function showRxDetail(rxId) {
        let overlay = document.getElementById('customModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'customModalOverlay';
            overlay.className = 'custom-modal-overlay';
            document.body.appendChild(overlay);
        }
        
        Object.assign(overlay.style, {
            position: 'fixed',
            top: '0', left: '0', right: '0', bottom: '0',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '44px 16px',
            overflowY: 'auto',
            background: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(12px)',
            zIndex: '2000',
            opacity: '0',
            pointerEvents: 'none',
            transition: 'all 0.35s ease'
        });

        overlay.innerHTML = `
            <div class="custom-modal" style="width: 100%; max-width: 500px; border-radius: 32px; background: white; padding: 24px; box-shadow: 0 40px 80px -12px rgba(0,0,0,0.6); margin: auto 0; transform: translateY(40px); transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1); position: relative;">
                <div class="modal-header flex-between mb-4" style="display: flex; justify-content: space-between; align-items: center;">
                    <h3 class="text-primary font-bold m-0" style="font-size: 1.3rem;">Prescription: ${rxId}</h3>
                    <button class="btn-icon" onclick="window.app.closeCustomModal()" style="background: #f1f5f9; border: none; width: 36px; height: 36px; border-radius: 10px; cursor: pointer;">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="rx-details-list">
                        <div class="rx-item p-4 mb-3" style="background: #f8fafc; border-radius: 16px; border: 1px solid #edf2f7;">
                            <strong class="text-primary" style="display: block; font-size: 1.1rem; margin-bottom: 4px;">Atorvastatin 20mg</strong>
                            <p class="text-sm m-0" style="color: #475569;">Dosage: One tablet daily at night</p>
                            <div class="mt-2 text-xs font-bold uppercase" style="color: var(--accent); letter-spacing: 0.5px;">Quantity: 30 Tablets • Remaining: 12</div>
                        </div>
                        <div class="rx-item p-4" style="background: #f8fafc; border-radius: 16px; border: 1px solid #edf2f7;">
                            <strong class="text-primary" style="display: block; font-size: 1.1rem; margin-bottom: 4px;">Aspirin 75mg</strong>
                            <p class="text-sm m-0" style="color: #475569;">Dosage: One tablet daily after breakfast</p>
                            <div class="mt-2 text-xs font-bold uppercase" style="color: var(--accent); letter-spacing: 0.5px;">Quantity: 30 Tablets • Remaining: 05</div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer" style="margin-top: 24px; display: flex; justify-content: flex-end;">
                    <button class="btn btn-primary" onclick="window.app.closeCustomModal()" style="padding: 12px 30px; border-radius: 12px; background: var(--primary); color: white; border: none; cursor: pointer; font-weight: 700;">
                        Got it
                    </button>
                </div>
            </div>
        `;
        
        overlay.style.opacity = '1';
        overlay.style.pointerEvents = 'auto';
        
        setTimeout(() => {
            const modal = overlay.querySelector('.custom-modal');
            if(modal) modal.style.transform = 'translateY(0)';
        }, 10);
    }

    function closeCustomModal() {
        const overlay = document.getElementById('customModalOverlay');
        if (overlay) {
            const modal = overlay.querySelector('.custom-modal');
            if(modal) modal.style.transform = 'translateY(40px)';
            overlay.style.opacity = '0';
            overlay.style.pointerEvents = 'none';
            setTimeout(() => {
                // Keep it in DOM but hidden for performance, or remove if needed
            }, 350);
        }
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

    Object.assign(window.app, {
        renderRecords, switchRecordTab, showReportDetail, showRxDetail, closeCustomModal
    });
})();
