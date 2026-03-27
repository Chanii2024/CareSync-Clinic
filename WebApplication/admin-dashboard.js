/**
 * Admin Dashboard Module
 * Extracted from app.js
 */

document.addEventListener('DOMContentLoaded', () => {
    window.app = window.app || {};

    const mainViewContent = document.getElementById('mainViewContent');

    window.app.renderAdminDashboard = function() {
        mainViewContent.innerHTML = `
            <div class="admin-dashboard">
                <div class="stats-grid grid-4">
                    <div class="stat-card card">
                        <i class="fas fa-users"></i>
                        <div class="stat-info"><span class="label">Total Users</span><span class="value">1,240</span></div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-calendar-check"></i>
                        <div class="stat-info"><span class="label">Daily Appts</span><span class="value">42</span></div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-money-bill-wave"></i>
                        <div class="stat-info"><span class="label">Revenue (MTD)</span><span class="value">LKR 450K</span></div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-server"></i>
                        <div class="stat-info"><span class="label">Sys Status</span><span class="value green">Optimal</span></div>
                    </div>
                </div>

                <div class="admin-charts-grid mt-6">
                    <div class="card overflow-hidden full-width" style="display: flex; gap: 2rem; flex-wrap: wrap;">
                        <div style="flex: 2; min-width: 300px;">
                            <h3>Clinic Traffic (24h)</h3>
                            <div class="chart-mock mt-4" style="height: 180px; display: flex; align-items: flex-end; gap: 8px; position: relative; border-bottom: 2px solid var(--border-color); border-left: 2px solid var(--border-color); padding-left: 10px;">
                                 <div class="bar" style="height: 40%; width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; cursor: pointer; transition: 0.3s;" title="02:00 - 15 Patients"></div>
                                 <div class="bar" style="height: 70%; width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; cursor: pointer; transition: 0.3s;" title="06:00 - 45 Patients"></div>
                                 <div class="bar" style="height: 90%; width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; cursor: pointer; transition: 0.3s;" title="10:00 - 80 Patients"></div>
                                 <div class="bar" style="height: 50%; width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; cursor: pointer; transition: 0.3s;" title="14:00 - 32 Patients"></div>
                                 <div class="bar" style="height: 80%; width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; cursor: pointer; transition: 0.3s;" title="18:00 - 70 Patients"></div>
                                 <div class="bar" style="height: 30%; width: 100%; background: var(--primary); border-radius: 4px 4px 0 0; cursor: pointer; transition: 0.3s;" title="22:00 - 10 Patients"></div>
                            </div>
                            <div class="flex-between text-muted text-sm mt-2 font-medium">
                                <span>00:00</span><span>12:00</span><span>23:59</span>
                            </div>
                        </div>
                        <div style="flex: 1; border-left: 1px dashed var(--border-color); padding-left: 2rem; display: flex; flex-direction: column; justify-content: center; align-items: center; min-width: 250px;">
                            <h3 style="align-self: flex-start;">Patient Distribution</h3>
                            <div class="donut-chart mt-4" style="width: 140px; height: 140px; border-radius: 50%; background: conic-gradient(var(--info) 0% 35%, var(--success) 35% 85%, var(--warning) 85% 100%); position: relative; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(0,0,0,0.05);">
                                <div class="donut-hole" style="width: 90px; height: 90px; border-radius: 50%; background: white; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                                    <span style="font-weight: 800; font-size: 1.2rem;">320</span>
                                    <small style="font-size: 0.7rem; font-weight: normal; color: var(--text-color);">Total Daily</small>
                                </div>
                            </div>
                            <div class="flex gap-4 mt-6 text-sm font-medium w-full justify-center">
                                <span style="color: var(--success);"><i class="fas fa-circle"></i> OPD (160)</span>
                                <span style="color: var(--info);"><i class="fas fa-circle"></i> Dental (112)</span>
                                <span style="color: var(--warning);"><i class="fas fa-circle"></i> ER (48)</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- BIG APPOINTMENTS TABLE -->
                <div class="card mt-6">
                    <div class="flex-between">
                        <div>
                            <h3>Master Appointments Directory</h3>
                            <p class="text-sm text-muted mt-1">Complete view of all clinic appointments across all doctors and departments.</p>
                        </div>
                        <div class="flex gap-2 align-center">
                            <div class="search-box small border rounded flex align-center px-2" style="background:#fff;">
                                <i class="fas fa-search text-muted"></i>
                                <input type="text" placeholder="Search ref or patient..." style="border:none; padding:8px; outline:none; background:transparent;">
                            </div>
                            <input type="date" class="form-control" value="2026-03-27">
                            <button class="btn btn-outline small"><i class="fas fa-filter"></i></button>
                            <button class="btn btn-primary small"><i class="fas fa-download"></i> Extract</button>
                        </div>
                    </div>
                    <div class="table-responsive mt-4">
                        <table class="data-table" style="width: 100%;">
                            <thead>
                                <tr>
                                    <th>Token / Ref</th>
                                    <th>Time</th>
                                    <th>Patient Details</th>
                                    <th>Doctor / Dept</th>
                                    <th>Type</th>
                                    <th>Status</th>
                                    <th class="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>#A-1024</strong></td>
                                    <td>09:00 AM</td>
                                    <td>Kamal Perera<br><small class="text-muted">CS-8821 • 0771234567</small></td>
                                    <td>Dr. Rohan Silva<br><small class="text-muted">Cardiology</small></td>
                                    <td><span class="badge secondary">Follow-up</span></td>
                                    <td><span class="badge success">Arrived</span></td>
                                    <td class="text-right">
                                        <button class="btn btn-outline small">View</button>
                                        <button class="btn btn-outline small">Reschedule</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>#A-1025</strong></td>
                                    <td>09:30 AM</td>
                                    <td>Nimali Fonseka<br><small class="text-muted">CS-7721 • 0719876543</small></td>
                                    <td>Dr. Priya Sharma<br><small class="text-muted">Dermatology</small></td>
                                    <td><span class="badge secondary">New Consult</span></td>
                                    <td><span class="badge info">In Waiting Room</span></td>
                                    <td class="text-right">
                                        <button class="btn btn-outline small">View</button>
                                        <button class="btn btn-outline small">Reschedule</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>#A-1026</strong></td>
                                    <td>09:45 AM</td>
                                    <td>Tang San<br><small class="text-muted">CS-9912 • 0773332211</small></td>
                                    <td>Dr. Michael Chen<br><small class="text-muted">Orthopedics</small></td>
                                    <td><span class="badge secondary">Procedure</span></td>
                                    <td><span class="badge warning">No Show</span></td>
                                    <td class="text-right">
                                        <button class="btn btn-outline small">View</button>
                                        <button class="btn btn-outline small">Reschedule</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>#A-1027</strong></td>
                                    <td>10:00 AM</td>
                                    <td>Sarah Connor<br><small class="text-muted">CS-1102 • 0789998888</small></td>
                                    <td>Dr. Anand Menon<br><small class="text-muted">Pediatrics</small></td>
                                    <td><span class="badge secondary">Vaccination</span></td>
                                    <td><span class="badge primary">Scheduled</span></td>
                                    <td class="text-right">
                                        <button class="btn btn-outline small">View</button>
                                        <button class="btn btn-outline small">Reschedule</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td><strong>#A-1028</strong></td>
                                    <td>10:30 AM</td>
                                    <td>John Doe<br><small class="text-muted">CS-0991 • 0712223344</small></td>
                                    <td>Dr. Sarah Johnson<br><small class="text-muted">Neurology</small></td>
                                    <td><span class="badge secondary">Review</span></td>
                                    <td><span class="badge primary">Scheduled</span></td>
                                    <td class="text-right">
                                        <button class="btn btn-outline small">View</button>
                                        <button class="btn btn-outline small">Reschedule</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div class="flex-between mt-4">
                            <span class="text-muted text-sm">Showing 5 of 42 appointments</span>
                            <div class="pagination flex gap-2">
                                <button class="btn btn-outline small" disabled>&lt; Prev</button>
                                <button class="btn btn-primary small">1</button>
                                <button class="btn btn-outline small">2</button>
                                <button class="btn btn-outline small">3</button>
                                <button class="btn btn-outline small">Next &gt;</button>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- NEW: FINANCE AND CONFLICTS -->
                <div class="grid-2 mt-6 mb-6">
                    <!-- Billing & Receivables -->
                    <div class="card">
                        <div class="flex-between">
                            <h3>Financial Overview & Unpaid</h3>
                            <button class="btn btn-outline small"><i class="fas fa-file-invoice-dollar"></i> Go to Billing</button>
                        </div>
                        <div class="stats-grid grid-2 mt-4 mb-4">
                            <div class="stat-card" style="padding: 15px;">
                                <span class="label text-sm text-muted">Total Earned (YTD)</span>
                                <span class="value text-primary" style="font-size: 1.5rem; display: block; margin-top: 5px;">LKR 4.2M</span>
                            </div>
                            <div class="stat-card" style="padding: 15px;">
                                <span class="label text-sm text-muted">Pending/Unpaid</span>
                                <span class="value text-warning" style="font-size: 1.5rem; display: block; margin-top: 5px;">LKR 85,000</span>
                            </div>
                        </div>
                        <div class="table-responsive mt-4">
                            <table class="data-table small">
                                <thead><tr><th>Invoice Ref</th><th>Patient</th><th>Amount</th><th>Status</th></tr></thead>
                                <tbody>
                                    <tr><td><strong>INV-9021</strong></td><td>Kamal P.</td><td>LKR 4,500</td><td><span class="badge error">Overdue</span></td></tr>
                                    <tr><td><strong>INV-9025</strong></td><td>Wimal S.</td><td>LKR 12,000</td><td><span class="badge warning">Pending Ins.</span></td></tr>
                                    <tr><td><strong>INV-9030</strong></td><td>Sarah M.</td><td>LKR 3,200</td><td><span class="badge error">Walk-out</span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <!-- Conflicts & Urgent Fixes -->
                    <div class="card border-l-4" style="border-left: 4px solid var(--danger); background: linear-gradient(to bottom right, #ffffff, #fff5f5);">
                        <div class="flex-between">
                            <h3>Urgent Conflicts & Overrides</h3>
                            <button class="btn btn-primary small" style="background: var(--danger); border-color: var(--danger);"><i class="fas fa-exclamation-triangle"></i> Action Center</button>
                        </div>
                        <p class="text-sm text-muted mt-2 mb-4">Use these controls to force-fix issues that staff cannot resolve.</p>
                        
                        <div class="activity-list">
                            <div class="activity-item flex-between" style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 10px; border-left: 3px solid var(--danger);">
                                <div>
                                    <strong class="text-danger"><i class="fas fa-calendar-times"></i> Double Booking Conflict</strong><br>
                                    <span class="text-sm text-muted" style="display:inline-block; margin-top:4px;">Dr. Silva (10:00 AM) - Two patients scheduled. System deadlock.</span>
                                </div>
                                <button class="btn btn-outline small" onclick="alert('Force resolving schedule.')">Fix ASAP</button>
                            </div>
                            <div class="activity-item flex-between" style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 10px; border-left: 3px solid var(--warning);">
                                <div>
                                    <strong><i class="fas fa-lock"></i> Inventory Lock Error</strong><br>
                                    <span class="text-sm text-muted" style="display:inline-block; margin-top:4px;">Amoxicillin stock frozen by incomplete POS transaction.</span>
                                </div>
                                <button class="btn btn-outline small" onclick="alert('Unlocking inventory record.')">Unlock</button>
                            </div>
                            <div class="activity-item flex-between" style="padding: 12px; background: white; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.02); margin-bottom: 10px; border-left: 3px solid var(--info);">
                                <div>
                                    <strong><i class="fas fa-money-check-alt"></i> Stuck Refund</strong><br>
                                    <span class="text-sm text-muted" style="display:inline-block; margin-top:4px;">Patient #8812 refund stuck at gateway. Needs manual push.</span>
                                </div>
                                <button class="btn btn-outline small" onclick="alert('Pushing refund manually.')">Force Push</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };

    window.app.renderAdminUsers = function() {
        mainViewContent.innerHTML = `
            <div class="admin-users card">
                <div class="flex-between">
                    <div>
                        <h3>User & Account Management</h3>
                        <p class="text-sm text-muted mt-1">Add, remove, activate or deactivate clinic accounts.</p>
                    </div>
                    <button class="btn btn-primary" onclick="alert('Open Add User Modal')"><i class="fas fa-plus"></i> Add New User</button>
                </div>

                <div class="filter-bar flex gap-4 mt-6">
                    <div class="search-box" style="flex:1;">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search users by name, role, or email...">
                    </div>
                </div>

                <div class="table-responsive mt-4">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>User Profile</th>
                                <th>Role</th>
                                <th>Status</th>
                                <th class="text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Dr. Rohan Silva</strong><br>
                                    <small class="text-muted">rohan@caresync.com</small>
                                </td>
                                <td><span class="badge secondary">Doctor</span></td>
                                <td><span class="badge success">Active</span></td>
                                <td class="text-right">
                                    <button class="btn btn-outline small text-warning" onclick="alert('Deactivating account')"><i class="fas fa-ban"></i> Deactivate</button>
                                    <button class="btn btn-outline small text-danger" onclick="alert('Removing user permanently')"><i class="fas fa-trash"></i> Remove</button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Sarah J.</strong><br>
                                    <small class="text-muted">sarah@caresync.com</small>
                                </td>
                                <td><span class="badge secondary">Receptionist</span></td>
                                <td><span class="badge success">Active</span></td>
                                <td class="text-right">
                                    <button class="btn btn-outline small text-warning" onclick="alert('Deactivating account')"><i class="fas fa-ban"></i> Deactivate</button>
                                    <button class="btn btn-outline small text-danger" onclick="alert('Removing user permanently')"><i class="fas fa-trash"></i> Remove</button>
                                </td>
                            </tr>
                            <tr class="muted-row" style="opacity: 0.6;">
                                <td>
                                    <strong>Jason Derulo (Old User)</strong><br>
                                    <small class="text-muted">jason@oldpatient.com</small>
                                </td>
                                <td><span class="badge secondary">Patient</span></td>
                                <td><span class="badge error text-danger">Deactivated</span></td>
                                <td class="text-right">
                                    <button class="btn btn-primary small" onclick="alert('Activating account')"><i class="fas fa-check"></i> Activate</button>
                                    <button class="btn btn-outline small text-danger" onclick="alert('Removing user permanently')"><i class="fas fa-trash"></i> Remove</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    };

    window.app.renderAdminComplaints = function(filter = 'new') {
        window.app._currentComplaintFilter = filter;
        const renderList = () => {
            if (filter === 'empty') {
                return `
                    <div class="empty-state text-center py-8">
                        <i class="fas fa-check-circle text-success" style="font-size: 48px; opacity: 0.5;"></i>
                        <h4 class="mt-4">All Caught Up!</h4>
                        <p class="text-muted mt-2">There are no pending complaints matching this filter.</p>
                        <button class="btn btn-primary mt-4" onclick="window.app.renderAdminComplaints('new')">View New Complaints</button>
                    </div>
                `;
            }
            return `
                <div class="complaint-item card mb-4 border-l-4" style="border-left-color: var(--warning);">
                    <div class="flex-between">
                        <div class="flex gap-3">
                            <img src="https://ui-avatars.com/api/?name=Kamal+P&background=ecc94b&color=000" class="avatar-sm" style="width: 40px; height: 40px; border-radius: 50%;">
                            <div>
                                <strong>Kamal P.</strong> <span class="text-muted text-sm ml-2">Today, 10:15 AM</span>
                                <h4 class="mt-1">Excessive wait time at Pharmacy</h4>
                            </div>
                        </div>
                        <span class="badge warning">New</span>
                    </div>
                    <div class="complaint-body mt-4 p-4 rounded" style="background: #f8fafc;">
                        <p class="text-sm">"I was told my prescription would be ready in 10 minutes, but I ended up waiting for over an hour. The staff seemed overwhelmed but no one communicated the delay."</p>
                    </div>
                    <div class="complaint-actions mt-4 border-t pt-4 flex-between">
                        <div class="flex gap-2 align-center">
                            <span class="text-sm font-medium">Update Status:</span>
                            <select class="form-control small" style="width: 150px;">
                                <option value="new">New / Unread</option>
                                <option value="review">Under Review</option>
                                <option value="contact">Patient Contacted</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <button class="btn btn-outline small" onclick="window.app.showToast('Updated', 'Complaint status saved.', 'success')">Save</button>
                        </div>
                        <button class="btn btn-primary small" onclick="window.app.showConfirm('Issue Refund?', 'Are you sure you want to issue a partial refund for the inconvenience? This action will impact daily revenue.', () => { window.app.showToast('Refund Initialized', 'LKR 500 refunded to Kamal P.', 'success'); window.app.renderAdminComplaints('empty'); })"><i class="fas fa-hand-holding-usd"></i> Issue Goodwill Refund</button>
                    </div>
                </div>

                <div class="complaint-item card mb-4 border-l-4" style="border-left-color: var(--info);">
                    <div class="flex-between">
                        <div class="flex gap-3">
                            <img src="https://ui-avatars.com/api/?name=Wimal+S&background=4299e1&color=fff" class="avatar-sm" style="width: 40px; height: 40px; border-radius: 50%;">
                            <div>
                                <strong>Wimal S.</strong> <span class="text-muted text-sm ml-2">Yesterday, 14:20 PM</span>
                                <h4 class="mt-1">Facility Cleanliness (Washroom B)</h4>
                            </div>
                        </div>
                        <span class="badge info">In Progress</span>
                    </div>
                    <div class="complaint-body mt-4 p-4 rounded" style="background: #f8fafc;">
                        <p class="text-sm">"The public washroom near the pediatric wing was severely lacking paper towels and the trash bin was overflowing."</p>
                    </div>
                    <div class="complaint-actions mt-4 border-t pt-4 flex-between">
                        <div class="flex gap-2 align-center">
                            <span class="text-sm font-medium">Update Status:</span>
                            <select class="form-control small" style="width: 150px;">
                                <option value="new">New / Unread</option>
                                <option value="review" selected>Under Review</option>
                                <option value="contact">Patient Contacted</option>
                                <option value="resolved">Resolved</option>
                            </select>
                            <button class="btn btn-outline small" onclick="window.app.showToast('Updated', 'Complaint status saved.', 'success')">Save</button>
                        </div>
                        <button class="btn btn-outline small text-primary" style="border-color: var(--primary);" onclick="window.app.showToast('Notification Sent', 'Dispatched alert to Janitorial Unit.', 'info')"><i class="fas fa-broom"></i> Dispatch Janitorial</button>
                    </div>
                </div>
            `;
        };

        mainViewContent.innerHTML = `
            <div class="admin-complaints">
                <div class="flex-between mb-6">
                    <div>
                        <h3>Patient Experience & Complaints Box</h3>
                        <p class="text-sm text-muted">Review, escalate, and resolve patient grievances directly.</p>
                    </div>
                    <button class="btn btn-primary bg-danger border-danger"><i class="fas fa-exclamation-triangle"></i> 1 Critical Escaped SLA</button>
                </div>

                <div class="filter-tabs flex gap-4 mb-6 pb-2" style="border-bottom: 2px solid var(--border-color);">
                    <button class="btn btn-link ${filter === 'new' ? 'active font-bold text-primary' : 'text-muted'}" style="${filter==='new' ? 'border-bottom: 2px solid var(--primary); padding-bottom: 12px; margin-bottom: -14px;' : 'padding-bottom: 12px;'}" onclick="window.app.renderAdminComplaints('new')">Action Required (2)</button>
                    <button class="btn btn-link ${filter === 'empty' ? 'active font-bold text-primary' : 'text-muted'}" style="${filter==='empty' ? 'border-bottom: 2px solid var(--primary); padding-bottom: 12px; margin-bottom: -14px;' : 'padding-bottom: 12px;'}" onclick="window.app.renderAdminComplaints('empty')">Archived (0)</button>
                    <button class="btn btn-link text-muted" onclick="window.app.renderAdminComplaints('empty')" style="padding-bottom:12px;">Spam / Dismissed</button>
                </div>

                <div class="complaints-list">
                    ${renderList()}
                </div>
                
                <div class="demo-ui-states mt-8 p-6 card" style="background: #f8fafc; border: 2px dashed #cbd5e0;">
                    <h4 class="text-muted mb-4"><i class="fas fa-vial"></i> Interactive UI States (Requested Features Overview)</h4>
                    <div class="flex gap-4 flex-wrap">
                        <button class="btn btn-outline small" onclick="window.app.showConfirm('Delete Patient Record?', 'Are you sure you want to permanently delete this record? This bypasses audit logs.', () => window.app.showToast('Deleted', 'Record aggressively wiped from DB.', 'error'))">Trigger: Confirmation Dialog</button>
                        <button class="btn btn-outline small" onclick="window.app.triggerLoadingState()">Trigger: Network Loading Indicator</button>
                        <button class="btn btn-outline small" onclick="window.app.showToast('Connection Refused', 'Unable to reach payment gateway endpoint (Error 503).', 'error')">Trigger: Error Toast Message</button>
                        <button class="btn btn-outline small" onclick="window.app.renderAdminComplaints('empty')">Trigger: Empty State view</button>
                    </div>
                </div>
            </div>
        `;
    };

    // Global Confirm Logic & Demo Load logic
    window.app.showConfirm = function(title, message, onConfirmCallback) {
        const overlay = document.getElementById('confirmOverlay');
        const titleEl = document.getElementById('confirmTitle');
        const msgEl = document.getElementById('confirmMessage');
        const confirmBtn = document.getElementById('confirmActionBtn');
        
        if (overlay) {
            titleEl.textContent = title;
            msgEl.textContent = message;
            
            // Clean up previous event listeners (simple approach: clone node)
            const newConfirmBtn = confirmBtn.cloneNode(true);
            confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);
            
            newConfirmBtn.addEventListener('click', () => {
                overlay.style.display = 'none';
                if (onConfirmCallback) onConfirmCallback();
            });
            
            overlay.style.display = 'flex';
        }
    };

    window.app.triggerLoadingState = function() {
        const main = document.getElementById('mainViewContent');
        if (main) {
            main.innerHTML = '<div class="view-loading"><div class="spinner"></div><p class="mt-4 text-primary font-medium" style="text-align:center;">Processing request natively...</p></div>';
            setTimeout(() => {
                window.app.renderAdminComplaints(window.app._currentComplaintFilter || 'new');
            }, 1200);
        }
    };

    window.app.renderAdminLogs = function() {
        mainViewContent.innerHTML = `
            <div class="admin-logs card full-width">
                <div class="flex-between mb-6">
                    <div>
                        <h3>System Audit Vault (Access Logs)</h3>
                        <p class="text-sm text-muted">Track all administrative, clinical, and financial actions taken by users.</p>
                    </div>
                    <div class="flex gap-2 align-center">
                        <div class="search-box small border rounded flex align-center px-2" style="background:#fff;">
                            <i class="fas fa-search text-muted"></i>
                            <input type="text" placeholder="Search users/actions..." style="border:none; padding:8px; outline:none; background:transparent;">
                        </div>
                        <input type="date" class="form-control" value="2026-03-27">
                        <select class="form-control">
                            <option>All Modules</option>
                            <option>Finance</option>
                            <option>Clinical</option>
                            <option>Security</option>
                        </select>
                        <button class="btn btn-outline small"><i class="fas fa-filter"></i> Apply</button>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="data-table">
                        <thead>
                            <tr>
                                <th>Timestamp</th>
                                <th>Associated User</th>
                                <th>Role</th>
                                <th>Module</th>
                                <th>Action Description</th>
                                <th>IP Address</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Today, 20:01:06</td>
                                <td>
                                    <div class="flex gap-2 align-center">
                                        <img src="https://ui-avatars.com/api/?name=Admin&background=1a365d&color=fff" class="avatar-sm" style="width: 24px; height: 24px; border-radius: 50%;">
                                        <strong>Admin User</strong>
                                    </div>
                                </td>
                                <td><span class="badge secondary">Administrator</span></td>
                                <td><span class="badge info">System</span></td>
                                <td>Accessed Audit Logs module</td>
                                <td class="text-muted text-sm">192.168.1.104</td>
                            </tr>
                            <tr>
                                <td>Today, 19:45:22</td>
                                <td>
                                    <div class="flex gap-2 align-center">
                                        <img src="https://ui-avatars.com/api/?name=Sarah+J&background=3182ce&color=fff" class="avatar-sm" style="width: 24px; height: 24px; border-radius: 50%;">
                                        <strong>Sarah J.</strong>
                                    </div>
                                </td>
                                <td><span class="badge secondary">Receptionist</span></td>
                                <td><span class="badge primary">Appointments</span></td>
                                <td>Swapped appointment slot for patient Kamal P.</td>
                                <td class="text-muted text-sm">192.168.1.42</td>
                            </tr>
                            <tr>
                                <td>Today, 18:30:11</td>
                                <td>
                                    <div class="flex gap-2 align-center">
                                        <i class="fas fa-robot text-muted" style="font-size: 20px;"></i>
                                        <strong>System Daemon</strong>
                                    </div>
                                </td>
                                <td><span class="badge warning">Automated</span></td>
                                <td><span class="badge info">Database</span></td>
                                <td>Triggered daily incremental database backup</td>
                                <td class="text-muted text-sm">localhost</td>
                            </tr>
                            <tr>
                                <td>Today, 14:15:00</td>
                                <td>
                                    <div class="flex gap-2 align-center">
                                        <img src="https://ui-avatars.com/api/?name=Dr+Rohan&background=2b6cb0&color=fff" class="avatar-sm" style="width: 24px; height: 24px; border-radius: 50%;">
                                        <strong>Dr. Rohan Silva</strong>
                                    </div>
                                </td>
                                <td><span class="badge secondary">Doctor</span></td>
                                <td><span class="badge error">Clinical Records</span></td>
                                <td>Modified restricted patient file (Emergency Override invoked)</td>
                                <td class="text-muted text-sm">192.168.1.55</td>
                            </tr>
                            <tr>
                                <td>Yesterday, 09:12:44</td>
                                <td>
                                    <div class="flex gap-2 align-center">
                                        <img src="https://ui-avatars.com/api/?name=Wimal+S&background=4a5568&color=fff" class="avatar-sm" style="width: 24px; height: 24px; border-radius: 50%;">
                                        <strong>Wimal S.</strong>
                                    </div>
                                </td>
                                <td><span class="badge secondary">Pharmacist</span></td>
                                <td><span class="badge success">Inventory</span></td>
                                <td>Approved stock influx of 200x Amoxicillin</td>
                                <td class="text-muted text-sm">192.168.1.18</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    };

    window.app.renderAdminReports = function() {
        mainViewContent.innerHTML = `
            <div class="admin-reports">
                <div class="card mb-6">
                    <div class="flex-between">
                        <div>
                            <h3>Clinic Intelligence & Reports</h3>
                            <p class="text-sm text-muted">Generate comprehensive operational and financial reports.</p>
                        </div>
                    </div>
                    
                    <div class="grid-3 mt-6">
                        <div class="report-type-card card border-l-4" style="border-left: 4px solid var(--primary); background: #f8fafc; cursor: pointer;">
                            <i class="fas fa-file-invoice-dollar text-primary" style="font-size: 24px;"></i>
                            <h4 class="mt-4">Financial Recon</h4>
                            <p class="text-sm text-muted mt-2">End of month billing, outstanding payments, and pharmacy revenue.</p>
                            <button class="btn btn-primary small mt-4 full-width" onclick="window.app.showToast('Generating', 'Compiling financial data...', 'info')">Generate</button>
                        </div>
                        <div class="report-type-card card border-l-4" style="border-left: 4px solid var(--success); background: #f8fafc; cursor: pointer;">
                            <i class="fas fa-user-md text-success" style="font-size: 24px;"></i>
                            <h4 class="mt-4">Staff Performance</h4>
                            <p class="text-sm text-muted mt-2">Doctor consultation times, daily task completion by nurses.</p>
                            <button class="btn btn-outline small mt-4 full-width" onclick="window.app.showToast('Generating', 'Compiling staff metrics...', 'info')">Generate</button>
                        </div>
                        <div class="report-type-card card border-l-4" style="border-left: 4px solid var(--warning); background: #f8fafc; cursor: pointer;">
                            <i class="fas fa-chart-line text-warning" style="font-size: 24px;"></i>
                            <h4 class="mt-4">Patient Demographics</h4>
                            <p class="text-sm text-muted mt-2">Traffic overview, common clinical conditions, and patient influx.</p>
                            <button class="btn btn-outline small mt-4 full-width" onclick="window.app.showToast('Generating', 'Compiling demographics...', 'info')">Generate</button>
                        </div>
                    </div>
                </div>

                <!-- Advanced Analytics View (Line Chart) -->
                <div class="card mb-6 mt-6">
                    <div class="flex-between">
                        <div>
                            <h3>Financial Growth Analytics 📈</h3>
                            <p class="text-sm text-muted">Month-over-month revenue tracking.</p>
                        </div>
                        <select class="form-control small"><option>2026 (YTD)</option><option>2025</option></select>
                    </div>
                    <div class="line-chart-container mt-6 mb-6" style="height: 220px; width: 100%; position: relative;">
                        <svg viewBox="0 0 800 200" style="width: 100%; height: 100%; overflow: visible;">
                            <!-- Grid Lines -->
                            <line x1="0" y1="50" x2="800" y2="50" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                            <line x1="0" y1="100" x2="800" y2="100" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                            <line x1="0" y1="150" x2="800" y2="150" stroke="#e2e8f0" stroke-width="1" stroke-dasharray="4"/>
                            
                            <!-- Growth Path (Filled Area) -->
                            <path d="M 0 150 C 100 150, 200 130, 300 120 C 450 100, 550 60, 650 40 C 700 30, 750 20, 800 15 L 800 200 L 0 200 Z" fill="#ebf8ff" />
                            
                            <!-- Precise Line -->
                            <path d="M 0 150 C 100 150, 200 130, 300 120 C 450 100, 550 60, 650 40 C 700 30, 750 20, 800 15" fill="none" stroke="var(--primary)" stroke-width="4" stroke-linecap="round"/>
                            
                            <!-- Interactive Data Points -->
                            <circle cx="0" cy="150" r="5" fill="#fff" stroke="var(--primary)" stroke-width="3"/>
                            <circle cx="300" cy="120" r="6" fill="#fff" stroke="var(--primary)" stroke-width="3" style="cursor: pointer; transition: 0.2s;" onmouseover="this.setAttribute('r', '8')" onmouseout="this.setAttribute('r', '6')" onclick="window.app.showToast('February Results', 'Revenue: LKR 1.2M (+12%)', 'success')"/>
                            <circle cx="650" cy="40" r="6" fill="#fff" stroke="var(--primary)" stroke-width="3" style="cursor: pointer; transition: 0.2s;" onmouseover="this.setAttribute('r', '8')" onmouseout="this.setAttribute('r', '6')" onclick="window.app.showToast('March Results', 'Revenue: LKR 3.1M (+152%)', 'success')"/>
                            <circle cx="800" cy="15" r="7" fill="var(--primary)" stroke="#fff" stroke-width="2" style="cursor: pointer; filter: drop-shadow(0 0 4px rgba(49,130,206,0.5));" onclick="window.app.showToast('April Projection', 'Expected: LKR 4.5M (Peak Season)', 'info')"/>
                        </svg>
                        <div class="flex-between text-muted text-sm mt-4 font-medium" style="position: absolute; width: 100%; bottom: -30px;">
                            <span>Jan</span>
                            <span style="margin-left: -50px;">Feb</span>
                            <span style="margin-left: 100px;">Mar</span>
                            <span>Apr (Proj)</span>
                        </div>
                    </div>
                </div>

                <div class="card mt-12">
                    <div class="flex-between mb-4">
                        <h3>Recent Report Archive</h3>
                        <div class="search-box small border rounded flex align-center px-2" style="background:#fff; width:220px;">
                            <i class="fas fa-search text-muted"></i>
                            <input type="text" placeholder="Search archive..." style="border:none; padding:8px; outline:none; background:transparent; width:100%;">
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="data-table small">
                            <thead><tr><th>Date Generated</th><th>Report Title</th><th>Generated By</th><th>Format</th><th>Action</th></tr></thead>
                            <tbody>
                                <tr><td>Mar 1, 2026</td><td>February Financial Close</td><td>System Daemon</td><td><span class="badge info">PDF</span></td><td><button class="btn btn-link small"><i class="fas fa-download"></i></button></td></tr>
                                <tr><td>Feb 1, 2026</td><td>January Financial Close</td><td>System Daemon</td><td><span class="badge info">PDF</span></td><td><button class="btn btn-link small"><i class="fas fa-download"></i></button></td></tr>
                                <tr><td>Yesterday</td><td>Ad-hoc Doctor Load Report</td><td>Admin User</td><td><span class="badge success">CSV</span></td><td><button class="btn btn-link small"><i class="fas fa-download"></i></button></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    };

    window.app.renderAdminSettings = function() {
        mainViewContent.innerHTML = `
            <div class="admin-settings">
                <div class="grid-2 mb-6">
                    <div class="card border-l-4" style="border-left-color: var(--warning);">
                        <h3>System Maintenance Mode</h3>
                        <p class="text-sm text-muted mt-2">Schedule downtime and broadcast a banner to all active users.</p>
                        <div class="mt-4">
                            <label class="form-label text-sm font-medium">Target Time</label>
                            <input type="datetime-local" id="maintenanceTime" class="form-control full-width mb-4" value="2026-03-27T23:00">
                            
                            <label class="form-label text-sm font-medium">Broadcast Message</label>
                            <textarea id="maintenanceMsg" class="form-control full-width mb-4" rows="2" style="resize:none;">System Maintenance: Scheduled clinical upgrades incoming. Please save your work.</textarea>
                            
                            <div class="flex gap-2 mt-4">
                                <button class="btn btn-primary full-width" onclick="window.app.activateMaintenance()"><i class="fas fa-broadcast-tower"></i> Broadcast Warning</button>
                                <button class="btn btn-outline" style="min-width: 50px;" onclick="window.app.deactivateMaintenance()" title="Clear Broadcast"><i class="fas fa-times text-danger"></i></button>
                            </div>
                        </div>
                    </div>
                    
                    <div class="card danger-zone" style="border-left: 4px solid var(--danger); background: linear-gradient(to bottom right, #ffffff, #fff5f5);">
                        <h3>Break-Glass Access Protocol</h3>
                        <p class="mt-2 text-sm text-muted">Request emergency read/write access to restricted modules strictly for audits or crisis management.</p>
                        
                        <div class="mt-4">
                            <label class="form-label text-sm font-medium">Targeted Module</label>
                            <select id="escalationTarget" class="form-control full-width mb-3">
                                <option>Patient Master Records (Confidential)</option>
                                <option>Pediatric Ward Charts</option>
                                <option>Prescription Archival (Schedule II)</option>
                            </select>
                            
                            <label class="form-label text-sm font-medium">Justification / Reason</label>
                            <input type="text" id="escalationReason" class="form-control full-width mb-4" placeholder="Reason for authorization (legally mandated)...">
                            
                            <button class="btn btn-primary full-width mt-2" style="background: var(--danger); border-color: var(--danger); box-shadow: 0 4px 10px rgba(229,62,62,0.3);" onclick="window.app.requestBreakGlass()"><i class="fas fa-shield-alt"></i> Request Temporal Access</button>
                        </div>
                    </div>
                </div>

                <!-- Hidden Panel for Escalation tracking -->
                <div class="card mb-6" style="display: none; border: 1px solid var(--info);" id="breakGlassRequestsPanel">
                    <div class="flex-between mb-4">
                        <h3 class="text-info"><i class="fas fa-clipboard-list"></i> Active Escalations & Approvals</h3>
                        <span class="badge info">Monitored by Security Team</span>
                    </div>
                    <div class="table-responsive">
                        <table class="data-table small">
                            <thead><tr><th>Target Module</th><th>Requested At</th><th>Legal Justification</th><th>Status</th><th>Time Window</th></tr></thead>
                            <tbody id="breakGlassTable">
                                <!-- Requests populated dynamically via JS -->
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="card full-width">
                    <div class="flex-between mb-4">
                        <div>
                            <h3>Role-Based Access Control (RBAC)</h3>
                            <p class="text-sm text-muted">Configure granular module permissions for clinical and administrative staff.</p>
                        </div>
                        <div class="flex gap-2 align-center">
                            <div class="search-box small border rounded flex align-center px-2" style="background:#f8fafc; width: 250px;">
                                <i class="fas fa-search text-muted"></i>
                                <input type="text" placeholder="Search specific policies..." style="border:none; padding:8px; outline:none; background:transparent; width:100%;">
                            </div>
                            <button class="btn btn-primary small" onclick="window.app.showToast('Saved', 'Access control matrix updated successfully.', 'success')"><i class="fas fa-save"></i> Save Rules</button>
                        </div>
                    </div>
                    
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Security Policy / Module</th>
                                    <th class="text-center">Doctors</th>
                                    <th class="text-center">Nurses</th>
                                    <th class="text-center">Reception</th>
                                    <th class="text-center">Pharm</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><strong>Patient Master Records</strong><br><small class="text-muted">Full read/write access to medical history</small></td>
                                    <td class="text-center"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                </tr>
                                <tr>
                                    <td><strong>Financial Ledger & POS</strong><br><small class="text-muted">Process payments, refunds, and view invoices</small></td>
                                    <td class="text-center"><input type="checkbox" style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                </tr>
                                <tr>
                                    <td><strong>Appointment Scheduling</strong><br><small class="text-muted">Book, swap, and cancel global patient visits</small></td>
                                    <td class="text-center"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                </tr>
                                <tr>
                                    <td><strong>Prescription E-Signing</strong><br><small class="text-muted">Authorize and digitally sign clinical scripts</small></td>
                                    <td class="text-center"><input type="checkbox" checked style="width:16px; height:16px; accent-color:var(--primary);"></td>
                                    <td class="text-center"><input type="checkbox" disabled style="width:16px; height:16px;"></td>
                                    <td class="text-center"><input type="checkbox" disabled style="width:16px; height:16px;"></td>
                                    <td class="text-center"><input type="checkbox" disabled style="width:16px; height:16px;"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    };

    window.app.activateMaintenance = function() {
        const timeVal = document.getElementById('maintenanceTime').value;
        const msgVal = document.getElementById('maintenanceMsg').value;
        
        let banner = document.getElementById('maintenanceBanner');
        if (!banner) {
            banner = document.createElement('div');
            banner.id = 'maintenanceBanner';
            banner.className = 'maintenance-banner flex-between';
            banner.style.padding = '12px 24px';
            banner.style.background = '#feebc8'; // warning light
            banner.style.color = '#975a16'; // warning dark
            banner.style.textAlign = 'center';
            banner.style.fontWeight = '500';
            banner.style.position = 'sticky';
            banner.style.top = '0';
            banner.style.zIndex = '9999';
            banner.style.borderBottom = '2px solid #ed8936';
            document.body.prepend(banner);
        }
        
        const formattedTime = new Date(timeVal).toLocaleString();
        banner.innerHTML = `
            <span><i class="fas fa-tools mr-2"></i> <strong>Maintenance Alert (${formattedTime}):</strong> ${msgVal}</span>
            <button onclick="window.app.deactivateMaintenance()" style="background:transparent; border:none; cursor:pointer; color:#975a16;"><i class="fas fa-times"></i></button>
        `;
        
        if (window.app.showToast) window.app.showToast('Broadcast Live', 'Maintenance banner broadcasted across all active sessions.', 'warning');
    };

    window.app.deactivateMaintenance = function() {
        const banner = document.getElementById('maintenanceBanner');
        if (banner) {
            banner.remove();
            if (window.app.showToast) window.app.showToast('Maintenance Cleared', 'System broadcasts removed.', 'success');
        }
    };
    
    window.app.requestBreakGlass = function() {
        const target = document.getElementById('escalationTarget').selectedOptions[0].text;
        const reason = document.getElementById('escalationReason').value;
        
        if (!reason.trim()) {
            if (window.app.showToast) window.app.showToast('Hold on', 'A valid reason is legally mandated for this override protocol.', 'error');
            return;
        }
        
        // Show the panel
        document.getElementById('breakGlassRequestsPanel').style.display = 'block';
        
        // Append row
        const table = document.getElementById('breakGlassTable');
        const now = new Date().toLocaleTimeString();
        table.innerHTML += `
            <tr>
                <td><strong>${target}</strong></td>
                <td>Today, ${now}</td>
                <td><em>"${reason}"</em></td>
                <td><span class="badge warning">Pending Auth</span></td>
                <td><span class="text-muted">Awaiting Action</span></td>
            </tr>
        `;
        
        if (window.app.showToast) window.app.showToast('Escalation Sent', 'Request forwarded to Medical Director.', 'info');
        document.getElementById('escalationReason').value = '';
    };
});
