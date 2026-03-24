// Doctor Patients Directory & Timeline Logic
window.app = window.app || {};

// Mock Data for Patients and Timelines
const myPatients = [
    { id: 101, name: 'John Silva', age: 45, gender: 'Male', bloodGroup: 'O+', phone: '077 123 4567', lastVisit: '10 Mar 2026' },
    { id: 102, name: 'Nimal Perera', age: 62, gender: 'Male', bloodGroup: 'A+', phone: '071 987 6543', lastVisit: '15 Mar 2026' },
    { id: 103, name: 'Maria Fernando', age: 28, gender: 'Female', bloodGroup: 'B-', phone: '076 555 4444', lastVisit: '22 Mar 2026' },
    { id: 104, name: 'Amal Peris', age: 35, gender: 'Male', bloodGroup: 'O-', phone: '070 111 2222', lastVisit: '01 Feb 2026' },
    { id: 105, name: 'Sunil Jayawardena', age: 70, gender: 'Male', bloodGroup: 'AB+', phone: '072 333 8888', lastVisit: '18 Mar 2026' }
];

const patientTimelineData = {
    // Mock timeline events for a given patient
    events: [
        { id: 1, type: 'visit', date: '15 Mar 2026', title: 'Cardiology Follow-up', doctor: 'Dr. Tang San', details: 'Patient complains of mild chest tightness. Vitals stable.', meds: ['Amlodipine 5mg', 'Aspirin 75mg'], diagnosis: 'Ischemic Heart Disease' },
        { id: 2, type: 'lab', date: '01 Mar 2026', title: 'Lipid Profile Result', doctor: 'Lab', details: 'Total Cholesterol: 220 mg/dL (High), LDL: 150 mg/dL', meds: [], diagnosis: 'Hyperlipidemia' },
        { id: 3, type: 'visit', date: '12 Jan 2026', title: 'Initial Consultation', doctor: 'Dr. Tang San', details: 'First visit. Elevated BP 150/95. Prescribed medication.', meds: ['Amlodipine 5mg'], diagnosis: 'Essential Hypertension' },
        { id: 4, type: 'vitals', date: '12 Jan 2026', title: 'Vitals Recorded', doctor: 'Nurse', details: 'BP: 150/95, HR: 88, Temp: 37°C, Weight: 85kg', meds: [], diagnosis: '' }
    ]
};

// 1. Render the Directory List
window.app.renderDocPatients = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    
    let html = `
        <div class="patients-directory-container animate-fade-in" style="max-width: 1200px; margin: 0 auto;">
            <div class="flex-between mb-6" style="flex-wrap: wrap; gap: 15px;">
                <div>
                    <h1 style="font-size: 24px; color: var(--primary); font-weight: 700; margin-bottom: 5px;">My Patients</h1>
                    <div class="text-muted text-sm">Directory of all your registered patients.</div>
                </div>
                <div style="flex: 1; max-width: 400px; min-width: 250px;">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" id="patientSearch" placeholder="Search by name..." onkeyup="window.app.filterPatientsList()">
                    </div>
                </div>
            </div>

            <div class="card p-0" style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; min-width: 800px;" id="patientsTable">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border-color); text-align: left; background: var(--bg-main);">
                            <th class="p-4 text-muted font-bold text-sm">Patient Name</th>
                            <th class="p-4 text-muted font-bold text-sm">Age / Gender</th>
                            <th class="p-4 text-muted font-bold text-sm">Blood</th>
                            <th class="p-4 text-muted font-bold text-sm">Contact</th>
                            <th class="p-4 text-muted font-bold text-sm">Last Visit</th>
                            <th class="p-4 text-muted font-bold text-sm" style="text-align: right;">Action</th>
                        </tr>
                    </thead>
                    <tbody>
    `;

    myPatients.forEach(p => {
        html += `
                        <tr class="patient-row" style="border-bottom: 1px solid var(--border-color); transition: background 0.2s;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='transparent'">
                            <td class="p-4">
                                <div style="display: flex; align-items: center; gap: 12px;">
                                    <img src="https://ui-avatars.com/api/?name=${p.name.replace(' ', '+')}&background=e2e8f0&color=475569&rounded=true" style="width: 36px; height: 36px; border-radius: 50%;">
                                    <div>
                                        <div style="font-weight: 600; color: var(--text-main);">${p.name}</div>
                                        <div class="text-muted text-sm">ID: ${p.id}</div>
                                    </div>
                                </div>
                            </td>
                            <td class="p-4 text-sm">${p.age} yrs, ${p.gender}</td>
                            <td class="p-4">
                                <span style="background: rgba(226, 232, 240, 0.6); padding: 4px 8px; border-radius: 4px; font-weight: 600; font-size: 0.8rem; color: var(--text-main);">${p.bloodGroup}</span>
                            </td>
                            <td class="p-4 text-sm">${p.phone}</td>
                            <td class="p-4 text-sm">${p.lastVisit}</td>
                            <td class="p-4" style="text-align: right;">
                                <button class="btn btn-outline small" onclick="window.app.renderDocPatientDetail(${p.id})">View Timeline</button>
                            </td>
                        </tr>
        `;
    });

    html += `
                    </tbody>
                </table>
                <div id="noPatientsMsg" class="p-6 text-center text-muted" style="display: none;">
                    No patients found matching your search.
                </div>
            </div>
        </div>
    `;

    mainViewContent.innerHTML = html;
};

// Search filter logic for directory
window.app.filterPatientsList = function() {
    const filter = document.getElementById('patientSearch').value.toLowerCase();
    const rows = document.querySelectorAll('.patient-row');
    let visibleCount = 0;

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        if (text.includes(filter)) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';
        }
    });

    document.getElementById('noPatientsMsg').style.display = visibleCount === 0 ? 'block' : 'none';
};

// 2. Render Patient Detail (Timeline)
window.app.renderDocPatientDetail = function(patientId) {
    const mainViewContent = document.getElementById('mainViewContent');
    const p = myPatients.find(x => x.id === patientId) || myPatients[0]; // fallback
    
    let html = `
        <div class="timeline-container animate-slide-up" style="max-width: 1200px; margin: 0 auto;">
            <div class="flex-between mb-4" style="flex-wrap: wrap; gap: 10px;">
                <button class="btn btn-outline small" onclick="window.app.renderDocPatients()"><i class="fas fa-arrow-left"></i> Back to Directory</button>
                <div class="search-box" style="max-width: 300px; flex: 1;">
                    <i class="fas fa-filter"></i>
                    <input type="text" id="timelineSearch" placeholder="Filter timeline..." onkeyup="window.app.filterTimeline()">
                </div>
            </div>

            <div class="grid-2" style="grid-template-columns: 320px 1fr; gap: 20px; align-items: start;">
                
                <!-- Left Sidebar: Patient Summary -->
                <div class="card p-0" style="position: sticky; top: 20px;">
                    <div class="p-4" style="border-bottom: 1px solid var(--border-color); background: var(--bg-main); text-align: center;">
                        <img src="https://ui-avatars.com/api/?name=${p.name.replace(' ', '+')}&background=e2e8f0&color=475569&rounded=true&size=80" style="border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.05); margin-bottom: 10px;">
                        <h3 style="color: var(--text-main); font-size: 1.2rem; margin-bottom: 5px;">${p.name}</h3>
                        <div class="text-muted text-sm">Patient ID: ${p.id}</div>
                    </div>
                    <div class="p-4 text-sm" style="line-height: 1.8;">
                        <div class="flex-between"><span class="text-muted">Age:</span> <span class="font-bold">${p.age}</span></div>
                        <div class="flex-between"><span class="text-muted">Gender:</span> <span class="font-bold">${p.gender}</span></div>
                        <div class="flex-between"><span class="text-muted">Blood Group:</span> <span class="font-bold">${p.bloodGroup}</span></div>
                        <div class="flex-between"><span class="text-muted">Phone:</span> <span class="font-bold">${p.phone}</span></div>
                    </div>
                    <div class="p-4" style="border-top: 1px solid var(--border-color); background: var(--bg-main); border-radius: 0 0 8px 8px;">
                        <button class="btn btn-primary full-width" style="padding: 12px;" onclick="window.app.startConsultation(${p.id}, '${p.name.replace(/'/g, "\\'")}')">New Consultation</button>
                    </div>
                </div>

                <!-- Right Content: The Unified Timeline -->
                <div class="card p-4">
                    <h3 style="color: var(--primary); font-size: 1.2rem; margin-bottom: 20px; border-bottom: 2px solid var(--border-color); padding-bottom: 10px;">
                        <i class="fas fa-history"></i> Clinical Timeline
                    </h3>
                    
                    <div class="timeline-wrapper" style="position: relative; margin-left: 10px;">
                        <!-- Vertical line track -->
                        <div style="position: absolute; top: 0; bottom: 0; left: 6px; width: 2px; background: var(--border-color);"></div>

    `;

    patientTimelineData.events.forEach(ev => {
        let iconHtml = '';
        if(ev.type === 'visit') iconHtml = '<div style="position: absolute; left: 0px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: var(--primary); border: 2px solid #fff; box-shadow: 0 0 0 2px var(--border-color);"></div>';
        else if(ev.type === 'lab') iconHtml = '<div style="position: absolute; left: 0px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: #8b5cf6; border: 2px solid #fff; box-shadow: 0 0 0 2px var(--border-color);"></div>';
        else if(ev.type === 'vitals') iconHtml = '<div style="position: absolute; left: 0px; top: 4px; width: 14px; height: 14px; border-radius: 50%; background: #10b981; border: 2px solid #fff; box-shadow: 0 0 0 2px var(--border-color);"></div>';

        let medsHtml = '';
        if(ev.meds && ev.meds.length > 0) {
            medsHtml = `
                <div style="margin-top: 15px; padding-top: 15px; border-top: 1px dashed var(--border-color);">
                    <div class="text-sm text-muted mb-2" style="font-weight: 600;"><i class="fas fa-pills"></i> Prescribed Medications:</div>
                    <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: var(--text-main);">
                        ${ev.meds.map(m => `<li>${m}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        let diagnosisHtml = '';
        if(ev.diagnosis) {
            diagnosisHtml = `<div style="background: rgba(30, 58, 138, 0.05); color: var(--primary); border-radius: 6px; padding: 4px 10px; font-size: 0.75rem; font-weight: 700; display: inline-block; margin-bottom: 12px;">Dx: ${ev.diagnosis}</div>`;
        }

        html += `
                        <div class="timeline-event" style="position: relative; padding-left: 30px; margin-bottom: 25px;">
                            ${iconHtml}
                            <div class="text-muted text-sm font-bold mb-2" style="color: #64748b;">${ev.date} &bull; ${ev.doctor}</div>
                            <div class="card p-4" style="box-shadow: 0 1px 2px rgba(0,0,0,0.05); border: 1px solid var(--border-color);">
                                ${diagnosisHtml}
                                <div style="font-weight: 700; color: var(--text-main); font-size: 1.05rem; margin-bottom: 8px;">${ev.title}</div>
                                <div class="text-sm" style="color: var(--text-muted); line-height: 1.6;">${ev.details}</div>
                                ${medsHtml}
                            </div>
                        </div>
        `;
    });

    html += `
                    </div>
                    <div id="noEventsMsg" class="p-4 text-center text-muted" style="display: none; background: var(--bg-main); border-radius: 8px;">
                        No timeline events match your filter.
                    </div>
                </div>
            </div>
            
            <style>
                @media (max-width: 900px) {
                    .timeline-container .grid-2 { grid-template-columns: 1fr !important; }
                    .timeline-container .card[style*="sticky"] { position: relative !important; top: 0 !important; }
                }
            </style>
        </div>
    `;

    mainViewContent.innerHTML = html;
};

// Search filter logic for timeline
window.app.filterTimeline = function() {
    const filter = document.getElementById('timelineSearch').value.toLowerCase();
    const events = document.querySelectorAll('.timeline-event');
    let visibleCount = 0;

    events.forEach(ev => {
        // Look in diagnosis or details/meds
        const text = ev.innerText.toLowerCase();
        if (text.includes(filter)) {
            ev.style.display = '';
            visibleCount++;
        } else {
            ev.style.display = 'none';
        }
    });

    document.getElementById('noEventsMsg').style.display = visibleCount === 0 ? 'block' : 'none';
};
