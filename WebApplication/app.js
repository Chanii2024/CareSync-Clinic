/**
 * CareSync Patient Portal Logic
 * Focus: View handling, Robust Form Validations, Custom Notifications
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Global Namespace ---
    window.app = window.app || {};

    // --- Global State ---
    let currentRole = 'patient';
    // bookingState is now handled in booking-portal.js

    // UI Elements
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    // Role Switcher elements are defined below in the role switcher logic section
    const navItems = document.querySelectorAll('.nav-item');
    const navList = document.querySelector('.sidebar-nav ul');
    const mainViewContent = document.getElementById('mainViewContent');
    const viewTitle = document.getElementById('viewTitle');
    const headerRoleText = document.getElementById('currentUserRoleHeader');
    const authOverlay = document.getElementById('authOverlay');
    const loginForm = document.getElementById('loginForm');
    const closeAuthModal = document.getElementById('closeAuthModal');
    const guestLoginBtn = document.getElementById('guestLoginBtn');
    const headerUserProfile = document.getElementById('headerUserProfile');
    const profileDropdown = document.getElementById('profileDropdown');
    const headerLogoutBtn = document.getElementById('headerLogoutBtn');

    // --- Sidebar Handling (Mobile Responsive) ---
    sidebarToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
    });

    sidebarClose?.addEventListener('click', () => {
        sidebar.classList.remove('open');
    });

    // --- Router Logic (Simulated) ---
    const views = {
        dashboard: renderDashboard,
        profile: renderProfile,
        doctors: renderDoctors,
        booking: () => window.app.renderBooking(),
        appointments: () => window.app.renderAppointments(),
        records: () => window.app.renderRecords(),
        billing: () => window.app.renderBilling(),
        messages: () => window.app.renderMessages(),
        'doc-dashboard': () => window.app.renderDocDashboard(),
        'doc-patients': () => window.app.renderDocPatients(),
        'doc-labs': () => window.app.renderDocLabs(),
        'doc-schedule': () => window.app.renderDocSchedule(),
        'doc-analytics': () => window.app.renderDocAnalytics(),
        'doc-patient-detail': (id) => window.app.renderDocConsultation(id),
        'rec-dashboard': () => window.app.renderRecDashboard(),
        'rec-appointments': () => window.app.renderRecAppointments(),
        'rec-payments': () => window.app.renderRecPayments(),
        'rec-reports': () => window.app.renderRecReports(),
        'phar-dashboard': renderPharDashboard,
        'phar-inventory': renderPharInventory,
        'phar-dispense': renderPharDispense,
        'phar-reports': renderPharReports,
        'admin-dashboard': renderAdminDashboard,
        'admin-users': renderAdminUsers,
        'admin-complaints': renderAdminComplaints,
        'admin-logs': renderAdminLogs,
        'admin-settings': renderAdminSettings,
        'nurse-dashboard': renderNurseDashboard,
        'nurse-intake': renderNurseIntake,
        'nurse-procedures': renderNurseProcedures,
        'nurse-meds': renderNurseMeds,
        'nurse-edu': renderNurseEdu
    };

    // --- Role Switcher (Premium Dropdown) Logic ---
    const roleSwitcher = document.getElementById('roleSwitcher');
    const roleDropdownBtn = document.getElementById('roleDropdownBtn');
    const roleDropdownMenu = document.getElementById('roleDropdownMenu');
    const roleOptions = document.querySelectorAll('.role-option');
    const currentRoleDisplay = document.getElementById('currentRoleDisplay');

    roleDropdownBtn?.addEventListener('click', (e) => {
        e.stopPropagation();
        roleDropdownBtn.classList.toggle('active');
        roleDropdownMenu.classList.toggle('show');
    });

    roleOptions.forEach(option => {
        option.addEventListener('click', () => {
            const selectedRole = option.getAttribute('data-role');
            currentRole = selectedRole;
            
            // UI Feedback
            roleOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Close dropdown
            roleDropdownBtn.classList.remove('active');
            roleDropdownMenu.classList.remove('show');
            
            updateUIRole();
        });
    });

    // Close on click outside
    document.addEventListener('click', (e) => {
        if (!roleSwitcher?.contains(e.target)) {
            roleDropdownBtn?.classList.remove('active');
            roleDropdownMenu?.classList.remove('show');
        }
    });

    const roleMap = {
        patient: 'Patient Portal',
        doctor: 'Doctor Portal',
        nurse: 'Nurse Portal',
        receptionist: 'Receptionist',
        pharmacist: 'Pharmacist',
        admin: 'Admin Center'
    };

    function updateUIRole() {
        const roleDisplay = currentRole.charAt(0).toUpperCase() + currentRole.slice(1);
        if (headerRoleText) headerRoleText.textContent = roleDisplay;
        if (currentRoleDisplay) currentRoleDisplay.textContent = roleMap[currentRole] || roleDisplay;

        // Update trigger icon based on role
        const triggerIcon = roleDropdownBtn?.querySelector('.trigger-icon i');
        if (triggerIcon) {
            const iconMap = {
                patient: 'fa-user',
                doctor: 'fa-user-md',
                nurse: 'fa-user-nurse',
                receptionist: 'fa-concierge-bell',
                pharmacist: 'fa-pills',
                admin: 'fa-user-shield'
            };
            triggerIcon.className = `fas ${iconMap[currentRole] || 'fa-user-tag'}`;
        }

        // Update name/email in dropdown
        const dropName = profileDropdown?.querySelector('strong');
        const dropEmail = profileDropdown?.querySelector('span');
        if (dropName) dropName.textContent = `Tang San (${roleDisplay})`;
        if (dropEmail) dropEmail.textContent = `${currentRole}@gmail.com`;

        // Routing based on role
        if (currentRole === 'doctor') {
            renderDoctorSidebar();
            switchView('doc-dashboard');
        } else if (currentRole === 'nurse') {
            renderNurseSidebar();
            switchView('nurse-dashboard');
        } else if (currentRole === 'receptionist') {
            renderReceptionistSidebar();
            switchView('rec-dashboard');
        } else if (currentRole === 'pharmacist') {
            renderPharmacistSidebar();
            switchView('phar-dashboard');
        } else if (currentRole === 'admin') {
            renderAdminSidebar();
            switchView('admin-dashboard');
        } else {
            renderPatientSidebar();
            switchView('dashboard');
        }
    }

    function renderDoctorSidebar() {
        navList.innerHTML = `
            <li class="nav-item active" data-view="doc-dashboard">
                <a href="#"><i class="fas fa-tasks"></i> <span>Daily Queue</span></a>
            </li>
            <li class="nav-item" data-view="doc-patients">
                <a href="#"><i class="fas fa-users"></i> <span>My Patients</span></a>
            </li>
            <li class="nav-item" data-view="doc-labs">
                <a href="#"><i class="fas fa-flask"></i> <span>Lab Results</span></a>
            </li>
            <li class="nav-item" data-view="doc-schedule">
                <a href="#"><i class="fas fa-calendar-alt"></i> <span>Schedule</span></a>
            </li>
            <li class="nav-item" data-view="doc-analytics">
                <a href="#"><i class="fas fa-chart-line"></i> <span>Practice Analytics</span></a>
            </li>
        `;
        attachNavEvents();
    }

    function renderAdminSidebar() {
        navList.innerHTML = `
            <li class="nav-item active" data-view="admin-dashboard">
                <a href="#"><i class="fas fa-user-shield"></i> <span>Control Center</span></a>
            </li>
            <li class="nav-item" data-view="admin-users">
                <a href="#"><i class="fas fa-users-cog"></i> <span>User Management</span></a>
            </li>
            <li class="nav-item" data-view="admin-complaints">
                <a href="#"><i class="fas fa-comment-medical"></i> <span>Complaint Box</span></a>
            </li>
            <li class="nav-item" data-view="admin-logs">
                <a href="#"><i class="fas fa-history"></i> <span>Audit Logs</span></a>
            </li>
            <li class="nav-item" data-view="admin-settings">
                <a href="#"><i class="fas fa-cogs"></i> <span>System Settings</span></a>
            </li>
        `;
        attachNavEvents();
    }

    function renderNurseSidebar() {
        navList.innerHTML = `
            <li class="nav-item active" data-view="nurse-dashboard">
                <a href="#"><i class="fas fa-clipboard-list"></i> <span>Daily Tasks</span></a>
            </li>
            <li class="nav-item" data-view="nurse-intake">
                <a href="#"><i class="fas fa-user-check"></i> <span>Patient Intake</span></a>
            </li>
            <li class="nav-item" data-view="nurse-procedures">
                <a href="#"><i class="fas fa-microscope"></i> <span>Procedures & Lab</span></a>
            </li>
            <li class="nav-item" data-view="nurse-meds">
                <a href="#"><i class="fas fa-pills"></i> <span>MAR & Vaccines</span></a>
            </li>
            <li class="nav-item" data-view="nurse-edu">
                <a href="#"><i class="fas fa-graduation-cap"></i> <span>Patient Edu</span></a>
            </li>
        `;
        attachNavEvents();
    }

    function renderPharmacistSidebar() {
        navList.innerHTML = `
            <li class="nav-item active" data-view="phar-dashboard">
                <a href="#"><i class="fas fa-prescription-bottle-alt"></i> <span>Rx Queue</span></a>
            </li>
            <li class="nav-item" data-view="phar-inventory">
                <a href="#"><i class="fas fa-boxes"></i> <span>Inventory</span></a>
            </li>
            <li class="nav-item" data-view="phar-dispense">
                <a href="#"><i class="fas fa-hand-holding-medical"></i> <span>Safety & Dispense</span></a>
            </li>
            <li class="nav-item" data-view="phar-reports">
                <a href="#"><i class="fas fa-file-invoice"></i> <span>Finance</span></a>
            </li>
        `;
        attachNavEvents();
    }

    function renderReceptionistSidebar() {
        navList.innerHTML = `
            <li class="nav-item active" data-view="rec-dashboard">
                <a href="#"><i class="fas fa-calendar-alt"></i> <span>Calendar</span></a>
            </li>
            <li class="nav-item" data-view="rec-appointments">
                <a href="#"><i class="fas fa-edit"></i> <span>Manage Bookings</span></a>
            </li>
            <li class="nav-item" data-view="rec-payments">
                <a href="#"><i class="fas fa-cash-register"></i> <span>Counter Payments</span></a>
            </li>
            <li class="nav-item" data-view="rec-reports">
                <a href="#"><i class="fas fa-file-contract"></i> <span>Daily Reports</span></a>
            </li>
        `;
        attachNavEvents();
    }

    function renderPatientSidebar() {
        navList.innerHTML = `
            <li class="nav-item active" data-view="dashboard">
                <a href="#"><i class="fas fa-th-large"></i> <span>Dashboard</span></a>
            </li>
            <li class="nav-item" data-view="profile">
                <a href="#"><i class="fas fa-user-circle"></i> <span>My Profile</span></a>
            </li>
            <li class="nav-item" data-view="doctors">
                <a href="#"><i class="fas fa-user-md"></i> <span>Find Doctors</span></a>
            </li>
            <li class="nav-item" data-view="booking">
                <a href="#"><i class="fas fa-calendar-plus"></i> <span>Book Appointment</span></a>
            </li>
            <li class="nav-item" data-view="appointments">
                <a href="#"><i class="fas fa-calendar-check"></i> <span>Upcoming Visits</span></a>
            </li>
            <li class="nav-item" data-view="records">
                <a href="#"><i class="fas fa-file-medical"></i> <span>Health Records</span></a>
            </li>
            <li class="nav-item" data-view="billing">
                <a href="#"><i class="fas fa-file-invoice-dollar"></i> <span>Billing</span></a>
            </li>
             <li class="nav-item" data-view="messages">
                <a href="#"><i class="fas fa-comment-medical"></i> <span>Messages</span></a>
            </li>
        `;
        attachNavEvents();
    }

    function attachNavEvents() {
        const items = document.querySelectorAll('.nav-item');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                items.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                if (window.innerWidth <= 768) sidebar.classList.remove('open');
                switchView(item.getAttribute('data-view'));
            });
        });
    }

    // Replace original nav click handling with attachNavEvents() calls
    attachNavEvents();

    function switchView(viewKey) {
        // Close mobile sidebars/filters if open
        sidebar.classList.remove('open');
        const localFilter = document.getElementById('localFilterSidebar');
        const filterOverlay = document.getElementById('filterOverlay');
        if (localFilter) localFilter.classList.remove('open');
        if (filterOverlay) filterOverlay.classList.remove('active');
        document.body.style.overflow = '';

        // Update active class on nav items
        const items = document.querySelectorAll('.nav-item');
        items.forEach(nav => nav.classList.remove('active'));
        const activeNav = document.querySelector(`.nav-item[data-view="${viewKey}"]`);
        if (activeNav) activeNav.classList.add('active');

        // Show loading state
        mainViewContent.innerHTML = `
            <div class="view-loading">
                <div class="spinner"></div>
            </div>
        `;

        // Update Title
        const navItem = document.querySelector(`.nav-item[data-view="${viewKey}"] span`);
        viewTitle.textContent = navItem ? navItem.textContent : 'Dashboard';

        // Simulate network delay for "Perfect alignment/planning" feel
        setTimeout(() => {
            if (views[viewKey]) {
                views[viewKey]();
            } else {
                mainViewContent.innerHTML = `<div class="p-8"><h2>Coming Soon</h2><p>The ${viewKey} module is under construction.</p></div>`;
            }
        }, 300);
    }

    // --- View Renderers (Mock Content for now) ---
    function renderDashboard() {
        mainViewContent.innerHTML = `
            <div class="dashboard-grid">
                <div class="welcome-card card full-width">
                    <div class="welcome-text">
                        <h2>Welcome back, Chamath! 👋</h2>
                        <p>You have an appointment with Dr. Silva tomorrow at 9:30 AM.</p>
                    </div>
                    <button class="btn btn-primary">Check Details</button>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-card card">
                        <i class="fas fa-heartbeat"></i>
                        <div class="stat-info">
                            <span class="label">Last Heart Rate</span>
                            <span class="value">72 bpm</span>
                        </div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-prescription"></i>
                        <div class="stat-info">
                            <span class="label">Prescriptions</span>
                            <span class="value">02 Active</span>
                        </div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-vial"></i>
                        <div class="stat-info">
                            <span class="label">Lab Reports</span>
                            <span class="value">03 Pending</span>
                        </div>
                    </div>
                </div>

                <div class="recent-activity card">
                    <div class="flex-between mb-4">
                        <h3>Recent Activity</h3>
                        <button class="btn btn-link small" onclick="window.app.switchView('records')">View All History</button>
                    </div>
                    <div class="activity-list">
                        <!-- Upcoming Appointment Item -->
                        <div class="activity-item highlight-item">
                            <div class="activity-icon purple"><i class="fas fa-calendar-check"></i></div>
                            <div class="activity-details">
                                <span class="action">Upcoming Appointment: Dr. Rohan Silva</span>
                                <span class="time">Tomorrow, 09:30 AM</span>
                                <button class="btn btn-link" onclick="window.app.switchView('appointments')">
                                    View Full Detail <i class="fas fa-arrow-right"></i>
                                </button>
                            </div>
                        </div>

                        <!-- Prescription Item -->
                        <div class="activity-item">
                            <div class="activity-icon orange"><i class="fas fa-file-prescription"></i></div>
                            <div class="activity-details">
                                <span class="action">New Prescription Issued: Rx #99201</span>
                                <span class="time">1 hour ago</span>
                            </div>
                        </div>

                        <!-- Lab Result Item -->
                        <div class="activity-item">
                            <div class="activity-icon"><i class="fas fa-vial"></i></div>
                            <div class="activity-details">
                                <span class="action">Lab Result Ready: Blood Morphology</span>
                                <span class="time">Today, 10:15 AM</span>
                            </div>
                        </div>

                        <!-- Payment Item -->
                        <div class="activity-item">
                            <div class="activity-icon blue"><i class="fas fa-credit-card"></i></div>
                            <div class="activity-details">
                                <span class="action">Payment Confirmed: Bill #INV-Care22</span>
                                <span class="time">Yesterday</span>
                            </div>
                        </div>

                        <!-- General History Item -->
                        <div class="activity-item">
                            <div class="activity-icon"><i class="fas fa-check-circle"></i></div>
                            <div class="activity-details">
                                <span class="action">Blood Test Results Uploaded</span>
                                <span class="time">2 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderProfile() {
        mainViewContent.innerHTML = `
            <div class="profile-container">
                <div class="profile-header card">
                    <div class="profile-summary">
                        <div class="avatar-upload">
                            <img src="https://ui-avatars.com/api/?name=Tang+San&background=1a365d&color=fff" id="profilePreview" class="profile-avatar-lg">
                            <button class="btn-edit-avatar"><i class="fas fa-camera"></i></button>
                        </div>
                        <div class="profile-title">
                            <h3>Permanent Patient Profile</h3>
                            <p>Manage your core medical information for all clinic activities.</p>
                        </div>
                    </div>
                    <div class="header-actions">
                        <button type="submit" form="profileForm" class="btn btn-accent large shadow-accent"><i class="fas fa-save"></i> Save My Profile</button>
                    </div>
                </div>

                <div class="profile-scroll-box">
                    <form id="profileForm">
                        <!-- Section 1: Personal Information -->
                        <div class="profile-section card">
                            <div class="section-title"><i class="fas fa-user"></i> Personal Information</div>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="fullName">Full Name</label>
                                    <input type="text" id="fullName" value="Tang San" required>
                                    <span class="validation-msg"></span>
                                </div>
                                <div class="form-group">
                                    <label for="dob">Date of Birth</label>
                                    <input type="date" id="dob" value="1995-05-15" required>
                                    <span class="validation-msg"></span>
                                </div>
                                <div class="form-group">
                                    <label for="gender">Gender</label>
                                    <select id="gender" class="custom-select">
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="nic">NIC / Passport Number</label>
                                    <input type="text" id="nic" value="199500000000" required>
                                    <span class="validation-msg"></span>
                                </div>
                                <div class="form-group">
                                    <label for="bloodGroup">Blood Group</label>
                                    <select id="bloodGroup" class="custom-select">
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Section 2: Contact Details -->
                        <div class="profile-section card">
                            <div class="section-title"><i class="fas fa-address-book"></i> Contact Information</div>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="email">Email Address</label>
                                    <input type="email" id="email" value="chamath@example.com" required>
                                    <span class="validation-msg"></span>
                                </div>
                                <div class="form-group">
                                    <label for="phone">Primary Phone Number</label>
                                    <input type="text" id="phone" value="0771234567" placeholder="07XXXXXXXX" required>
                                    <span class="validation-msg"></span>
                                </div>
                                <div class="form-group full-width">
                                    <label for="address">Home Address</label>
                                    <textarea id="address" rows="2" placeholder="Street Address, Area">No. 123, Galle Road, Colombo 03</textarea>
                                    <span class="validation-msg"></span>
                                </div>
                                <div class="form-group">
                                    <label for="city">City</label>
                                    <input type="text" id="city" value="Colombo">
                                </div>
                                <div class="form-group">
                                    <label for="district">District</label>
                                    <select id="district" class="custom-select">
                                        <option value="Colombo">Colombo</option>
                                        <option value="Gampaha">Gampaha</option>
                                        <option value="Kalutara">Kalutara</option>
                                        <option value="Kandy">Kandy</option>
                                        <option value="Galle">Galle</option>
                                        <option value="Matara">Matara</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Section 3: Emergency Contact -->
                        <div class="profile-section card">
                            <div class="section-title"><i class="fas fa-ambulance"></i> Emergency Contact</div>
                            <div class="form-grid">
                                <div class="form-group">
                                    <label for="emergencyName">Contact Name</label>
                                    <input type="text" id="emergencyName" value="Mrs. Tang" required>
                                    <span class="validation-msg"></span>
                                </div>
                                <div class="form-group">
                                    <label for="relationship">Relationship</label>
                                    <select id="relationship" class="custom-select">
                                        <option value="Spouse">Spouse</option>
                                        <option value="Parent">Parent</option>
                                        <option value="Child">Child</option>
                                        <option value="Sibling">Sibling</option>
                                        <option value="Guardian">Guardian</option>
                                        <option value="Other">Other</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="emergencyPhone">Emergency Phone Number</label>
                                    <input type="text" id="emergencyPhone" value="0719876543" placeholder="0XXXXXXXXX" required>
                                    <span class="validation-msg"></span>
                                </div>
                            </div>
                        </div>

                        <!-- Section 4: Medical Brief -->
                        <div class="profile-section card">
                            <div class="section-title"><i class="fas fa-notes-medical"></i> Medical Background</div>
                            <div class="form-grid">
                                <div class="form-group full-width">
                                    <label for="allergies">Known Allergies</label>
                                    <textarea id="allergies" rows="2" placeholder="e.g. Penicillin, Peanuts, Latex">None</textarea>
                                </div>
                                <div class="form-group full-width">
                                    <label for="chronic">Chronic Conditions</label>
                                    <textarea id="chronic" rows="2" placeholder="e.g. Diabetes, Hypertension, Asthma">None</textarea>
                                </div>
                                <div class="form-group">
                                    <label>Organ Donor Status</label>
                                    <div class="toggle-group">
                                        <label class="switch">
                                            <input type="checkbox" id="organDonor">
                                            <span class="slider round"></span>
                                        </label>
                                        <span>Registered Organ Donor</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        `;
        initFormValidation('profileForm');
    }

    window.app.doctorsData = [
        {
            id: 1,
            name: 'Dr. Rohan Silva',
            specialty: 'Cardiologist',
            experience: '15 yrs',
            rating: 4.8,
            reviews: 124,
            fee: 2500,
            regNo: 'SLMC-45210',
            status: 'Active Now',
            languages: ['English', 'Sinhala'],
            nextAvailable: 'Today 4:30 PM',
            todaySlots: ['4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'],
            tomorrowSlots: ['9:30 AM', '10:00 AM', '10:30 AM'],
            timeRange: 'Evening',
            about: 'Specialist in interventional cardiology with over 15 years of experience in managing complex heart conditions.',
            qualifications: 'MBBS, MD (Medicine), MRCP (UK)',
            location: 'Wing B, 2nd Floor, Room 204'
        },
        {
            id: 2,
            name: 'Dr. Priya Sharma',
            specialty: 'Dermatologist',
            experience: '8 yrs',
            rating: 4.9,
            reviews: 89,
            fee: 1800,
            regNo: 'SLMC-88291',
            status: 'Next slot at 5 PM',
            languages: ['English', 'Hindi'],
            nextAvailable: 'Tomorrow 10:00 AM',
            todaySlots: ['10:00 AM', '10:30 AM', '11:00 AM'],
            tomorrowSlots: ['3:00 PM', '3:30 PM', '4:00 PM'],
            timeRange: 'Morning',
            about: 'Board-certified dermatologist specializing in clinical and aesthetic dermatology.',
            qualifications: 'MBBS, MD (Dermatology)',
            location: 'Wing A, 4th Floor, Room 412'
        },
        {
            id: 3,
            name: 'Dr. Anand Menon',
            specialty: 'Pediatrician',
            experience: '20 yrs',
            rating: 4.9,
            reviews: 312,
            fee: 1000,
            regNo: 'SLMC-12093',
            status: 'Active Now',
            languages: ['English', 'Malayalam', 'Kannada'],
            nextAvailable: 'Friday 9:30 AM',
            todaySlots: ['9:30 AM', '10:00 AM', '2:00 PM', '2:30 PM'],
            tomorrowSlots: ['10:30 AM', '11:00 AM', '11:30 AM'],
            timeRange: 'Mixed',
            about: 'A senior pediatrician dedicated to child health and development for over two decades.',
            qualifications: 'MBBS, DCH, MD (Pediatrics)',
            location: 'Wing C, 1st Floor, Room 105'
        },
        {
            id: 4,
            name: 'Dr. Sarah Johnson',
            specialty: 'Neurologist',
            experience: '12 yrs',
            rating: 4.7,
            reviews: 145,
            fee: 1200,
            regNo: 'SLMC-33412',
            status: 'In Surgery',
            languages: ['English', 'French'],
            nextAvailable: 'Monday 11:00 AM',
            todaySlots: ['11:00 AM', '11:30 AM'],
            tomorrowSlots: ['02:00 PM', '02:30 PM', '03:00 PM'],
            timeRange: 'Morning',
            about: 'Expert in treating complex neurological disorders including epilepsy and migraine.',
            qualifications: 'MBBS, MD, Fellowship in Neurology (London)',
            location: 'Wing D, 3rd Floor, Room 302'
        },
        {
            id: 5,
            name: 'Dr. Michael Chen',
            specialty: 'Orthopedic Surgeon',
            experience: '18 yrs',
            rating: 4.9,
            reviews: 420,
            fee: 1500,
            regNo: 'SLMC-55102',
            status: 'Active Now',
            languages: ['English', 'Mandarin'],
            nextAvailable: 'Today 2:00 PM',
            todaySlots: ['2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM'],
            tomorrowSlots: ['09:00 AM', '09:30 AM', '10:00 AM'],
            timeRange: 'Afternoon',
            about: 'Specialist in joint replacement and sports medicine with global experience.',
            qualifications: 'MBBS, MS (Ortho), FRCS',
            location: 'Wing A, Ground Floor, Room 05'
        }
    ];

    const doctorsData = window.app.doctorsData;

    let activeSpecialty = 'All Specialties';

    function renderDoctors() {
        const filteredDoctors = activeSpecialty === 'All Specialties'
            ? doctorsData
            : doctorsData.filter(d => d.specialty.includes(activeSpecialty) || activeSpecialty.includes(d.specialty));

        mainViewContent.innerHTML = `
            <div class="doctors-container">
                <div class="search-filter-bar">
                    <div class="search-box">
                        <i class="fas fa-search"></i>
                        <input type="text" placeholder="Search by name, specialty, or condition...">
                    </div>
                    <button class="icon-btn mobile-filter-toggle" onclick="window.app.toggleLocalFilters()">
                        <i class="fas fa-filter"></i>
                    </button>
                </div>

                <div class="doctors-grid-layout">
                    <!-- Local Filter Sidebar -->
                    <aside class="local-filter-sidebar" id="localFilterSidebar">
                        <div class="filter-mobile-header">
                            <h3>Filters</h3>
                            <button class="close-filters" onclick="window.app.toggleLocalFilters()"><i class="fas fa-times"></i></button>
                        </div>
                        <div class="filter-section">
                            <h4><i class="fas fa-stethoscope"></i> Specialty</h4>
                            <div class="filter-options">
                                ${['All Specialties', 'Cardiology', 'Dermatology', 'Pediatrics', 'Neurology', 'Orthopedics'].map(spec => `
                                    <div class="filter-item ${activeSpecialty === spec ? 'active' : ''}" onclick="window.app.setSpecialtyFilter('${spec}')">
                                        <div class="checkbox-custom"></div>
                                        <span>${spec}</span>
                                    </div>
                                `).join('')}
                            </div>
                        </div>

                        <div class="filter-section">
                            <h4><i class="fas fa-language"></i> Language</h4>
                            <div class="filter-options">
                                <div class="filter-item active">
                                    <div class="checkbox-custom"></div>
                                    <span>English</span>
                                </div>
                                <div class="filter-item">
                                    <div class="checkbox-custom"></div>
                                    <span>Hindi</span>
                                </div>
                                <div class="filter-item">
                                    <div class="checkbox-custom"></div>
                                    <span>Tamil</span>
                                </div>
                            </div>
                        </div>

                        <div class="filter-section">
                            <h4><i class="fas fa-wallet"></i> Fee Range</h4>
                            <div class="range-slider">
                                <input type="range" class="full-width" min="400" max="2500" value="1500">
                                <div class="range-labels">
                                    <span>₹400</span>
                                    <span>₹2500+</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="filter-section">
                            <h4><i class="fas fa-star"></i> Patient Rating</h4>
                            <div class="filter-options">
                                <div class="filter-item">
                                    <div class="checkbox-custom"></div>
                                    <span>4.5+ Rating</span>
                                </div>
                                <div class="filter-item">
                                    <div class="checkbox-custom"></div>
                                    <span>4.0+ Rating</span>
                                </div>
                            </div>
                        </div>
                    </aside>

                    <!-- Results Column -->
                    <div class="doctors-results-grid">
                        <div class="results-header full-width" style="margin-bottom: 20px; font-weight: 700; color: var(--primary);">
                            ${filteredDoctors.length} Doctors Found
                        </div>
                        ${filteredDoctors.map(doc => renderDoctorCard(doc)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    // Filter Logic
    window.app.setSpecialtyFilter = (spec) => {
        activeSpecialty = spec;
        renderDoctors();
    };

    window.app.toggleLocalFilters = () => {
        const sidebar = document.getElementById('localFilterSidebar');
        let overlay = document.getElementById('filterOverlay');

        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'filterOverlay';
            overlay.className = 'filter-overlay';
            overlay.onclick = window.app.toggleLocalFilters;
            document.body.appendChild(overlay);
        }

        if (sidebar) {
            const isOpen = sidebar.classList.contains('open');
            if (isOpen) {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
                document.body.style.overflow = '';
            } else {
                sidebar.classList.add('open');
                overlay.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    };

    function renderDoctorCard(doctor) {
        return `
            <div class="doctor-card card" onclick="window.app.renderDoctorDetail(${doctor.id})">
                <div class="doc-info-main">
                    <img src="https://ui-avatars.com/api/?name=${doctor.name.replace(' ', '+')}&background=E6FFFA&color=20c997&bold=true&size=128" alt="Doc" class="doc-img-card">
                    <div class="doc-details-card">
                        <h4>${doctor.name}</h4>
                        <span class="doc-subinfo">${doctor.specialty} • ${doctor.experience} Exp</span>
                        <div class="rating-badge">
                            <i class="fas fa-star"></i> ${doctor.rating} 
                            <span class="rating-count">(${doctor.reviews} reviews)</span>
                        </div>
                    </div>
                </div>

                <div class="doc-extra-info">
                    <div class="info-row">
                        <i class="fas fa-money-bill-wave"></i>
                        <span>Consultation: ₹${doctor.fee}</span>
                    </div>
                    <div class="info-row">
                        <i class="fas fa-globe"></i>
                        <span>${doctor.languages.join(', ')}</span>
                    </div>
                </div>

                <div class="availability-status">
                    <div class="status-indicator"></div>
                    <span>Next: <strong>${doctor.nextAvailable}</strong></span>
                </div>

                <div class="doc-actions-grid">
                    <button class="btn btn-outline" onclick="event.stopPropagation(); window.app.renderDoctorDetail(${doctor.id})">View Profile</button>
                    <button class="btn btn-primary" onclick="event.stopPropagation(); window.app.renderDoctorDetail(${doctor.id})">Book Now</button>
                </div>
            </div>
        `;
    }

    function renderDoctorDetail(doctorId) {
        const doctor = doctorsData.find(d => d.id === doctorId);
        if (!doctor) return;

        // Set this as the active booking doctor
        window.app.bookingState.doctor = doctor;

        mainViewContent.innerHTML = `
            <div class="doctor-detail-container animate-slide-up">
                <a href="#" class="back-nav" onclick="window.app.switchView('doctors'); return false;">
                    <i class="fas fa-arrow-left"></i> Back to Directory
                </a>

                <div class="detail-profile-hero glass-card">
                    <img src="https://ui-avatars.com/api/?name=${doctor.name.replace(' ', '+')}&background=E6FFFA&color=20c997&bold=true&size=256" alt="${doctor.name}" class="detail-img">
                    <div class="detail-main">
                        <h2>${doctor.name}</h2>
                        <span class="specialty-tag">${doctor.specialty}</span>
                        
                        <div class="detail-key-stats">
                            <div class="quick-stat">
                                <strong>${doctor.rating}</strong>
                                <span>Rating</span>
                            </div>
                            <div class="quick-stat">
                                <strong>${doctor.reviews}</strong>
                                <span>Reviews</span>
                            </div>
                            <div class="quick-stat">
                                <strong>${doctor.experience}</strong>
                                <span>Experience</span>
                            </div>
                            <div class="quick-stat">
                                <strong>LKR ${doctor.fee}</strong>
                                <span>Fee</span>
                            </div>
                        </div>

                        <div style="margin-top: 24px; display: flex; gap: 12px; align-items: center; color: var(--text-muted); font-size: 0.9rem; font-weight: 600;">
                            <i class="fas fa-map-marker-alt" style="color: var(--accent);"></i> ${doctor.location}
                        </div>
                    </div>
                </div>

                <div class="detail-sections-grid">
                    <div class="left-col">
                        <div class="detail-section-card card">
                            <h3><i class="fas fa-user-md"></i> About</h3>
                            <p style="color: var(--text-main); line-height: 1.8;">${doctor.about}</p>
                            
                            <h4 style="margin-top: 24px; margin-bottom: 12px; color: var(--primary);">Qualifications</h4>
                            <div class="info-row">
                                <i class="fas fa-graduation-cap"></i>
                                <span>${doctor.qualifications}</span>
                            </div>
                        </div>

                        <div class="detail-section-card card" style="margin-top: 30px;">
                            <h3><i class="fas fa-comment-dots"></i> Patient Reviews</h3>
                            <div class="reviews-list">
                                <div class="patient-review">
                                    <div class="review-meta">
                                        <span class="reviewer-info">Anonymous Patient</span>
                                        <div class="review-stars">
                                            <i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i><i class="fas fa-star"></i>
                                        </div>
                                    </div>
                                    <p class="review-text">"Excellent consultation. The doctor was very patient and explained everything clearly."</p>
                                </div>
                            </div>
                            <button class="btn btn-outline full-width" style="margin-top: 20px;">Read all ${doctor.reviews} reviews</button>
                        </div>
                    </div>

                    <div class="right-col">
                        <div class="detail-section-card glass-card p-6">
                            <h3><i class="fas fa-calendar-check"></i> Available Slots</h3>
                            <p class="text-muted mb-4">Select a date to see times</p>
                            
                            <div id="bookingCalendarContainer"></div>
                            
                            <button class="btn btn-primary full-width mt-6" style="padding: 16px;" onclick="window.app.switchView('booking')">
                                Book Appointment <i class="fas fa-circle-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        renderMonthCalendar('bookingCalendarContainer');
    }

    window.app.renderDoctorDetail = renderDoctorDetail;
    window.app.doctorsData = doctorsData; // Expose doctorsData globally


    // Shared Utilities
    window.app.closeCustomModal = () => {
        const overlay = document.getElementById('customModalOverlay');
        if (overlay) overlay.classList.remove('active');
    };

    // Note: Patient Tab renderers (Appointments, Records, Billing, Messages) 
    // have been moved to patient-visits.js, patient-records.js, etc.




    function initFileUpload() {
        const dropZone = document.getElementById('dropZone');
        const fileInput = document.getElementById('fileInput');
        const fileList = document.getElementById('fileList');

        dropZone?.addEventListener('click', () => fileInput.click());
        fileInput?.addEventListener('change', () => {
            fileList.innerHTML = '';
            Array.from(fileInput.files).forEach(f => {
                const item = document.createElement('div');
                item.className = 'file-item';
                item.innerHTML = `<i class="fas fa-file-pdf"></i> <span>${f.name}</span>`;
                fileList.appendChild(item);
            });
        });
    }


    // --- Auth & Session Logic ---
    function initAuth() {
        // Check for existing session
        const savedRole = localStorage.getItem('careSync_role');
        const isLoggedIn = localStorage.getItem('careSync_loggedIn') === 'true';

        if (isLoggedIn && savedRole) {
            currentRole = savedRole;
            authOverlay.classList.add('hidden');
            updateUIRole();
        }

        loginForm?.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value.toLowerCase();
            const pass = document.getElementById('loginPassword').value;

            if (pass !== 'care123') {
                showToast('Auth Failed', 'Incorrect password. Try care123', 'error');
                return;
            }

            const roleMatch = roles.find(r => email.includes(r.toLowerCase()));
            if (roleMatch) {
                currentRole = roleMatch;
                localStorage.setItem('careSync_loggedIn', 'true');
                localStorage.setItem('careSync_role', currentRole);

                authOverlay.classList.add('hidden');
                updateUIRole();
                showToast('Login Success', `Welcome back! (${roleMatch})`, 'success');
            } else {
                showToast('Invalid Email', 'Please use a valid role-based email.', 'warning');
            }
        });

        // Guest Login Logic
        guestLoginBtn?.addEventListener('click', () => {
            currentRole = 'patient';
            localStorage.setItem('careSync_loggedIn', 'true');
            localStorage.setItem('careSync_role', currentRole);

            authOverlay.classList.add('hidden');
            updateUIRole();
            showToast('Guest Access', 'Logged in as guest patient.', 'info');
        });

        // Close Modal Logic
        closeAuthModal?.addEventListener('click', () => {
            authOverlay.classList.add('hidden');
        });

        // Header Profile Dropdown Toggle
        headerUserProfile?.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('open');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            profileDropdown.classList.remove('open');
        });

        // Dropdown Navigation Logic
        profileDropdown?.querySelectorAll('.dropdown-menu a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const action = link.getAttribute('data-action');
                if (action === 'profile') {
                    switchView('profile');
                    profileDropdown.classList.remove('open');
                } else if (action === 'settings') {
                    showToast('Settings', 'Account settings coming soon.', 'info');
                }
            });
        });

        // Header Logout Logic
        headerLogoutBtn?.addEventListener('click', () => {
            localStorage.removeItem('careSync_loggedIn');
            localStorage.removeItem('careSync_role');
            authOverlay.classList.remove('hidden');
            showToast('Logged Out', 'Safe to close browser.', 'info');
        });
    }

    initAuth();

    // --- Form Validation Logic ---
    function initFormValidation(formId) {
        const form = document.getElementById(formId);
        if (!form) return;

        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => validateInput(input));
            input.addEventListener('blur', () => validateInput(input));
        });

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) isValid = false;
            });

            if (isValid) {
                showToast('Success', 'Profile updated successfully!', 'success');
            } else {
                showToast('Action Required', 'Please fix the errors before saving.', 'error');
            }
        });
    }

    function validateInput(input) {
        const value = input.value.trim();
        const msgElement = input.nextElementSibling;
        let valid = true;
        let msg = '';

        if (input.id === 'phone' || input.id === 'emergencyPhone' || input.id === 'patientPhone') {
            // Sri Lankan Phone Logic: 0XXXXXXXXX (10) or 9 digits or +94...
            const slRegex = /^(?:\+94|0)?(?:7\d{8}|[1-9]\d{8})$/;
            if (!value && input.required) {
                valid = false;
                msg = 'Phone number is required';
            } else if (value && !slRegex.test(value)) {
                valid = false;
                msg = 'Invalid Sri Lankan phone number format';
            }
        } else if (input.id === 'fullName' || input.id === 'emergencyName' || input.id === 'patientName') {
            if (/\d/.test(value)) {
                valid = false;
                msg = 'Name cannot contain numbers';
            } else if (value.length < 3 && input.required) {
                valid = false;
                msg = 'Name is too short';
            }
        } else if (input.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value) && input.required) {
                valid = false;
                msg = 'Please enter a valid email address';
            }
        } else if (input.id === 'nic' || input.id === 'patientNIC') {
            // SL NIC: 9 digits + V/X or 12 digits
            const nicRegex = /^(?:[0-9]{9}[vVxX]|[0-9]{12})$/;
            if (!nicRegex.test(value) && input.required) {
                valid = false;
                msg = 'Invalid NIC format (e.g. 199500000000 or 951234567V)';
            }
        } else if (input.id === 'dob') {
            const birthDate = new Date(value);
            const today = new Date();
            if (birthDate > today) {
                valid = false;
                msg = 'Date of birth cannot be in the future';
            }
        } else if (input.required && !value) {
            valid = false;
            msg = 'This field is required';
        }

        if (!valid) {
            input.classList.add('invalid');
            msgElement.textContent = msg;
            msgElement.style.color = '#ef4444';
        } else {
            input.classList.remove('invalid');
            msgElement.textContent = '';
        }

        return valid;
    }


    function renderDocDashboard() {
        mainViewContent.innerHTML = `
            <div class="doc-dashboard">
                <div class="stats-grid grid-3">
                    <div class="stat-card card">
                        <i class="fas fa-user-clock"></i>
                        <div class="stat-info"><span class="label">Total Queue</span><span class="value">08 Patients</span></div>
                    </div>
                    <div class="stat-card card urgent">
                        <i class="fas fa-exclamation-triangle"></i>
                        <div class="stat-info"><span class="label">Urgent Cases</span><span class="value">02 Cases</span></div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-check-double"></i>
                        <div class="stat-info"><span class="label">Completed</span><span class="value">05 Today</span></div>
                    </div>
                </div>

                <div class="queue-section card mt-6">
                    <div class="section-header">
                        <h3>Patient Queue - Today</h3>
                        <div class="filters">
                            <span class="badge secondary">All</span>
                            <span class="badge primary">Urgent</span>
                        </div>
                    </div>
                    <div class="queue-table-wrapper table-responsive mt-4">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Patient Name</th>
                                    <th>Age</th>
                                    <th>Reason</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="urgent-row">
                                    <td>01</td>
                                    <td><strong>Kamal Perera</strong> <span class="badge danger">Urgent</span></td>
                                    <td>58</td>
                                    <td>Chest Pain</td>
                                    <td><span class="dot-status active">In Consulting</span></td>
                                    <td><button class="btn btn-accent small" onclick="window.app.switchView('doc-patient-detail')">Continue</button></td>
                                </tr>
                                <tr>
                                    <td>02</td>
                                    <td><strong>Nimali Fonseka</strong></td>
                                    <td>24</td>
                                    <td>Fever / Follow-up</td>
                                    <td><span class="dot-status pending">Waiting</span></td>
                                    <td><button class="btn btn-primary small" onclick="window.app.switchView('doc-patient-detail')">Start</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function renderDocPatients() {
        mainViewContent.innerHTML = `<div class="p-8 card"><h3>My Patients Library</h3><p>Manage long-term patient records and chronic condition tracking.</p></div>`;
    }

    function renderDocLabs() {
        mainViewContent.innerHTML = `
            <div class="labs-dashboard">
                 <div class="card">
                    <h3>Unreviewed Lab Results</h3>
                    <div class="alert warning mt-4">
                        <i class="fas fa-bell"></i>
                        <div>
                            <strong>Critical Result: Kamal Perera</strong>
                            <p>Troponin levels are elevated. Please review immediately.</p>
                            <button class="btn btn-link">View Results</button>
                        </div>
                    </div>
                 </div>
            </div>
        `;
    }

    function renderDocAnalytics() {
        mainViewContent.innerHTML = `
            <div class="analytics-dashboard">
                <div class="grid-3">
                    <div class="card"><h3>Top Diagnoses</h3><p>1. Hypertension<br>2. Diabetes Type II<br>3. Seasonal Flu</p></div>
                    <div class="card"><h3>Patient Satisfaction</h3><p>4.9/5.0 Overall Rating</p></div>
                    <div class="card"><h3>Consultation Volume</h3><p>Average 12 Patients/Day</p></div>
                </div>
            </div>
        `;
    }

    function renderDocSchedule() {
        mainViewContent.innerHTML = `
            <div class="schedule-manager card">
                <h3>My Availability</h3>
                <p>Manage your consulting hours directly.</p>
                <div class="mt-4">
                    <div class="flex-between pb-2 border-b">
                        <span>Monday - Friday</span>
                        <strong>09:00 AM - 05:00 PM</strong>
                    </div>
                    <button class="btn btn-primary mt-4">Edit Schedule</button>
                </div>
            </div>
        `;
    }

    function renderDocPatientDetail() {
        mainViewContent.innerHTML = `
            <div class="clinical-hub">
                <div class="patient-header-strip card">
                    <div class="patient-meta">
                        <img src="https://ui-avatars.com/api/?name=Kamal+Perera&background=1a365d&color=fff" class="avatar">
                        <div>
                            <h2>Kamal Perera <span class="badge secondary">ID: CS-8821</span></h2>
                            <p>58 Yrs | Male | Blood: B+ | Allergies: <strong>Penicillin</strong></p>
                        </div>
                    </div>
                    <div class="quick-vitals">
                        <div class="vital"><small>BP</small><strong>140/90</strong></div>
                        <div class="vital"><small>HR</small><strong>88</strong></div>
                        <div class="vital danger"><small>Temp</small><strong>101°F</strong></div>
                    </div>
                </div>

                <div class="clinical-grid mt-6">
                    <div class="left-col">
                        <div class="timeline-section card">
                            <h3>Medical Timeline</h3>
                            <div class="timeline mt-4">
                                <div class="timeline-item">
                                    <div class="timeline-date">19 Mar 2026 (Today)</div>
                                    <h4>Consultation - Chest Pain</h4>
                                    <p>Patient reports sharp pain for 2 hours. SOB present.</p>
                                </div>
                                <div class="timeline-item">
                                    <div class="timeline-date">10 Feb 2026</div>
                                    <h4>Lab Results - Lipid Profile</h4>
                                    <p>LDL: 160 mg/dL (High). Advised diet changes.</p>
                                </div>
                            </div>
                        </div>

                        <div class="consultation-box card mt-6">
                            <h3>Enter Consultation Notes</h3>
                            <div class="templates-bar mt-2">
                                <button class="badge secondary">General</button>
                                <button class="badge secondary">Cardio</button>
                                <button class="btn btn-link btn-voice"><i class="fas fa-microphone"></i> Voice Mode</button>
                            </div>
                            <textarea class="form-control mt-4" rows="6" placeholder="Start typing notes (auto-saves)..."></textarea>
                            <div class="form-actions mt-4">
                                <button class="btn btn-primary" onclick="window.app.showToast('Saved', 'Consultation notes auto-saved.', 'success')">Save Final Notes</button>
                            </div>
                        </div>
                    </div>

                    <div class="right-col">
                        <div class="prescription-builder card">
                            <h3>Digital Prescription</h3>
                            <div class="drug-search mt-4">
                                <input type="text" placeholder="Search Drug Database..." class="full-width">
                            </div>
                            <div class="drug-item mt-4 pb-4 border-b">
                                <strong>Aspirin 75mg</strong>
                                <div class="flex-between mt-2">
                                    <small>Stock: <span class="green">320 Units</span></small>
                                    <button class="btn btn-accent small">Add</button>
                                </div>
                            </div>
                             <div class="alert info mt-4">
                                <strong><i class="fas fa-shield-halved"></i> Interaction Check:</strong>
                                <p>No conflicts with current chronic medications.</p>
                            </div>
                            <button class="btn btn-primary full-width mt-4" onclick="window.app.showToast('Prescribed', 'Rx shared with Patient & Pharmacist.', 'success')">Finalize & Share Rx</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // --- Notification System ---
    function showToast(title, message, type = 'success') {
        const container = document.getElementById('toastContainer');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;

        const icon = type === 'error' ? 'fa-circle-xmark' : (type === 'warning' ? 'fa-triangle-exclamation' : 'fa-circle-check');

        toast.innerHTML = `
            <i class="fas ${icon}"></i>
            <div class="toast-content">
                <strong>${title}</strong>
                <p>${message}</p>
            </div>
        `;

        container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translateX(20px)';
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }



    function renderPharDashboard() {
        mainViewContent.innerHTML = `
            <div class="phar-dashboard">
                <div class="stats-grid grid-3">
                    <div class="stat-card card">
                        <i class="fas fa-clock"></i>
                        <div class="stat-info"><span class="label">Pending Rx</span><span class="value">04 Orders</span></div>
                    </div>
                    <div class="stat-card card urgent">
                        <i class="fas fa-layer-group"></i>
                        <div class="stat-info"><span class="label">Low Stock</span><span class="value">03 Items</span></div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-check-circle"></i>
                        <div class="stat-info"><span class="label">Served Today</span><span class="value">28 Patients</span></div>
                    </div>
                </div>

                <div class="rx-queue-section card mt-6">
                    <h3>Incoming Prescription Queue</h3>
                    <div class="table-responsive mt-4">
                        <table class="data-table">
                            <thead>
                                <tr>
                                    <th>Token</th>
                                    <th>Patient</th>
                                    <th>Prescribed By</th>
                                    <th>Items</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="urgent-row">
                                    <td>#PX-102</td>
                                    <td><strong>Kamal Perera</strong></td>
                                    <td>Dr. Rohan</td>
                                    <td>Aspirin, Atorvastatin</td>
                                    <td><button class="btn btn-primary small" onclick="window.app.switchView('phar-dispense')">Process Rx</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }

    function renderPharInventory() {
        mainViewContent.innerHTML = `
            <div class="phar-inventory grid-3">
                <div class="inventory-main card grid-col-2">
                    <div class="flex-between">
                        <h3>Stock Inventory</h3>
                        <button class="btn btn-primary small">+ Add Delivery</button>
                    </div>
                    <div class="table-responsive mt-4">
                        <table class="data-table">
                            <thead><tr><th>Item</th><th>Batch</th><th>Stock</th><th>Expiry</th></tr></thead>
                            <tbody>
                                <tr><td>Aspirin 75mg</td><td>B-8821</td><td><span class="green">320</span></td><td>Oct 2027</td></tr>
                                <tr><td>Amoxicillin 500mg</td><td>B-9910</td><td><span class="orange">45 (Low)</span></td><td>Dec 2026</td></tr>
                                <tr class="danger-row"><td>Insulin Pen</td><td>B-7721</td><td><span class="red">12</span></td><td><span class="red">EXP: 25 Mar 2026</span></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="inventory-sidebar card">
                    <h3>Storage Map</h3>
                    <div class="map-placeholder mt-4 p-4 border-dashed">
                        <p><i class="fas fa-map-marker-alt"></i> Section A: Antibiotics</p>
                        <p><i class="fas fa-map-marker-alt"></i> Section B: Painkillers</p>
                        <p><i class="fas fa-map-marker-alt"></i> Cold Storage: Vaccines</p>
                    </div>
                </div>
            </div>
        `;
    }

    function renderPharDispense() {
        mainViewContent.innerHTML = `
            <div class="phar-dispense">
                <div class="card bg-light">
                    <h3>Safety Hub: Kamal Perera</h3>
                    <div class="flex-between mt-4">
                        <div class="alert info"><strong>Verified:</strong> Prescribed by Dr. Rohan (Verified Signature)</div>
                        <div class="alert warning"><strong>Alert:</strong> Patient allergic to Penicillin.</div>
                    </div>
                </div>

                <div class="dispense-grid mt-6">
                    <div class="dispensing-tools card">
                        <h3>Prepare Items</h3>
                        <div class="check-item flex-between border-b py-3">
                            <span>Aspirin 75mg - 10 Tabs</span>
                            <button class="btn btn-outline small" onclick="this.innerHTML='Checked ✓'; this.className='btn btn-success small'">Verify</button>
                        </div>
                        <div class="check-item flex-between border-b py-3">
                            <span>Atorvastatin 20mg - 30 Tabs</span>
                            <button class="btn btn-outline small" onclick="this.innerHTML='Checked ✓'; this.className='btn btn-success small'">Verify</button>
                        </div>
                        
                        <div class="actions mt-6">
                            <button class="btn btn-primary full-width" onclick="window.app.showToast('Dispensed', 'Rx logged and shared with Patient.', 'success')">Log & Dispense</button>
                        </div>
                    </div>

                    <div class="label-generator card">
                        <h3>Label & Usage Summary</h3>
                        <div class="label-preview mt-4 p-4 border">
                            <strong>Patient: Kamal Perera</strong>
                            <p>ASPIRIN 75MG</p>
                            <p>Take 01 Tab Daily after breakfast.</p>
                        </div>
                        <button class="btn btn-outline full-width mt-4"><i class="fas fa-print"></i> Print Labels</button>
                        <button class="btn btn-outline full-width mt-2"><i class="fab fa-whatsapp"></i> Share Usage Summary</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderPharReports() {
        mainViewContent.innerHTML = `
            <div class="card">
                <h3>Pharmacy Financial Reconciliation</h3>
                <p>Total Sales Today: LKR 124,500.00</p>
                <div class="mt-4 flex gap-2">
                    <button class="btn btn-primary">Sync with Accounting</button>
                    <button class="btn btn-outline" onclick="window.app.showToast('Queue Token', 'Token #B-42 generated & shared via WhatsApp.', 'success')"><i class="fas fa-ticket-alt"></i> Generate Queue Token</button>
                </div>
            </div>
        `;
    }

    function renderAdminDashboard() {
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
                    <div class="card overflow-hidden">
                        <h3>Clinic Traffic (24h)</h3>
                        <div class="chart-mock mt-4">
                             <div class="bar-chart">
                                 <div class="bar" style="height: 40%"></div>
                                 <div class="bar" style="height: 70%"></div>
                                 <div class="bar" style="height: 90%"></div>
                                 <div class="bar" style="height: 50%"></div>
                                 <div class="bar" style="height: 30%"></div>
                             </div>
                        </div>
                    </div>
                    <div class="card">
                        <h3>Global Appointment Watch</h3>
                        <div class="table-responsive mt-4">
                            <table class="data-table small">
                                <thead><tr><th>Time</th><th>Patient</th><th>Status</th></tr></thead>
                                <tbody>
                                    <tr><td>09:00</td><td>Kamal P.</td><td><span class="badge success">Arrived</span></td></tr>
                                    <tr><td>09:30</td><td>Nimali F.</td><td><span class="badge warning">Waitlist</span></td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderAdminUsers() {
        mainViewContent.innerHTML = `
            <div class="admin-users card">
                <div class="flex-between">
                    <h3>User Management</h3>
                    <button class="btn btn-primary small">+ New Staff</button>
                </div>
                <div class="table-responsive mt-6">
                    <table class="data-table">
                        <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
                        <tbody>
                            <tr><td>Dr. Rohan Silva</td><td>Doctor</td><td><span class="badge success">Active</span></td><td><button class="btn btn-outline small">Manage</button></td></tr>
                            <tr><td>Sarah J.</td><td>Receptionist</td><td><span class="badge success">Active</span></td><td><button class="btn btn-outline small">Manage</button></td></tr>
                            <tr class="muted"><td>Old User</td><td>Patient</td><td><span class="badge secondary">Inactive</span></td><td><button class="btn btn-primary small">Activate</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function renderAdminComplaints() {
        mainViewContent.innerHTML = `
            <div class="admin-complaints card">
                <h3>Patient Feedback & Complaints</h3>
                <div class="filter-bar flex gap-4 mt-4">
                    <button class="btn btn-outline active small">All (12)</button>
                    <button class="btn btn-outline small">Pending (3)</button>
                    <button class="btn btn-outline small">Resolved (9)</button>
                </div>
                <div class="table-responsive mt-6">
                    <table class="data-table">
                        <thead><tr><th>Time</th><th>Patient</th><th>Subject</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr><td>10:15 AM</td><td>Kamal P.</td><td>Wait time at Pharmacy</td><td><span class="badge warning">New</span></td></tr>
                            <tr><td>Yesterday</td><td>Sarah M.</td><td>Billing discrepancy</td><td><span class="badge success">Resolved</span></td></tr>
                            <tr><td>Yesterday</td><td>Wimal S.</td><td>Facility cleanliness</td><td><span class="badge info">In Progress</span></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function renderAdminLogs() {
        mainViewContent.innerHTML = `
            <div class="admin-logs card">
                <h3>System Audit Vault</h3>
                <div class="log-entries mt-4">
                    <div class="log-item border-b py-2 text-sm">
                        <span class="text-muted">[20:01:06]</span> <strong>Admin</strong> accessed <strong>Audit Logs</strong>.
                    </div>
                    <div class="log-item border-b py-2 text-sm">
                        <span class="text-muted">[19:45:22]</span> <strong>Receptionist (Sarah)</strong> swapped slot for <strong>Kamal P.</strong>
                    </div>
                    <div class="log-item border-b py-2 text-sm">
                        <span class="text-muted">[18:30:11]</span> <strong>System</strong> triggered <strong>Database Backup</strong>.
                    </div>
                </div>
            </div>
        `;
    }

    function renderAdminSettings() {
        mainViewContent.innerHTML = `
            <div class="admin-settings grid-2">
                <div class="card">
                    <h3>System Control</h3>
                    <div class="mt-6">
                        <div class="flex-between py-4 border-b">
                            <span>Maintenance Mode</span>
                            <div class="toggle-switch" onclick="window.app.toggleMaintenance()"></div>
                        </div>
                        <div class="flex-between py-4 border-b">
                            <span>Public Registration</span>
                            <div class="toggle-switch active"></div>
                        </div>
                    </div>
                </div>
                <div class="card danger-zone">
                    <h3>Emergency Overrides</h3>
                    <p class="mt-2 text-sm">Request one-time access to restricted patient data for urgent clinical audits.</p>
                    <button class="btn btn-accent full-width mt-4" onclick="window.app.showToast('Requested', 'Request sent to ethics committee.', 'info')">Request Break-Glass Access</button>
                </div>
            </div>
        `;
    }

    function toggleMaintenance() {
        const banner = document.getElementById('maintenanceBanner');
        if (banner) {
            banner.remove();
            showToast('Maintenance Off', 'System is now in live mode.', 'success');
        } else {
            const newBanner = document.createElement('div');
            newBanner.id = 'maintenanceBanner';
            newBanner.className = 'maintenance-banner';
            newBanner.innerHTML = `<i class="fas fa-tools"></i> <strong>System Maintenance:</strong> Scheduled updates at 11:00 PM. Performance may be impacted.`;
            document.body.prepend(newBanner);
            showToast('Maintenance On', 'System banner is now visible to all users.', 'warning');
        }
    }

    function renderNurseDashboard() {
        mainViewContent.innerHTML = `
            <div class="nurse-dashboard">
                <div class="stats-grid grid-3">
                    <div class="stat-card card">
                        <i class="fas fa-clipboard-check"></i>
                        <div class="stat-info"><span class="label">My Tasks</span><span class="value">08 Pending</span></div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-thermometer-half"></i>
                        <div class="stat-info"><span class="label">Vitals Due</span><span class="value">03 Patients</span></div>
                    </div>
                    <div class="stat-card card">
                        <i class="fas fa-syringe"></i>
                        <div class="stat-info"><span class="label">Vaccinations</span><span class="value">02 Today</span></div>
                    </div>
                </div>

                <div class="task-section mt-6">
                    <div class="card">
                        <h3>Priority Care List</h3>
                        <div class="task-list mt-4">
                            <div class="task-item border-b py-4 flex-between">
                                <div>
                                    <strong>Kamal Perera</strong> <span class="badge warning">ID: CS-8821</span>
                                    <p class="text-sm">Pre-consultation Vitals & Intake Assessment</p>
                                </div>
                                <button class="btn btn-primary small" onclick="window.app.switchView('nurse-intake')">Start Intake</button>
                            </div>
                            <div class="task-item border-b py-4 flex-between">
                                <div>
                                    <strong>Nimali Fonseka</strong> <span class="badge info">ID: CS-7721</span>
                                    <p class="text-sm">Wound Dressing Change - Post-Surgical</p>
                                </div>
                                <button class="btn btn-outline small" onclick="window.app.switchView('nurse-procedures')">View Guide</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function renderNurseIntake() {
        mainViewContent.innerHTML = `
            <div class="nurse-intake card">
                <div class="patient-verify-header flex-between p-4 bg-light border-radius">
                     <div class="flex-center gap-4">
                        <img src="https://ui-avatars.com/api/?name=Kamal+Perera&background=1a365d&color=fff" class="avatar-lg">
                        <div>
                            <h2>Kamal Perera <small class="text-muted">58 Yrs | NIC: 95...-V</small></h2>
                            <span class="badge danger"><i class="fas fa-allergies"></i> ALLERGY: PENICILLIN</span>
                        </div>
                     </div>
                     <button class="btn btn-success small">Verify Identity ✓</button>
                </div>

                <div class="intake-form mt-6 grid-2">
                    <div class="vitals-entry card border">
                        <h3>Capture Vitals</h3>
                        <div class="form-grid mt-4">
                            <div class="form-group"><label>BP (mmHg)</label><input type="text" placeholder="120/80"></div>
                            <div class="form-group"><label>HR (bpm)</label><input type="text" placeholder="72"></div>
                            <div class="form-group"><label>Temp (°F)</label><input type="text" placeholder="98.6"></div>
                            <div class="form-group"><label>Weight (kg)</label><input type="text" placeholder="70"></div>
                        </div>
                        <div class="vitals-trend-chart mt-6 bg-light p-4 border-radius">
                             <small class="text-muted">BP Trends (Last 3 visits)</small>
                             <div class="chart-bars-horizontal mt-2">
                                 <div class="trend-bar" style="width: 80%">130/85</div>
                                 <div class="trend-bar" style="width: 85%">140/90</div>
                                 <div class="trend-bar bg-accent" style="width: 75%">120/80</div>
                             </div>
                        </div>
                    </div>
                    <div class="assessment-section card border">
                        <h3>Initial Assessment</h3>
                        <textarea class="form-control full-width mt-4" rows="8" placeholder="Enter patient complaints, current symptoms, and handoff notes..."></textarea>
                        <button class="btn btn-primary full-width mt-4" onclick="window.app.showToast('Intake Complete', 'Vitals and assessment shared with Doctor.', 'success')">Submit to Doctor</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderNurseProcedures() {
        mainViewContent.innerHTML = `
            <div class="nurse-procedures grid-2">
                <div class="card">
                    <h3>Procedure: Wound Dressing</h3>
                    <div class="checklist mt-4">
                        <div class="check-item flex-between py-2 border-b">
                            <span>Sterile Gauze & Tape</span>
                            <div class="toggle-switch active"></div>
                        </div>
                    </div>
                    <div class="wound-tracking mt-6 bg-light p-4 border-radius">
                        <h4>Wound Care History</h4>
                        <div class="flex gap-4 mt-4 overflow-x-auto">
                            <div class="wound-photo border text-center p-2 bg-white" style="min-width: 100px;">
                                <div class="sq-placeholder bg-secondary" style="height: 60px;">📷</div>
                                <small>Visited: 12 Mar</small>
                            </div>
                            <div class="wound-photo border text-center p-2 bg-white dashed" style="min-width: 100px;">
                                <div class="sq-placeholder" style="height: 60px;">+</div>
                                <small>Upload New</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card">
                    <h3>Lab Sample Tracking</h3>
                    <div class="sample-tools mt-4">
                        <div class="alert info">Collect Sample for: <strong>Lipid Profile</strong></div>
                        <button class="btn btn-outline full-width mt-2"><i class="fas fa-print"></i> Print Container Labels</button>
                        <div class="mt-4 border-radius border p-4">
                            <p><strong>Tracking Status:</strong></p>
                            <div class="flex-between py-1"><small>Collected</small> <span class="badge">Today, 2:30 PM</span></div>
                            <div class="flex-between py-1"><small>Status</small> <span class="badge warning">Pending Transport</span></div>
                        </div>
                        <button class="btn btn-primary full-width mt-4">Mark as Dispatched</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderNurseEdu() {
        mainViewContent.innerHTML = `
            <div class="nurse-edu card">
                <h3>Patient Education Library</h3>
                <div class="grid-3 mt-6">
                    <div class="card border p-4 text-center">
                        <i class="fas fa-video fa-2x text-primary"></i>
                        <h4 class="mt-2">Diabetes Care</h4>
                        <p class="text-sm">Multilingual Video Tutorial</p>
                        <button class="btn btn-primary small mt-4">Play / Share</button>
                    </div>
                    <div class="card border p-4 text-center">
                        <i class="fas fa-file-pdf fa-2x text-accent"></i>
                        <h4 class="mt-2">Post-OP Diet</h4>
                        <p class="text-sm">Standard Instructions (6 Languages)</p>
                        <button class="btn btn-primary small mt-4">Print / Send</button>
                    </div>
                    <div class="card border p-4 text-center">
                        <i class="fas fa-heartbeat fa-2x text-success"></i>
                        <h4 class="mt-2">Hypertension</h4>
                        <p class="text-sm">Interactive Care Plan</p>
                        <button class="btn btn-primary small mt-4">Assign Task</button>
                    </div>
                </div>
            </div>
        `;
    }

    function renderNurseMeds() {
        mainViewContent.innerHTML = `
            <div class="nurse-meds card">
                <h3>Digital MAR (Medication Administration Record)</h3>
                <div class="med-alert flex-between bg-error p-4 mt-4 border-radius text-white">
                    <span><strong>HIGH RISK MEDICATION:</strong> Insulin Glargine</span>
                    <button class="btn btn-accent small">Request Peer Review</button>
                </div>
                <div class="table-responsive mt-6">
                    <table class="data-table">
                        <thead><tr><th>Time</th><th>Medication</th><th>Route</th><th>Dose</th><th>Action</th></tr></thead>
                        <tbody>
                            <tr><td>2:45 PM</td><td>Paracetamol</td><td>Oral</td><td>500mg</td><td><button class="btn btn-success small">Administer</button></td></tr>
                            <tr><td>Scheduled</td><td>Rabies Vaccine</td><td>IM</td><td>0.5ml</td><td><button class="btn btn-primary small">Start Injection</button></td></tr>
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    // Expose functions globally
    Object.assign(window.app, {
        switchView,
        initFormValidation, initFileUpload,
        showToast, showOverlapPopup,
        toggleMaintenance
    });
});
