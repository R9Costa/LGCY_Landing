const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
let players = {}; 
let globalMuted = true;
let nextPageToken = '';
let observer;

function onYouTubeIframeAPIReady() {
    observer = new IntersectionObserver(handleIntersect, { threshold: 0.7 });
    init();
}

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') sessionStorage.setItem('role', 'admin');
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
}

async function loadIntelligence(container, append = false) {
    const queries = ["Forbes Billionaires 2026", "Michelin Guide luxury hotels", "Supercar Investment"];
    const q = queries[Math.floor(Math.random() * queries.length)];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=5&pageToken=${nextPageToken}&key=${YT_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    nextPageToken = data.nextPageToken || '';

    data.items.forEach((v) => {
        const div = document.createElement('div');
        div.className = 'reel-card';
        div.id = `card-${v.id.videoId}`;
        div.innerHTML = `
            <div class="video-wrapper" id="player-${v.id.videoId}"></div>
            <div class="reel-overlay" onclick="toggleGlobalMute()">
                <div class="sound-btn"><i data-lucide="${globalMuted ? 'volume-x' : 'volume-2'}"></i></div>
                <div style="width:75%">
                    <h3 style="font-size:0.9rem; margin-bottom:5px;">${v.snippet.title}</h3>
                    <p style="font-size:0.7rem; color:#aaa;">Forbes / Michelin Intelligence</p>
                </div>
                <div class="reel-actions">
                    <div class="action-btn" onclick="event.stopPropagation(); like(this)"><i data-lucide="heart"></i><span>2.4k</span></div>
                    <div class="action-btn" onclick="event.stopPropagation(); save(this)"><i data-lucide="bookmark"></i><span>Guardar</span></div>
                    <div class="action-btn" onclick="event.stopPropagation(); share('${v.id.videoId}')"><i data-lucide="share-2"></i><span>Share</span></div>
                </div>
            </div>`;
        container.appendChild(div);
        
        new YT.Player(`player-${v.id.videoId}`, {
            videoId: v.id.videoId,
            playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 0, 'loop': 1, 'playlist': v.id.videoId, 'modestbranding': 1, 'rel': 0 },
            events: {
                'onReady': (e) => { 
                    players[v.id.videoId] = e.target;
                    observer.observe(div);
                }
            }
        });
    });
    lucide.createIcons();
}

function handleIntersect(entries) {
    entries.forEach(entry => {
        const videoId = entry.target.id.replace('card-', '');
        const player = players[videoId];
        if (player && player.playVideo) {
            if (entry.isIntersecting) {
                player.playVideo();
                if (!globalMuted) player.unMute(); else player.mute();
            } else {
                player.pauseVideo();
                player.mute();
            }
        }
    });
}

function toggleGlobalMute() {
    globalMuted = !globalMuted;
    Object.keys(players).forEach(id => {
        if (!globalMuted) players[id].unMute(); else players[id].mute();
    });
    document.querySelectorAll('.sound-btn i').forEach(i => {
        i.setAttribute('data-lucide', globalMuted ? 'volume-x' : 'volume-2');
    });
    lucide.createIcons();
}

document.getElementById('main-content').onscroll = function() {
    if (this.scrollTop + this.innerHeight >= this.scrollHeight - 1000) {
        loadIntelligence(this, true);
    }
};

function like(el) { const i = el.querySelector('i'); i.style.color = 'red'; i.style.fill = 'red'; }
function save(el) { const i = el.querySelector('i'); i.style.color = '#D4AF37'; i.style.fill = '#D4AF37'; }
function share(id) { navigator.share({ title: 'The Legacy Intel', url: 'https://youtu.be/'+id }); }

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    if (tab === 'intelligence') loadIntelligence(main);
    else if (tab === 'inventory') renderActivation(main);
    else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') renderDirectorate(main);
    else main.innerHTML = `<div class="glass-card"><h2>${tab.toUpperCase()}</h2><p>Synchronizing...</p></div>`;
    lucide.createIcons();
}

function renderActivation(container) {
    container.innerHTML = `
        <div class="glass-card" style="text-align:center; margin-top:50px;">
            <h2 class="gold-text">Ativação Sovereign</h2>
            <div style="text-align:left; margin:20px 0; font-size:0.8rem; line-height:1.8;">
                <p>Caução Reembolsável: 1.000 €</p>
                <p>Subscrição Mensal: 250 €</p>
                <div style="background:rgba(212,175,55,0.1); border:1px solid var(--border); padding:12px; border-radius:8px; margin-top:15px; font-size:0.7rem;">
                    <strong>Protocolo:</strong> A caução de 1.000€ será devolvida após 6 meses. [cite: 2026-01-07]
                </div>
            </div>
            <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAGAR VIA REVOLUT</button>
        </div>`;
}

function renderStories() {
    const users = ['Director', 'Forbes', 'Michelin', 'Elite_01'];
    document.getElementById('stories-area').innerHTML = users.map(u => `<div style="min-width:70px; text-align:center;"><div></div><small style="font-size:0.5rem; color:#888;">${u}</small></div>`).join('');
}
