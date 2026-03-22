
/**
 * Patient Module: Billing
 */
(function() {
    window.app = window.app || {};

    function renderBilling() {
        const bills = [
            { id: 'INV-8821', date: '20 Mar 2026', type: 'Consultation', amount: '2,500.00', status: 'Paid' },
            { id: 'INV-1022', date: 'Today', type: 'Pharmacy', amount: '850.00', status: 'Pending' }
        ];

        const mainViewContent = document.getElementById('mainViewContent');
        mainViewContent.innerHTML = `
            <div class="patient-tab-container animate-fade-in">
                <div class="billing-summary-header mb-2">
                    <h3>Billing & Pharmacy Dues</h3>
                    <div class="total-due-badge">
                        <span class="amount text-error font-bold">LKR 850.00 Outstanding</span>
                    </div>
                </div>
                <div class="billing-table-card card">
                    <div class="table-responsive">
                        <table class="data-table">
                            <thead>
                                <tr><th>Date</th><th>Description</th><th>Amount (LKR)</th><th>Status</th><th>Action</th></tr>
                            </thead>
                            <tbody>
                                ${bills.map(bill => `
                                    <tr>
                                        <td>${bill.date}</td>
                                        <td>${bill.type}</td>
                                        <td class="font-bold">${bill.amount}</td>
                                        <td><span class="status-badge ${bill.status.toLowerCase()}">${bill.status}</span></td>
                                        <td>
                                            ${bill.status === 'Pending' 
                                                ? `<button class="btn btn-primary small" onclick="window.app.showPaymentModal('${bill.id}', '${bill.amount}')">Pay Now</button>` 
                                                : `<button class="btn btn-link small" onclick="window.app.showReceipt('${bill.id}')"><i class="fas fa-download"></i> Receipt</button>`}
                                        </td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="pharmacy-orders mt-8">
                    <h3 class="mb-4">Recent Pharmacy Orders</h3>
                    <div class="grid-2 gap-4">
                        <div class="order-card card animate-slide-up" onclick="window.app.showOrderDetail('ORD-5542')" style="cursor:pointer;">
                            <div class="flex-between">
                                <div>
                                    <h4 class="text-primary">Order #5542</h4>
                                    <p class="text-muted">18 Mar 2026 • 3 Items</p>
                                </div>
                                <span class="status-badge confirmed">Ready for Pickup</span>
                            </div>
                        </div>
                        <div class="order-card card animate-slide-up" onclick="window.app.showOrderDetail('ORD-5530')" style="cursor:pointer;">
                            <div class="flex-between">
                                <div>
                                    <h4 class="text-primary">Order #5530</h4>
                                    <p class="text-muted">12 Mar 2026 • 1 Item</p>
                                </div>
                                <span class="status-badge confirmed">Picked Up</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    function showPaymentModal(invId, amount) {
        let overlay = document.getElementById('customModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'customModalOverlay';
            overlay.className = 'custom-modal-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="modal-header"><h3>Secure Payment</h3></div>
                <div class="modal-body">
                    <div class="payment-summary p-4 bg-light border-radius mb-6">
                        <div class="flex-between mb-2"><span>Invoice:</span><strong>#${invId}</strong></div>
                        <div class="flex-between"><span>Amount:</span><strong>LKR ${amount}</strong></div>
                    </div>
                    <div class="form-group"><label>Card Number</label><input type="text" class="form-control" placeholder="**** **** **** ****"></div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-outline" onclick="window.app.closeCustomModal()">Cancel</button>
                    <button class="btn btn-success" onclick="window.app.confirmPayment('${invId}')">Confirm Payment</button>
                </div>
            </div>
        `;
        overlay.classList.add('active');
    }

    function confirmPayment(invId) {
        window.app.closeCustomModal();
        window.app.showToast('Payment Successful', `Invoice #${invId} has been paid.`, 'success');
        setTimeout(() => renderBilling(), 500);
    }

    function showReceipt(invId) {
        let overlay = document.getElementById('customModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'customModalOverlay';
            overlay.className = 'custom-modal-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="modal-header"><h3>Payment Receipt</h3></div>
                <div class="modal-body">
                    <div class="receipt-box border p-6 border-radius" style="border-style: dashed !important;">
                        <div class="text-center mb-6">
                            <h2 class="text-primary">CareSync Hospital</h2>
                            <p class="text-xs text-muted">Colombo, Sri Lanka</p>
                        </div>
                        <div class="flex-between mb-2"><span>Receipt ID:</span><strong>RCP-${invId}</strong></div>
                        <div class="flex-between mb-2"><span>Date:</span><strong>22 Mar 2026</strong></div>
                        <div class="flex-between mb-4 pb-4 border-bottom"><span>Payment Method:</span><strong>Visa **** 4421</strong></div>
                        <div class="flex-between text-lg font-bold"><span>Total Paid:</span><span class="text-success">LKR 2,500.00</span></div>
                    </div>
                </div>
                <div class="modal-footer"><button class="btn btn-primary" onclick="window.app.closeCustomModal()">Close Receipt</button></div>
            </div>
        `;
        overlay.classList.add('active');
    }

    function showOrderDetail(orderId) {
        let overlay = document.getElementById('customModalOverlay');
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.id = 'customModalOverlay';
            overlay.className = 'custom-modal-overlay';
            document.body.appendChild(overlay);
        }
        overlay.innerHTML = `
            <div class="custom-modal">
                <div class="modal-header"><h3>Order Details: ${orderId}</h3></div>
                <div class="modal-body">
                    <ul class="list-none">
                        <li class="flex-between py-2 border-bottom"><span>Amoxicillin 500mg</span><strong>10 Tabs</strong></li>
                        <li class="flex-between py-2 border-bottom"><span>Paracetamol 500mg</span><strong>20 Tabs</strong></li>
                        <li class="flex-between py-2"><span>Vitamin C Syrup</span><strong>1 Bottle</strong></li>
                    </ul>
                </div>
                <div class="modal-footer"><button class="btn btn-primary" onclick="window.app.closeCustomModal()">Close</button></div>
            </div>
        `;
        overlay.classList.add('active');
    }

    Object.assign(window.app, {
        renderBilling, showPaymentModal, confirmPayment, showReceipt, showOrderDetail
    });
})();
