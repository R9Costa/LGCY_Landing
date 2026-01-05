/* admin.js - Sovereign Profile & Verification Node */
function renderDirectorate(container) {
    container.innerHTML = `
        <div class="profile-fade" style="padding: 20px;">
            <div class="glass-card" style="text-align:center; border-color: var(--gold);">
                <div class="profile-avatar" style="border: 2px solid var(--gold); background: url('https://placehold.co/80x80/000/D4AF37') center/cover;"></div>
                <h2 class="gold-text" style="margin-top:10px;">Node #001 | Founder</h2>
                <div class="points-badge">12,550 LEGACY POINTS</div>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">Mandatory Sovereign Verification</h3>
                <form id="verification-form" style="display:flex; flex-direction:column; gap:12px; margin-top:15px;">
                    <div class="upload-zone" style="height:80px; font-size:0.7rem;" onclick="document.getElementById('id-upload').click()">
                        <i data-lucide="shield-check" style="width:20px;"></i>
                        <p>Upload Passport or ID (Automated Vetting)</p>
                        <input type="file" id="id-upload" style="display:none">
                    </div>
                    <input type="text" placeholder="Full Legal Name" required class="glass-input">
                    <select class="glass-input">
                        <option>Net Worth: €1M - €10M</option>
                        <option>Net Worth: €10M+</option>
                        <option>Net Worth: Sovereign Status</option>
                    </select>
                    <button type="submit" class="gold-btn" style="padding:10px;">Verify Identity</button>
                </form>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">The Origin Chain</h3>
                <div class="chain-tree" style="margin-top:15px;">
                    <div class="chain-node active"><span class="node-dot"></span>Origin Founder Status</div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}
