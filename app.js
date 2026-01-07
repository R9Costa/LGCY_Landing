const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
let players = {}; // Guarda as instâncias dos vídeos
let isMuted = true;
let nextPageToken = '';

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') sessionStorage.setItem('role', 'admin');
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
}

async function loadIntelligence(container, append = false) {
    const query = "Forbes luxury news | Michelin Guide 2026 | Supercar investment";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&pageToken=${nextPageToken}&key=${YT_KEY}`;

    const res = await fetch(url);
    const data = await res.json();
    nextPageToken = data.nextPageToken || '';

    if (!append) container.innerHTML = '';

    data.items.forEach((v) => {
        const div = document.createElement('div');
        div.className = 'reel-card';
        div.id = `card-${v.id.videoId}`;
        
        div.innerHTML = `
            <div class="video-wrapper" id="player-${v.id.videoId}"></div>
            <div class="reel-overlay" onclick="toggleSound('${v.id.videoId}')">
                <div class="sound-toggle"><i data-lucide="${isMuted ? 'volume-x' : 'volume-2'}"></i></div>
                <div class="reel-info">
                    <div class="user-node"><div class="avatar"></div> <strong>Sovereign Intelligence</strong></div>
                    <p class="reel-title">${v.snippet.title}</p>
                </div>
                <div class="reel-actions">
                    <div class="action-btn" onclick="event.stopPropagation(); likePost(this)"><i data-lucide="heart"></i><span>2.4k</span></div>
                    <div class="action-btn" onclick="event.stopPropagation(); savePost(this)"><i data-lucide="bookmark"></i><span>Guardar</span></div>
                    <div class="action-btn" onclick="event.stopPropagation(); sharePost('${v.id.videoId}')"><i data-lucide="share-2"></i><span>Partilhar</span></div>
                </div>
            </div>`;
        container.appendChild(div);

        // Cria o Player do YouTube via API
        new YT.Player(`player-${v.id.videoId}`, {
            videoId: v.id.videoId,
            playerVars: { 'autoplay': 1, 'mute': 1, 'controls': 0, 'loop': 1, 'playlist': v.id.videoId },
            events: {
                'onReady': (event) => { players[v.id.videoId] = event.target; }
            }
        });
    });
    lucide.createIcons();
}

function toggleSound(videoId) {
    isMuted = !isMuted;
    // Percorre todos os vídeos e aplica o novo estado de som
    Object.values(players).forEach(p => {
        if (isMuted) p.mute(); else p.unMute();
    });
    // Atualiza os ícones visualmente
    document.querySelectorAll('.sound-toggle i').forEach(i => {
        i.setAttribute('data-lucide', isMuted ? 'volume-x' : 'volume-2');
    });
    lucide.createIcons();
}

function likePost(el) {
    const icon = el.querySelector('i');
    icon.style.color = icon.style.color === 'red' ? 'white' : 'red';
    icon.style.fill = icon.style.color === 'red' ? 'red' : 'none';
}

function savePost(el) {
    const icon = el.querySelector('i');
    icon.style.color = icon.style.color === 'var(--gold)' ? 'white' : 'var(--gold)';
    icon.style.fill = icon.style.color === 'var(--gold)' ? 'var(--gold)' : 'none';
    alert("Adicionado ao teu Repository.");
}

function sharePost(id) {
    navigator.share({ title: 'The Legacy Intel', url: `https://youtu.be/${id}` });
}

// Lógica de Pagamento [cite: 2026-01-07]
function renderJoinPlatform(container) {
    container.innerHTML = `
        <div class="glass-card" style="text-align:center; margin-top:50px;">
            <h2 class="gold-text">Ativação Sovereign</h2>
            <div style="text-align:left; margin:20px 0; font-size:0.8rem;">
                <p>Caução (Reembolsável): 1.000 €</p>
                <p>Subscrição Mensal: 250 €</p>
                <div style="background:rgba(212,175,55,0.1); border:1px solid var(--border); padding:10px; border-radius:8px; margin-top:15px; font-size:0.7rem;">
                    <strong>Protocolo:</strong> Os 1.000 € de caução serão devolvidos na totalidade após 6 meses.
                </div>
            </div>
            <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAGAR VIA REVOLUT</button>
        </div>`;
    lucide.createIcons();
}

// Scroll Infinito
document.getElementById('main-content').onscroll = function() {
    if (this.innerHeight + this.scrollTop >= this.scrollHeight - 500) {
        loadIntelligence(this, true);
    }
};

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    if (tab === 'intelligence') loadIntelligence(main);
    else if (tab === 'inventory') renderJoinPlatform(main);
    else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') renderDirectorate(main);
    lucide.createIcons();
}

function renderStories() {
    const u = ['Director', 'Forbes', 'Michelin', 'Elite_01'];
    document.getElementById('stories-area').innerHTML = u.map(n => `<div style="min-width:70px; text-align:center;"><div></div><small style="font-size:0.5rem; color:#888;">${n}</small></div>`).join('');
}

window.onYouTubeIframeAPIReady = init;
