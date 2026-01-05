/* admin.js - Sovereign Architect Dashboard */
function renderDirectorate(container) {
    // Lógica de Pontos: 100 inicial + 25 mensal + 125 apadrinhamento (5*25)
    const lpTotal = 100 + 25 + 125;
    const meritPos = (lpTotal / 1000) * 100;

    container.innerHTML = `
        <div style="padding: 20px; padding-bottom:100px;">
            <h1 class="gold-text">Grand Dashboard</h1>
            
            <div class="glass-card" style="text-align:center;">
                <div style="width:70px; height:70px; background:#111; border:2px solid var(--gold); border-radius:50%; margin:0 auto;"></div>
                <h3 style="margin:10px 0;">Node #001 | Origin</h3>
                <div class="merit-container">
                    <div class="merit-label"><span>Legacy Merit</span><span>${lpTotal} LP</span></div>
                    <div class="merit-bar-bg"><div class="merit-bar-fill" style="width:${meritPos}%"></div></div>
                </div>
            </div>

            <div class="glass-card metrics-grid">
                <div class="metric-box"><small>CLICKS</small><div class="metric-value">142</div></div>
                <div class="metric-box"><small>CONVERSIONS</small><div class="metric-value">28</div></div>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">Vault Monitoring</h3>
                <div style="display:flex; justify-content:space-between; margin-top:15px;">
                    <span>Security Deposits (1k€)</span><strong>28,000 €</strong>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top:5px;">
                    <span>Operational (250€)</span><strong>7,000 €</strong>
                </div>
                <hr style="border:0; border-top:1px solid #222; margin:15px 0;">
                <small style="color:var(--gold)"><i data-lucide="clock" style="width:10px;"></i> Refund Watch: 2 nodes approaching 180 days.</small>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">Invitation Hub</h3>
                <input type="text" id="inv-link" value="https://lgcy.vip/join?ref=origin" class="glass-input" style="margin-top:10px;" readonly>
                <button class="gold-btn" style="margin-top:10px; padding:10px;" onclick="copyLink()">Copy Secret Invite</button>
            </div>
        </div>
    `;
    lucide.createIcons();
}

function copyLink() {
    const link = document.getElementById('inv-link');
    link.select();
    document.execCommand('copy');
    alert("Founder Invite Copied.");
}
