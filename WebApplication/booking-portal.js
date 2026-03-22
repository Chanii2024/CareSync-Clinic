/**
 * CareSync Booking Portal Module
 * Separated to maintain clean code architecture.
 */

(function () {
    window.app = window.app || {};

    // --- Module State ---
    const state = window.app.bookingState = {
        doctor: null,
        date: null,
        time: null,
        currentStep: 1,
        patientData: {}
    };

    // --- Core View Renderers ---
    function renderBooking() {
        if (!state.doctor) {
            renderDoctorSearch();
            return;
        }

        const mainViewContent = document.getElementById('mainViewContent');
        const portalBody = document.querySelector('.booking-portal');

        if (portalBody) {
            // Surgical Update
            const stepContent = document.getElementById('bookingStepContent');
            if (stepContent) stepContent.innerHTML = renderCurrentStepContent();

            // Update Sidebar Summary
            const sidebarDate = document.querySelector('.summary-row i.fa-calendar-alt')?.parentElement;
            const sidebarTime = document.querySelector('.summary-row i.fa-clock')?.parentElement;
            if (sidebarDate) {
                sidebarDate.className = `summary-row ${state.date ? '' : 'placeholder'}`;
                sidebarDate.querySelector('span').textContent = state.date || 'No Date Selected';
            }
            if (sidebarTime) {
                sidebarTime.className = `summary-row ${state.time ? '' : 'placeholder'}`;
                sidebarTime.querySelector('span').textContent = state.time || 'No Time Selected';
            }

            // Update Step Navigation
            const nodes = document.querySelectorAll('.step-node');
            const lines = document.querySelectorAll('.step-line');
            nodes.forEach((n, i) => n.classList.toggle('active', state.currentStep >= i + 1));
            lines.forEach((l, i) => l.classList.toggle('active', state.currentStep >= i + 2));

            if (state.currentStep === 1) {
                renderMonthCalendar('wizardCalendarContainer');
            } else if (state.currentStep === 2) {
                if (window.app.initFormValidation) window.app.initFormValidation('bookingDetailsForm');
            } else if (state.currentStep === 3) {
                if (window.app.initFileUpload) window.app.initFileUpload();
            }
            return;
        }

        // Initial Full Render
        mainViewContent.innerHTML = `
            <div class="booking-portal animate-fade-in">
                <div class="booking-sidebar">
                    <div class="summary-card sticky-card">
                        <div class="summary-header">
                            <span class="badge-active">Selected Doctor</span>
                            <button class="btn-text" onclick="window.app.bookingState.doctor = null; window.app.renderBooking();">
                                <i class="fas fa-rotate"></i> Change
                            </button>
                        </div>
                        <div class="selected-doc-info">
                            <img src="https://ui-avatars.com/api/?name=${state.doctor.name.replace(' ', '+')}&background=E6FFFA&color=20c997&bold=true&size=128" alt="Doc">
                            <div>
                                <h4>${state.doctor.name}</h4>
                                <p>${state.doctor.specialty}</p>
                            </div>
                        </div>
                        <div class="summary-details">
                            <div class="summary-row ${state.date ? '' : 'placeholder'}">
                                <i class="fas fa-calendar-alt"></i>
                                <span>${state.date || 'No Date Selected'}</span>
                            </div>
                            <div class="summary-row ${state.time ? '' : 'placeholder'}">
                                <i class="fas fa-clock"></i>
                                <span>${state.time || 'No Time Selected'}</span>
                            </div>
                        </div>
                        <div class="summary-footer">
                            <div class="fee-row">
                                <span>Appointment Fee</span>
                                <strong>LKR ${state.doctor.fee}.00</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="booking-main">
                    <div class="booking-header-new">
                        <h2>Complete Your Booking</h2>
                        <div class="step-nav">
                            <div class="step-node ${state.currentStep >= 1 ? 'active' : ''}"><span>1</span><small>Slots</small></div>
                            <div class="step-line ${state.currentStep >= 2 ? 'active' : ''}"></div>
                            <div class="step-node ${state.currentStep >= 2 ? 'active' : ''}"><span>2</span><small>Details</small></div>
                            <div class="step-line ${state.currentStep >= 3 ? 'active' : ''}"></div>
                            <div class="step-node ${state.currentStep >= 3 ? 'active' : ''}"><span>3</span><small>Finish</small></div>
                        </div>
                    </div>

                    <div id="bookingStepContent">
                        ${renderCurrentStepContent()}
                    </div>
                </div>
            </div>
        `;

        if (state.currentStep === 1) {
            renderMonthCalendar('wizardCalendarContainer');
        } else if (state.currentStep === 2) {
            if (window.app.initFormValidation) window.app.initFormValidation('bookingDetailsForm');
        } else if (state.currentStep === 3) {
            if (window.app.initFileUpload) window.app.initFileUpload();
        }
    }

    function renderCurrentStepContent() {
        switch (state.currentStep) {
            case 1:
                const slotList = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '04:00 PM'];
                const slotsGridHTML = state.date ? `
                    <div class="slots-header-mini">
                        <span>Slots for <strong>${state.date}</strong></span>
                    </div>
                    ${slotList.map(time => `
                        <button class="time-chip ${state.time === time ? 'active' : ''}" onclick="window.app.selectBookingTime('${time}')">${time}</button>
                    `).join('')}
                ` : `
                    <div class="empty-state">
                        <i class="fas fa-calendar-day"></i>
                        <p>Select a date to view slots</p>
                    </div>
                `;

                return `
                    <div class="step-content-box animate-fade-in">
                        <h3 class="box-title">Select Date & Time</h3>
                        <div class="calendar-time-layout">
                            <div class="cal-wrapper">
                                <div id="wizardCalendarContainer"></div>
                            </div>
                            <div class="time-wrapper">
                                <h5><i class="fas fa-clock"></i> Available Slots</h5>
                                <div id="timeSlotsGrid" class="time-chips-grid">
                                    ${slotsGridHTML}
                                </div>
                            </div>
                        </div>
                        <div class="box-actions">
                            <button class="btn btn-outline" onclick="window.app.bookingState.doctor = null; window.app.renderBooking();">Back to Search</button>
                            <button class="btn btn-accent large" onclick="window.app.nextStep(2)" id="bookingNextBtn" ${state.time ? '' : 'disabled'}>
                                Confirm Selection <i class="fas fa-arrow-right"></i>
                            </button>
                        </div>
                    </div>
                `;
            case 2:
                return `
                    <div class="step-content-box animate-fade-in">
                        <h3 class="box-title">Patient Information</h3>
                        <p class="box-subtitle">Details for the person visiting the doctor.</p>
                        <form id="bookingDetailsForm" class="premium-form-grid">
                            <div class="form-group">
                                <label>Full Name</label>
                                <input type="text" id="patientName" placeholder="As per NIC/ID" required>
                                <span class="validation-msg"></span>
                            </div>
                            <div class="form-group">
                                <label>Mobile Number</label>
                                <input type="text" id="patientPhone" placeholder="07XXXXXXXX" required>
                                <span class="validation-msg"></span>
                            </div>
                            <div class="form-group">
                                <label>NIC / Passport</label>
                                <input type="text" id="patientNIC" placeholder="ID Number" required>
                                <span class="validation-msg"></span>
                            </div>
                            <div class="form-group">
                                <label>Gender</label>
                                <div class="custom-dropdown" id="genderDropdown">
                                    <div class="dropdown-selected" onclick="window.app.toggleCustomDropdown('genderOptions')">
                                        <span id="selectedGender">Select Gender</span>
                                        <i class="fas fa-chevron-down"></i>
                                    </div>
                                    <div class="dropdown-options" id="genderOptions">
                                        <div class="dropdown-option" onclick="window.app.selectDropdownOption('Gender', 'Male')">Male</div>
                                        <div class="dropdown-option" onclick="window.app.selectDropdownOption('Gender', 'Female')">Female</div>
                                        <div class="dropdown-option" onclick="window.app.selectDropdownOption('Gender', 'Other')">Other</div>
                                    </div>
                                </div>
                            </div>
                            <div class="form-group full-width">
                                <label>Brief Reason for Visit</label>
                                <textarea rows="3" placeholder="Describe symptoms or purpose..."></textarea>
                            </div>
                        </form>
                        <div class="box-actions">
                            <button class="btn btn-outline" onclick="window.app.nextStep(1)">Back</button>
                            <button class="btn btn-accent large" onclick="window.app.nextStep(3)">Review & Pay <i class="fas fa-arrow-right"></i></button>
                        </div>
                    </div>
                `;
            case 3:
                return `
                    <div class="step-content-box animate-fade-in">
                        <h3 class="box-title">Final Review</h3>
                        <div class="checkout-layout">
                            <div class="checkout-main">
                                <div class="prep-card">
                                    <h5><i class="fas fa-clipboard-list"></i> Prep Checklist</h5>
                                    <ul>
                                        <li><i class="fas fa-check-circle"></i> Original NIC or Passport</li>
                                        <li><i class="fas fa-check-circle"></i> Previous prescriptions/reports</li>
                                        <li><i class="fas fa-check-circle"></i> Arrive 15 mins before time</li>
                                    </ul>
                                </div>
                                <div class="upload-section">
                                    <h5>Optional: Support Documents</h5>
                                    <div class="drop-zone-mini" id="dropZone">
                                        <i class="fas fa-file-export"></i>
                                        <p>Drag files or <span>Browse</span></p>
                                        <input type="file" id="fileInput" hidden>
                                    </div>
                                    <div id="fileList" class="mini-file-list"></div>
                                </div>
                            </div>
                        </div>
                        <div class="box-actions">
                            <button class="btn btn-outline" onclick="window.app.nextStep(2)">Back</button>
                            <button class="btn btn-primary large" onclick="window.app.finishBooking()">Confirm & Pay Appointment <i class="fas fa-check"></i></button>
                        </div>
                    </div>
                `;
            default: return '';
        }
    }

    function renderDoctorSearch() {
        const mainViewContent = document.getElementById('mainViewContent');
        const docs = window.app.doctorsData || [];

        mainViewContent.innerHTML = `
            <div class="doctor-search-portal animate-slide-up">
                <div class="search-hero">
                    <h1>Book an Appointment</h1>
                    <p>Search over 500+ Qualified Specialists in Sri Lanka</p>
                    <div class="unified-search-bar">
                        <div class="search-input-group">
                            <i class="fas fa-search"></i>
                            <input type="text" placeholder="Search by name, specialty or hospital..." oninput="window.app.handleBookingSearch(this.value)">
                        </div>
                        <div class="filter-split-line"></div>
                        <div class="search-dropdown-group" onclick="window.app.toggleCustomDropdown('specialtyOptionsDoc')">
                            <i class="fas fa-stethoscope"></i>
                            <span id="selectedSpecialtyDoc">All Specialties</span>
                            <i class="fas fa-chevron-down"></i>
                            <div class="options-container" id="specialtyOptionsDoc">
                                <div class="option" onclick="window.app.selectDropdownOption('SpecialtyDoc', 'All Specialties')">All Specialties</div>
                                <div class="option" onclick="window.app.selectDropdownOption('SpecialtyDoc', 'Cardiology')">Cardiology</div>
                                <div class="option" onclick="window.app.selectDropdownOption('SpecialtyDoc', 'Dermatology')">Dermatology</div>
                                <div class="option" onclick="window.app.selectDropdownOption('SpecialtyDoc', 'Pediatrics')">Pediatrics</div>
                                <div class="option" onclick="window.app.selectDropdownOption('SpecialtyDoc', 'Neurology')">Neurology</div>
                                <div class="option" onclick="window.app.selectDropdownOption('SpecialtyDoc', 'Orthopedics')">Orthopedics</div>
                            </div>
                        </div>
                        <div class="filter-split-line"></div>
                        <div class="search-dropdown-group" onclick="window.app.toggleCustomDropdown('timeOptionsDoc')">
                            <i class="fas fa-clock"></i>
                            <span id="selectedTimeRange">Any Time</span>
                            <i class="fas fa-chevron-down"></i>
                            <div class="options-container" id="timeOptionsDoc">
                                <div class="option" onclick="window.app.selectDropdownOption('TimeRange', 'Any Time')">Any Time</div>
                                <div class="option" onclick="window.app.selectDropdownOption('TimeRange', 'Morning')">Morning (8am-12pm)</div>
                                <div class="option" onclick="window.app.selectDropdownOption('TimeRange', 'Afternoon')">Afternoon (1pm-5pm)</div>
                                <div class="option" onclick="window.app.selectDropdownOption('TimeRange', 'Evening')">Evening (Over 5pm)</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="results-container">
                    <div class="results-header">
                        <h3>Available Specialists</h3>
                        <span id="docCount">${docs.length} Doctors Found</span>
                    </div>
                    <div class="doctor-list" id="bookingSearchResults">
                        ${docs.map(doc => renderDoctorBookingItem(doc)).join('')}
                    </div>
                </div>
            </div>
        `;
    }

    function renderDoctorBookingItem(doc) {
        return `
            <div class="doctor-list-item animate-fade-in" onclick="window.app.selectDoctorForBooking(${doc.id})">
                <div class="doc-main-col">
                    <div class="avatar-box">
                        <img src="https://ui-avatars.com/api/?name=${doc.name.replace(' ', '+')}&background=E6FFFA&color=20c997&bold=true&size=128" alt="Doc">
                        <span class="status-indicator ${doc.status === 'Active Now' ? 'online' : 'away'}"></span>
                    </div>
                    <div class="doc-info-box">
                        <div class="doc-title-row">
                            <h4>${doc.name}</h4>
                            <span class="reg-badge">${doc.regNo}</span>
                        </div>
                        <p class="specialty">${doc.specialty}</p>
                        <div class="rating-row">
                            <span class="stars"><i class="fas fa-star"></i> ${doc.rating}</span>
                            <span class="rev-count">(${doc.reviews} reviews)</span>
                            <span class="exp-tag">${doc.experience} exp</span>
                        </div>
                    </div>
                    <div class="quick-slots-box">
                        <p class="slot-label">Quick Slots</p>
                        <div class="slots-day-row">
                            <span class="day-mini-tag">Today</span>
                            <div class="slot-mini-grid">
                                ${doc.todaySlots.slice(0, 3).map(slot => `
                                    <span class="slot-mini-chip" onclick="event.stopPropagation(); window.app.selectQuickSlot(${doc.id}, '${slot}', false)">${slot}</span>
                                `).join('')}
                            </div>
                        </div>
                        <div class="slots-day-row mt-2">
                            <span class="day-mini-tag">Tomorrow</span>
                            <div class="slot-mini-grid">
                                ${doc.tomorrowSlots.slice(0, 3).map(slot => `
                                    <span class="slot-mini-chip" onclick="event.stopPropagation(); window.app.selectQuickSlot(${doc.id}, '${slot}', true)">${slot}</span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="doc-actions-col">
                    <div class="fee-info">
                        <span class="fee-label">Consultation Fee</span>
                        <span class="fee-amt">LKR ${doc.fee}.00</span>
                    </div>
                    <button class="btn btn-primary" onclick="window.app.selectDoctorForBooking(${doc.id})">View More Slots</button>
                </div>
            </div>
        `;
    }

    function renderMonthCalendar(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
        const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        const now = new Date();
        container.innerHTML = `
            <div class="month-calendar">
                <div class="flex-between mb-4">
                    <h4 id="calMonthDisplay">${months[now.getMonth()]} ${now.getFullYear()}</h4>
                    <div class="flex gap-2"><button class="icon-btn small"><i class="fas fa-chevron-left"></i></button><button class="icon-btn small"><i class="fas fa-chevron-right"></i></button></div>
                </div>
                <div class="calendar-grid-header"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
                <div class="calendar-days">${generateCalendarDays(now.getMonth(), now.getFullYear())}</div>
            </div>
        `;
    }

    function generateCalendarDays(month, year) {
        let days = '';
        const today = new Date().getDate();
        for (let i = 1; i <= 31; i++) {
            const isSelected = state.date === `March ${i}, 2026`;
            const isDisabled = i < today;
            const hasSlots = i % 3 !== 0;
            days += `
                <div class="cal-day ${isSelected ? 'active' : ''} ${isDisabled ? 'disabled' : ''}" 
                     onclick="${!isDisabled ? `window.app.selectBookingDate(${i})` : ''}">
                    <span>${i}</span>
                    ${!isDisabled && hasSlots ? `<span class="slot-count text-success">${Math.floor(Math.random() * 5) + 2} slots</span>` : ''}
                    ${!isDisabled && !hasSlots ? `<span class="slot-count text-error">Full</span>` : ''}
                </div>
            `;
        }
        return days;
    }

    // --- Exposed Global Handlers ---
    window.app.handleBookingSearch = (query) => {
        const timeRangeTxt = document.getElementById('selectedTimeRange')?.innerText || 'Any Time';
        const specialtyTxt = document.getElementById('selectedSpecialtyDoc')?.innerText || 'All Specialties';
        const doctorsData = window.app.doctorsData || [];

        const results = doctorsData.filter(d => {
            const matchesText = d.name.toLowerCase().includes(query.toLowerCase()) ||
                d.specialty.toLowerCase().includes(query.toLowerCase());
            const matchesSpecialty = specialtyTxt === 'All Specialties' || d.specialty.includes(specialtyTxt);
            const matchesTime = timeRangeTxt === 'Any Time' || d.timeRange === timeRangeTxt || d.timeRange === 'Mixed';
            return matchesText && matchesSpecialty && matchesTime;
        });

        document.getElementById('bookingSearchResults').innerHTML = results.map(doc => renderDoctorBookingItem(doc)).join('');
        const countLabel = document.getElementById('docCount');
        if (countLabel) countLabel.innerText = `${results.length} Doctors Found`;
    };

    window.app.selectDoctorForBooking = (id) => {
        const doctorsData = window.app.doctorsData || [];
        const doc = doctorsData.find(d => d.id === parseInt(id));
        if (doc) {
            state.doctor = doc;
            state.currentStep = 1;
            window.app.renderBooking();
        }
    };

    window.app.selectQuickSlot = (docId, slot, isTomorrow) => {
        const doctorsData = window.app.doctorsData || [];
        const doc = doctorsData.find(d => d.id === parseInt(docId));
        if (doc) {
            state.doctor = doc;
            state.date = isTomorrow ? 'March 22, 2026' : 'March 21, 2026';
            state.time = slot;
            state.currentStep = 1;
            window.app.renderBooking();
        }
    };

    window.app.selectBookingDate = (day) => {
        state.date = `March ${day}, 2026`;
        state.time = null;
        window.app.renderBooking();
    };

    window.app.selectBookingTime = (time) => {
        state.time = time;
        window.app.renderBooking();
    };

    window.app.nextStep = (step) => {
        state.currentStep = step;
        window.app.renderBooking();
    };

    window.app.finishBooking = () => {
        const mainViewContent = document.getElementById('mainViewContent');
        mainViewContent.innerHTML = `
            <div class="success-screen animate-fade-in">
                <div class="success-card glass-card animate-bounce-in">
                    <div class="success-icon"><i class="fas fa-check-circle"></i></div>
                    <h1>Booking Confirmed!</h1>
                    <p class="ref-no">Reference: <span>CS-${Math.floor(Math.random() * 90000) + 10000}</span></p>
                    <div class="success-details-grid">
                        <div class="detail-item"><label>Doctor</label><strong>${state.doctor.name}</strong></div>
                        <div class="detail-item"><label>Date & Time</label><strong>${state.date} at ${state.time}</strong></div>
                    </div>
                    <div class="action-buttons mt-6">
                        <button class="btn btn-primary" onclick="window.app.switchView('appointments')">My Appointments</button>
                        <button class="btn btn-outline" onclick="window.app.switchView('dashboard')">Back to Home</button>
                    </div>
                </div>
            </div>
        `;
        if (window.app.showToast) window.app.showToast('Appointment Booked', 'Check your SMS for confirmation.', 'success');
    };

    // Export view renderers
    window.app.renderBooking = renderBooking;
    window.app.renderDoctorSearch = renderDoctorSearch;

})();
