const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
let players = {};
let isMuted = true;
let nextPageToken = '';
let observer;

// 1. Inicialização da API
function onYouTubeIframeAPIReady() {
    observer = new IntersectionObserver(handleMediaFocus, { threshold: 0.8 });
    init();
}

function init() {
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
}

// 2. Carregamento de Conteúdo Híbrido (Forbes, Michelin, Legacy Chain) [cite: 2025-12-23]
async function loadIntelligence(container, append = false) {
    const queries = ["Forbes luxury lifestyle 2026", "Michelin Guide Hotels", "Supercar real estate"];
    const q = queries[Math.floor(Math.random() * queries.length)];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(q)}&type=video&maxResults=5&pageToken=${nextPageToken}&key=${YT_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    nextPageToken = data.nextPageToken || '';

    data.items.forEach((v, idx) => {
        // Intercala Publicação Legacy Chain (Imagem) com Vídeo Global
        if (idx % 2 === 0) container.appendChild(createLegacyChainPost());
        container.appendChild(createReelPost(v));
    });
    lucide.createIcons();
}

// 3. Criador de Reels (Vídeos) com Gestão de Som Instagram [cite: 2025-12-23]
function createReelPost(v) {
    const div = document.createElement('div');
    div.className = 'post-card reel-type';
    div.id = `post-${v.id.videoId}`;
    div.innerHTML = `
        <div class="media-container" id="player-${v.id.videoId}"></div>
        <div class="post-overlay" onclick="toggleAudio()">
            <div class="post-info">
                <div class="post-user"><div class="user-dot"></div> sovereign.intelligence</div>
                <p style="font-size:0.85rem; margin:0;">${v.snippet.title}</p>
            </div>
            <div class="post-actions-side">
                <div class="action-unit" onclick="event.stopPropagation(); like(this)"><i data-lucide="heart"></i><span>24k</span></div>
                <div class="action-unit"><i data-lucide="message-circle"></i><span>82</span></div>
                <div class="action-unit" onclick="event.stopPropagation(); save(this)"><i data-lucide="bookmark"></i></div>
            </div>
        </div>`;
    
    new YT.Player(`player-${v.id.videoId}`, {
        videoId: v.id.videoId,
        playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 0, 'loop': 1, 'playlist': v.id.videoId, 'modestbranding': 1, 'rel': 0 },
        events: { 'onReady': (e) => { players[v.id.videoId] = e.target; observer.observe(div); } }
    });
    return div;
}

// 4. Criador de Posts Legacy Chain (Imagem/Notícia)
function createLegacyChainPost() {
    const div = document.createElement('div');
    div.className = 'post-card';
    div.innerHTML = `
        <div class="media-container">
            <img src="https://images.unsplash.com/photo-1577984446446-76c767a63a99?auto=format&fit=crop&w=800&q=80">
        </div>
        <div class="post-overlay">
            <div class="post-info">
                <div class="post-user" style="color:var(--gold);"><div class="user-dot"></div> legacy.chain.exclusive</div>
                <p style="font-size:0.85rem; margin:0;">Off-Market Listing: Private Island, Seychelles</p>
            </div>
        </div>`;
    return div;
}

// 5. Gestão de Foco e Som (Instagram Logic) [cite: 2025-12-23]
function handleMediaFocus(entries) {
    entries.forEach(entry => {
        const id = entry.target.id.replace('post-', '');
        const p = players[id];
        if (p) {
            if (entry.isIntersecting) {
                p.playVideo();
                if (!isMuted) p.unMute(); else p.mute();
            } else {
                p.pauseVideo();
                p.mute();
            }
        }
    });
}

function toggleAudio() {
    isMuted = !isMuted;
    Object.values(players).forEach(p => { if (isMuted) p.mute(); else p.unMute(); });
}

// 6. Tabs e Regra de Negócio Memorizada (Caução 1000€) [cite: 2026-01-07]
function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');

    if (tab === 'intelligence') {
        main.innerHTML = '';
        loadIntelligence(main);
    } else if (tab === 'inventory') {
        main.innerHTML = `
            <div class="payment-card">
                <h2 style="color:var(--gold); font-family:'Playfair Display';">Sovereign Node Activation</h2>
                <div style="background:rgba(212,175,55,0.05); padding:15px; border-radius:10px; font-size:0.8rem; margin:20px 0; border:1px solid #333;">
                    <p><strong>Custo de Entrada:</strong> 1.250 €</p>
                    <hr style="border:0; border-top:1px solid #222;">
                    <p style="color:var(--gold);"><strong>Aviso Legal:</strong> 1000€ será caução devolvida ao fim de 6 meses de atividade na rede. [cite: 2026-01-07]</p>
                </div>
                <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">Pagar via Revolut</button>
            </div>`;
    }
    lucide.createIcons();
}

function renderStories() {
    const users = ['Director', 'Forbes', 'Michelin', 'Legacy_01', 'Private_V'];
    document.getElementById('stories-area').innerHTML = users.map(u => `
        <div class="story-item"><div class="story-ring"><div class="story-avatar"></div></div><small style="font-size:0.6rem;">${u}</small></div>`).join('');
}

// Scroll Infinito
document.getElementById('main-content').onscroll = function() {
    if (this.scrollTop + this.innerHeight >= this.scrollHeight - 1000) loadIntelligence(this, true);
};
