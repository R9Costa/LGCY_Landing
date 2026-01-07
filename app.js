const YT_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';
const NEWS_KEY = 'D987170486046e6e309cffd6889f77bc';

let players = {}; 
let isMuted = true;
let ytToken = '';
let observer;

// Inicia mal a página carrega, sem esperar por APIs externas
window.onload = () => {
    lucide.createIcons();
    renderStories();
    switchTab('intelligence', document.querySelector('.nav-btn'));
    
    // Configura o observador de vídeos para o som
    observer = new IntersectionObserver(handleFocus, { threshold: 0.8 });
};

// Callback da API do YouTube (opcional, para garantir que o player carrega)
function onYouTubeIframeAPIReady() {
    console.log("YouTube API Ready");
}

async function loadFeed(container, append = false) {
    if (!append) container.innerHTML = '<div style="padding:20px; text-align:center; color:#444;">A carregar inteligência...</div>';
    
    try {
        // Carrega notícias de luxo (Forbes/Bilionários) [cite: 2025-12-23]
        const newsUrl = `https://gnews.io/api/v4/search?q=billionaire+luxury+Forbes&lang=pt&max=5&apikey=${NEWS_KEY}`;
        const newsRes = await fetch(newsUrl);
        const newsData = await newsRes.json();

        if (!append) container.innerHTML = ''; // Limpa o loading

        if(newsData.articles) {
            newsData.articles.forEach(art => {
                const post = document.createElement('div');
                post.className = 'news-post';
                post.innerHTML = `
                    <div style="padding:12px; display:flex; align-items:center; gap:10px;"><div style="width:30px; height:30px; border-radius:50%; background:var(--gold);"></div> <b>${art.source.name}</b></div>
                    <div class="news-media"><img src="${art.image}"></div>
                    <div style="padding:12px;"><p><b>${art.source.name}</b> ${art.title}</p></div>`;
                container.appendChild(post);
            });
        }
    } catch(e) {
        container.innerHTML = '<div style="padding:20px;">Sincronização offline. Tente novamente mais tarde.</div>';
    }
}

function switchTab(tab, el) {
    document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');
    
    if (tab === 'intelligence') {
        loadFeed(main);
    } else if (tab === 'inventory') {
        // Regra de negócio memorizada [cite: 2026-01-07]
        main.innerHTML = `
            <div class="payment-card">
                <h2 style="color:var(--gold);">Ativação de Nó</h2>
                <div style="background:rgba(212,175,55,0.05); padding:15px; border-radius:10px; font-size:0.8rem; margin:20px 0; line-height:1.5;">
                    <p>Custo: 1.250 €</p>
                    <p style="color:var(--gold); border: 1px solid var(--gold); padding: 10px; border-radius: 8px; margin-top: 15px;">
                        <strong>Nota:</strong> Antes de clicar no link, saiba que 1.000€ será caução devolvida ao fim de 6 meses.
                    </p>
                </div>
                <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAGAR VIA REVOLUT</button>
            </div>`;
    }
    lucide.createIcons();
}

function renderStories() {
    const u = ['Director', 'Forbes', 'Michelin', 'Elite_01'];
    document.getElementById('stories-area').innerHTML = u.map(n => `
        <div class="story-ring"><div style="width:100%; height:100%; border-radius:50%; background:#111;"></div></div>`).join('');
}

function handleFocus(entries) {
    entries.forEach(e => {
        const p = players[e.target.id.replace('card-', '')];
        if (p && p.playVideo) {
            if (e.isIntersecting) p.playVideo(); else p.pauseVideo();
        }
    });
}
