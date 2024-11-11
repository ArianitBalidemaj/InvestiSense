# Using the NewsAPI to fetch news articles based on company names or ticker symbols
import os
import sys
import json
import logging
from datetime import datetime, timedelta
import requests
from dotenv import load_dotenv

load_dotenv()

NEWS_API_KEY = os.getenv('NEWS_API_KEY')
NEWS_CATEGORY = os.getenv("NEWS_CATEGORY", "business")
BASE_URL = "https://newsapi.org/v2/everything"

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout)]
)

logger = logging.getLogger()

def fetch_news(keywords, from_date=None, to_date=None):
    logger.info(f"Fetching news articles with keywords: {keywords}")
    if not NEWS_API_KEY:
        logger.error("NEWS_API_KEY is not set.")
        return []

    if not from_date:
        from_date = datetime.now() - timedelta(days=7)  # Adjust date range for more data
    if not to_date:
        to_date = datetime.now()

    params = {
        'apiKey': NEWS_API_KEY,
        'q': ' OR '.join([f'"{kw}"' for kw in keywords]),
        'from': from_date.strftime('%Y-%m-%d'),
        'to': to_date.strftime('%Y-%m-%d'),
        'language': 'en',
        'sortBy': 'relevancy', 
        'pageSize': 100
    }

    response = requests.get(BASE_URL, params=params)
    if response.status_code == 200:
        data = response.json()
        articles = data.get('articles', [])
        
        if not articles:
            logger.warning("No articles were found for the given query.")
        else:
            logger.info(f"Found {len(articles)} articles.")
            
        return articles
    else:
        logger.error(f"Failed to fetch news articles: {response.status_code} - {response.json()}")
        return []
    
def save_news(articles, output_file='./backend/data/news_articles.json'):
    with open(output_file, 'w') as f:
        json.dump(articles, f, indent=4)
    logger.info(f"News articles saved to {output_file}")

if __name__ == '__main__':
    company_keywords = input("Enter company names or ticker symbols separated by commas: ")
    articles = fetch_news(company_keywords.split(","))
    save_news(articles)
