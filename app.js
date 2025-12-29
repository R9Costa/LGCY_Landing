const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();

function startApp() {
    const timerInterval = setInterval(() => {
        const now = new Date().getTime();
        const diff = LAUNCH_DATE - now;

        if (diff <= 0) {
            clearInterval(timerInterval);
            document.getElementById('screen-countdown').style.display = 'none';
            document.getElementById('screen-app').style.display = 'block';
            switchTab('insights', document.querySelector('.nav-item'));
        } else {
            const d = Math.floor(diff / (1000 * 60 * 60 * 24));
            const h = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const s = Math.floor((diff % (1000 * 60)) / 1000);
            document.getElementById('timer').innerText = `${d}D : ${h}H : ${m}M : ${s}S`;
        }
    }, 1000);
}

function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    const content = document.getElementById('main-content');
    
    // Simulação de carregamento de Abas
    content.innerHTML = `<div style="padding:40px; color:#888;">Loading ${tab.toUpperCase()}...</div>`;
    
    if(tab === 'status') {
        content.innerHTML = `
            <div class="legacy-card" style="padding:20px; border:1px solid #222; border-radius:15px; background:#0a0a0a;">
                <h3 style="color:#D4AF37; font-family:'Playfair Display';">LEGACY CHAIN</h3>
                <p style="font-size:0.8rem; color:#666;">PATRON: Founder Member</p>
                <hr style="border:0; border-top:1px solid #222; margin:20px 0;">
                <p style="font-size:0.7rem; letter-spacing:1px;">DESCENDANTS: 0 Verified</p>
                <button style="width:100%; background:#D4AF37; border:0; padding:12px; border-radius:5px; font-weight:bold; margin-top:20px;">GENERATE KEY</button>
            </div>`;
    }
}

// Segurança: Blur ao sair da aba
window.onblur = () => document.body.classList.add('blurred');
window.onfocus = () => document.body.classList.remove('blurred');

startApp();
