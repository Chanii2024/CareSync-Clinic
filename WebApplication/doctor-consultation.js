// Doctor Consultation Interface Logic
window.app = window.app || {};

// Mock Data for the Consultation View
const consultationMockData = {
    patient: {
        id: 102,
        name: 'Nimal Perera',
        age: 62,
        gender: 'Male',
        bloodGroup: 'O+',
        allergies: ['Penicillin', 'Peanuts'],
        conditions: ['Type 2 Diabetes', 'Hypertension'],
        vitals: {
            bp: '145/90',
            hr: 88,
            temp: '37.2°C',
            weight: '82kg',
            spo2: '97%'
        },
        lastVisit: '12 Mar 2026',
        appointmentTime: '10:30 AM',
        appointmentType: 'Follow-up'
    },
    inventory: {
        'Metformin': { stock: 500, unit: 'tabs' },
        'Amlodipine': { stock: 12, unit: 'tabs' },
        'Amoxicillin': { stock: 0, unit: 'caps' },
        'Panadol': { stock: 1000, unit: 'tabs' }
    }
};

let currentPrescriptions = [];
let autoSaveTimer;

window.app.renderDocConsultation = function (patientId = null) {
    const mainViewContent = document.getElementById('mainViewContent');
    currentPrescriptions = [];

    const data = consultationMockData.patient;
    const initials = data.name.split(' ').map(n => n[0]).join('');

    const html = `
        <style>
            /* ---- Consultation Page Scoped Styles ---- */
            .consult-root {
                max-width: 1380px;
                margin: 0 auto;
                font-family: var(--font-family);
            }

            /* Page Header Bar */
            .consult-topbar {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-bottom: 24px;
                flex-wrap: wrap;
                gap: 12px;
            }
            .consult-topbar-left {
                display: flex;
                align-items: center;
                gap: 14px;
            }
            .consult-back-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 9px 18px;
                border: 1.5px solid var(--border-color);
                border-radius: 10px;
                background: #fff;
                color: var(--text-muted);
                font-size: 0.88rem;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.2s;
                text-decoration: none;
            }
            .consult-back-btn:hover {
                border-color: var(--primary);
                color: var(--primary);
                background: #f0f4ff;
            }
            .consult-title-block h2 {
                font-size: 1.25rem;
                font-weight: 800;
                color: var(--primary);
                margin: 0;
                line-height: 1.2;
            }
            .consult-title-block p {
                font-size: 0.8rem;
                color: var(--text-muted);
                margin: 0;
                font-weight: 500;
            }
            .consult-save-badge {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 7px 14px;
                border-radius: 8px;
                background: #f0fdf4;
                color: #15803d;
                font-size: 0.8rem;
                font-weight: 600;
                border: 1px solid #bbf7d0;
                transition: all 0.3s;
            }
            .consult-save-badge.saving {
                background: #fefce8;
                color: #92400e;
                border-color: #fef08a;
            }

            /* Layout */
            .consult-layout {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 22px;
                align-items: start;
            }
            @media (max-width: 960px) {
                .consult-layout { grid-template-columns: 1fr; }
                .consult-sidebar { position: static !important; }
            }

            /* ---- SIDEBAR ---- */
            .consult-sidebar {
                position: sticky;
                top: 20px;
                display: flex;
                flex-direction: column;
                gap: 16px;
            }

            /* Patient card at top of sidebar */
            .patient-hero-card {
                background: var(--gradient-premium, linear-gradient(135deg, #1a365d, #2d3748));
                border-radius: 16px;
                padding: 24px;
                color: white;
                text-align: center;
                position: relative;
                overflow: hidden;
            }
            .patient-hero-card::before {
                content: '';
                position: absolute;
                top: -40px; right: -40px;
                width: 130px; height: 130px;
                border-radius: 50%;
                background: rgba(32, 201, 151, 0.15);
            }
            .patient-hero-card::after {
                content: '';
                position: absolute;
                bottom: -20px; left: -20px;
                width: 90px; height: 90px;
                border-radius: 50%;
                background: rgba(32, 201, 151, 0.10);
            }
            .patient-avatar-ring {
                width: 72px;
                height: 72px;
                border-radius: 50%;
                background: rgba(255,255,255,0.15);
                border: 3px solid rgba(32, 201, 151, 0.7);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;
                font-weight: 800;
                color: white;
                margin: 0 auto 12px;
                position: relative;
                z-index: 1;
            }
            .patient-hero-name {
                font-size: 1.1rem;
                font-weight: 800;
                margin-bottom: 4px;
                position: relative;
                z-index: 1;
            }
            .patient-hero-meta {
                font-size: 0.78rem;
                opacity: 0.75;
                margin-bottom: 16px;
                position: relative;
                z-index: 1;
            }
            .patient-hero-tags {
                display: flex;
                justify-content: center;
                gap: 8px;
                flex-wrap: wrap;
                position: relative;
                z-index: 1;
            }
            .hero-tag {
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 0.72rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.04em;
            }
            .hero-tag.type { background: rgba(32,201,151,0.25); color: #6ee7b7; }
            .hero-tag.time { background: rgba(255,255,255,0.15); color: rgba(255,255,255,0.9); }

            /* Info card within sidebar */
            .sidebar-card {
                background: #fff;
                border: 1px solid var(--border-color);
                border-radius: 14px;
                padding: 20px;
                box-shadow: 0 2px 8px rgba(0,0,0,0.04);
            }
            .sidebar-card-title {
                font-size: 0.75rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.08em;
                color: var(--text-muted);
                margin-bottom: 14px;
                display: flex;
                align-items: center;
                gap: 7px;
            }
            .sidebar-card-title i { color: var(--accent); font-size: 0.85rem; }

            /* Vitals grid */
            .vitals-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 10px;
            }
            .vital-chip {
                background: var(--bg-main);
                border-radius: 10px;
                padding: 10px 12px;
                border: 1px solid var(--border-color);
                transition: border-color 0.2s;
            }
            .vital-chip:hover { border-color: #cbd5e1; }
            .vital-chip .label {
                font-size: 0.68rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: var(--text-muted);
                margin-bottom: 4px;
            }
            .vital-chip .value {
                font-size: 1rem;
                font-weight: 800;
                color: var(--primary);
            }
            .vital-chip .value.danger { color: #dc2626; }
            .vital-chip .value.warning { color: #d97706; }

            /* Allergy & condition tags */
            .allergy-tag {
                display: inline-flex;
                align-items: center;
                gap: 5px;
                padding: 4px 10px;
                border-radius: 6px;
                font-size: 0.75rem;
                font-weight: 700;
                background: #fef2f2;
                color: #b91c1c;
                border: 1px solid #fecaca;
            }
            .condition-item {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 7px 0;
                border-bottom: 1px dashed var(--border-color);
                font-size: 0.85rem;
                color: var(--text-main);
                font-weight: 500;
            }
            .condition-item:last-child { border-bottom: none; }
            .condition-dot {
                width: 7px; height: 7px;
                border-radius: 50%;
                background: var(--accent);
                flex-shrink: 0;
            }

            /* ---- MAIN CONTENT ---- */
            .consult-main {
                display: flex;
                flex-direction: column;
                gap: 18px;
            }

            /* Section card */
            .consult-section {
                background: #fff;
                border: 1px solid var(--border-color);
                border-radius: 16px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.04);
                overflow: hidden;
                transition: box-shadow 0.2s;
            }
            .consult-section:hover { box-shadow: 0 4px 18px rgba(0,0,0,0.07); }
            .section-header {
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 18px 22px;
                border-bottom: 1px solid var(--border-color);
                background: linear-gradient(to right, #f8fafc, #fff);
            }
            .section-header-left {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .section-icon {
                width: 36px; height: 36px;
                border-radius: 10px;
                display: inline-flex;
                align-items: center;
                justify-content: center;
                font-size: 0.85rem;
                flex-shrink: 0;
            }
            .section-icon.teal { background: rgba(32,201,151,0.12); color: var(--accent); }
            .section-icon.blue { background: rgba(26,54,93,0.10); color: var(--primary); }
            .section-icon.purple { background: rgba(124,58,237,0.10); color: #7c3aed; }
            .section-title {
                font-size: 0.98rem;
                font-weight: 800;
                color: var(--primary);
                margin: 0;
            }
            .section-subtitle {
                font-size: 0.75rem;
                color: var(--text-muted);
                margin: 0;
                font-weight: 500;
            }
            .section-body { padding: 22px; }

            /* SOAP Tabs */
            .soap-tabs {
                display: flex;
                gap: 4px;
                background: var(--bg-main);
                border-radius: 10px;
                padding: 4px;
                margin-bottom: 20px;
            }
            .soap-tab {
                flex: 1;
                padding: 8px 12px;
                border-radius: 7px;
                border: none;
                background: transparent;
                font-family: inherit;
                font-size: 0.82rem;
                font-weight: 600;
                color: var(--text-muted);
                cursor: pointer;
                transition: all 0.2s;
                text-align: center;
            }
            .soap-tab:hover { color: var(--primary); background: rgba(26,54,93,0.05); }
            .soap-tab.active {
                background: #fff;
                color: var(--primary);
                box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            }
            .soap-tab .tab-letter {
                display: block;
                font-size: 1rem;
                font-weight: 900;
                color: var(--accent);
                line-height: 1;
                margin-bottom: 2px;
            }
            .soap-panel { display: none; }
            .soap-panel.active { display: block; animation: fadeIn 0.25s ease; }

            /* Form fields */
            .consult-label {
                display: block;
                font-size: 0.8rem;
                font-weight: 700;
                color: var(--text-main);
                margin-bottom: 7px;
                text-transform: uppercase;
                letter-spacing: 0.04em;
            }
            .consult-textarea {
                width: 100%;
                border: 1.5px solid var(--border-color);
                border-radius: 10px;
                padding: 12px 14px;
                font-family: inherit;
                font-size: 0.92rem;
                color: var(--text-main);
                background: var(--bg-main);
                resize: vertical;
                min-height: 90px;
                transition: all 0.2s;
                line-height: 1.6;
            }
            .consult-textarea:hover { background: #fff; border-color: #cbd5e1; }
            .consult-textarea:focus {
                outline: none;
                border-color: var(--accent);
                background: #fff;
                box-shadow: 0 0 0 3px rgba(32,201,151,0.12);
            }
            .consult-input {
                width: 100%;
                border: 1.5px solid var(--border-color);
                border-radius: 10px;
                padding: 12px 14px;
                font-family: inherit;
                font-size: 0.95rem;
                font-weight: 600;
                color: var(--text-main);
                background: var(--bg-main);
                transition: all 0.2s;
            }
            .consult-input:hover { background: #fff; border-color: #cbd5e1; }
            .consult-input:focus {
                outline: none;
                border-color: var(--accent);
                background: #fff;
                box-shadow: 0 0 0 3px rgba(32,201,151,0.12);
            }
            .consult-select {
                width: 100%;
                border: 1.5px solid var(--border-color);
                border-radius: 10px;
                padding: 10px 14px;
                font-family: inherit;
                font-size: 0.88rem;
                font-weight: 600;
                color: var(--text-main);
                background: var(--bg-main);
                cursor: pointer;
                transition: all 0.2s;
                appearance: none;
            }
            .consult-select:focus {
                outline: none;
                border-color: var(--accent);
                box-shadow: 0 0 0 3px rgba(32,201,151,0.12);
                background: #fff;
            }

            /* ---- Prescription rows ---- */
            .rx-empty-state {
                border: 2px dashed var(--border-color);
                border-radius: 12px;
                padding: 30px;
                text-align: center;
                color: var(--text-muted);
                font-size: 0.88rem;
                font-weight: 500;
            }
            .rx-empty-state i { font-size: 1.6rem; margin-bottom: 8px; display: block; opacity: 0.4; }

            .rx-row {
                display: grid;
                grid-template-columns: 2fr 1fr 1fr auto;
                gap: 12px;
                align-items: end;
                background: var(--bg-main);
                border: 1.5px solid var(--border-color);
                border-radius: 12px;
                padding: 14px 16px;
                transition: border-color 0.2s, box-shadow 0.2s;
                animation: fadeIn 0.2s ease;
            }
            .rx-row:hover { border-color: #cbd5e1; box-shadow: 0 2px 8px rgba(0,0,0,0.05); }
            @media (max-width: 768px) {
                .rx-row { grid-template-columns: 1fr 1fr; }
                .rx-row > *:first-child { grid-column: span 2; }
            }
            .rx-field-label {
                font-size: 0.72rem;
                font-weight: 700;
                text-transform: uppercase;
                letter-spacing: 0.06em;
                color: var(--text-muted);
                margin-bottom: 5px;
            }
            .inv-status { height: 18px; margin-top: 5px; font-size: 0.78rem; font-weight: 600; }

            /* Delete row button */
            .rx-delete-btn {
                width: 36px; height: 36px;
                border-radius: 8px;
                border: 1.5px solid #fecaca;
                background: #fff;
                color: #dc2626;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.85rem;
                flex-shrink: 0;
            }
            .rx-delete-btn:hover { background: #fef2f2; border-color: #dc2626; }

            /* Lab-order checkboxes */
            .lab-options {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 8px;
            }
            .lab-option {
                display: flex;
                align-items: center;
                gap: 8px;
                padding: 10px 14px;
                border: 1.5px solid var(--border-color);
                border-radius: 9px;
                cursor: pointer;
                transition: all 0.2s;
                font-size: 0.85rem;
                font-weight: 500;
                color: var(--text-main);
                background: var(--bg-main);
            }
            .lab-option:hover { border-color: var(--accent); background: #f0fdf9; }
            .lab-option input[type=checkbox] { display: none; }
            .lab-check {
                width: 18px; height: 18px;
                border-radius: 5px;
                border: 2px solid var(--border-color);
                flex-shrink: 0;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.2s;
                font-size: 0.7rem;
                color: transparent;
                background: transparent;
            }
            .lab-option.checked { border-color: var(--accent); background: #f0fdf9; }
            .lab-option.checked .lab-check {
                background: var(--accent);
                border-color: var(--accent);
                color: white;
            }

            /* Footer actions */
            .consult-footer {
                display: flex;
                align-items: center;
                justify-content: space-between;
                gap: 12px;
                padding: 18px 22px;
                background: #f8fafc;
                border-top: 1px solid var(--border-color);
                border-radius: 0 0 16px 16px;
                flex-wrap: wrap;
            }
            .btn-draft {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 11px 22px;
                border: 1.5px solid var(--border-color);
                border-radius: 10px;
                background: #fff;
                color: var(--text-muted);
                font-family: inherit;
                font-size: 0.88rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-draft:hover { border-color: var(--primary); color: var(--primary); background: #f0f4ff; }
            .btn-complete {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 12px 28px;
                border: none;
                border-radius: 10px;
                background: linear-gradient(135deg, var(--accent), #1ab387);
                color: white;
                font-family: inherit;
                font-size: 0.95rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
                box-shadow: 0 4px 14px rgba(32,201,151,0.35);
            }
            .btn-complete:hover {
                transform: translateY(-1px);
                box-shadow: 0 6px 20px rgba(32,201,151,0.45);
            }
            .btn-complete:active { transform: translateY(0); }
            .btn-add-rx {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 9px 16px;
                border: 1.5px dashed var(--accent);
                border-radius: 9px;
                background: rgba(32,201,151,0.06);
                color: var(--accent);
                font-family: inherit;
                font-size: 0.85rem;
                font-weight: 700;
                cursor: pointer;
                transition: all 0.2s;
            }
            .btn-add-rx:hover { background: rgba(32,201,151,0.13); border-style: solid; }

            @keyframes fadeIn {
                from { opacity: 0; transform: translateY(6px); }
                to { opacity: 1; transform: translateY(0); }
            }
        </style>

        <div class="consult-root animate-fade-in">

            <!-- ===== TOP BAR ===== -->
            <div class="consult-topbar">
                <div class="consult-topbar-left">
                    <button class="consult-back-btn" onclick="window.app.renderDocDashboard()">
                        <i class="fas fa-arrow-left"></i> Queue
                    </button>
                    <div class="consult-title-block">
                        <h2><i class="fas fa-stethoscope" style="color:var(--accent);margin-right:7px;font-size:1rem;"></i>Active Consultation</h2>
                        <p>Session started &bull; ${data.appointmentTime} &bull; ${data.appointmentType}</p>
                    </div>
                </div>
                <div id="autoSaveIndicator" class="consult-save-badge">
                    <i class="fas fa-cloud-upload-alt"></i> Draft Saved Just Now
                </div>
            </div>

            <!-- ===== MAIN LAYOUT ===== -->
            <div class="consult-layout">

                <!-- ===== SIDEBAR ===== -->
                <div class="consult-sidebar">

                    <!-- Patient Hero Card -->
                    <div class="patient-hero-card">
                        <div class="patient-avatar-ring">${initials}</div>
                        <div class="patient-hero-name">${data.name}</div>
                        <div class="patient-hero-meta">${data.age} yrs &bull; ${data.gender} &bull; ${data.bloodGroup}</div>
                        <div class="patient-hero-tags">
                            <span class="hero-tag type"><i class="fas fa-clock" style="font-size:0.65rem;"></i> ${data.appointmentTime}</span>
                            <span class="hero-tag time">${data.appointmentType}</span>
                        </div>
                    </div>

                    <!-- Vitals -->
                    <div class="sidebar-card">
                        <div class="sidebar-card-title">
                            <i class="fas fa-heartbeat"></i> Today's Vitals
                        </div>
                        <div class="vitals-grid">
                            <div class="vital-chip">
                                <div class="label">Blood Pressure</div>
                                <div class="value danger">${data.vitals.bp}</div>
                            </div>
                            <div class="vital-chip">
                                <div class="label">Heart Rate</div>
                                <div class="value">${data.vitals.hr} <span style="font-size:0.7rem;font-weight:600;color:var(--text-muted)">bpm</span></div>
                            </div>
                            <div class="vital-chip">
                                <div class="label">Temperature</div>
                                <div class="value">${data.vitals.temp}</div>
                            </div>
                            <div class="vital-chip">
                                <div class="label">Weight</div>
                                <div class="value">${data.vitals.weight}</div>
                            </div>
                            <div class="vital-chip" style="grid-column:span 2;">
                                <div class="label">SpO₂ (Oxygen Saturaton)</div>
                                <div class="value" style="color:#2563eb;">${data.vitals.spo2} <span style="font-size:0.7rem;font-weight:600;color:var(--text-muted)">saturation</span></div>
                            </div>
                        </div>
                    </div>

                    <!-- Medical History -->
                    <div class="sidebar-card">
                        <div class="sidebar-card-title">
                            <i class="fas fa-file-medical-alt"></i> Medical History
                        </div>

                        <div style="margin-bottom:14px;">
                            <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:8px;">Allergies</div>
                            <div style="display:flex;gap:6px;flex-wrap:wrap;">
                                ${data.allergies.map(a => `<span class="allergy-tag"><i class="fas fa-exclamation-triangle" style="font-size:0.65rem;"></i>${a}</span>`).join('')}
                            </div>
                        </div>

                        <div>
                            <div style="font-size:0.72rem;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--text-muted);margin-bottom:8px;">Chronic Conditions</div>
                            ${data.conditions.map(c => `
                                <div class="condition-item">
                                    <span class="condition-dot"></span>
                                    ${c}
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Quick Info -->
                    <div class="sidebar-card">
                        <div class="sidebar-card-title">
                            <i class="fas fa-calendar-alt"></i> Visit Info
                        </div>
                        <div style="display:flex;flex-direction:column;gap:10px;font-size:0.85rem;">
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:var(--text-muted);font-weight:500;">Patient ID</span>
                                <span style="font-weight:700;color:var(--primary);">#PT-${String(data.id).padStart(4, '0')}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:var(--text-muted);font-weight:500;">Last Visit</span>
                                <span style="font-weight:600;">${data.lastVisit}</span>
                            </div>
                            <div style="display:flex;justify-content:space-between;">
                                <span style="color:var(--text-muted);font-weight:500;">Type</span>
                                <span style="font-weight:600;">${data.appointmentType}</span>
                            </div>
                        </div>
                    </div>

                </div>
                <!-- END SIDEBAR -->


                <!-- ===== MAIN CONTENT ===== -->
                <form id="consultationForm" onsubmit="window.app.submitConsultation(event)" class="consult-main">

                    <!-- SOAP NOTES SECTION -->
                    <div class="consult-section">
                        <div class="section-header">
                            <div class="section-header-left">
                                <span class="section-icon teal"><i class="fas fa-file-medical"></i></span>
                                <div>
                                    <div class="section-title">Clinical Notes (SOAP)</div>
                                    <div class="section-subtitle">Structured clinical documentation</div>
                                </div>
                            </div>
                        </div>
                        <div class="section-body">
                            <!-- SOAP Tab Nav -->
                            <div class="soap-tabs">
                                <button type="button" class="soap-tab active" onclick="window.app.switchSoapTab('S',this)">
                                    <span class="tab-letter">S</span>Subjective
                                </button>
                                <button type="button" class="soap-tab" onclick="window.app.switchSoapTab('O',this)">
                                    <span class="tab-letter">O</span>Objective
                                </button>
                                <button type="button" class="soap-tab" onclick="window.app.switchSoapTab('A',this)">
                                    <span class="tab-letter">A</span>Assessment
                                </button>
                                <button type="button" class="soap-tab" onclick="window.app.switchSoapTab('P',this)">
                                    <span class="tab-letter">P</span>Plan
                                </button>
                            </div>

                            <!-- S Panel -->
                            <div class="soap-panel active" id="soap-S">
                                <label class="consult-label">Subjective — Patient's Chief Complaints</label>
                                <textarea id="noteSubj" class="consult-textarea" rows="4"
                                    placeholder="e.g. Patient complains of persistent headache and dizziness for 3 days..."
                                    oninput="window.app.triggerAutoSave()"></textarea>
                            </div>
                            <!-- O Panel -->
                            <div class="soap-panel" id="soap-O">
                                <label class="consult-label">Objective — Clinical Findings & Examinations</label>
                                <textarea id="noteObj" class="consult-textarea" rows="4"
                                    placeholder="e.g. BP elevated at 145/90. Lungs clear. No edema observed..."
                                    oninput="window.app.triggerAutoSave()"></textarea>
                            </div>
                            <!-- A Panel -->
                            <div class="soap-panel" id="soap-A">
                                <label class="consult-label">Assessment — Primary Diagnosis</label>
                                <input type="text" id="noteAss" class="consult-input"
                                    placeholder="e.g. Hypertensive urgency with poorly controlled Type 2 Diabetes..."
                                    oninput="window.app.triggerAutoSave()" style="font-weight:700;" />
                                <div style="font-size:0.78rem;color:var(--text-muted);margin-top:6px;"><i class="fas fa-info-circle" style="margin-right:4px;"></i>This field is <strong>required</strong> to complete the consultation.</div>
                            </div>
                            <!-- P Panel -->
                            <div class="soap-panel" id="soap-P">
                                <label class="consult-label">Plan — Treatment & Next Steps</label>
                                <textarea id="notePlan" class="consult-textarea" rows="4"
                                    placeholder="e.g. Adjusted Metformin dosage. Advised low-sodium diet. Lab tests ordered. Follow-up in 4 weeks..."
                                    oninput="window.app.triggerAutoSave()"></textarea>
                            </div>
                        </div>
                    </div>

                    <!-- E-PRESCRIPTION SECTION -->
                    <div class="consult-section">
                        <div class="section-header">
                            <div class="section-header-left">
                                <span class="section-icon blue"><i class="fas fa-pills"></i></span>
                                <div>
                                    <div class="section-title">E-Prescription</div>
                                    <div class="section-subtitle">Pharmacy linked — real-time stock check</div>
                                </div>
                            </div>
                            <button type="button" class="btn-add-rx" onclick="window.app.addPrescriptionRow()">
                                <i class="fas fa-plus"></i> Add Medicine
                            </button>
                        </div>
                        <div class="section-body">
                            <div id="prescriptionList" style="display:flex;flex-direction:column;gap:10px;">
                                <div class="rx-empty-state" id="emptyRxState">
                                    <i class="fas fa-prescription-bottle-alt"></i>
                                    No medicines prescribed yet.<br>
                                    <span style="font-size:0.8rem;">Click <strong>Add Medicine</strong> to start prescribing.</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- INVESTIGATIONS & FOLLOW-UP SECTION -->
                    <div class="consult-section">
                        <div class="section-header">
                            <div class="section-header-left">
                                <span class="section-icon purple"><i class="fas fa-flask"></i></span>
                                <div>
                                    <div class="section-title">Investigations & Follow-up</div>
                                    <div class="section-subtitle">Lab orders and next appointment</div>
                                </div>
                            </div>
                        </div>
                        <div class="section-body">
                            <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;align-items:start;">
                                <div>
                                    <label class="consult-label" style="margin-bottom:10px;">Order Lab Tests</label>
                                    <div class="lab-options" id="labOptions">
                                        ${[
            { val: 'FBC', label: 'Full Blood Count (FBC)', icon: 'fa-vials' },
            { val: 'Lipid', label: 'Lipid Profile', icon: 'fa-heartbeat' },
            { val: 'HbA1c', label: 'HbA1c', icon: 'fa-tint' },
            { val: 'UFR', label: 'Urine Full Report', icon: 'fa-flask' },
            { val: 'CRP', label: 'CRP / ESR', icon: 'fa-microscope' },
            { val: 'LFT', label: 'Liver Function Test', icon: 'fa-notes-medical' },
        ].map(t => `
                                            <div class="lab-option" onclick="window.app.toggleLabTest(this, '${t.val}')" data-val="${t.val}">
                                                <input type="checkbox" value="${t.val}" id="lab_${t.val}">
                                                <span class="lab-check"><i class="fas fa-check" style="font-size:.65rem;"></i></span>
                                                <span>${t.label}</span>
                                            </div>
                                        `).join('')}
                                    </div>
                                </div>
                                <div>
                                    <label class="consult-label" style="margin-bottom:10px;">Follow-up Appointment</label>
                                    <input type="date" id="followupDate" class="consult-input"
                                        onchange="window.app.triggerAutoSave()" style="margin-bottom:12px;" />
                                    <div style="background:var(--bg-main);border-radius:10px;padding:14px;border:1px solid var(--border-color);font-size:0.82rem;color:var(--text-muted);">
                                        <i class="fas fa-info-circle" style="margin-right:5px;color:var(--accent);"></i>
                                        A follow-up reminder will be automatically sent to the patient 24 hrs before the appointment.
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Footer -->
                        <div class="consult-footer">
                            <button type="button" class="btn-draft" onclick="window.app.showToast('Draft Saved','All notes have been securely auto-saved.','success')">
                                <i class="fas fa-save"></i> Save Draft
                            </button>
                            <div style="display:flex;align-items:center;gap:10px;">
                                <span style="font-size:0.78rem;color:var(--text-muted);font-weight:500;">
                                    <i class="fas fa-lock" style="margin-right:4px;"></i>Digitally signed on submit
                                </span>
                                <button type="submit" class="btn-complete">
                                    <i class="fas fa-check-double"></i> Complete Consultation
                                </button>
                            </div>
                        </div>
                    </div>

                </form>
                <!-- END MAIN CONTENT -->

            </div>
        </div>
    `;

    mainViewContent.innerHTML = html;
};

// ---- SOAP Tab Switcher ----
window.app.switchSoapTab = function (key, btn) {
    document.querySelectorAll('.soap-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.soap-panel').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('soap-' + key).classList.add('active');
};

// ---- Lab Test Toggle ----
window.app.toggleLabTest = function (el, val) {
    el.classList.toggle('checked');
    const cb = el.querySelector('input[type=checkbox]');
    cb.checked = el.classList.contains('checked');
};

// ---- Prescription Builder Logic ----
window.app.addPrescriptionRow = function () {
    const list = document.getElementById('prescriptionList');
    const emptyState = document.getElementById('emptyRxState');
    if (emptyState) emptyState.remove();

    const rowId = 'rx_' + Date.now();
    const div = document.createElement('div');
    div.className = 'rx-row';
    div.id = rowId;

    div.innerHTML = `
        <div>
            <div class="rx-field-label">Medicine Name</div>
            <input type="text" class="consult-input rx-name" placeholder="e.g. Metformin 500mg" required
                onblur="window.app.checkInventory(this)" />
            <div class="inv-status"></div>
        </div>
        <div>
            <div class="rx-field-label">Dosage Schedule</div>
            <select class="consult-select rx-dose" required>
                <option value="1-0-1">1-0-1 (Twice daily)</option>
                <option value="1-1-1">1-1-1 (Three times)</option>
                <option value="1-0-0">1-0-0 (Morning only)</option>
                <option value="0-0-1">0-0-1 (Night only)</option>
                <option value="SOS">SOS (As needed)</option>
            </select>
        </div>
        <div>
            <div class="rx-field-label">Duration (Days)</div>
            <input type="number" class="consult-input rx-days" placeholder="e.g. 14" min="1" max="90" required
                onchange="window.app.validateDuration(this)" />
        </div>
        <button type="button" class="rx-delete-btn" onclick="document.getElementById('${rowId}').remove()"
            title="Remove">
            <i class="fas fa-trash-alt"></i>
        </button>
    `;

    list.appendChild(div);
};

// ---- Inventory Check ----
window.app.checkInventory = function (inputElement) {
    const medName = inputElement.value.trim();
    const statusDiv = inputElement.nextElementSibling;
    if (!medName) { statusDiv.innerHTML = ''; return; }

    const found = Object.keys(consultationMockData.inventory).find(k =>
        medName.toLowerCase().includes(k.toLowerCase())
    );

    if (found) {
        const stock = consultationMockData.inventory[found].stock;
        if (stock === 0) {
            statusDiv.innerHTML = '<span style="color:#dc2626;"><i class="fas fa-exclamation-circle"></i> Out of Stock</span>';
            window.app.showToast('Inventory Alert', `${found} is currently out of stock.`, 'error');
            inputElement.style.borderColor = '#dc2626';
        } else if (stock < 20) {
            statusDiv.innerHTML = `<span style="color:#d97706;"><i class="fas fa-exclamation-triangle"></i> Low Stock (${stock} left)</span>`;
            inputElement.style.borderColor = '#d97706';
        } else {
            statusDiv.innerHTML = '<span style="color:#16a34a;"><i class="fas fa-check-circle"></i> In Stock</span>';
            inputElement.style.borderColor = '';
        }
    } else {
        statusDiv.innerHTML = '<span style="color:var(--text-muted);"><i class="fas fa-info-circle"></i> External Rx</span>';
        inputElement.style.borderColor = '';
    }
};

// ---- Duration Validation ----
window.app.validateDuration = function (inputElement) {
    const val = parseInt(inputElement.value);
    if (val > 30) {
        window.app.showToast('Prescription Alert', 'Prescribing for over 30 days. Please ensure clinical appropriateness.', 'warning');
    }
    if (val <= 0 || isNaN(val)) {
        inputElement.value = '';
        window.app.showToast('Validation Error', 'Duration must be at least 1 day.', 'error');
    }
};

// ---- Auto Save ----
window.app.triggerAutoSave = function () {
    clearTimeout(autoSaveTimer);
    const indicator = document.getElementById('autoSaveIndicator');
    if (!indicator) return;
    indicator.className = 'consult-save-badge saving';
    indicator.innerHTML = '<i class="fas fa-sync fa-spin"></i> Saving...';

    autoSaveTimer = setTimeout(() => {
        indicator.className = 'consult-save-badge';
        indicator.innerHTML = '<i class="fas fa-check-circle"></i> Draft Saved Just Now';
    }, 1000);
};

// ---- Submit Consultation ----
window.app.submitConsultation = function (e) {
    e.preventDefault();

    const assessment = document.getElementById('noteAss').value.trim();
    if (!assessment) {
        window.app.showToast('Validation Error', 'Please enter a Primary Diagnosis in the Assessment (A) tab.', 'error');
        window.app.switchSoapTab('A', document.querySelector('.soap-tab:nth-child(3)'));
        document.getElementById('noteAss').focus();
        return;
    }

    const rxRows = document.querySelectorAll('.rx-row');
    let hasRxError = false;
    rxRows.forEach(row => {
        const name = row.querySelector('.rx-name')?.value;
        const days = row.querySelector('.rx-days')?.value;
        if (!name || !days) hasRxError = true;
    });
    if (hasRxError) {
        window.app.showToast('Validation Error', 'Please complete all fields for added prescriptions.', 'error');
        return;
    }

    const fuDate = document.getElementById('followupDate').value;
    if (fuDate) {
        const selected = new Date(fuDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selected <= today) {
            window.app.showToast('Date Error', 'Follow-up date must be a future date.', 'error');
            return;
        }
    }

    window.app.showToast('Consultation Complete', 'Notes securely signed and saved to patient record.', 'success');
    setTimeout(() => {
        if (window.app.renderDocDashboard) window.app.renderDocDashboard();
    }, 1500);
};