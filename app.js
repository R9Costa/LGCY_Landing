const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') {
        sessionStorage.setItem('role', 'admin');
        activateTerminal();
    } else {
        runChronos();
    }
    setupPrivacy();
}

function activateTerminal() {
    document.getElementById('screen-countdown').style.display = 'none';
    document.getElementById('screen-app').style.display = 'block';
    switchTab('intelligence', document.querySelector('.nav-item'));
}

function runChronos() {
    const timerDisplay = document.getElementById('timer');
    setInterval(() => {
        const now = new Date().getTime();
        const diff = LAUNCH_DATE - now;
        if (diff <= 0) activateTerminal();
        else {
            const d = Math.floor(diff / 86400000);
            const h = Math.floor((diff % 86400000) / 3600000);
            const m = Math.floor((diff % 3600000) / 60000);
            const s = Math.floor((diff % 60000) / 1000);
            timerDisplay.innerText = `${d}D : ${h}H : ${m}M : ${s}S`;
        }
    }, 1000);
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    main.style.padding = "110px 20px 100px 20px";
    
    lucide.createIcons();

    if (sessionStorage.getItem('role') === 'admin' && tab === 'directorate') {
        renderDirectorate(main);
    } else if (tab === 'inventory') {
        renderInventory(main);
    } else {
        main.innerHTML = `
            <div class="glass-card">
                <h2 class="gold-text">${tab.toUpperCase()}</h2>
                <p style="font-size:0.7rem; letter-spacing:2px; color:#555; text-transform:uppercase;">
                    Access Restricted until Launch
                </p>
            </div>`;
    }
    lucide.createIcons();
}

function setupPrivacy() {
    window.onblur = () => document.body.classList.add('blurred');
    window.onfocus = () => document.body.classList.remove('blurred');
}

init();
