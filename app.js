/* app.js - The Legacy Hybrid Engine */
const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
const NEWS_KEY = 'D987170486046e6e309cffd6889f77bc';

let players = {}; 
let isMuted = true;
let ytToken = '';
let observer;

function onYouTubeIframeAPIReady() {
    observer = new IntersectionObserver(handleFocus, { threshold: 0.8 });
    init();
}

function init() {
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-btn'));
}

async function loadFeed(container, append = false) {
    if (!append) container.innerHTML = '';
    
    try {
        // 1. YouTube Data (Reels)
        const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=luxury+investment+billionaire+Forbes&type=video&maxResults=3&pageToken=${ytToken}&key=${YT_KEY}`;
        const ytRes = await fetch(ytUrl);
        const ytData = await ytRes.json();
        ytToken = ytData.nextPageToken || '';

        // 2. GNews (Fotos de Notícias)
        const newsUrl = `https://gnews.io/api/v4/search?q=billionaire+wealth+Forbes&lang=pt&max=3&apikey=${NEWS_KEY}`;
        const newsRes = await fetch(newsUrl);
        const newsData = await newsRes.json();

        ytData.items.forEach((v, i) => {
            // Adiciona Vídeo (Estilo Reel)
            container.appendChild(createReel(v));
            // Adiciona Notícia (Estilo Post)
            if(newsData.articles[i]) container.appendChild(createNewsPost(newsData.articles[i]));
        });
        lucide.createIcons();
    } catch(e) { console.error("Sync Error", e); }
}

function createReel(v) {
    const div = document.createElement('div');
    div.className = 'reel-item';
    div.id = `card-${v.id.videoId}`;
    div.innerHTML = `
        <div class="video-box" id="player-${v.id.videoId}"></div>
        <div class="reel-overlay" onclick="toggleAudio()">
            <div class="reel-info"><b>LGCY_INTEL</b><p>${v.snippet.title}</p></div>
            <div class="reel-actions">
                <div class="action-unit" onclick="event.stopPropagation(); like(this)"><i data-lucide="heart"></i><span>2k</span></div>
                <div class="action-unit" onclick="event.stopPropagation(); save(this)"><i data-lucide="bookmark"></i></div>
            </div>
        </div>`;
    
    new YT.Player(`player-${v.id.videoId}`, {
        videoId: v.id.videoId,
        playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 0, 'loop': 1, 'playlist': v.id.videoId, 'rel': 0 },
        events: { 'onReady': (e) => { players[v.id.videoId] = e.target; observer.observe(div); } }
    });
    return div;
}

function createNewsPost(art) {
    const div = document.createElement('div');
    div.className = 'news-post';
    div.innerHTML = `
        <div style="padding:12px; display:flex; align-items:center; gap:10px;"><div style="width:30px; height:30px; border-radius:50%; background:var(--gold);"></div> <b>${art.source.name}</b></div>
        <div class="post-media"><img src="${art.image}"></div>
        <div style="padding:12px;"><p><b>${art.source.name}</b> ${art.title}</p></div>`;
    return div;
}

function handleFocus(entries) {
    entries.forEach(e => {
        const p = players[e.target.id.replace('card-', '')];
        if (p && p.playVideo) {
            if (e.isIntersecting) { p.playVideo(); if (!isMuted) p.unMute(); else p.mute(); }
            else { p.pauseVideo(); p.mute(); }
        }
    });
}

function toggleAudio() {
    isMuted = !isMuted;
    Object.values(players).forEach(p => { if (isMuted) p.mute(); else p.unMute(); });
}

function switchTab(tab, el) {
    const main = document.getElementById('main-content');
    if (tab === 'intelligence') loadFeed(main);
    else if (tab === 'inventory') {
        main.innerHTML = `
            <div class="payment-card">
                <h2 style="color:var(--gold);">Ativação Sovereign</h2>
                <div style="background:rgba(212,175,55,0.05); padding:15px; border-radius:10px; font-size:0.8rem; margin:20px 0;">
                    <p>Total: 1.250 €</p>
                    <p style="color:var(--gold);">Pretendo que esteja descrito antes de clicar no link que 1000€ será caução devolvida ao fim de 6 meses. [cite: 2026-01-07]</p>
                </div>
                <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">Ativar Via Revolut</button>
            </div>`;
    }
    lucide.createIcons();
}

function renderStories() {
    const u = ['Director', 'Forbes', 'Michelin', 'Elite_01'];
    document.getElementById('stories-area').innerHTML = u.map(n => `<div class="story-ring"><div class="story-avatar"></div></div>`).join('');
}
