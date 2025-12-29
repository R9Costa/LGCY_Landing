import requests
import json
import os

def update_news():
    api_key = os.getenv('NEWS_API_KEY')
    if not api_key: return

    # Query para temas de alto nível
    query = "wealth luxury global economy"
    url = f"https://newsapi.org/v2/everything?q={query}&language=en&sortBy=publishedAt&apiKey={api_key}"

    try:
        response = requests.get(url)
        articles = response.json().get('articles', [])[:10]
        
        reels_data = []
        for art in articles:
            reels_data.append({
                "title": art['title'],
                "desc": art['description'] or "No description available.",
                "url": art['url'],
                "img": art['urlToImage'] or "https://via.placeholder.com/1080x1920/000000/D4AF37?text=LGCY.VIP",
                "video_url": None # Para ser preenchido manualmente se desejado
            })

        with open('news.json', 'w', encoding='utf-8') as f:
            json.dump(reels_data, f, indent=4, ensure_ascii=False)
        print("LGCY: Reels News Updated.")

    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    update_news()
