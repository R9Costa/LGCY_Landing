const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();
const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';

function init() {
    checkAdminAccess();
    startCountdown();
    setupPrivacy();
}

// Acesso Admin Antecipado Imediato
function checkAdminAccess() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') {
        sessionStorage.setItem('isAdmin', 'true');
        activateApp();
    }
}

function activateApp() {
    document.getElementById('screen-countdown').style.display = 'none';
    document.getElementById('screen-app').style.display = 'block';
    switchTab('insights', document.querySelector('.nav-item'));
}

function startCountdown() {
    setInterval(() => {
        const now = new Date().getTime();
        const diff = LAUNCH_DATE - now;
        if (diff <= 0) activateApp();
        else {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('timer').innerText = `${d}D : ${h}H : ${m}M : ${s}S`;
        }
    }, 1000);
}

// Navegação entre Abas
async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');

    if (sessionStorage.getItem('isAdmin') === 'true' && tab === 'status') {
        renderAdminDashboard(main);
    } else if (tab === 'insights') {
        loadYouTubeInsights(main);
    } else {
        main.innerHTML = `<div style="padding:120px 20px;"><h2>${tab.toUpperCase()}</h2><p>Coming Jan 1st.</p></div>`;
    }
}

async function loadYouTubeInsights(container) {
    const query = "luxury real estate yachts Bloomberg";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=5&key=${YT_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        let html = '<div id="reels-wrapper">';
        data.items.forEach(v => {
            html += `
                <div class="reel-item">
                    <iframe class="reel-media" src="https://www.youtube.com/embed/${v.id.videoId}?autoplay=1&mute=1&controls=0&modestbranding=1" allow="autoplay"></iframe>
                    <div class="reel-overlay"><h2 class="gold-text">${v.snippet.title}</h2></div>
                </div>`;
        });
        container.innerHTML = html + '</div>';
    } catch(e) { container.innerHTML = "<p>Insights Offline.</p>"; }
}

function setupPrivacy() {
    window.onblur = () => document.body.classList.add('blurred');
    window.onfocus = () => document.body.classList.remove('blurred');
}

let map;
function initMap() {
    map = new google.maps.Map(document.createElement('div'), {center:{lat:0,lng:0}, zoom:2});
}

init();
