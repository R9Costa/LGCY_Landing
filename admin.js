function renderDirectorate(container) {
    const lpTotal = 100 + 25 + 125; // Pontos do Fundador
    container.innerHTML = `
        <div style="padding: 20px;">
            <h1 class="gold-text">Grand Dashboard</h1>
            
            <div class="glass-card" style="text-align:center;">
                <h3 style="margin:0;">Node #001 | Founder</h3>
                <div class="merit-bar-bg"><div class="merit-bar-fill" style="width:25%"></div></div>
                <small style="color:var(--gold); margin-top:5px; display:block;">${lpTotal} Legacy Points</small>
            </div>

            <div class="glass-card">
                <p>Security Deposits: <strong>28,000 €</strong></p>
                <p>Monthly Revenue: <strong>7,000 €</strong></p>
                <hr style="border:0; border-top:1px solid #222; margin:15px 0;">
                <small style="color:var(--gold)">Status: Fully Operational</small>
            </div>

            <div class="glass-card">
                <h3 style="font-size:0.8rem;">Invite Secret Link</h3>
                <input type="text" value="https://lgcy.vip/join?ref=origin" style="width:100%; background:#000; border:1px solid #333; color:#fff; padding:10px; border-radius:5px;">
                <button style="width:100%; background:#D4AF37; border:none; padding:12px; margin-top:10px; font-weight:bold; border-radius:5px;">COPY LINK</button>
            </div>
        </div>
    `;
    lucide.createIcons();
}
