/* app.js - The Legacy Unified Engine */
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
    const container = document.getElementById('stories-container');
    const users = ['My Legacy', 'Director', 'Elite_01', 'Bespoke_H'];
    container.innerHTML = users.map(u => `<div class="story-circle"><div style="width:100%;height:100%;background:#222;border-radius:50%;"></div><small style="display:block;text-align:center;font-size:0.5rem;margin-top:5px;">${u}</small></div>`).join('');
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    lucide.createIcons();

    if (tab === 'intelligence') {
        loadReels(main); // Feed Bloomberg/Luxury
    } else if (tab === 'inventory') {
        renderPortfolio(main); // Now includes High-end Watches
    } else if (tab === 'social') {
        renderSocialUpload(main); // Stories/Posts/Reels upload
    } else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') {
        renderDirectorate(main); // From admin.js
    } else {
        main.innerHTML = `<div class="glass-card"><h2 style="color:var(--gold)">${tab.toUpperCase()}</h2><p>Synchronizing Private Node...</p></div>`;
    }
    setTimeout(() => lucide.createIcons(), 50);
}

// Aba 2: Portfolio with Horology
function renderPortfolio(container) {
    const categories = ['Real Estate', 'Supercars', 'Yachts', 'Jets', 'Horology & Acc.'];
    container.innerHTML = `
        <div style="padding:20px;">
            <h1 style="color:var(--gold); font-family:'Playfair Display'">The Inventory</h1>
            <div style="display:flex; gap:10px; overflow-x:auto; padding-bottom:15px;">
                ${categories.map(c => `<span class="glass-card" style="padding:8px 15px; font-size:0.6rem; white-space:nowrap;">${c}</span>`).join('')}
            </div>
            <div class="glass-card">
                <small style="color:var(--gold)">HOROLOGY • SALE</small>
                <h3>Patek Philippe Nautilus 5711</h3>
                <p>Value: €145,000</p>
                <button class="gold-btn" style="margin-top:15px; padding:10px; font-size:0.7rem;">View Details</button>
            </div>
        </div>`;
}

init();
