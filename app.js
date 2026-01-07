/* app.js - Intelligence, Interactions & Payment Protocol */
const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
let nextPageToken = '';
let isFetching = false;

const LUXURY_QUERIES = [
    "Forbes Billionaires real-time news",
    "Michelin Guide luxury hotels 2026",
    "Luxury real estate market insights"
];

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

    if (tab === 'intelligence') {
        loadIntelligence(main);
    } else if (tab === 'repository') {
        renderRepository(main);
    } else if (tab === 'inventory') {
        renderJoinPlatform(main);
    } else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') {
        renderDirectorate(main);
    } else {
        main.innerHTML = `<div class="glass-card"><h2>${tab.toUpperCase()}</h2><p>Syncing Node...</p></div>`;
    }
    lucide.createIcons();
}

async function loadIntelligence(container, append = false) {
    if (isFetching) return;
    isFetching = true;
    const query = LUXURY_QUERIES[Math.floor(Math.random() * LUXURY_QUERIES.length)];
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&pageToken=${nextPageToken}&key=${YT_KEY}`;

    try {
        if (!append) container.innerHTML = '<div id="feed-container" class="intelligence-scroll"></div>';
        const feed = document.getElementById('feed-container');
        const res = await fetch(url);
        const data = await res.json();
        nextPageToken = data.nextPageToken || '';

        data.items.forEach((v, index) => {
            if (index % 3 === 0 && index !== 0) feed.appendChild(createLegacyPostElement());
            feed.appendChild(createVideoElement(v));
        });
        isFetching = false;
    } catch(e) { isFetching = false; }
}

function createVideoElement(v) {
    const div = document.createElement('div');
    div.className = 'intelligence-reel';
    div.innerHTML = `
        <iframe src="https://www.youtube.com/embed/${v.id.videoId}?autoplay=1&mute=1&controls=1&modestbranding=1" frameborder="0"></iframe>
        <div class="reel-overlay">
            <div style="max-width:70%;">
                <span class="tag-intel">INTEL SOURCE</span>
                <h3 style="font-family:'Playfair Display'; font-size:1rem; margin-top:10px;">${v.snippet.title}</h3>
            </div>
            <div class="action-buttons">
                <div class="action-item" onclick="toggleAction(this, 'heart')"><i data-lucide="heart"></i><span>2.4k</span></div>
                <div class="action-item" onclick="saveToRepository('${v.id.videoId}')"><i data-lucide="bookmark"></i><span>Save</span></div>
                <div class="action-item" onclick="shareContent('${v.id.videoId}')"><i data-lucide="share-2"></i><span>Share</span></div>
            </div>
        </div>`;
    return div;
}

function createLegacyPostElement() {
    const div = document.createElement('div');
    div.className = 'legacy-post';
    div.innerHTML = `
        <div class="glass-card" style="width:100%; margin:20px; border-left:3px solid var(--gold);">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <span class="tag-legacy">LEGACY EXCLUSIVE</span>
                    <h2 class="gold-text">Private Listing: Monaco Penthouse</h2>
                </div>
                <div class="action-buttons" style="flex-direction:row;">
                    <i data-lucide="bookmark" onclick="alert('Guardado')"></i>
                </div>
            </div>
            <button class="gold-btn" style="padding:10px; margin-top:15px; font-size:0.7rem;">REQUEST DETAILS</button>
        </div>`;
    return div;
}

function renderJoinPlatform(container) {
    container.innerHTML = `
        <div class="glass-card" style="text-align:center; margin-top:50px;">
            <h2 class="gold-text">Ativação Sovereign</h2>
            <div style="text-align:left; margin:20px 0; font-size:0.8rem; line-height:1.8;">
                <div style="display:flex; justify-content:space-between;"><span>Caução (Security)</span><span>1.000 €</span></div>
                <div style="display:flex; justify-content:space-between;"><span>Mensalidade</span><span>250 €</span></div>
                <hr style="border-top:1px solid #222; margin:10px 0;">
                <div style="display:flex; justify-content:space-between; font-weight:bold; color:var(--gold);"><span>TOTAL</span><span>1.250 €</span></div>
            </div>
            
            <div style="background:rgba(212,175,55,0.1); border:1px solid var(--border); padding:12px; border-radius:8px; margin-bottom:20px; font-size:0.7rem; color:var(--gold);">
                <i data-lucide="info" style="width:14px; vertical-align:middle;"></i>
                <strong>Protocolo de Reembolso:</strong> A caução de 1.000€ será devolvida após 6 meses de permanência ativa.
            </div>

            <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAGAR VIA REVOLUT</button>
        </div>`;
    lucide.createIcons();
}

function renderRepository(container) {
    container.innerHTML = `<div style="padding:20px;">
        <h1 class="gold-text">Intelligence Archive</h1>
        <div class="glass-card"><i data-lucide="trending-up"></i> Forbes Insights (Saved)</div>
        <div class="glass-card"><i data-lucide="map"></i> Michelin Destinations (Saved)</div>
    </div>`;
}

// Handlers de Interação [cite: 2025-12-23]
function toggleAction(el, icon) { el.querySelector('i').style.color = '#D4AF37'; }
function saveToRepository(id) { alert('Insight arquivado no seu Repository pessoal.'); }
function shareContent(id) { navigator.share({ title: 'The Legacy Intelligence', url: 'https://youtube.com/watch?v='+id }); }

window.onscroll = () => { if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) loadIntelligence(null, true); };
function renderStories() {
    const users = ['My Legacy', 'Director', 'Elite_01', 'Private_V'];
    document.getElementById('stories-area').innerHTML = users.map(u => `
        <div style="min-width:70px; text-align:center;"><div></div><small style="font-size:0.5rem; color:#888;">${u}</small></div>`).join('');
}

init();
