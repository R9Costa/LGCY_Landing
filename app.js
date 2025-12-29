/*const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();

function init() {
    const params = new URLSearchParams(window.location.search);
    // Instant Admin Access via ?access=r9admin
    if (params.get('access') === 'r9admin') {
        sessionStorage.setItem('role', 'admin');
        activatePlatform();
    } else {
        runChronos();
    }
    setupSecurityLock();
}

function activatePlatform() {
    document.getElementById('screen-countdown').style.display = 'none';
    document.getElementById('screen-app').style.display = 'block';
    switchTab('intelligence', document.querySelector('.nav-item'));
}

function runChronos() {
    setInterval(() => {
        const now = new Date().getTime();
        const diff = LAUNCH_DATE - now;
        if (diff <= 0) activatePlatform();
        else {
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            document.getElementById('timer').innerText = `${d}D : ${h}H : REMAINING`;
        }
    }, 1000);
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    main.style.padding = "110px 20px 100px 20px";
    
    // Refresh Icons
    lucide.createIcons();

    if (sessionStorage.getItem('role') === 'admin' && tab === 'directorate') {
        renderDirectorate(main);
    } else if (tab === 'intelligence') {
        main.innerHTML = `<div class="glass-card"><h2 class="gold-text">INTELLIGENCE</h2><p class="subtitle">Global liquidity insights arriving Jan 1st.</p></div>`;
    } else {
        main.innerHTML = `<div class="glass-card"><h2 class="gold-text">${tab.toUpperCase()}</h2><p class="subtitle">Access restricted to verified patrons.</p></div>`;
    }
}

function setupSecurityLock() {
    window.onblur = () => document.body.classList.add('blurred');
    window.onfocus = () => document.body.classList.remove('blurred');
}

init();
 app.js - Intelligence & Directorate 
