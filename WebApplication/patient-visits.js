/**
 * Patient Module: Upcoming Visits
 */

(function () {

    window.app = window.app || {};

    // -------------------------
    // APPOINTMENT DATA
    // -------------------------

    const appointments = [

        {
            id: 'APT-102',
            doctor: 'Dr. Rohan Silva',
            specialty: 'Cardiology',
            location: 'City Hospital – Floor 3',
            date: '24',
            month: 'MAR',
            time: '09:30 AM',
            status: 'confirmed'
        },

        {
            id: 'APT-103',
            doctor: 'Dr. Priya Sharma',
            specialty: 'Dermatology',
            location: 'Metro Skin Clinic',
            date: '28',
            month: 'MAR',
            time: '04:00 PM',
            status: 'pending'
        },

        {
            id: 'APT-104',
            doctor: 'Dr. Amal Perera',
            specialty: 'General Medicine',
            location: 'Colombo Medical Center',
            date: '05',
            month: 'APR',
            time: '10:00 AM',
            status: 'confirmed'
        }

    ];


    // -------------------------
    // RENDER APPOINTMENTS
    // -------------------------

    function renderAppointments() {

        const container = document.getElementById("mainViewContent");
        if (!container) return;

        container.innerHTML = `

<div class="patient-tab-container">

<div class="flex-between mb-6">

<h2>My Upcoming Visits</h2>

<button class="btn btn-primary"
onclick="window.app.switchView('booking')">
+ New Appointment
</button>

</div>


<div class="appointment-card-list">

${appointments.map(apt => `

<div class="apt-item">

<div class="apt-info">

<div class="apt-date-box">

<span class="day">${apt.date}</span>
<span class="month">${apt.month}</span>

</div>

<div class="apt-details">

<h4>${apt.doctor}</h4>

<p>
${apt.specialty} • ${apt.time}
</p>

</div>

</div>


<div class="apt-actions">

<span class="status-badge ${apt.status}">
${apt.status}
</span>

<button class="btn small"
onclick="window.app.showAptDetail('${apt.id}')">
View
</button>

<button class="btn btn-outline small"
onclick="window.app.switchView('booking')">
Reschedule
</button>

<button class="btn btn-danger small"
onclick="window.app.showAptAction('Cancel','${apt.id}')">
Cancel
</button>

</div>

</div>

`).join("")}

</div>

</div>
`;
    }



    // -------------------------
    // VIEW APPOINTMENT MODAL
    // -------------------------

    function showAptDetail(aptId) {

        const apt = appointments.find(a => a.id === aptId);
        let overlay = document.getElementById("customModalOverlay");

        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "customModalOverlay";
            overlay.className = "custom-modal-overlay";
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `

<div class="custom-modal apt-detail-modal">

<div class="apt-modal-header">

<h3>Appointment Details</h3>

<span class="status-badge ${apt.status}">
${apt.status}
</span>

</div>


<div class="apt-doctor-section">

<img 
src="https://ui-avatars.com/api/?name=${apt.doctor.replace(/ /g, '+')}&background=1a365d&color=fff&size=64"
class="doctor-avatar"
/>

<div>

<h4>${apt.doctor}</h4>

<p class="doctor-specialty">
${apt.specialty}
</p>

</div>

</div>


<div class="apt-info-grid">

<div class="info-card">

<span class="info-label">Date</span>
<span class="info-value">${apt.date} ${apt.month}</span>

</div>


<div class="info-card">

<span class="info-label">Time</span>
<span class="info-value">${apt.time}</span>

</div>


<div class="info-card">

<span class="info-label">Reference</span>
<span class="info-value">#${apt.id}</span>

</div>


<div class="info-card full">

<span class="info-label">Location</span>
<span class="info-value">${apt.location}</span>

</div>

</div>


<div class="apt-modal-actions">

<button class="btn btn-outline"
onclick="window.app.closeCustomModal()">
Close
</button>

<button class="btn btn-primary"
onclick="window.app.closeCustomModal(); window.app.switchView('booking');">
Reschedule
</button>

</div>

</div>
`;

        overlay.classList.add("active");

    }



    // -------------------------
    // CANCEL / RESCHEDULE MODAL
    // -------------------------

    function showAptAction(action, aptId) {

        let overlay = document.getElementById("customModalOverlay");
        if (!overlay) {
            overlay = document.createElement("div");
            overlay.id = "customModalOverlay";
            overlay.className = "custom-modal-overlay";
            document.body.appendChild(overlay);
        }

        overlay.innerHTML = `

<div class="custom-modal">

<div class="modal-header">
<h3>${action} Appointment</h3>
</div>

<div class="modal-body">

<p style="margin-bottom: 24px; color: var(--text-muted); line-height: 1.6; font-size: 0.95rem;">
Are you sure you want to ${action.toLowerCase()} <strong style="color: var(--primary);">${aptId}</strong>?
</p>

${action === "Cancel" ? `

<div class="form-group">
    <label style="font-weight: 600; color: var(--text-main); margin-bottom: 8px; display: block;">Cancellation Reason</label>
    <select id="cancelReason" class="custom-select" style="width: 100%; padding: 14px 16px; border: 1.5px solid var(--border-color); border-radius: 12px; background: var(--bg-main); font-size: 1rem; cursor: pointer; margin-bottom: 12px;" onchange="document.getElementById('otherReasonContainer').style.display = this.value === 'Other' ? 'block' : 'none'">
        <option disabled selected>Please select a reason...</option>
        <option value="Emergency">Personal Emergency</option>
        <option value="Conflict">Schedule Conflict</option>
        <option value="Feeling Better">Feeling Better</option>
        <option value="Other">Other / Type my own</option>
    </select>
</div>
<div id="otherReasonContainer" class="form-group" style="display: none; transition: all 0.3s ease;">
    <input type="text" id="otherReason" placeholder="Please specify your reason" style="width: 100%; padding: 14px 16px; border: 1.5px solid var(--border-color); border-radius: 12px; background: white; font-family: inherit; font-size: 1rem;">
</div>

` : `

<div class="form-group">
    <label style="font-weight: 600; color: var(--text-main); margin-bottom: 8px; display: block;">Select New Date</label>
    <input type="date" id="rescheduleDate" style="width: 100%; padding: 14px 16px; border: 1.5px solid var(--border-color); border-radius: 12px; background: var(--bg-main); font-family: inherit; font-size: 1rem; outline: none;">
</div>

`}

</div>


<div class="modal-footer" style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border-color); display: flex; justify-content: flex-end; gap: 12px;">

<button class="btn btn-outline"
onclick="window.app.closeCustomModal()">
Back
</button>

<button class="btn btn-primary"
id="confirmAction">
Confirm
</button>

</div>

</div>

`;

        overlay.classList.add("active");


        document.getElementById("confirmAction").onclick = () => {

            window.app.closeCustomModal();

            if (window.app.showToast) {

                window.app.showToast(
                    "Success",
                    `Appointment ${aptId} ${action.toLowerCase()}ed`,
                    "success"
                );

            }

        };

    }



    // -------------------------
    // CLOSE MODAL
    // -------------------------

    function closeCustomModal() {

        const overlay = document.getElementById("customModalOverlay");

        if (overlay) {

            overlay.classList.remove("active");
            overlay.innerHTML = "";

        }

    }



    // -------------------------
    // EXPORT FUNCTIONS
    // -------------------------

    Object.assign(window.app, {

        renderAppointments,
        showAptDetail,
        showAptAction,
        closeCustomModal

    });

})();