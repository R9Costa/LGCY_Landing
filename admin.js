/* admin.js - Sovereign Directorate */
function renderDirectorate(container) {
    container.innerHTML = `
        <div style="padding:20px;">
            <h1 style="color:var(--gold); font-family:'Playfair Display'">Sovereign Directorate</h1>
            <div class="glass-card">
                <small>MEMBERSHIP LIQUIDITY</small>
                <div style="display:flex; justify-content:space-between; margin-top:15px;">
                    <div><small>ENTRY</small><br><strong>€1,000</strong></div>
                    <div><small>MONTHLY</small><br><strong>€250</strong></div>
                    <div class="gold-text"><strong>€1,250.00</strong></div>
                </div>
            </div>
            <div class="glass-card">
                <small>FEE PROTOCOLS</small>
                <p style="margin:10px 0; font-size:0.8rem;">✧ Sales: 1.0% | Rentals: 5.0%</p>
                <p style="margin:0; font-size:0.8rem;">✧ Philanthropy: 0.5%</p>
            </div>
            <button class="gold-btn" onclick="alert('Syncing Stripe Gateway...')">AUTHORIZE ENTITIES</button>
        </div>`;
}
