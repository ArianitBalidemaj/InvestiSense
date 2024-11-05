# Using the json files with the news data to analyze sentiment
import json
import os
from nltk.sentiment.vader import SentimentIntensityAnalyzer

sid = SentimentIntensityAnalyzer()

def analyze_sentiment(posts, news):
    # Analyze sentiment of Reddit posts
    for post in posts:
        title = post['title']
        text = post['text']
        sentiment = sid.polarity_scores(title + ' ' + text)
        post['sentiment'] = sentiment['compound']

        if post['sentiment'] == 0:
            post['sentiment_label'] = 'neutral'
        elif post['sentiment'] > 0:
            post['sentiment_label'] = 'positive'
        else:
            post['sentiment_label'] = 'negative'
    
    # Analyze sentiment of news articles
    for article in news:
        title = article['title']
        description = article['description']
        sentiment = sid.polarity_scores(title + ' ' + description)
        article['sentiment'] = sentiment['compound']

        if article['sentiment'] == 0:
            article['sentiment_label'] = 'neutral'
        elif article['sentiment'] > 0:
            article['sentiment_label'] = 'positive'
        else:
            article['sentiment_label'] = 'negative'
    
    return posts, news

def save_sentiment_data(posts, news):
    with open('./backend/data/reddit_posts_sentiment.json', 'w') as f:
        json.dump(posts, f, indent=4)
    
    with open('./backend/data/news_articles_sentiment.json', 'w') as f:
        json.dump(news, f, indent=4)

if __name__ == '__main__':
    with open('./backend/data/reddit_posts.json', 'r') as f:
        posts = json.load(f)
    
    with open('./backend/data/news_articles.json', 'r') as f:
        news = json.load(f)
    
    posts, news = analyze_sentiment(posts, news)
    save_sentiment_data(posts, news)

