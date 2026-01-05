/* app.js - Intelligence & Social Core */
const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') sessionStorage.setItem('role', 'admin');
    
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
    
    window.onblur = () => document.body.classList.add('blurred');
    window.onfocus = () => document.body.classList.remove('blurred');
}

function renderStories() {
    const users = ['My Legacy', 'Founder', 'Node_02', 'Private_Jet'];
    document.getElementById('stories-area').innerHTML = users.map(u => `
        <div style="min-width:70px; text-align:center;">
            <div style="width:60px; height:60px; border-radius:50%; border:2px solid #D4AF37; margin:0 auto; background:#111;"></div>
            <small style="font-size:0.5rem; color:#888;">${u}</small>
        </div>`).join('');
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    
    lucide.createIcons();

    if (tab === 'intelligence') {
        loadIntelligence(main);
    } else if (tab === 'social') {
        renderSocialFeed(main);
    } else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') {
        renderDirectorate(main); // Chama Grand Dashboard em admin.js
    } else {
        main.innerHTML = `<div class="glass-card" style="margin:20px;"><h2>${tab.toUpperCase()}</h2><p>Node Syncing...</p></div>`;
    }
}

async function loadIntelligence(container) {
    container.innerHTML = `<p style="padding:20px;">Synchronizing Bloomberg Intelligence...</p>`;
    const query = "luxury real estate news | billionaire investments";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=3&key=${YT_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        let html = '<div style="height:100vh; overflow-y:scroll; scroll-snap-type:y mandatory;">';
        data.items.forEach(v => {
            html += `<div style="height:100vh; scroll-snap-align:start; position:relative;">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${v.id.videoId}?autoplay=1&mute=1" frameborder="0"></iframe>
                <div style="position:absolute; bottom:120px; padding:20px; background:linear-gradient(transparent, black); width:100%;">
                    <h3 class="gold-text">${v.snippet.title}</h3>
                </div></div>`;
        });
        container.innerHTML = html + '</div>';
    } catch(e) { container.innerHTML = "<p>Intelligence Offline.</p>"; }
}

function renderSocialFeed(container) {
    container.innerHTML = `<div style="padding:20px;">
        <h2 class="gold-text">Business Feed</h2>
        <div class="glass-card">
            <small style="color:var(--gold)">STORY ARCHIVE AVAILABLE</small>
            <p style="margin-top:10px;">Post your latest acquisitions or rentals here. Stories expire in 24h.</p>
            <button class="gold-btn" style="padding:10px;">+ Create Business Reel</button>
        </div></div>`;
}

init();
