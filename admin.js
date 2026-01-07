/* admin.js - The Sovereign Architect Panel */
function renderDirectorate(container) {
    const totalLP = 100 + 25 + 125; 
    const meritPercentage = (totalLP / 1000) * 100;

    container.innerHTML = `
        <div style="padding: 20px; padding-bottom:100px;">
            <h1 class="gold-text" style="font-family:'Playfair Display'; italic;">Grand Dashboard</h1>
            
            <div class="glass-card" style="text-align:center;">
                <div style="width:60px; height:60px; background:#111; border:2px solid var(--gold); border-radius:50%; margin:0 auto;"></div>
                <h3 style="margin:10px 0;">Node #001 | Founder</h3>
                <div class="merit-container">
                    <div class="merit-label"><span>Legacy Merit</span><span>${totalLP} LP</span></div>
                    <div class="merit-bar-bg"><div class="merit-bar-fill" style="width:${meritPercentage}%"></div></div>
                </div>
            </div>

            <div class="glass-card">
                <h3 style="font-size:0.7rem; color:#888;">VAULT</h3>
                <p>Security Deposits: <strong>28.000 €</strong></p>
                <p>Operational Capital: <strong>7.000 €</strong></p>
                <hr style="border:0; border-top:1px solid #222; margin:15px 0;">
                <small style="color:var(--gold);">Founder Status Active</small>
            </div>

            <div class="glass-card">
                <small>INVITE LINK</small>
                <input type="text" value="https://lgcy.vip/join?ref=origin" class="glass-input" style="margin-top:10px;" readonly>
                <button class="gold-btn" style="margin-top:10px; padding:12px;" onclick="alert('Link Copied')">COPY SECRET LINK</button>
            </div>
        </div>`;
    lucide.createIcons();
}
