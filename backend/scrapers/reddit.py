import praw
import json
import datetime
import os
from datetime import timedelta
from dotenv import load_dotenv
import time
import logging
import sys

# Load environment variables from .env file
load_dotenv()

REDDIT_CLIENT_ID = os.getenv('REDDIT_CLIENT_ID')
REDDIT_CLIENT_SECRET = os.getenv('REDDIT_CLIENT_SECRET')
REDDIT_USER_AGENT = os.getenv('REDDIT_USER_AGENT')
REDDIT_SUBREDDIT = os.getenv('REDDIT_SUBREDDIT', 'stocks')  # Default subreddit if not set
OUTPUT_FILE = os.getenv('OUTPUT_FILE', 'reddit_posts.json')
LOG_FILE = os.getenv('LOG_FILE', 'scraper.log')
LOG_LEVEL = os.getenv('LOG_LEVEL', 'INFO')
TIME_DELTA = timedelta(days=1)
RETRY_COUNT = 3
RETRY_DELAY = 5

# Configure logging
logging.basicConfig(
    level=getattr(logging, LOG_LEVEL),
    format='%(asctime)s - %(levelname)s - %(message)s',
    handlers=[logging.StreamHandler(sys.stdout), logging.FileHandler(LOG_FILE)]
)
logger = logging.getLogger()

try:
    reddit = praw.Reddit(
        client_id=REDDIT_CLIENT_ID,
        client_secret=REDDIT_CLIENT_SECRET,
        user_agent=REDDIT_USER_AGENT
    )
    logger.info("Reddit API client initialized successfully.")
except Exception as e:
    logger.error(f"Failed to initialize Reddit API client: {e}")
    sys.exit(1)

def fetch_reddit_posts(subreddits, keywords, min_score=2):
    logger.info(f"Fetching posts from subreddits: {subreddits} with keywords in titles: {keywords}")
    end_time = datetime.datetime.utcnow()
    start_time = end_time - TIME_DELTA
    posts = []

    for subreddit in subreddits:
        for submission in reddit.subreddit(subreddit).search(" OR ".join(keywords), sort='new', time_filter='day'):
            created_time = datetime.datetime.utcfromtimestamp(submission.created_utc)
            if start_time <= created_time <= end_time and submission.score >= min_score:
                # Check if any keyword is in the title
                if any(keyword.lower() in submission.title.lower() for keyword in keywords):
                    post_data = {
                        'title': submission.title,
                        'text': submission.selftext,
                        'url': submission.url,
                        'score': submission.score,
                        'created_time': created_time.isoformat(),
                        'subreddit': subreddit
                    }
                    posts.append(post_data)
                    logger.info(f"Relevant post found in {subreddit}: {post_data}")

    return posts

def save_posts_to_json(posts):
    if not posts:
        logger.info("No new posts to save.")
        return

    # Ensure the directory exists
    os.makedirs(os.path.dirname('./backend/data/reddit_posts.json'), exist_ok=True)

    try:
        if os.path.exists('./backend/data/reddit_posts.json'):
            try:
                with open('./backend/data/reddit_posts.json', 'r') as f:
                    existing_data = json.load(f)
            except json.JSONDecodeError:
                logger.warning("JSON file empty or corrupt; initializing new data list.")
                existing_data = []
        else:
            existing_data = []

        existing_data.extend(posts)
        
        with open('./backend/data/reddit_posts.json', 'w') as f:
            json.dump(existing_data, f, indent=4)
            logger.info(f"Saved {len(posts)} posts to {'./backend/data/reddit_posts.json'}")
    except Exception as e:
        logger.error(f"Error saving posts to JSON: {e}")

if __name__ == '__main__':
    subreddits_input = input("Enter subreddits to search for, separated by commas: ")
    keywords_input = input("Enter keywords to search for, separated by commas: ")
    keywords = [keyword.strip() for keyword in keywords_input.split(",")]

    # Fetch posts for these keywords and save them to a JSON file
    posts = fetch_reddit_posts(subreddits_input,keywords)
    save_posts_to_json(posts)