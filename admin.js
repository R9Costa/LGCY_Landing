/* admin.js - Sovereign Grand Dashboard */
function renderDirectorate(container) {
    const totalLP = 100 + 25 + 125; // Base + Mensalidade + 5 Afilhados
    const meritPercentage = (totalLP / 1000) * 100;

    container.innerHTML = `
        <div style="padding: 20px; padding-bottom:100px;">
            <h1 class="gold-text" style="font-family:'Playfair Display'; italic">Grand Dashboard</h1>
            
            <div class="glass-card" style="text-align:center;">
                <div style="width:70px; height:70px; background:#111; border:2px solid var(--gold); border-radius:50%; margin:0 auto;"></div>
                <h3 style="margin:10px 0;">Node #001 | Origin</h3>
                
                <div class="merit-container">
                    <div class="merit-label"><span>Legacy Merit</span><span>${totalLP} LP</span></div>
                    <div class="merit-bar-bg"><div class="merit-bar-fill" style="width:${meritPercentage}%"></div></div>
                </div>
            </div>

            <div class="glass-card metrics-grid">
                <div style="text-align:center;"><small>CONVERSIONS</small><div class="metric-value">28</div></div>
                <div style="text-align:center;"><small>CLICKS</small><div class="metric-value">142</div></div>
            </div>

            <div class="glass-card">
                <h3 style="font-size:0.7rem; letter-spacing:2px; color:#888;">VAULT LIQUIDITY</h3>
                <div style="display:flex; justify-content:space-between; margin-top:15px;">
                    <span>Security Deposits</span><strong>28.000 €</strong>
                </div>
                <div style="display:flex; justify-content:space-between; margin-top:5px;">
                    <span>Monthly Revenue</span><strong>7.000 €</strong>
                </div>
                <hr style="border:0; border-top:1px solid #222; margin:15px 0;">
                <p style="font-size:0.65rem; color:var(--gold);">✧ 2 Refunds scheduled for July 2026. [cite: 2025-12-23]</p>
            </div>

            <div class="glass-card">
                <small>INVITATION LINK</small>
                <input type="text" value="https://lgcy.vip/join?ref=origin" class="glass-input" style="margin-top:10px;" readonly>
                <button class="gold-btn" style="margin-top:15px; padding:12px;" onclick="alert('Link Copied')">Copy Secret Invite</button>
            </div>
        </div>`;
    lucide.createIcons();
}
