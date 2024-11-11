import os
import json
import time
import logging
from datetime import datetime, timedelta
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from dotenv import load_dotenv

# Import your scraper functions
from backend.scrapers.news import fetch_news, save_news
from backend.scrapers.reddit import fetch_reddit_posts, save_posts_to_json

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger()

# Initialize Sentiment Analyzer
sid = SentimentIntensityAnalyzer()

# Set paths
DATA_PATH = './backend/data/'
NEWS_FILE = os.path.join(DATA_PATH, 'news_articles.json')
REDDIT_FILE = os.path.join(DATA_PATH, 'reddit_posts.json')
OUTPUT_FILE = os.path.join(DATA_PATH, 'combined_sentiment_analysis.json')

# Ensure data directory exists
os.makedirs(DATA_PATH, exist_ok=True)

def analyze_sentiment(articles):
    for article in articles:
        text = article.get('title', '') + ' ' + article.get('description', '')
        sentiment_scores = sid.polarity_scores(text)
        article['sentiment_score'] = sentiment_scores['compound']
    return articles

def calculate_average_sentiment(articles):
    scores = [article['sentiment_score'] for article in articles if 'sentiment_score' in article]
    if not scores:
        return None
    return sum(scores) / len(scores)

def main(stock):
    # Step 1: Run News API Scraper
    try:
        logger.info(f"Fetching news articles for {stock}")
        news_articles = fetch_news([stock])
        save_news(news_articles, NEWS_FILE)
        logger.info("News articles fetched and saved successfully.")
    except Exception as e:
        logger.error(f"Error fetching news: {e}")
        return

    # Step 2: Run Reddit API Scraper
    try:
        logger.info(f"Fetching Reddit posts for {stock}")
        reddit_posts = fetch_reddit_posts(["stocks", "investing"], [stock])
        save_posts_to_json(reddit_posts, REDDIT_FILE)
        logger.info("Reddit posts fetched and saved successfully.")
    except Exception as e:
        logger.error(f"Error fetching Reddit posts: {e}")
        return

    # Step 3: Load and Combine Data
    all_articles = news_articles + reddit_posts

    # Step 4: Run Sentiment Analysis
    logger.info("Running sentiment analysis")
    analyzed_articles = analyze_sentiment(all_articles)
    avg_sentiment = calculate_average_sentiment(analyzed_articles)

    # Step 5: Determine Overall Sentiment
    if avg_sentiment is not None:
        if avg_sentiment > 0.05:
            sentiment = "Positive"
        elif avg_sentiment < -0.05:
            sentiment = "Negative"
        else:
            sentiment = "Neutral"
    else:
        sentiment = "No data available"

    # Step 6: Save Combined Data with Sentiment
    with open(OUTPUT_FILE, 'w') as f:
        json.dump(analyzed_articles, f, indent=4)
    logger.info(f"Combined data with sentiment scores saved to {OUTPUT_FILE}")

    # Step 7: Print Results
    logger.info(f"Stock: {stock}")
    logger.info(f"Average Sentiment Score: {avg_sentiment}")
    logger.info(f"Overall Sentiment: {sentiment}")

if __name__ == '__main__':
    stock_input = input("Enter the stock ticker or company name you want to analyze: ")
    main(stock_input)
