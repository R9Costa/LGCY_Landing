/* app.js - Creation Workshop & Asset Logic */
function renderSocialUpload(container) {
    container.innerHTML = `
        <div style="padding:20px;">
            <h1 class="gold-text">New Opportunity</h1>
            <div style="display:flex; gap:10px; margin-bottom:20px;">
                <button class="tab-btn active">Post</button>
                <button class="tab-btn">Reel</button>
                <button class="tab-btn">Story</button>
            </div>

            <div class="glass-card">
                <select id="asset-type" class="glass-input" onchange="updateLimits()">
                    <option value="sale">Sale (Acquisition)</option>
                    <option value="rent">Rent (Charter/Leasing)</option>
                </select>
                <input type="number" id="asset-price" placeholder="Value in €" class="glass-input" style="margin:15px 0;">
                <p id="limit-info" style="font-size:0.6rem; color:#666;"></p>
                
                <div class="upload-zone" onclick="alert('Accessing Gallery...')">
                    <i data-lucide="camera" style="width:40px; height:40px; color:#333;"></i>
                    <p>Upload Luxury Media</p>
                </div>

                <div id="fee-preview" class="glass-card" style="background:rgba(212,175,55,0.05); border:1px dashed var(--gold); margin-top:20px;">
                    <small>PROXIMITY FEE CALCULATION:</small>
                    <div id="fee-results" style="font-size:0.8rem; margin-top:10px;">Enter value to see commissions...</div>
                </div>

                <button class="gold-btn" onclick="validateAndPost()" style="margin-top:20px;">Publish to the Chain</button>
            </div>
        </div>
    `;
    updateLimits();
    lucide.createIcons();
}

function updateLimits() {
    const type = document.getElementById('asset-type').value;
    const info = document.getElementById('limit-info');
    info.innerText = type === 'sale' ? "Minimum requirement: €500,000" : "Minimum requirement: €5,000";
}
