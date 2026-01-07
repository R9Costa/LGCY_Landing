const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
let players = {}; 
let globalMuted = true;
let nextPageToken = '';
let observer;

function init() {
    renderStories();
    // Configura o "Observador" de vídeos
    observer = new IntersectionObserver(handleIntersect, { threshold: 0.7 });
    switchTab('intelligence', document.querySelector('.nav-item'));
}

async function loadIntelligence(container, append = false) {
    const query = "Forbes luxury business | Michelin Guide hotels 2026";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&pageToken=${nextPageToken}&key=${YT_KEY}`;

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
                <div class="sound-status"><i data-lucide="${globalMuted ? 'volume-x' : 'volume-2'}"></i></div>
                <div style="width:75%">
                    <h3 style="font-size:0.9rem; margin:0;">${v.snippet.title}</h3>
                </div>
                <div class="reel-actions">
                    <div class="action-btn" onclick="event.stopPropagation(); like(this)"><i data-lucide="heart"></i><span>2.4k</span></div>
                    <div class="action-btn" onclick="event.stopPropagation(); alert('Guardado')"><i data-lucide="bookmark"></i><span>Guardar</span></div>
                    <div class="action-btn" onclick="event.stopPropagation(); share('${v.id.videoId}')"><i data-lucide="share-2"></i><span>Share</span></div>
                </div>
            </div>`;
        container.appendChild(div);
        
        // Inicializa o Player
        new YT.Player(`player-${v.id.videoId}`, {
            videoId: v.id.videoId,
            playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 0, 'loop': 1, 'playlist': v.id.videoId, 'modestbranding': 1 },
            events: {
                'onReady': (e) => { 
                    players[v.id.videoId] = e.target;
                    observer.observe(div); // Começa a observar este vídeo
                }
            }
        });
    });
    lucide.createIcons();
}

// GESTÃO DE SOM E PLAY: Estilo Instagram
function handleIntersect(entries) {
    entries.forEach(entry => {
        const videoId = entry.target.id.replace('card-', '');
        const player = players[videoId];

        if (entry.isIntersecting) {
            player.playVideo();
            // Só ativa o som se o utilizador já tiver clicado para ouvir [cite: 2025-12-23]
            if (!globalMuted) player.unMute(); else player.mute();
        } else {
            player.pauseVideo();
            player.mute();
        }
    });
}

function toggleGlobalMute() {
    globalMuted = !globalMuted;
    // Encontra o vídeo que está visível agora e altera o som dele
    const visibleCard = document.querySelector('.reel-card'); // Simplificado para o exemplo
    Object.keys(players).forEach(id => {
        if (!globalMuted) players[id].unMute(); else players[id].mute();
    });
    lucide.createIcons();
}

// SCROLL INFINITO [cite: 2025-12-23]
document.getElementById('main-content').onscroll = function() {
    if (this.scrollTop + this.innerHeight >= this.scrollHeight - 1000) {
        loadIntelligence(this, true);
    }
};

function like(el) {
    const icon = el.querySelector('i');
    icon.style.color = icon.style.color === 'red' ? 'white' : 'red';
    icon.style.fill = icon.style.color === 'red' ? 'red' : 'none';
}

async function switchTab(tab, el) {
    const main = document.getElementById('main-content');
    if (tab === 'intelligence') loadIntelligence(main);
    // ... resto das abas (Inventory com aviso de caução 1000€) [cite: 2026-01-07]
}

window.onYouTubeIframeAPIReady = init;
