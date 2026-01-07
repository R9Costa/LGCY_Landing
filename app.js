/* app.js - Intelligence & Activation Node */
const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';

function init() {
    const params = new URLSearchParams(window.location.search);
    if (params.get('access') === 'r9admin') sessionStorage.setItem('role', 'admin');
    if (params.get('payment') === 'success') { triggerSuccess(); return; }
    
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-item'));
    
    window.onblur = () => document.body.classList.add('blurred');
    window.onfocus = () => document.body.classList.remove('blurred');
}

function renderStories() {
    const users = ['My Legacy', 'Director', 'Elite_01', 'Bespoke_H'];
    document.getElementById('stories-area').innerHTML = users.map(u => `
        <div style="min-width:75px; text-align:center;">
            <div style="width:60px; height:60px; border-radius:50%; border:2px solid #D4AF37; background:#111; margin:0 auto;"></div>
            <small style="font-size:0.55rem; color:#888; display:block; margin-top:5px;">${u}</small>
        </div>`).join('');
}

async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    
    if (tab === 'intelligence') {
        loadIntelligence(main);
    } else if (tab === 'inventory') {
        renderJoinProcess(main); // Exibe o processo de adesão
    } else if (tab === 'directorate' && sessionStorage.getItem('role') === 'admin') {
        renderDirectorate(main);
    } else {
        main.innerHTML = `<div class="glass-card"><h2>${tab.toUpperCase()}</h2><p>Synchronizing...</p></div>`;
    }
    lucide.createIcons();
}

async function loadIntelligence(container) {
    const query = "luxury real estate news | billionaire investment";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=5&key=${YT_KEY}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        let html = '<div class="intelligence-scroll">';
        data.items.forEach(v => {
            html += `<div class="intelligence-reel">
                <iframe width="100%" height="100%" src="https://www.youtube.com/embed/${v.id.videoId}?autoplay=1&mute=1&controls=0" frameborder="0"></iframe>
                <div class="reel-overlay">
                    <span style="background:var(--gold); color:#000; padding:2px 8px; border-radius:10px; font-size:0.6rem; font-weight:bold;">INTEL</span>
                    <h3 style="font-family:'Playfair Display'; margin-top:10px;">${v.snippet.title}</h3>
                </div></div>`;
        });
        container.innerHTML = html + '</div>';
    } catch(e) { container.innerHTML = "<p style='padding:20px;'>Intelligence Node Offline.</p>"; }
}

function renderJoinProcess(container) {
    container.innerHTML = `
        <div class="glass-card" style="text-align:center; margin-top:50px;">
            <h2 class="gold-text">Sovereign Activation</h2>
            <div style="text-align:left; margin:25px 0; font-size:0.85rem; line-height:1.8;">
                <div style="display:flex; justify-content:space-between;"><span>Security Deposit</span><span>1.000 €</span></div>
                <div style="display:flex; justify-content:space-between;"><span>Monthly Subscription</span><span>250 €</span></div>
                <hr style="border:0; border-top:1px solid #222; margin:10px 0;">
                <div style="display:flex; justify-content:space-between; font-weight:bold; color:var(--gold);"><span>TOTAL DUE</span><span>1.250 €</span></div>
            </div>

            <div style="background:rgba(212,175,55,0.1); border:1px solid var(--border); padding:15px; border-radius:8px; margin-bottom:20px; font-size:0.75rem; color:var(--gold);">
                <i data-lucide="info" style="width:14px; vertical-align:middle;"></i>
                <strong>Protocolo de Reembolso:</strong> Os 1.000 € de caução serão devolvidos na totalidade após 6 meses de permanência ativa. [cite: 2026-01-07]
            </div>

            <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAY VIA REVOLUT</button>
        </div>`;
    lucide.createIcons();
}

init();
