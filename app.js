/* The Legacy - Sovereign Intelligence Engine
   Configurado com as chaves de acesso reais do utilizador.
*/

const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcg'; // Chave YouTube fornecida
const NEWS_KEY = 'D987170486046e6e309cffd6889f77bc';      // Chave GNews fornecida

let players = {}; 
let globalMuted = true;
let ytToken = '';
let observer;

// Inicia a API do YouTube
function onYouTubeIframeAPIReady() {
    observer = new IntersectionObserver(handleMediaFocus, { threshold: 0.8 });
    init();
}

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') sessionStorage.setItem('role', 'admin');
    
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
}

// Carregamento Híbrido (Notícias Forbes + Vídeos de Elite)
async function loadFeed(container, append = false) {
    if (!append) container.innerHTML = '<div id="ig-scroll-container" class="ig-feed"></div>';
    const feed = document.getElementById('ig-scroll-container');

    try {
        // 1. Fetch de Vídeos (Luxo e Investimento)
        const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=luxury+investment+billionaire+lifestyle+2026&type=video&maxResults=3&pageToken=${ytToken}&key=${YT_KEY}`;
        const ytRes = await fetch(ytUrl);
        const ytData = await ytRes.json();
        ytToken = ytData.nextPageToken || '';

        // 2. Fetch de Notícias (Forbes e Bloomberg via GNews)
        const newsUrl = `https://gnews.io/api/v4/search?q=billionaire+wealth+Forbes+luxury&lang=pt&max=3&apikey=${NEWS_KEY}`;
        const newsRes = await fetch(newsUrl);
        const newsData = await newsRes.json();

        // 3. Montagem do Feed Estilo Instagram
        ytData.items.forEach((video, i) => {
            // Adiciona Vídeo (Reel)
            feed.appendChild(createReelElement(video));
            
            // Intercala com Notícia se disponível
            if (newsData.articles && newsData.articles[i]) {
                feed.appendChild(createNewsPost(newsData.articles[i]));
            }
        });

    } catch (e) { 
        console.error("Erro na sincronização das APIs de Elite", e); 
    }
    lucide.createIcons();
}

function createReelElement(v) {
    const div = document.createElement('div');
    div.className = 'reel-card';
    div.id = `card-${v.id.videoId}`;
    div.innerHTML = `
        <div class="video-wrapper" id="player-${v.id.videoId}"></div>
        <div class="reel-overlay" onclick="toggleAudio()">
            <div class="reel-info">
                <div class="user-tag"><div class="avatar"></div> LGCY_INTEL</div>
                <p style="font-size:0.9rem; font-weight:500;">${v.snippet.title}</p>
            </div>
            <div class="reel-actions">
                <div class="action-item" onclick="event.stopPropagation(); like(this)"><i data-lucide="heart"></i><span>2.4k</span></div>
                <div class="action-item" onclick="event.stopPropagation(); save(this)"><i data-lucide="bookmark"></i><span>Guardar</span></div>
                <div class="action-item" onclick="event.stopPropagation(); share('${v.id.videoId}')"><i data-lucide="share-2"></i></div>
            </div>
        </div>`;
    
    new YT.Player(`player-${v.id.videoId}`, {
        videoId: v.id.videoId,
        playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 0, 'loop': 1, 'playlist': v.id.videoId, 'modestbranding': 1, 'rel': 0 },
        events: { 'onReady': (e) => { players[v.id.videoId] = e.target; observer.observe(div); } }
    });
    return div;
}

function createNewsPost(art) {
    const div = document.createElement('div');
    div.className = 'news-post';
    div.innerHTML = `
        <div class="post-header">
            <div class="user-tag"><div class="avatar"></div> ${art.source.name}</div>
            <i data-lucide="more-horizontal"></i>
        </div>
        <div class="post-media"><img src="${art.image}"></div>
        <div class="post-footer">
            <div class="post-icons"><i data-lucide="heart"></i> <i data-lucide="message-circle"></i> <i data-lucide="send"></i></div>
            <p><b>${art.source.name}</b> ${art.title}</p>
            <small style="color:#8e8e8e; font-size:0.7rem;">Publicado em ${new Date(art.publishedAt).toLocaleDateString()}</small>
        </div>`;
    return div;
}

// Lógica de Foco de Som (Apenas o vídeo central toca áudio)
function handleMediaFocus(entries) {
    entries.forEach(entry => {
        const id = entry.target.id.replace('card-', '');
        const p = players[id];
        if (p && p.playVideo) {
            if (entry.isIntersecting) {
                p.playVideo();
                if (!globalMuted) p.unMute(); else p.mute();
            } else { p.pauseVideo(); p.mute(); }
        }
    });
}

function toggleAudio() {
    globalMuted = !globalMuted;
    Object.values(players).forEach(p => { 
        if (p && p.mute) { if (globalMuted) p.mute(); else p.unMute(); }
    });
    lucide.createIcons();
}

// Switch Tab e Business Logic Memorizada
function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');

    if (tab === 'intelligence') {
        loadFeed(main);
    } else if (tab === 'inventory') {
        main.innerHTML = `
            <div class="payment-
