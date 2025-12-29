/* app.js - Intelligence Feed Engine */
const YT_API_KEY = 'AIzaSyAVDwghPzU3LodThasHgT9mSo19mKDwcgY';

async function renderIntelligenceReels(container) {
    container.style.padding = "0"; // Full screen for Reels
    
    // Canais e temas de elite: Wealth, Luxury Real Estate, Global Economy
    const query = "luxury real estate news|wealth management trends|Bloomberg luxury|Forbes Billionaires";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&videoEmbeddable=true&maxResults=6&key=${YT_API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        let html = '<div id="reels-wrapper" style="height:100vh; overflow-y:scroll; scroll-snap-type:y mandatory; background:#000;">';
        
        data.items.forEach(video => {
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            
            html += `
                <div class="reel-item" style="height:100vh; width:100vw; scroll-snap-align:start; position:relative;">
                    <iframe 
                        style="width:100%; height:100%; border:none;"
                        src="https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${videoId}" 
                        allow="autoplay; encrypted-media">
                    </iframe>
                    <div class="reel-overlay" style="position:absolute; bottom:110px; left:0; width:100%; padding:30px; background:linear-gradient(transparent, rgba(0,0,0,0.9)); box-sizing:border-box;">
                        <span class="subtitle" style="color:#D4AF37; font-size:0.7rem; letter-spacing:3px;">GLOBAL INTELLIGENCE</span>
                        <h3 class="gold-text" style="font-size:1.2rem; margin:10px 0; font-family:'Playfair Display';">${title}</h3>
                        <div style="display:flex; align-items:center; gap:10px;">
                            <div style="width:30px; height:30px; background:var(--gold); border-radius:50%; display:flex; align-items:center; justify-content:center; color:black; font-weight:bold; font-size:0.6rem;">L</div>
                            <span style="font-size:0.8rem; color:#ccc;">LGCY Proprietary Stream</span>
                        </div>
                    </div>
                </div>
            `;
        });
        
        container.innerHTML = html + '</div>';
    } catch (e) {
        container.innerHTML = `<div class="glass-card" style="margin:100px 20px;"><h2 class="gold-text">OFFLINE</h2><p>Connection to intelligence servers interrupted.</p></div>`;
    }
}
