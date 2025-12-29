const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();

// 1. Lógica do Relógio e Troca Automática
function startSystem() {
    const clockInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = LAUNCH_DATE - now;

        if (diff <= 0) {
            clearInterval(clockInterval);
            document.getElementById('screen-countdown').style.display = 'none';
            document.getElementById('screen-app').style.display = 'flex';
            switchTab('insights', document.querySelector('.nav-item'));
        } else {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('timer').innerText = `${d}d : ${h}h : ${m}m : ${s}s`;
        }
    }, 1000);
}

// 2. Navegação entre Abas
function switchTab(tab, element) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    element.classList.add('active');
    
    const content = document.getElementById('main-content');
    content.innerHTML = `<div class="loading-gold">Loading ${tab.toUpperCase()}...</div>`;

    // Simulação de carregamento de conteúdo (Substituir por Supabase/JSON)
    setTimeout(() => {
        if(tab === 'insights') content.innerHTML = '<h2 class="gold-text">GLOBAL INSIGHTS</h2><p>Market intelligence loading via API...</p>';
        if(tab === 'portfolio') content.innerHTML = '<h2 class="gold-text">NETWORKING PORTFOLIO</h2><p>Private asset listings...</p>';
        if(tab === 'lounge') content.innerHTML = '<h2 class="gold-text">THE LOUNGE</h2><p>Secure encrypted chat...</p>';
        if(tab === 'vault') content.innerHTML = '<h2 class="gold-text">THE VAULT</h2><p>5-Star directory...</p>';
        if(tab === 'status') renderStatus(content);
    }, 500);
}

// 3. Segurança (Blur on switch)
window.onblur = () => document.body.classList.add('blurred');
window.onfocus = () => document.body.classList.remove('blurred');

// Iniciar
startSystem();
