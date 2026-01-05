l/* admin.js - Updated with Merit Bar and Sponsorship Rules */
function renderDirectorate(container) {
    const initialPoints = 100;
    const monthlyPoints = 25;
    const sponsorshipPoints = 5 * 25; // Máximo de 5 afilhados com pontos
    const totalLP = initialPoints + monthlyPoints + sponsorshipPoints;
    const meritPercentage = (totalLP / 1000) * 100; // Exemplo: meta de 1000 LP

    container.innerHTML = `
        <div class="profile-fade" style="padding: 20px;">
            <div class="glass-card" style="text-align:center;">
                <div class="profile-avatar" style="border: 2px solid var(--gold);"></div>
                <h2 class="gold-text">Sovereign Node #001</h2>
                
                <div class="merit-container">
                    <div class="merit-label">
                        <span>Legacy Merit</span>
                        <span>${totalLP} LP</span>
                    </div>
                    <div class="merit-bar-bg">
                        <div class="merit-bar-fill" style="width: ${meritPercentage}%"></div>
                    </div>
                </div>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">Financial Node Status</h3>
                <div style="font-size:0.75rem; margin-top:15px; line-height:1.6;">
                    <p>✧ Security Deposit: <strong>1.000 €</strong> <br>
                       <small style="color:#666;">(Refundable after 6 months of active status)</small></p>
                    <p>✧ Monthly Subscription: <strong>250 €</strong> <br>
                       <small style="color:#666;">(Pre-paid membership)</small></p>
                </div>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">Legacy Chain (Sponsorship)</h3>
                <div style="margin-top:15px;">
                    <p style="font-size:0.7rem; color:#888;">Active Godchildren: 5/5 (Points Maxed)</p>
                    <div class="chain-tree">
                        <div class="chain-node active"><span class="node-dot"></span>Origin Founder</div>
                        <div style="padding-left:20px; border-left:1px solid #222; margin-top:10px;">
                            <small style="display:block; color:var(--gold);">+ 5 Protected Nodes Active</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}
