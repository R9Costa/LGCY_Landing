/* app.js - Optimized Intelligence & Payment Engine */
const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
let nextPageToken = '';
let isFetching = false;

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') sessionStorage.setItem('role', 'admin');
    
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
}

function renderStories() {
    const users = ['My Legacy', 'Director', 'Elite_01', 'Private_V'];
    document.getElementById('stories-area').innerHTML = users.map(u => `
        <div style="min-width:70px; text-align:center;">
            <div></div>
            <small style="font-size:0.5rem; color:#888; display:block; margin-top:5px;">${u}</small>
        </div>`).join('');
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');

    if (tab === 'intelligence') {
        loadIntelligence(main);
    } else if (tab === 'inventory') {
        renderJoinPlatform(main);
    } else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') {
        renderDirectorate(main);
    } else {
        main.innerHTML = `<div class="glass-card"><h2>${tab.toUpperCase()}</h2><p>Synchronizing...</p></div>`;
    }
    lucide.createIcons();
}

async function loadIntelligence(container, append = false) {
    if (isFetching) return;
    isFetching = true;
    const query = "luxury investment | mansion tour 2026 | supercar world";
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
    div.innerHTML = `<iframe src="https://www.youtube.com/embed/${v.id.videoId}?autoplay=1&mute=1&controls=0" frameborder="0"></iframe>
        <div class="reel-overlay"><span class="tag-intel">GLOBAL INTEL</span><h3>${v.snippet.title}</h3></div>`;
    return div;
}

function createLegacyPostElement() {
    const div = document.createElement('div');
    div.className = 'legacy-post';
    div.innerHTML = `<div class="glass-card" style="width:100%; margin:30px;">
        <span class="tag-legacy">LEGACY CHAIN EXCLUSIVE</span>
        <h2 class="gold-text">Off-Market: Ferrari F40</h2>
        <p style="font-size:0.8rem; color:#ccc;">Location: Maranello | Price: P.O.A.</p>
        <button class="gold-btn" style="padding:10px; margin-top:15px; font-size:0.7rem;">CONTACT OWNER</button>
    </div>`;
    return div;
}

function renderJoinPlatform(container) {
    container.innerHTML = `
        <div class="glass-card" style="text-align:center; margin-top:50px;">
            <h2 class="gold-text">Sovereign Activation</h2>
            <div style="text-align:left; margin:20px 0; font-size:0.8rem; line-height:1.8;">
                <div style="display:flex; justify-content:space-between;"><span>Security Deposit</span><span>1.000 €</span></div>
                <div style="display:flex; justify-content:space-between;"><span>Monthly Subscription</span><span>250 €</span></div>
                <hr style="border-top:1px solid #222; margin:10px 0;">
                <div style="display:flex; justify-content:space-between; font-weight:bold; color:var(--gold);"><span>TOTAL DUE</span><span>1.250 €</span></div>
            </div>
            <div style="background:rgba(212,175,55,0.1); border:1px solid var(--border); padding:12px; border-radius:8px; margin-bottom:20px; font-size:0.7rem; color:var(--gold);">
                <i data-lucide="info" style="width:12px; vertical-align:middle;"></i>
                <strong>Reembolso:</strong> A caução de 1.000 € será devolvida ao fim de 6 meses de atividade. [cite: 2026-01-07]
            </div>
            <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAY VIA REVOLUT</button>
        </div>`;
    lucide.createIcons();
}

window.onscroll = () => { if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 800) loadIntelligence(null, true); };
init();
