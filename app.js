const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') {
        sessionStorage.setItem('isAdmin', 'true');
        showApp();
    } else {
        startCountdown();
    }
    setupPrivacy();
}

function showApp() {
    document.getElementById('screen-countdown').style.display = 'none';
    document.getElementById('screen-app').style.display = 'block';
    switchTab('insights', document.querySelector('.nav-item'));
}

function startCountdown() {
    setInterval(() => {
        const now = new Date().getTime();
        const diff = LAUNCH_DATE - now;
        if (diff <= 0) showApp();
        else {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            document.getElementById('timer').innerText = `${d}D : ${h}H : ...`;
        }
    }, 1000);
}

function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');

    if (sessionStorage.getItem('isAdmin') === 'true' && tab === 'status') {
        renderAdminDashboard(main);
    } else {
        main.innerHTML = `<h2 style="color:#D4AF37">${tab.toUpperCase()}</h2><p>Disponível em 1 de Janeiro.</p>`;
    }
}

function setupPrivacy() {
    window.onblur = () => document.body.classList.add('blurred');
    window.onfocus = () => document.body.classList.remove('blurred');
}

init();
