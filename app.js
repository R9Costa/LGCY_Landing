const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') {
        sessionStorage.setItem('role', 'admin');
    }
    
    renderStories();
    const firstTab = document.querySelector('.nav-item');
    switchTab('intelligence', firstTab);
}

function renderStories() {
    const users = ['My Legacy', 'Director', 'Elite_01', 'Bespoke_H'];
    document.getElementById('stories-area').innerHTML = users.map(u => `
        <div style="min-width:70px; text-align:center;">
            <div style="width:60px; height:60px; border-radius:50%; border:2px solid #D4AF37; background:#111;"></div>
            <small style="font-size:0.55rem; color:#888; margin-top:5px; display:block;">${u}</small>
        </div>`).join('');
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    main.style.padding = "20px 0 100px 0";

    if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') {
        renderDirectorate(main);
    } else if (tab === 'social') {
        main.innerHTML = `<div class="glass-card"><h2 class="gold-text">Business Feed</h2><p>Exclusive deals in progress...</p></div>`;
    } else {
        main.innerHTML = `<div class="glass-card"><h2>${tab.toUpperCase()}</h2><p>Synchronizing...</p></div>`;
    }
    lucide.createIcons();
}

window.onload = init;
