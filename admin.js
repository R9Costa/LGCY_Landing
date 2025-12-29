/* admin.js - Rounded Directorate Hub */
function renderDirectorate(container) {
    container.style.padding = "100px 20px";
    container.innerHTML = `
        <div class="fade-in">
            <h1 class="gold-text">Sovereign Directorate</h1>
            <p class="subtitle">Operational Architect Overview</p>

            <div class="glass-card" style="border-radius:12px;">
                <h3 class="subtitle">Registration Liquidity</h3>
                <div style="display:flex; justify-content:space-between; margin-top:20px;">
                    <div><small>DEPOSIT</small><br><strong>€1,000</strong></div>
                    <div><small>MEMBERSHIP</small><br><strong>€250</strong></div>
                    <div><small>TOTAL</small><br><strong class="gold-text">€1,250.00</strong></div>
                </div>
            </div>

            <div class="glass-card" style="border-radius:12px;">
                <h3 class="subtitle">Standard Fee Protocols</h3>
                <div style="margin-top:15px; line-height:2;">
                    <p>✧ Acquisition Commission: <strong>1.0%</strong></p>
                    <p>✧ Rental/Charter Fee: <strong>5.0%</strong></p>
                    <p>✧ Philanthropy Management: <strong>0.5%</strong></p>
                </div>
            </div>

            <button class="gold-btn" style="border-radius:8px;" onclick="verifyStripe()">
                Authorize New Entities
            </button>
        </div>
    `;
}
