/* app.js - Intelligence & Directorate Engine */
const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();

function init() {
    const params = new URLSearchParams(window.location.search);
    // Instant Admin Access via ?access=r9admin
    if (params.get('access') === 'r9admin') {
        sessionStorage.setItem('role', 'admin');
        showPlatform();
    } else {
        startChronos();
    }
    setupPrivacyLock();
}

function showPlatform() {
    document.getElementById('screen-countdown').style.display = 'none';
    document.getElementById('screen-app').style.display = 'block';
    switchTab('intelligence', document.querySelector('.nav-item'));
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    
    // Refresh Icons after tab switch
    lucide.createIcons();

    if (sessionStorage.getItem('role') === 'admin' && tab === 'directorate') {
        renderDirectorate(main);
    } else if (tab === 'intelligence') {
        renderIntelligenceReels(main);
    } else {
        main.innerHTML = `
            <div class="glass-card fade-in" style="margin-top:40px; border-radius:12px;">
                <h2 class="gold-text">${tab.toUpperCase()}</h2>
                <p class="subtitle">Access restricted until January 1st.</p>
            </div>
        `;
    }
}

// Modern Intelligence Feed (Instagram Style)
function renderIntelligenceReels(container) {
    container.style.padding = "0";
    container.innerHTML = `
        <div id="reels-wrapper" style="height:100vh; overflow-y:scroll; scroll-snap-type:y mandatory;">
            <div class="reel-item" style="height:100vh; scroll-snap-align:start; position:relative; background:#050505;">
                <video src="https://path-to-your-luxury-video.mp4" autoplay loop muted playsinline style="width:100%; height:100%; object-fit:cover;"></video>
                <div class="reel-overlay" style="position:absolute; bottom:120px; padding:30px; width:100%; background:linear-gradient(transparent, black);">
                    <span class="subtitle">Global Intelligence</span>
                    <h3 class="gold-text">The Evolution of Private Equity</h3>
                    <p style="font-size:0.9rem; color:#ccc;">Analyzing off-market liquidity trends for 2026.</p>
                </div>
            </div>
        </div>
    `;
}

init();
