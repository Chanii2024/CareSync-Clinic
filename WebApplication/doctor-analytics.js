// Doctor Practice Analytics Logic
window.app = window.app || {};

const analyticsData = {
    overview: {
        totalPatients: 128,
        consultationsThisMonth: 47,
        avgConsultTime: '18 min',
        pendingLabReviews: 3
    },
    monthlyConsultations: [
        { month: 'Oct', count: 32 },
        { month: 'Nov', count: 41 },
        { month: 'Dec', count: 28 },
        { month: 'Jan', count: 38 },
        { month: 'Feb', count: 44 },
        { month: 'Mar', count: 47 }
    ],
    topDiagnoses: [
        { name: 'Essential Hypertension', count: 22, pct: 28 },
        { name: 'Type 2 Diabetes', count: 18, pct: 23 },
        { name: 'Upper Respiratory Infection', count: 14, pct: 18 },
        { name: 'Hyperlipidemia', count: 11, pct: 14 },
        { name: 'Gastritis', count: 8, pct: 10 },
        { name: 'Other', count: 5, pct: 7 }
    ],
    recentActivity: [
        { action: 'Completed consultation', patient: 'Maria Fernando', time: '2 hours ago' },
        { action: 'Reviewed lab result', patient: 'Amal Peris', time: '3 hours ago' },
        { action: 'Updated prescription', patient: 'John Silva', time: 'Yesterday' },
        { action: 'Ordered lab tests', patient: 'Sunil Jayawardena', time: 'Yesterday' },
        { action: 'Completed consultation', patient: 'Nimal Perera', time: '2 days ago' }
    ]
};

window.app.renderDocAnalytics = function() {
    const mainViewContent = document.getElementById('mainViewContent');
    const d = analyticsData;

    // Find the max count in monthlyConsultations for bar scaling
    const maxCount = Math.max(...d.monthlyConsultations.map(m => m.count));

    let html = `
        <div class="analytics-container animate-fade-in" style="max-width: 1200px; margin: 0 auto;">
            
            <!-- Page Header -->
            <div style="margin-bottom: 30px;">
                <h1 style="font-size: 24px; color: var(--primary); font-weight: 700; margin-bottom: 5px;">Practice Analytics</h1>
                <div class="text-muted text-sm">Overview of your clinical activity and patient statistics.</div>
            </div>

            <!-- KPI Cards Row -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; margin-bottom: 30px;">
                <div class="card" style="padding: 20px;">
                    <div class="text-muted text-sm" style="margin-bottom: 8px;">Total Patients</div>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary); line-height: 1;">${d.overview.totalPatients}</div>
                </div>
                <div class="card" style="padding: 20px;">
                    <div class="text-muted text-sm" style="margin-bottom: 8px;">This Month</div>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary); line-height: 1;">${d.overview.consultationsThisMonth}</div>
                    <div class="text-muted" style="font-size: 0.7rem; margin-top: 4px;">Consultations</div>
                </div>
                <div class="card" style="padding: 20px;">
                    <div class="text-muted text-sm" style="margin-bottom: 8px;">Avg. Duration</div>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary); line-height: 1;">${d.overview.avgConsultTime}</div>
                </div>
                <div class="card" style="padding: 20px;">
                    <div class="text-muted text-sm" style="margin-bottom: 8px;">Pending Labs</div>
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary); line-height: 1;">${d.overview.pendingLabReviews}</div>
                    <div class="text-muted" style="font-size: 0.7rem; margin-top: 4px;">To Review</div>
                </div>
            </div>

            <!-- Two Column Layout -->
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 30px;">
                
                <!-- Monthly Consultations Chart -->
                <div class="card" style="padding: 24px;">
                    <h3 style="color: var(--primary); font-size: 1.1rem; margin-bottom: 20px;">Monthly Consultations</h3>
                    <div style="display: flex; align-items: flex-end; gap: 12px; height: 180px; padding-top: 10px;">
                        ${d.monthlyConsultations.map(m => {
                            const heightPct = Math.max((m.count / maxCount) * 100, 8);
                            return `
                                <div style="flex: 1; display: flex; flex-direction: column; align-items: center; gap: 6px;">
                                    <div class="text-muted" style="font-size: 0.7rem; font-weight: 700;">${m.count}</div>
                                    <div style="width: 100%; height: ${heightPct}%; background: var(--primary); border-radius: 6px 6px 0 0; min-height: 8px; transition: height 0.3s;"></div>
                                    <div class="text-muted" style="font-size: 0.75rem;">${m.month}</div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Top Diagnoses -->
                <div class="card" style="padding: 24px;">
                    <h3 style="color: var(--primary); font-size: 1.1rem; margin-bottom: 20px;">Top Diagnoses</h3>
                    <div style="display: flex; flex-direction: column; gap: 14px;">
                        ${d.topDiagnoses.map(dx => `
                            <div>
                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px;">
                                    <span style="font-size: 0.85rem; font-weight: 600; color: var(--text-main);">${dx.name}</span>
                                    <span class="text-muted" style="font-size: 0.8rem;">${dx.count} cases (${dx.pct}%)</span>
                                </div>
                                <div style="width: 100%; height: 6px; background: var(--border-color); border-radius: 3px; overflow: hidden;">
                                    <div style="width: ${dx.pct}%; height: 100%; background: var(--primary); border-radius: 3px; transition: width 0.4s;"></div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>

            <!-- Recent Activity -->
            <div class="card" style="padding: 0;">
                <div style="padding: 20px 24px; border-bottom: 1px solid var(--border-color);">
                    <h3 style="color: var(--primary); font-size: 1.1rem; margin: 0;">Recent Activity</h3>
                </div>
                ${d.recentActivity.map((a, i) => `
                    <div style="display: flex; align-items: center; gap: 15px; padding: 16px 24px;${i < d.recentActivity.length - 1 ? ' border-bottom: 1px solid var(--border-color);' : ''}">
                        <div style="width: 36px; height: 36px; border-radius: 50%; background: var(--bg-main); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
                            <i class="fas fa-${a.action.includes('consultation') ? 'stethoscope' : a.action.includes('lab') ? 'flask' : a.action.includes('prescription') ? 'pills' : 'clipboard-list'}" style="color: var(--primary); font-size: 0.85rem;"></i>
                        </div>
                        <div style="flex: 1;">
                            <div style="font-size: 0.9rem; color: var(--text-main);"><strong>${a.action}</strong> — ${a.patient}</div>
                        </div>
                        <div class="text-muted text-sm" style="flex-shrink: 0;">${a.time}</div>
                    </div>
                `).join('')}
            </div>

            <!-- Responsive -->
            <style>
                @media (max-width: 768px) {
                    .analytics-container [style*="grid-template-columns: repeat(4"] {
                        grid-template-columns: repeat(2, 1fr) !important;
                    }
                    .analytics-container [style*="grid-template-columns: 1fr 1fr"] {
                        grid-template-columns: 1fr !important;
                    }
                }
                @media (max-width: 480px) {
                    .analytics-container [style*="grid-template-columns: repeat(2"] {
                        grid-template-columns: 1fr !important;
                    }
                }
            </style>
        </div>
    `;

    mainViewContent.innerHTML = html;
};
