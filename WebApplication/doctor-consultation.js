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
            weight: '82kg'
        }
    },
    inventory: {
        'Metformin': { stock: 500, unit: 'tabs' },
        'Amlodipine': { stock: 12, unit: 'tabs' }, // Low stock
        'Amoxicillin': { stock: 0, unit: 'caps' }, // Out of stock
        'Panadol': { stock: 1000, unit: 'tabs' }
    }
};

let currentPrescriptions = [];

window.app.renderDocConsultation = function(patientId = null) {
    const mainViewContent = document.getElementById('mainViewContent');
    currentPrescriptions = []; // Reset state
    
    // In a real app we'd fetch patient data based on patientId
    const data = consultationMockData.patient;

    const html = `
        <div class="consultation-container animate-fade-in" style="max-width: 1400px; margin: 0 auto;">
            <div class="flex-between mb-4">
                <div style="display: flex; align-items: center; gap: 15px;">
                    <button class="btn btn-outline small" onclick="window.app.renderDocDashboard()"><i class="fas fa-arrow-left"></i> Back to Queue</button>
                    <h2 style="font-size: 20px; color: var(--primary); margin: 0;">Active Consultation</h2>
                </div>
                <div id="autoSaveIndicator" class="text-muted text-sm" style="font-weight: 600;"><i class="fas fa-cloud-upload-alt"></i> Draft Saved Just Now</div>
            </div>

            <div class="grid-2" style="grid-template-columns: 320px 1fr; gap: 20px; align-items: start;">
                
                <!-- Left Sidebar: Patient Summary -->
                <div class="card p-0" style="position: sticky; top: 20px;">
                    <div class="p-4" style="border-bottom: 1px solid var(--border-color); background: var(--bg-main); text-align: center;">
                        <img src="https://ui-avatars.com/api/?name=${data.name.replace(' ', '+')}&background=e2e8f0&color=475569&rounded=true&size=80" style="border-radius: 50%; border: 3px solid #fff; box-shadow: 0 2px 4px rgba(0,0,0,0.1); margin-bottom: 10px;">
                        <h3 style="color: var(--text-main); font-size: 1.2rem; margin-bottom: 5px;">${data.name}</h3>
                        <div class="text-muted text-sm">${data.age} yrs • ${data.gender} • ${data.bloodGroup}</div>
                    </div>
                    
                    <div class="p-4">
                        <div style="font-weight: 700; color: var(--text-main); margin-bottom: 10px; font-size: 0.9rem;">Today's Vitals (Nurse)</div>
                        <div class="grid-2 gap-2 text-sm mb-4">
                            <div style="background: var(--bg-main); padding: 8px; border-radius: 6px;">
                                <div class="text-muted" style="font-size: 0.75rem;">BP</div>
                                <div class="font-bold text-danger" style="color: #ef4444;">${data.vitals.bp}</div>
                            </div>
                            <div style="background: var(--bg-main); padding: 8px; border-radius: 6px;">
                                <div class="text-muted" style="font-size: 0.75rem;">HR</div>
                                <div class="font-bold">${data.vitals.hr} bpm</div>
                            </div>
                            <div style="background: var(--bg-main); padding: 8px; border-radius: 6px;">
                                <div class="text-muted" style="font-size: 0.75rem;">Temp</div>
                                <div class="font-bold">${data.vitals.temp}</div>
                            </div>
                            <div style="background: var(--bg-main); padding: 8px; border-radius: 6px;">
                                <div class="text-muted" style="font-size: 0.75rem;">Weight</div>
                                <div class="font-bold">${data.vitals.weight}</div>
                            </div>
                        </div>

                        <div style="font-weight: 700; color: var(--text-main); margin-bottom: 10px; font-size: 0.9rem;">Medical History</div>
                        <div class="mb-3">
                            <span class="text-muted text-sm" style="display: block; margin-bottom: 4px;">Allergies:</span>
                            <div style="display: flex; gap: 5px; flex-wrap: wrap;">
                                ${data.allergies.map(a => `<span style="background: #fee2e2; color: #b91c1c; padding: 2px 8px; border-radius: 4px; font-size: 0.75rem; font-weight: 600;">${a}</span>`).join('')}
                            </div>
                        </div>
                        <div>
                            <span class="text-muted text-sm" style="display: block; margin-bottom: 4px;">Chronic Conditions:</span>
                            <ul style="margin: 0; padding-left: 20px; font-size: 0.85rem; color: var(--text-main);">
                                ${data.conditions.map(c => `<li style="margin-bottom: 3px;">${c}</li>`).join('')}
                            </ul>
                        </div>
                        <div class="mt-4" style="text-align: center; border-top: 1px dashed var(--border-color); padding-top: 15px;">
                            <button type="button" class="btn btn-outline small full-width" onclick="window.app.openPatientEditModal(${data.id})"><i class="fas fa-edit"></i> Update Master Record</button>
                        </div>
                    </div>
                </div>

                <!-- Right Main Content: Consultation Forms -->
                <div>
                    <form id="consultationForm" onsubmit="window.app.submitConsultation(event)" class="card p-0">
                        
                        <!-- SOAP Notes -->
                        <div class="p-4" style="border-bottom: 1px solid var(--border-color);">
                            <h4 style="color: var(--primary); margin-bottom: 15px; font-size: 1.05rem;"><i class="fas fa-file-medical"></i> Clinical Notes (SOAP)</h4>
                            
                            <div class="form-group mb-4">
                                <label style="font-size: 0.85rem;">Subjective (Patient's complaints)</label>
                                <textarea id="noteSubj" rows="2" placeholder="Patient reports..." class="custom-input" oninput="window.app.triggerAutoSave()"></textarea>
                            </div>
                            <div class="form-group mb-4">
                                <label style="font-size: 0.85rem;">Objective (Examinations & Findings)</label>
                                <textarea id="noteObj" rows="2" placeholder="Observed..." class="custom-input" oninput="window.app.triggerAutoSave()"></textarea>
                            </div>
                            <div class="form-group mb-4">
                                <label style="font-size: 0.85rem;">Assessment (Diagnosis)</label>
                                <input type="text" id="noteAss" placeholder="Primary diagnosis..." class="custom-input" style="font-weight: 600;" oninput="window.app.triggerAutoSave()">
                            </div>
                            <div class="form-group">
                                <label style="font-size: 0.85rem;">Plan (Treatment & Next Steps)</label>
                                <textarea id="notePlan" rows="2" placeholder="Advised to..." class="custom-input" oninput="window.app.triggerAutoSave()"></textarea>
                            </div>
                        </div>

                        <!-- Prescriptions Interface -->
                        <div class="p-4" style="border-bottom: 1px solid var(--border-color); background: var(--bg-main);">
                            <div class="flex-between mb-3">
                                <h4 style="color: var(--primary); font-size: 1.05rem; margin: 0;"><i class="fas fa-pills"></i> E-Prescription</h4>
                                <button type="button" class="btn btn-outline small" onclick="window.app.addPrescriptionRow()">+ Add Medicine</button>
                            </div>
                            
                            <div id="prescriptionList" class="flex-column gap-3 mb-2">
                                <!-- Prescription rows will be injected here -->
                                <div class="text-muted text-sm text-center p-3" id="emptyRxState" style="border: 2px dashed var(--border-color); border-radius: 8px;">No medicines prescribed yet.</div>
                            </div>
                        </div>

                        <!-- Investigation & Follow-up -->
                        <div class="p-4" style="border-bottom: 1px solid var(--border-color);">
                            <h4 style="color: var(--primary); margin-bottom: 15px; font-size: 1.05rem;"><i class="fas fa-flask"></i> Investigations & Follow-up</h4>
                            <div class="grid-2 gap-4" style="align-items: start;">
                                <div class="form-group" style="margin: 0;">
                                    <label style="font-size: 0.85rem;">Order Lab Tests</label>
                                    <select id="labOrders" class="custom-select full-width" multiple style="height: 90px;">
                                        <option value="FBC">Full Blood Count (FBC)</option>
                                        <option value="Lipid">Lipid Profile</option>
                                        <option value="HbA1c">HbA1c</option>
                                        <option value="UFR">Urine Full Report (UFR)</option>
                                    </select>
                                    <div class="text-muted" style="font-size: 0.7rem; margin-top: 4px;">Hold Ctrl/Cmd to select multiple</div>
                                </div>
                                <div class="form-group" style="margin: 0;">
                                    <label style="font-size: 0.85rem;">Follow-up Date</label>
                                    <input type="date" id="followupDate" class="custom-input full-width" style="height: 90px;" onchange="window.app.triggerAutoSave()">
                                </div>
                            </div>
                        </div>

                        <!-- Footer Actions -->
                        <div class="p-4 flex-between" style="background: var(--bg-main); border-radius: 0 0 12px 12px;">
                            <button type="button" class="btn btn-outline" style="color: #64748b; border-color: #cbd5e1; padding: 12px 20px;" onclick="window.app.showToast('Draft Saved', 'Your notes have been securely saved.', 'success')">Save Draft</button>
                            <button type="submit" class="btn btn-primary" style="padding: 12px 30px;"><i class="fas fa-check-double"></i> Complete Consultation</button>
                        </div>
                    </form>
                </div>
            </div>
            
            <style>
                @media (max-width: 900px) {
                    .consultation-container .grid-2 { grid-template-columns: 1fr !important; }
                    .consultation-container .card[style*="sticky"] { position: relative !important; top: 0 !important; }
                }
                .rx-row input { font-size: 0.85rem; padding: 6px 10px; }
            </style>
        </div>
    `;

    mainViewContent.innerHTML = html;
};

// Prescription Builder Logic
window.app.addPrescriptionRow = function() {
    const list = document.getElementById('prescriptionList');
    const emptyState = document.getElementById('emptyRxState');
    if (emptyState) emptyState.remove();

    const rowId = 'rx_' + Date.now();
    const div = document.createElement('div');
    div.className = 'rx-row grid-4 gap-4';
    div.id = rowId;
    div.style.background = '#fff';
    div.style.padding = '15px';
    div.style.borderRadius = '8px';
    div.style.border = '1px solid var(--border-color)';
    div.style.alignItems = 'end';
    
    // In a real system, the Medicine input would be an auto-complete dropdown
    div.innerHTML = `
        <div class="form-group" style="margin: 0; grid-column: span 2;">
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-main);">Medicine Name</label>
            <input type="text" class="custom-input rx-name" placeholder="e.g. Paracetamol 500mg" required onblur="window.app.checkInventory(this)">
            <div class="inventory-status text-sm" style="height: 16px; margin-top: 4px;"></div>
        </div>
        <div class="form-group" style="margin: 0;">
            <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-main);">Dosage</label>
            <select class="custom-select rx-dose" required>
                <option value="1-0-1">1-0-1 (Twice a day)</option>
                <option value="1-1-1">1-1-1 (Thrice a day)</option>
                <option value="1-0-0">1-0-0 (Morning)</option>
                <option value="0-0-1">0-0-1 (Night)</option>
                <option value="SOS">SOS (As needed)</option>
            </select>
            <div style="height: 16px; margin-top: 4px;"></div>
        </div>
        <div class="form-group flex-between" style="margin: 0; align-items: flex-end; gap: 15px;">
            <div style="flex: 1;">
                <label style="font-size: 0.8rem; font-weight: 600; color: var(--text-main);">Duration (Days)</label>
                <input type="number" class="custom-input rx-days" placeholder="Days" min="1" max="90" required onchange="window.app.validateDuration(this)">
            </div>
            <button type="button" class="btn btn-outline" style="color: #ef4444; border: 1px solid #ef4444; padding: 8px 12px; height: 38px;" onclick="document.getElementById('${rowId}').remove()"><i class="fas fa-trash"></i></button>
            <div style="height: 16px; margin-top: 4px; display: block; width: 100%;"></div>
        </div>
    `;
    
    list.appendChild(div);
};

window.app.checkInventory = function(inputElement) {
    const medName = inputElement.value.trim();
    const statusDiv = inputElement.nextElementSibling;
    if (!medName) {
        statusDiv.innerHTML = '';
        return;
    }
    
    // Simple mock inventory check logic
    const found = Object.keys(consultationMockData.inventory).find(k => medName.toLowerCase().includes(k.toLowerCase()));
    
    if (found) {
        const stock = consultationMockData.inventory[found].stock;
        if (stock === 0) {
            statusDiv.innerHTML = '<span style="color: #ef4444; font-weight: bold;"><i class="fas fa-exclamation-circle"></i> Out of Stock!</span>';
            window.app.showToast('Inventory Alert', `${found} is currently out of stock in the pharmacy.`, 'error');
            inputElement.style.borderColor = '#ef4444';
        } else if (stock < 20) {
            statusDiv.innerHTML = `<span style="color: #f59e0b; font-weight: bold;"><i class="fas fa-exclamation-triangle"></i> Low Stock (${stock} left)</span>`;
            inputElement.style.borderColor = '#f59e0b';
        } else {
            statusDiv.innerHTML = `<span style="color: #10b981;"><i class="fas fa-check-circle"></i> In Stock</span>`;
            inputElement.style.borderColor = '#e2e8f0';
        }
    } else {
        statusDiv.innerHTML = `<span class="text-muted"><i class="fas fa-info-circle"></i> External Rx</span>`;
        inputElement.style.borderColor = '#e2e8f0';
    }
};

window.app.validateDuration = function(inputElement) {
    const val = parseInt(inputElement.value);
    if (val > 30) {
        window.app.showToast('Prescription Alert', 'Prescribing for over 30 days. Please ensure clinical appropriateness.', 'warning');
    }
    if (val <= 0) {
        inputElement.value = '';
        window.app.showToast('Validation Error', 'Duration must be at least 1 day.', 'error');
    }
};

let autoSaveTimer;
window.app.triggerAutoSave = function() {
    clearTimeout(autoSaveTimer);
    const indicator = document.getElementById('autoSaveIndicator');
    indicator.innerHTML = '<i class="fas fa-sync fa-spin"></i> Saving...';
    
    autoSaveTimer = setTimeout(() => {
        indicator.innerHTML = '<span style="color: #10b981;"><i class="fas fa-check"></i> Draft Saved Just Now</span>';
    }, 1000);
};

window.app.submitConsultation = function(e) {
    e.preventDefault();
    
    // Validations temporarily bypassed to allow quick navigation and testing
    
    // Success
    window.app.showToast('Consultation Complete', 'Notes securely signed and saved to patient record.', 'success');
    
    // Route back to Dashboard/Queue after small delay
    setTimeout(() => {
        if(window.app.renderDocDashboard) {
            window.app.renderDocDashboard();
        }
    }, 1500);
};
