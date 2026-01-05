/* admin.js - The Sovereign Profile & Mandatory Details */
function renderDirectorate(container) {
    container.innerHTML = `
        <div class="profile-fade" style="padding: 20px;">
            <div class="glass-card" style="text-align:center;">
                <div class="profile-avatar" style="border: 2px solid var(--gold);"></div>
                <h2 class="gold-text">Node #001 | Founder</h2>
                <div class="points-badge">${(12550).toLocaleString()} LEGACY POINTS</div>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">Mandatory Profile Details</h3>
                <form id="profile-form" style="display:flex; flex-direction:column; gap:15px; margin-top:15px;">
                    <input type="text" placeholder="Full Professional Name" required class="glass-input">
                    <select class="glass-input">
                        <option>Net Worth Tier: €1M - €10M</option>
                        <option>Net Worth Tier: €10M - €100M</option>
                        <option>Net Worth Tier: Ultra (UHNWI)</option>
                    </select>
                    <div style="display:flex; justify-content:space-between; align-items:center;">
                        <span style="font-size:0.7rem;">Privacy:</span>
                        <select class="glass-input" style="width:150px;">
                            <option>Public</option>
                            <option>Legacy Chain</option>
                            <option>Private</option>
                        </select>
                    </div>
                    <button class="gold-btn" style="padding:10px;">Update Sovereign Status</button>
                </form>
            </div>

            <div class="glass-card">
                <h3 class="subtitle">My Legacy Chain</h3>
                <div class="chain-tree" style="margin-top:15px;">
                    <div class="chain-node active"><span class="node-dot"></span>Origin (You)</div>
                </div>
            </div>
        </div>
    `;
    lucide.createIcons();
}
