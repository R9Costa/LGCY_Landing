/* app.js - Hybrid Intelligence Engine */
const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
let nextPageToken = '';
let isFetching = false;

// Fontes de Elite: Forbes, Michelin e Mercado de Luxo [cite: 2025-12-23]
const QUERIES = ["Forbes luxury lifestyle news", "Michelin Guide best hotels", "Billionaire investment trends 2026"];

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') sessionStorage.setItem('role', 'admin');
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    if (tab === 'intelligence') loadIntelligence(main);
    else if (tab === 'inventory') renderActivation(main);
    else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') renderDirectorate(main);
    lucide.createIcons();
}

async function loadIntelligence(container, append = false) {
    if (isFetching) return;
    isFetching = true;
    const q = QUERIES[Math.floor(Math.random() * QUERIES.length)];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=5&pageToken=${nextPageToken}&key=${YT_KEY}`;

    try {
        if (!append) container.innerHTML = '<div id="feed-container" class="intelligence-scroll"></div>';
        const feed = document.getElementById('feed-container');
        const res = await fetch(url);
        const data = await res.json();
        nextPageToken = data.nextPageToken || '';

        data.items.forEach((v, i) => {
            // A cada 2 vídeos, injeta uma notícia/imagem da Legacy Chain [cite: 2025-12-23]
            if (i % 2 === 0) feed.appendChild(createLegacyPost());
            feed.appendChild(createVideoCard(v));
        });
        isFetching = false;
    } catch(e) { isFetching = false; }
}

function createVideoCard(v) {
    const div = document.createElement('div');
    div.className = 'intelligence-reel';
    div.onclick = () => openVideo(v.id.videoId); // Clicar abre com som
    div.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${v.id.videoId}?autoplay=1&mute=1&controls=0" frameborder="0"></iframe>
        <div class="reel-overlay">
            <span style="background:var(--gold); color:#000; padding:2px 8px; border-radius:4px; font-size:0.6rem; font-weight:bold;">INTEL</span>
            <h3 style="font-family:'Playfair Display'; margin-top:10px; font-size:1.1rem;">${v.snippet.title}</h3>
            <p style="font-size:0.6rem; color:#888;">Toque para abrir com som</p>
        </div>`;
    return div;
}

function createLegacyPost() {
    const div = document.createElement('div');
    div.className = 'legacy-post';
    div.innerHTML = `
        <div style="padding:30px; border:1px solid var(--border); background:var(--glass); border-radius:12px; margin:20px; width:100%;">
            <span style="color:var(--gold); font-size:0.6rem; letter-spacing:2px;">LEGACY CHAIN NEWS</span>
            <h2 style="font-family:'Playfair Display'; color:var(--gold); margin:15px 0;">New Node Activated in Zurich</h2>
            <p style="font-size:0.8rem; color:#888;">Intelligence synchronization complete for Node #042.</p>
            <div style="height:150px; background:#111; margin-top:20px; border-radius:8px; display:flex; align-items:center; justify-content:center; color:#333;">[IMAGE_PLACEHOLDER]</div>
        </div>`;
    return div;
}

// Funções do Modal de Vídeo (Som Ativo) [cite: 2025-12-23]
function openVideo(id) {
    const modal = document.getElementById('video-modal');
    const player = document.getElementById('modal-player');
    modal.style.display = 'flex';
    // Mute=0 para garantir que abre COM SOM [cite: 2025-12-23]
    player.innerHTML = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/${id}?autoplay=1&mute=0&controls=1" frameborder="0" allow="autoplay"></iframe>`;
}

function closeVideo() {
    document.getElementById('video-modal').style.display = 'none';
    document.getElementById('modal-player').innerHTML = '';
}

function renderActivation(container) {
    container.innerHTML = `
        <div style="padding:40px; text-align:center;">
            <h2 class="gold-text">Sovereign Node</h2>
            <div style="text-align:left; margin:30px 0; font-size:0.8rem;">
                <p>Security Deposit: 1.000 €</p>
                <p>Monthly Access: 250 €</p>
                <p style="color:var(--gold); border:1px solid var(--border); padding:10px; border-radius:8px; margin-top:20px;">
                    <strong>Nota:</strong> A caução de 1.000 € será devolvida ao fim de 6 meses. [cite: 2026-01-07]
                </p>
            </div>
            <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAGAR VIA REVOLUT</button>
        </div>`;
}

window.onscroll = () => { if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) loadIntelligence(null, true); };
function renderStories() {
    const users = ['My Legacy', 'Forbes', 'Michelin', 'Director'];
    document.getElementById('stories-area').innerHTML = users.map(u => `<div style="min-width:70px; text-align:center;"><div></div><small style="font-size:0.5rem; color:#888;">${u}</small></div>`).join('');
}
init();
