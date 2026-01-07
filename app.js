/* app.js - Luxury News Feed Engine */

// CONFIGURAÇÃO DA API DE NOTÍCIAS (Podes usar NewsAPI ou GNews)
const NEWS_API_KEY = 'TU_CHAVE_AQUI'; // Recomendo GNews.io pela qualidade das imagens
let newsPage = 1;

async function loadLuxuryNews(container, append = false) {
    // Nicho: Bilionários, Investimentos, Luxo, Imobiliário de elite
    const query = "luxury investment | billionaire wealth | high-end real estate | Forbes wealth";
    const url = `https://gnews.io/api/v4/search?q=${encodeURIComponent(query)}&lang=en&max=5&apikey=${NEWS_API_KEY}`;

    try {
        if (!append) container.innerHTML = '';
        
        // Simulação de Dados se não tiveres a chave ainda, ou Fetch real
        const res = await fetch(url);
        const data = await res.json();
        
        data.articles.forEach(article => {
            const post = document.createElement('div');
            post.className = 'ig-post';
            post.innerHTML = `
                <div class="post-header">
                    <div class="post-user-info">
                        <div class="post-avatar"></div>
                        <div>
                            <span class="post-username">LGCY_INTEL</span>
                            <span class="post-location">Global Market Analytics</span>
                        </div>
                    </div>
                    <i data-lucide="more-horizontal"></i>
                </div>
                
                <div class="post-media">
                    <img src="${article.image}" alt="Luxury News">
                </div>
                
                <div class="post-footer">
                    <div class="post-icons">
                        <div class="post-icons-left">
                            <i data-lucide="heart" onclick="like(this)"></i>
                            <i data-lucide="message-circle"></i>
                            <i data-lucide="send"></i>
                        </div>
                        <i data-lucide="bookmark"></i>
                    </div>
                    <div class="likes-count">Curado por 1,240 parceiros</div>
                    <div class="post-caption">
                        <b>${article.source.name}</b> ${article.title}
                    </div>
                    <div class="post-time">${new Date(article.publishedAt).toLocaleDateString()}</div>
                </div>
            `;
            container.appendChild(post);
        });
        lucide.createIcons();
    } catch (e) {
        console.error("Erro ao carregar notícias de luxo", e);
    }
}

// ATUALIZAÇÃO DA FUNÇÃO DE TAB
async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const main = document.getElementById('main-content');

    if (tab === 'intelligence') {
        // Feed de Fotos (Notícias de Luxo)
        main.className = 'ig-feed'; 
        loadLuxuryNews(main);
    } else if (tab === 'reels') {
        // Feed de Vídeos (O que já tínhamos memorizado)
        main.className = 'ig-feed reels-mode';
        loadReels(main); // Função memorizada do YouTube
    } else if (tab === 'inventory') {
        renderActivation(main); // Template memorizado (1000€ caução)
    }
    lucide.createIcons();
}

// Protocolo de Ativação Memorizado
function renderActivation(container) {
    container.innerHTML = `
        <div class="payment-card">
            <h2 style="color:var(--gold); font-family:'Playfair Display';">Node Activation</h2>
            <div style="background:rgba(212,175,55,0.05); padding:15px; border-radius:10px; margin:20px 0;">
                <p style="font-size:0.85rem;"><strong>Valor Total:</strong> 1.250 €</p>
                <hr style="border:0.5px solid #333;">
                <p style="color:var(--gold); font-size:0.75rem; font-weight:bold;">
                    ⚠️ Protocolo Legacy: 1000€ será caução devolvida ao fim de 6 meses.
                </p>
            </div>
            <button class="gold-btn" onclick="window.location.href='https://revolut.me/r9costa9/1250'">PAGAR VIA REVOLUT</button>
        </div>`;
}
