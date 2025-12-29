/* admin.js - Sovereign Directorate */
function renderDirectorate(container) {
    container.innerHTML = `
        <div class="fade-in">
            <h1 class="gold-text">Sovereign Directorate</h1>
            <div class="glass-card">
                <h3 style="font-size:0.7rem; letter-spacing:2px; color:#666;">LIQUIDITY OVERVIEW</h3>
                <div style="display:flex; justify-content:space-between; margin-top:20px;">
                    <div><small>DEPOSIT</small><br><strong>€1,000</strong></div>
                    <div><small>MONTHLY</small><br><strong>€250</strong></div>
                    <div><small>TOTAL</small><br><strong class="gold-text">€1,250.00</strong></div>
                </div>
            </div>
            <button class="gold-btn" onclick="alert('Syncing Stripe verifications...')">Authorize New Entities</button>
        </div>
    `;
}

/* Inventory Display with Mock Data */
function renderInventory(container) {
    const assets = [
        { type: 'Sale', cat: 'Jets', title: 'Bombardier Global 7500', price: 75000000 },
        { type: 'Rent', cat: 'Supercars', title: 'Bugatti Chiron Pur Sport', price: 25000 }
    ];

    let html = `<h1 class="gold-text">THE INVENTORY</h1><div style="margin-bottom:30px;">`;
    
    assets.forEach(a => {
        const fee = a.type === 'Sale' ? a.price * 0.01 : a.price * 0.05;
        html += `
            <div class="glass-card">
                <small style="color:var(--gold)">${a.cat.toUpperCase()} • ${a.type.toUpperCase()}</small>
                <h3 style="margin:10px 0;">${a.title}</h3>
                <p>Value: €${a.price.toLocaleString()}</p>
                <hr style="border:0; border-top:1px solid #222; margin:15px 0;">
                <p style="font-size:0.8rem; color:#888;">LGCY Commission: €${fee.toLocaleString()}</p>
            </div>`;
    });

    container.innerHTML = html + `</div>`;
}
