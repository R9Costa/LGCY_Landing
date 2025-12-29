// Verifica se o URL contém "?access=admin"
const urlParams = new URLSearchParams(window.location.search);
const isAdmin = urlParams.get('access') === 'admin';

if (isAdmin) {
    // Salta o relógio e entra direto na App
    document.getElementById('screen-countdown').style.display = 'none';
    document.getElementById('screen-app').style.display = 'block';
    switchTab('insights', document.querySelector('.nav-item'));
} else {
    // Segue a lógica normal do relógio para o resto do mundo
    startCountdown(); 
}const LAUNCH_DATE = new Date("Jan 1, 2026 00:00:00").getTime();

// 1. Iniciar o sistema
function init() {
    startCountdown();
    setupSecurity();
}

// 2. Lógica do Relógio
function startCountdown() {
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

// 3. Navegação e Carregamento de Reels
async function switchTab(tab, el) {
    document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    
    const content = document.getElementById('main-content');
    
    if (tab === 'insights') {
        await loadReels(content);
    } else {
        content.style.padding = "100px 20px";
        content.innerHTML = `<h2 style="color:var(--gold)">${tab.toUpperCase()}</h2><p>Exclusive content arriving soon.</p>`;
    }
}

// 4. Lógica do Feed Reels
async function loadReels(container) {
    container.style.padding = "0";
    try {
        const response = await fetch('news.json');
        const news = await response.json();
        
        let html = '<div id="reels-wrapper">';
        news.forEach((item, index) => {
            html += `
                <div class="reel-item">
                    ${item.video_url ? 
                        `<video class="reel-media" loop playsinline muted><source src="${item.video_url}" type="video/mp4"></video>` : 
                        `<img src="${item.img}" class="reel-media">`
                    }
                    <div class="reel-overlay">
                        <span class="reel-tag">LGCY Intelligence</span>
                        <h2 class="reel-title">${item.title}</h2>
                        <p class="reel-description">${item.desc}</p>
                        <button class="gold-btn" onclick="window.open('${item.url}', '_blank')">READ INSIGHTS</button>
                    </div>
                </div>`;
        });
        html += '</div>';
        container.innerHTML = html;
        initVideoObserver();
    } catch (e) {
        container.innerHTML = "<p style='padding:100px 20px'>Feed offline.</p>";
    }
}

// 5. Auto-play de Vídeos (Observer)
function initVideoObserver() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const video = entry.target.querySelector('video');
            if (video) {
                if (entry.isIntersecting) video.play();
                else { video.pause(); video.currentTime = 0; }
            }
        });
    }, { threshold: 0.8 });
    document.querySelectorAll('.reel-item').forEach(item => observer.observe(item));
}

// 6. Segurança
function setupSecurity() {
    window.onblur = () => document.body.classList.add('blurred');
    window.onfocus = () => document.body.classList.remove('blurred');
}

init();
