/**
 * CareSync Receptionist Module
 * Implements the premium Receptionist Dashboard
 */

window.app = window.app || {};

window.app.renderRecDashboard = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    mainViewContent.innerHTML = `
        <div class="rec-dashboard animate-fade-in">
            <!-- Top Hero Banner -->
            <div class="glass-card p-6 mb-6" style="background: var(--gradient-premium); color: white; border: none; overflow: hidden; position: relative;">
                <div style="position: relative; z-index: 2;">
                    <h2 style="font-size: 1.8rem; font-weight: 800; margin-bottom: 8px;">Good Morning, Front Desk! 👋</h2>
                    <p style="opacity: 0.9; max-width: 600px;">Here’s what’s happening at CareSync Clinic today. 3 doctors are currently active, and there are 42 expected patient arrivals.</p>
                </div>
                <!-- Decorative background elements -->
                <i class="fas fa-hospital" style="position: absolute; right: -20px; top: -20px; font-size: 15rem; opacity: 0.05; transform: rotate(-15deg);"></i>
                <div style="position: absolute; right: 40px; top: 50%; transform: translateY(-50%); z-index: 2;" class="flex gap-4">
                    <button class="btn btn-accent" onclick="window.app.recModals.openWalkIn()">
                        <i class="fas fa-user-plus"></i> Walk-in Intake
                    </button>
                </div>
            </div>

            <!-- Core Stats -->
            <div class="stats-grid grid-4 mb-6">
                <div class="stat-card card animate-slide-up" style="animation-delay: 0.1s; border-top: 4px solid var(--accent); padding: 24px;">
                    <i class="fas fa-users" style="font-size: 1.5rem; color: var(--accent); background: rgba(32, 201, 151, 0.1); padding: 12px; border-radius: 12px; margin-bottom: 16px; display: inline-block;"></i>
                    <div class="stat-info">
                        <span class="label" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">Today's Appointments</span>
                        <span class="value" style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">42 <small style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">/ 50 Booked</small></span>
                    </div>
                </div>
                <div class="stat-card card animate-slide-up" style="animation-delay: 0.2s; border-top: 4px solid #3b82f6; padding: 24px;">
                    <i class="fas fa-user-check" style="font-size: 1.5rem; color: #3b82f6; background: rgba(59, 130, 246, 0.1); padding: 12px; border-radius: 12px; margin-bottom: 16px; display: inline-block;"></i>
                    <div class="stat-info">
                        <span class="label" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">Checked In</span>
                        <span class="value" style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">18</span>
                    </div>
                </div>
                <div class="stat-card card animate-slide-up" style="animation-delay: 0.3s; border-top: 4px solid #f59e0b; padding: 24px;">
                    <i class="fas fa-clock" style="font-size: 1.5rem; color: #f59e0b; background: rgba(245, 158, 11, 0.1); padding: 12px; border-radius: 12px; margin-bottom: 16px; display: inline-block;"></i>
                    <div class="stat-info">
                        <span class="label" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">Avg. Wait Time</span>
                        <span class="value" style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">14 <small style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">mins</small></span>
                    </div>
                </div>
                <div class="stat-card card animate-slide-up" style="animation-delay: 0.4s; border-top: 4px solid #8b5cf6; padding: 24px;">
                    <i class="fas fa-user-md" style="font-size: 1.5rem; color: #8b5cf6; background: rgba(139, 92, 246, 0.1); padding: 12px; border-radius: 12px; margin-bottom: 16px; display: inline-block;"></i>
                    <div class="stat-info">
                        <span class="label" style="display: block; font-size: 0.9rem; font-weight: 600; color: var(--text-muted); margin-bottom: 4px;">Active Doctors</span>
                        <span class="value" style="font-size: 1.8rem; font-weight: 800; color: var(--primary);">3 <small style="font-size: 0.85rem; color: var(--text-muted); font-weight: 500;">On Duty</small></span>
                    </div>
                </div>
            </div>

            <div class="grid-3 gap-6 animate-slide-up" style="animation-delay: 0.5s;">
                <!-- Left Column: Ongoing Queue -->
                <div class="col-span-2" style="grid-column: span 2;">
                    <div class="card" style="height: 100%; border-radius: var(--radius-lg);">
                        <div class="flex-between mb-4">
                            <h3 style="font-weight: 800; color: var(--primary); font-size: 1.2rem;"><i class="fas fa-list-ol mr-2" style="color: var(--accent);"></i> Live Waiting Room</h3>
                            <button class="btn btn-outline small" onclick="window.app.switchView('rec-appointments')">View All</button>
                        </div>
                        
                        <div class="table-responsive">
                            <table class="data-table" style="width: 100%; border-collapse: collapse;">
                                <thead>
                                    <tr style="border-bottom: 1px solid var(--border-color); text-align: left;">
                                        <th style="padding: 12px 16px; color: var(--text-muted); font-weight: 600;">Patient ID</th>
                                        <th style="padding: 12px 16px; color: var(--text-muted); font-weight: 600;">Name</th>
                                        <th style="padding: 12px 16px; color: var(--text-muted); font-weight: 600;">Doctor</th>
                                        <th style="padding: 12px 16px; color: var(--text-muted); font-weight: 600;">Time</th>
                                        <th style="padding: 12px 16px; color: var(--text-muted); font-weight: 600;">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style="border-bottom: 1px solid var(--border-color); transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="window.app.recModals.openDetails('PT-1042', 'Kamal P.', 'Dr. Rohan S.', '09:00 AM', 'Consulting')">
                                        <td style="padding: 16px; font-family: monospace; font-weight: 600;">#PT-1042</td>
                                        <td style="padding: 16px;">
                                            <div class="flex" style="align-items: center; gap: 12px;">
                                                <img src="https://ui-avatars.com/api/?name=Kamal+Perera&background=e2e8f0&color=primary" style="width: 32px; border-radius: 50%;">
                                                <strong style="color: var(--primary);">Kamal P.</strong>
                                            </div>
                                        </td>
                                        <td style="padding: 16px; color: var(--text-muted); font-weight: 500;">Dr. Rohan S.</td>
                                        <td style="padding: 16px; font-weight: 600;">09:00 AM</td>
                                        <td style="padding: 16px;"><span class="badge" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; padding: 4px 10px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;">Consulting</span></td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid var(--border-color); transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="window.app.recModals.openDetails('PT-1043', 'Nimali F.', 'Dr. Rohan S.', '09:30 AM', 'Waiting')">
                                        <td style="padding: 16px; font-family: monospace; font-weight: 600;">#PT-1043</td>
                                        <td style="padding: 16px;">
                                            <div class="flex" style="align-items: center; gap: 12px;">
                                                <img src="https://ui-avatars.com/api/?name=Nimali+F&background=e2e8f0&color=primary" style="width: 32px; border-radius: 50%;">
                                                <strong style="color: var(--primary);">Nimali F.</strong>
                                            </div>
                                        </td>
                                        <td style="padding: 16px; color: var(--text-muted); font-weight: 500;">Dr. Rohan S.</td>
                                        <td style="padding: 16px; font-weight: 600;">09:30 AM</td>
                                        <td style="padding: 16px;"><span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b; padding: 4px 10px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;">Waiting (15m)</span></td>
                                    </tr>
                                    <tr style="border-bottom: 1px solid var(--border-color); transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'" onclick="window.app.recModals.openDetails('PT-1044', 'Saman K.', 'Dr. Sarah J.', '09:45 AM', 'At Triage')">
                                        <td style="padding: 16px; font-family: monospace; font-weight: 600;">#PT-1044</td>
                                        <td style="padding: 16px;">
                                            <div class="flex" style="align-items: center; gap: 12px;">
                                                <img src="https://ui-avatars.com/api/?name=Saman+Kumara&background=e2e8f0&color=primary" style="width: 32px; border-radius: 50%;">
                                                <strong style="color: var(--primary);">Saman K.</strong>
                                            </div>
                                        </td>
                                        <td style="padding: 16px; color: var(--text-muted); font-weight: 500;">Dr. Sarah J.</td>
                                        <td style="padding: 16px; font-weight: 600;">09:45 AM</td>
                                        <td style="padding: 16px;"><span class="badge" style="background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid #3b82f6; padding: 4px 10px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;">At Triage</span></td>
                                    </tr>
                                    <tr style="transition: all 0.2s; cursor: pointer;" onmouseover="this.style.background='#f8fafc'" onmouseout="this.style.background='white'">
                                        <td style="padding: 16px; font-family: monospace; font-weight: 600;">#PT-1045</td>
                                        <td style="padding: 16px;">
                                            <div class="flex" style="align-items: center; gap: 12px;">
                                                <img src="https://ui-avatars.com/api/?name=Ashok+V&background=e2e8f0&color=primary" style="width: 32px; border-radius: 50%;">
                                                <strong style="color: var(--primary);">Ashok V.</strong>
                                            </div>
                                        </td>
                                        <td style="padding: 16px; color: var(--text-muted); font-weight: 500;">Dr. Priya S.</td>
                                        <td style="padding: 16px; font-weight: 600;">10:00 AM</td>
                                        <td style="padding: 16px;"><span class="badge" style="background: rgba(100, 116, 139, 0.1); color: #64748b; border: 1px solid #64748b; padding: 4px 10px; border-radius: 20px; font-weight: 600; font-size: 0.8rem;">Not Arrived</span></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <!-- Right Column: Doctor Status & Alerts -->
                <div class="flex-column gap-6">
                    <!-- Doctor Presence -->
                    <div class="card p-5" style="border-radius: var(--radius-lg); margin-bottom: 24px;">
                        <div class="flex-between mb-3">
                            <h3 style="font-weight: 800; color: var(--primary); font-size: 1.1rem;"><i class="fas fa-stethoscope mr-2" style="color: #8b5cf6;"></i> Doctor Presence</h3>
                            <button class="btn btn-outline small" onclick="window.app.recModals.openEmergency()"><i class="fas fa-exclamation-triangle text-error"></i> Emergency</button>
                        </div>
                        
                        <div class="flex-between mb-3" style="padding: 14px; background: #f8fafc; border-radius: 12px; border: 1px solid var(--border-color); transition: all 0.2s; cursor: pointer;" onmouseover="this.style.borderColor='var(--accent)'" onmouseout="this.style.borderColor='var(--border-color)'">
                            <div class="flex gap-3" style="align-items: center;">
                                <div style="position: relative;">
                                    <img src="https://ui-avatars.com/api/?name=Rohan+Silva&background=E6FFFA&color=20c997" style="width: 40px; border-radius: 50%;">
                                    <div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #10b981; border-radius: 50%; border: 2px solid white;"></div>
                                </div>
                                <div style="line-height: 1.3;">
                                    <strong style="font-size: 0.95rem; display: block; color: var(--primary);">Dr. Rohan Silva</strong>
                                    <span style="font-size: 0.8rem; color: var(--text-muted);">Cardiology Room 1</span>
                                </div>
                            </div>
                            <span class="badge" style="background: #10b981; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem;">Active</span>
                        </div>

                        <div class="flex-between mb-3" style="padding: 14px; background: #f8fafc; border-radius: 12px; border: 1px solid var(--border-color); transition: all 0.2s; cursor: pointer;" onmouseover="this.style.borderColor='#3b82f6'" onmouseout="this.style.borderColor='var(--border-color)'">
                            <div class="flex gap-3" style="align-items: center;">
                                <div style="position: relative;">
                                    <img src="https://ui-avatars.com/api/?name=Sarah+Johnson&background=eff6ff&color=3b82f6" style="width: 40px; border-radius: 50%;">
                                    <div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #f59e0b; border-radius: 50%; border: 2px solid white;"></div>
                                </div>
                                <div style="line-height: 1.3;">
                                    <strong style="font-size: 0.95rem; display: block; color: var(--primary);">Dr. Sarah J.</strong>
                                    <span style="font-size: 0.8rem; color: var(--text-muted);">Neurology Room 2</span>
                                </div>
                            </div>
                            <span class="badge" style="background: #f59e0b; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem;">In Surgery</span>
                        </div>

                        <div class="flex-between" style="padding: 14px; background: #f8fafc; border-radius: 12px; border: 1px solid var(--border-color); opacity: 0.7;">
                            <div class="flex gap-3" style="align-items: center;">
                                <div style="position: relative;">
                                    <img src="https://ui-avatars.com/api/?name=Michael+Chen&background=f1f5f9&color=64748b" style="width: 40px; border-radius: 50%; filter: grayscale(1);">
                                    <div style="position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #ef4444; border-radius: 50%; border: 2px solid white;"></div>
                                </div>
                                <div style="line-height: 1.3;">
                                    <strong style="font-size: 0.95rem; display: block; color: var(--primary);">Dr. Michael C.</strong>
                                    <span style="font-size: 0.8rem; color: var(--text-muted);">Orthopedics</span>
                                </div>
                            </div>
                            <span class="badge" style="background: #ef4444; color: white; padding: 4px 8px; border-radius: 12px; font-size: 0.75rem;">Off Duty</span>
                        </div>
                    </div>

                    <!-- Alerts & Tasks -->
                    <div class="card p-5" style="border-radius: var(--radius-lg); background: linear-gradient(135deg, #fff, #fef2f2); border: 1px solid #fecaca; box-shadow: 0 10px 15px -3px rgba(220, 38, 38, 0.1);">
                        <div class="flex-between mb-4">
                            <h3 style="font-weight: 800; color: #b91c1c; font-size: 1.1rem;"><i class="fas fa-bell mr-2 animate-bounce" style="display: inline-block;"></i> Action Required</h3>
                            <span class="badge" style="background: #ef4444; color: white; border-radius: 20px; padding: 2px 8px;">2 New</span>
                        </div>
                        
                        <div style="padding: 14px; background: white; border-radius: 12px; border-left: 4px solid #ef4444; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); margin-bottom: 12px;">
                            <strong style="display: block; margin-bottom: 6px; color: var(--primary); font-size: 0.95rem;">Unpaid Follow-up</strong>
                            <span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 8px;">Nimali F. (09:30 AM) hasn't completed counter payment for yesterday's scan.</span>
                            <button class="btn btn-outline small" style="padding: 6px 12px; color: #ef4444; border-color: #ef4444; font-size: 0.8rem;" onclick="window.app.recModals.openOverlap()">Resolve Overlap</button>
                        </div>
                        
                        <div style="padding: 14px; background: white; border-radius: 12px; border-left: 4px solid #f59e0b; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05);">
                            <strong style="display: block; margin-bottom: 6px; color: var(--primary); font-size: 0.95rem;">Schedule Conflict</strong>
                            <span style="font-size: 0.85rem; color: var(--text-muted); display: block; margin-bottom: 8px;">Room 2 is double booked at 2:00 PM for Dr. Priya's procedure.</span>
                            <button class="btn btn-outline small" style="padding: 6px 12px; color: #f59e0b; border-color: #f59e0b; font-size: 0.8rem;" onclick="window.app.recModals.openEmergency()">Manage Crisis</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
};

window.app.renderRecAppointments = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    mainViewContent.innerHTML = `
        <div class="rec-appointments card animate-slide-up" style="border-radius: var(--radius-lg); padding: 32px;">
            <div class="flex-between mb-6">
                <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--primary);"><i class="fas fa-calendar-alt mr-2" style="color: var(--accent);"></i> Manage Appointments</h3>
                <button class="btn btn-primary" onclick="window.app.recModals.openWalkIn()"><i class="fas fa-plus"></i> New Booking</button>
            </div>
            
            <div class="search-bar flex gap-4" style="background: #f8fafc; padding: 16px; border-radius: 16px; border: 1px solid var(--border-color);">
                <div style="position: relative; flex: 1;">
                    <i class="fas fa-search" style="position: absolute; left: 16px; top: 50%; transform: translateY(-50%); color: var(--text-muted);"></i>
                    <input type="text" placeholder="Search by Patient Name, NIC, or Doctor..." style="width: 100%; padding: 12px 16px 12px 42px; border-radius: 10px; border: 1px solid #cbd5e1; outline: none;">
                </div>
                <button class="btn btn-accent"><i class="fas fa-filter"></i> Filter</button>
            </div>
            
            <div class="quick-add-notes mt-6 p-5" style="background: linear-gradient(135deg, #f0fdf4, #ecfdf5); border-radius: 16px; border: 1px dashed #6ee7b7;">
                 <h4 style="color: #047857; margin-bottom: 12px;"><i class="fas fa-comment-medical mr-2"></i> Quick Doctor Notes</h4>
                 <textarea class="form-control" rows="2" placeholder="Add special notes for the doctor. e.g., Patient needs mobility assistance..." style="width: 100%; border: 1px solid #bae6fd; border-radius: 8px; padding: 12px;"></textarea>
                 <div class="flex" style="justify-content: flex-end; margin-top: 12px;">
                    <button class="btn btn-primary small" onclick="window.app.showToast('Note Added', 'Note attached to appointment.', 'success')">Attach Note</button>
                 </div>
            </div>

            <div class="table-responsive mt-8">
                <table class="data-table" style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 2px solid var(--border-color); text-align: left;">
                            <th style="padding: 16px; color: var(--text-muted); font-weight: 600;">Reg. NIC</th>
                            <th style="padding: 16px; color: var(--text-muted); font-weight: 600;">Patient</th>
                            <th style="padding: 16px; color: var(--text-muted); font-weight: 600;">Assignee</th>
                            <th style="padding: 16px; color: var(--text-muted); font-weight: 600;">Schedule</th>
                            <th style="padding: 16px; color: var(--text-muted); font-weight: 600;">Status</th>
                            <th style="padding: 16px; color: var(--text-muted); font-weight: 600;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 16px; font-family: monospace; font-weight: 600;">951234567V</td>
                            <td style="padding: 16px;"><strong style="color: var(--primary);">Kamal Perera</strong></td>
                            <td style="padding: 16px;">Dr. Rohan Silva</td>
                            <td style="padding: 16px; font-weight: 600;">Today, 09:00 AM</td>
                            <td style="padding: 16px;"><span class="badge" style="background: rgba(16, 185, 129, 0.1); color: #10b981; border: 1px solid #10b981; padding: 4px 10px; border-radius: 20px;">Confirmed</span></td>
                            <td style="padding: 16px; display: flex; gap: 8px;">
                                <button class="btn btn-outline small" style="border-radius: 8px;" onclick="window.app.recModals.openDetails('951234567V', 'Kamal Perera', 'Dr. Rohan Silva', '09:00 AM', 'Confirmed')">Modify</button>
                                <button class="btn btn-accent small" style="border-radius: 8px;" onclick="window.app.showToast('Checked In', 'Patient marked as Arrived.', 'success')">Check-in</button>
                            </td>
                        </tr>
                        <tr style="border-bottom: 1px solid var(--border-color);">
                            <td style="padding: 16px; font-family: monospace; font-weight: 600;">881023456V</td>
                            <td style="padding: 16px;"><strong style="color: var(--primary);">Nimali F.</strong></td>
                            <td style="padding: 16px;">Dr. Rohan Silva</td>
                            <td style="padding: 16px; font-weight: 600;">Today, 09:30 AM</td>
                            <td style="padding: 16px;"><span class="badge" style="background: rgba(245, 158, 11, 0.1); color: #f59e0b; border: 1px solid #f59e0b; padding: 4px 10px; border-radius: 20px;">Pending Fee</span></td>
                            <td style="padding: 16px; display: flex; gap: 8px;">
                                <button class="btn btn-outline small" style="border-radius: 8px;" onclick="window.app.recModals.openDetails('881023456V', 'Nimali F.', 'Dr. Rohan Silva', '09:30 AM', 'Pending Fee')">Modify</button>
                                <button class="btn btn-accent small" style="border-radius: 8px;" onclick="window.app.recModals.openPayment('881023456V')">Collect</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `;
};

window.app.renderRecPayments = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    mainViewContent.innerHTML = `
        <div class="rec-payments animate-slide-up">
            <div class="card p-8" style="border-radius: var(--radius-lg); max-width: 800px; margin: 0 auto; box-shadow: var(--shadow-md);">
                <div style="text-align: center; margin-bottom: 32px;">
                    <div style="width: 64px; height: 64px; background: rgba(32, 201, 151, 0.1); color: var(--accent); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 24px; margin: 0 auto 16px auto;">
                        <i class="fas fa-cash-register"></i>
                    </div>
                    <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">Counter Payment Processing</h3>
                    <p style="color: var(--text-muted); margin-top: 8px;">Fast checkout and digital invoicing for walk-in patients.</p>
                </div>

                <div class="form-grid" style="grid-template-columns: 1fr; background: #f8fafc; padding: 24px; border-radius: 16px; border: 1px solid var(--border-color);">
                     <div class="form-group mb-4">
                        <label style="color: var(--primary); font-weight: 700;"><i class="fas fa-id-card mr-2"></i> Lookup Patient Identity (NIC/Passport)</label>
                        <div style="position: relative;">
                            <input type="text" value="951234567V" style="width: 100%; padding: 14px 16px; border-radius: 12px; border: 2px solid var(--accent); font-weight: 600; font-size: 1.1rem;">
                            <button class="btn btn-accent" style="position: absolute; right: 4px; top: 4px; bottom: 4px; border-radius: 8px;">Verify</button>
                        </div>
                     </div>
                     
                     <div style="border-top: 1px dashed #cbd5e1; margin: 20px 0;"></div>

                     <div class="form-group">
                        <label style="color: var(--primary); font-weight: 700;"><i class="fas fa-file-invoice-dollar mr-2"></i> Total Calculated Fees</label>
                        <input type="text" value="LKR 2,500.00" readonly style="width: 100%; padding: 16px; border-radius: 12px; border: 1px solid #cbd5e1; font-weight: 800; font-size: 1.4rem; color: #10b981; background: #ecfdf5;">
                     </div>
                </div>

                <div class="flex gap-4 mt-8" style="justify-content: center;">
                    <button class="btn btn-outline" style="flex: 1; padding: 16px; border-radius: 12px; border-width: 2px; font-size: 1.1rem; font-weight: 700; color: var(--primary); border-color: var(--primary);">
                        <i class="fas fa-money-bill-wave" style="margin-right: 8px; color: #10b981;"></i> Cash Payment
                    </button>
                    <button class="btn btn-outline" style="flex: 1; padding: 16px; border-radius: 12px; border-width: 2px; font-size: 1.1rem; font-weight: 700; color: var(--primary); border-color: var(--primary);">
                        <i class="fas fa-credit-card" style="margin-right: 8px; color: #3b82f6;"></i> Credit / Debit
                    </button>
                </div>
                
                <button class="btn btn-primary full-width mt-6" style="padding: 18px; border-radius: 12px; font-size: 1.1rem; font-weight: 800; box-shadow: 0 10px 15px -3px rgba(26, 54, 93, 0.2);" onclick="window.app.showToast('Success', 'Payment confirmed. Digital receipt sent via SMS to Patient.', 'success')">
                    Process & Generate Receipt <i class="fas fa-arrow-right ml-2"></i>
                </button>
            </div>
        </div>
    `;
};

window.app.renderRecReports = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    mainViewContent.innerHTML = `
        <div class="rec-reports animate-slide-up">
            <div class="card p-8" style="border-radius: var(--radius-lg); text-align: center; max-width: 600px; margin: 40px auto;">
                <img src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png" alt="Reports" style="width: 120px; margin-bottom: 24px; opacity: 0.8;">
                <h3 style="font-size: 1.8rem; font-weight: 800; color: var(--primary); margin-bottom: 12px;">Daily Operations Report</h3>
                <p style="color: var(--text-muted); font-size: 1.1rem; margin-bottom: 32px;">Generate end-of-day reconciliation reports, patient attendance logs, and financial summaries.</p>
                <div class="flex gap-4" style="justify-content: center; flex-wrap: wrap;">
                    <button class="btn btn-primary lg" style="padding: 16px 32px; border-radius: 12px; font-weight: 700;" onclick="window.app.showToast('Generating', 'EOD report is being compiled...', 'info')">
                        <i class="fas fa-file-download mr-2"></i> Generate EOD Report
                    </button>
                    <button class="btn btn-outline lg" style="padding: 16px 32px; border-radius: 12px; font-weight: 700;">
                        <i class="fas fa-history mr-2"></i> View Archives
                    </button>
                </div>
            </div>
        </div>
    `;
};

// --- Centralized Modal / Overlay Manager ---
window.app.recModals = {
    openModal: function(id, title, contentHtml, width = '500px') {
        let overlay = document.getElementById('recModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'recModalOverlay';
            overlay.className = 'auth-overlay';
            overlay.style.zIndex = '9999';
            overlay.innerHTML = `
                <div class="login-card animate-slide-up" style="max-width: ${width}; width: 90%; padding: 32px; position: relative;">
                    <button class="modal-close" onclick="window.app.recModals.closeModal()" style="position: absolute; right: 20px; top: 20px; background: none; border: none; font-size: 1.5rem; cursor: pointer; color: var(--text-muted);"><i class="fas fa-times"></i></button>
                    <h3 id="recModalTitle" style="font-size: 1.5rem; font-weight: 800; color: var(--primary); margin-bottom: 24px; padding-right: 30px;"></h3>
                    <div id="recModalContent"></div>
                </div>
            `;
            document.body.appendChild(overlay);
            
            overlay.addEventListener('click', (e) => {
                if(e.target === overlay) this.closeModal();
            });
        }
        
        document.getElementById('recModalTitle').innerHTML = title;
        document.getElementById('recModalContent').innerHTML = contentHtml;
        overlay.classList.remove('hidden');
        overlay.style.display = 'flex';
    },

    closeModal: function() {
        const overlay = document.getElementById('recModalOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
            setTimeout(() => { overlay.style.display = 'none'; }, 200);
        }
    },

    openWalkIn: function() {
        const html = `
            <div class="form-grid" style="grid-template-columns: 1fr; gap: 16px;">
                <div class="form-group">
                    <label>Patient ID / NIC <span class="text-error">*</span></label>
                    <div class="flex gap-2">
                        <input type="text" id="walkinNic" placeholder="Enter NIC to fetch..." style="flex: 1;">
                        <button class="btn btn-outline" type="button" onclick="window.app.showToast('Fetching', 'Searching patient records...', 'info')"><i class="fas fa-search"></i></button>
                    </div>
                </div>
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="walkinName" placeholder="Auto-filled or enter new">
                </div>
                <div class="form-group">
                    <label>Reason for Visit / Complaint</label>
                    <input type="text" id="walkinReason" placeholder="e.g. Fever, Checkup">
                </div>
                <div class="form-group">
                    <label>Special Notes (e.g., Emergency, Wheelchair)</label>
                    <textarea rows="2" placeholder="Add doctor notes..."></textarea>
                </div>
                <div class="form-group">
                    <label>Assign Doctor Slot</label>
                    <select class="custom-select">
                        <option>Next Available (Any) - 10:15 AM</option>
                        <option>Dr. Rohan Silva - 11:00 AM</option>
                        <option>Dr. Sarah J. - 10:30 AM</option>
                    </select>
                </div>
            </div>
            <div class="flex gap-4 mt-6">
                <button class="btn btn-outline full-width" onclick="window.app.recModals.closeModal()">Cancel</button>
                <button class="btn btn-primary full-width" onclick="window.app.showToast('Queued', 'Patient added to waiting list.', 'success'); window.app.recModals.closeModal();">Register & Queue</button>
            </div>
        `;
        this.openModal('walkin', '<i class="fas fa-user-plus text-primary"></i> Quick Walk-in Registration', html, '550px');
    },

    openDetails: function(id, name, doctor, time, status) {
        const html = `
            <div class="flex-between mb-4">
                <div>
                    <strong class="text-primary" style="font-size: 1.1rem;">${name}</strong>
                    <div class="text-muted text-sm mt-1">ID: ${id} • ${time}</div>
                </div>
                <span class="badge" style="background: var(--accent); color: white;">${status}</span>
            </div>
            
            <div class="card bg-light p-4 mb-4" style="border-radius: 12px; border: 1px solid var(--border-color);">
                <div class="flex-between mb-2">
                    <span class="text-muted text-sm">Doctor Assigned:</span>
                    <strong>${doctor}</strong>
                </div>
                <div class="flex-between mb-2">
                    <span class="text-muted text-sm">Consultation Fee:</span>
                    <strong>LKR 2,000</strong>
                </div>
                <div class="flex-between">
                    <span class="text-muted text-sm">Payment Status:</span>
                    <strong class="text-warning">Pending at Counter</strong>
                </div>
            </div>

            <h4 class="mb-3 text-primary" style="font-size: 0.95rem;">Quick Status Update</h4>
            <div class="flex gap-2 mb-6" style="flex-wrap: wrap;">
                <button class="btn btn-outline small" onclick="window.app.showToast('Updated', 'Marked as Arrived', 'success')">Arrived</button>
                <button class="btn btn-outline small" onclick="window.app.showToast('Updated', 'Moved to Waiting', 'success')">Waiting</button>
                <button class="btn btn-outline small" onclick="window.app.showToast('Updated', 'Marked Completed', 'success')">Completed</button>
                <button class="btn btn-outline small" style="color: #f59e0b; border-color: #f59e0b;" onclick="window.app.showToast('Warning', 'Marked No-Show', 'warning')">No-Show</button>
            </div>

            <div class="grid-2 gap-4">
                <button class="btn btn-outline" style="color: var(--primary);" onclick="window.app.recModals.openSwap('${id}', '${name}')"><i class="fas fa-exchange-alt"></i> Swap Slot</button>
                <button class="btn btn-outline" style="color: #ef4444; border-color: #ef4444;" onclick="window.app.recModals.openCancel('${id}', '${name}')"><i class="fas fa-times-circle"></i> Cancel</button>
                <button class="btn btn-outline"><i class="fas fa-phone"></i> Contact Patient</button>
                <button class="btn btn-outline" onclick="window.app.recModals.openPayment('${id}'); window.app.recModals.closeModal();"><i class="fas fa-cash-register"></i> Collect Payment</button>
            </div>
        `;
        this.openModal('details', 'Appointment Details', html, '600px');
    },

    openSwap: function(id, name) {
        const html = `
            <div class="alert info mb-4">
                <strong>Current:</strong> ${name} is scheduled for Today, 09:30 AM
            </div>
            <div class="form-group mb-4">
                <label>Select Alternative Slot</label>
                <select class="custom-select mt-2">
                    <option>Today, 11:30 AM - Dr. Rohan (Available)</option>
                    <option>Today, 02:00 PM - Dr. Sarah (Available)</option>
                    <option>Tomorrow, 09:00 AM - Dr. Rohan (Available)</option>
                </select>
            </div>
            <div class="form-group mb-6">
                <label>Reason for Swap (Audit Log)</label>
                <input type="text" placeholder="e.g. Patient requested time change" class="mt-2" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color);">
            </div>
            <div class="flex gap-4">
                <button class="btn btn-outline full-width" onclick="window.app.recModals.openDetails('${id}', '${name}', 'Dr. Rohan', '09:30 AM', 'Pending')">Back</button>
                <button class="btn btn-primary full-width" onclick="window.app.showToast('Swapped', 'Appointment successfully rescheduled.', 'success'); window.app.recModals.closeModal();">Confirm Swap</button>
            </div>
        `;
        this.openModal('swap', '<i class="fas fa-exchange-alt"></i> Swap Appointment', html);
    },

    openCancel: function(id, name) {
        const html = `
            <div class="alert danger mb-4">
                <strong>Warning:</strong> You are about to cancel ${name}'s appointment.
            </div>
            <div class="form-group mb-6">
                <label>Cancellation Reason <span class="text-error">*</span></label>
                <select class="custom-select mt-2">
                    <option>Patient Requested Cancellation</option>
                    <option>Doctor Unavailable</option>
                    <option>No Show</option>
                    <option>Other / Error</option>
                </select>
            </div>
            <p class="text-muted text-sm mb-4"><i class="fas fa-info-circle"></i> System Action: This cancellation will be logged under your ID for auditing purposes.</p>
            <div class="flex gap-4">
                <button class="btn btn-outline full-width" onclick="window.app.recModals.closeModal()">Keep Appt</button>
                <button class="btn btn-primary full-width" style="background: #ef4444; border-color: #ef4444;" onclick="window.app.showToast('Cancelled', 'Appointment removed and logged.', 'success'); window.app.recModals.closeModal();">Confirm Cancel</button>
            </div>
        `;
        this.openModal('cancel', '<i class="fas fa-trash-alt text-error"></i> Cancel Appointment', html);
    },

    openOverlap: function() {
        const html = `
            <div class="alert warning mb-4">
                <strong>Slot Reservation Alert</strong><br>
                This slot is loosely reserved for Nimali F. (NIC: 881023456V) but remains unpaid.
            </div>
            <p class="mb-6">The clinic policy allows overriding unpaid reservations if another patient arrives for walk-in or immediate payment.</p>
            <div class="flex-column gap-3">
                <button class="btn btn-outline" style="justify-content: center;"><i class="fas fa-phone mr-2"></i> Contact Nimali F.</button>
                <button class="btn btn-outline" style="justify-content: center;" onclick="window.app.recModals.openSwap('PT-1043', 'Nimali F.')"><i class="fas fa-exchange-alt mr-2"></i> Move Nimali to another slot</button>
                <button class="btn btn-primary" style="justify-content: center; background: #ef4444; border-color: #ef4444;" onclick="window.app.showToast('Overridden', 'Slot cleared for new patient.', 'success'); window.app.recModals.closeModal();"><i class="fas fa-exclamation-triangle mr-2"></i> Override Reservation</button>
            </div>
        `;
        this.openModal('overlap', '<i class="fas fa-exclamation-circle text-warning"></i> Handle Overlap', html);
    },

    openEmergency: function() {
        const html = `
            <div class="alert danger mb-4">
                <strong>Emergency Protocol Activated</strong><br>
                This will automatically block the next available slot and notify the assigned doctor.
            </div>
            <div class="form-grid" style="grid-template-columns: 1fr; gap: 16px; margin-bottom: 24px;">
                <div class="form-group">
                    <label>Patient Identity (Optional)</label>
                    <input type="text" placeholder="NIC or Unknown" style="padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); width: 100%;">
                </div>
                <div class="form-group">
                    <label>Emergency Condition</label>
                    <input type="text" placeholder="e.g. Severe bleeding, Chest pain" style="padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); width: 100%;">
                </div>
                <div class="form-group">
                    <label>Assign to Doctor Priority</label>
                    <select class="custom-select" style="padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); width: 100%;">
                        <option>Any Available Doctor (Urgent)</option>
                        <option>Dr. Rohan Silva (Cardiology)</option>
                        <option>Dr. Michael Chen (Orthopedics)</option>
                    </select>
                </div>
            </div>
            <p class="text-sm text-warning mb-4"><i class="fas fa-info-circle"></i> Patients waiting in line will be notified of a minor delay automatically.</p>
            <div class="flex gap-4">
                <button class="btn btn-outline full-width" onclick="window.app.recModals.closeModal()">Cancel</button>
                <button class="btn btn-primary full-width" style="background: #ef4444; border-color: #ef4444;" onclick="window.app.showToast('Emergency Dispatched', 'Doctor notified. Triage assigned.', 'success'); window.app.recModals.closeModal();"><i class="fas fa-ambulance"></i> Dispatch Emergency</button>
            </div>
        `;
        this.openModal('emergency', '<i class="fas fa-first-aid text-error"></i> Emergency Walk-in', html);
    },
    
    openReportPreview: function() {
        const html = `
            <div class="card bg-light p-4 mb-4" style="border: 1px solid var(--border-color); border-radius: 12px;">
                <h4 style="margin-bottom: 12px; color: var(--primary);">Summary - Today</h4>
                <div class="flex-between mb-2"><span class="text-muted">Total Appointments:</span> <strong>50</strong></div>
                <div class="flex-between mb-2"><span class="text-muted">Walk-ins:</span> <strong>12</strong></div>
                <div class="flex-between mb-2"><span class="text-muted">Completed Visits:</span> <strong class="text-success">42</strong></div>
                <div class="flex-between mb-2"><span class="text-muted">No-shows:</span> <strong class="text-error">2</strong></div>
                <div style="border-top: 1px dashed #cbd5e1; margin: 12px 0;"></div>
                <div class="flex-between"><span class="text-muted">Counter Revenue:</span> <strong style="font-size: 1.2rem; color: var(--accent);">LKR 84,500</strong></div>
            </div>
            
            <p class="text-sm text-muted mb-6"><i class="fas fa-check-circle text-success"></i> All counter transactions match the system invoice records. Ready for generation.</p>
            
            <div class="flex gap-4">
                <button class="btn btn-outline full-width" onclick="window.app.recModals.closeModal()">Cancel</button>
                <button class="btn btn-primary full-width" onclick="window.app.showToast('Downloaded', 'EOD Report PDF generated.', 'success'); window.app.recModals.closeModal();"><i class="fas fa-download"></i> Download PDF</button>
            </div>
        `;
        this.openModal('report', '<i class="fas fa-file-invoice text-primary"></i> EOD Report Preview', html);
    },

    openPayment: function(id) {
        const html = `
            <div style="text-align: center; margin-bottom: 24px;">
                <h3 style="font-size: 1.5rem; font-weight: 800; color: var(--primary);">Payment Processing</h3>
                <p style="color: var(--text-muted); margin-top: 4px;">Patient ID: ${id}</p>
            </div>
            <div class="form-grid" style="grid-template-columns: 1fr; background: #f8fafc; padding: 20px; border-radius: 12px; border: 1px solid var(--border-color); margin-bottom: 24px;">
                 <div class="flex-between mb-3">
                    <span class="text-muted">Consultation Fee</span>
                    <strong>LKR 2,000.00</strong>
                 </div>
                 <div class="flex-between mb-3">
                    <span class="text-muted">Clinic Charges</span>
                    <strong>LKR 500.00</strong>
                 </div>
                 <div style="border-top: 1px dashed #cbd5e1; margin: 12px 0;"></div>
                 <div class="flex-between">
                    <span class="text-primary" style="font-weight: 700;">Total Amount</span>
                    <strong style="font-size: 1.4rem; color: #10b981;">LKR 2,500.00</strong>
                 </div>
            </div>
            <div class="flex gap-4 mb-6">
                <button class="btn btn-outline" style="flex: 1; border-color: #10b981; color: #10b981;" onclick="Array.from(this.parentElement.children).forEach(b=>b.style.background='white'); this.style.background='#ecfdf5';"><i class="fas fa-money-bill-wave"></i> Cash</button>
                <button class="btn btn-outline" style="flex: 1; border-color: #3b82f6; color: #3b82f6;" onclick="Array.from(this.parentElement.children).forEach(b=>b.style.background='white'); this.style.background='#eff6ff';"><i class="fas fa-credit-card"></i> Card</button>
            </div>
            <div class="flex gap-4">
                <button class="btn btn-outline full-width" onclick="window.app.recModals.closeModal()">Cancel</button>
                <button class="btn btn-primary full-width" onclick="window.app.showToast('Paid', 'Payment successful. Receipt generated.', 'success'); window.app.recModals.closeModal();">Complete Payment <i class="fas fa-check-circle ml-2"></i></button>
            </div>
        `;
        this.openModal('payment', '<i class="fas fa-cash-register text-primary"></i> Process Checkout', html, '450px');
    }
};
