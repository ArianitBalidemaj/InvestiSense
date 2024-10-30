# InvestiSense App

InvestiSense is an application designed for new investors to explore stocks, track market trends, and gain insights into public sentiment and corporate valuation. By aggregating data and applying sentiment analysis, InvestiSense provides users with a comprehensive view of stocks they are interested in.

## Features
- **Stock Exploration**: Users can search for stocks they are interested in purchasing.
- **News Aggregation & Sentiment Analysis**: Real-time gathering of news articles related to the searched stock, with sentiment analysis reflecting public perception.
- **Stock Tracking**: Users can add specific stocks to their account to monitor and gain a better understanding of market sentiment and company valuation.
- **Risk & Sentiment Metrics**: Calculations are performed to provide insights into stock risk levels and sentiment scores.

## Tech Stack
- **Frontend**: React + Vite
- **Backend**: Python (Flask), REST API
- **Data Aggregation**: Reddit Scraper, News API (for sentiment analysis)

## Project Structure
- **Frontend**: Developed using React and Vite, implementing REST API calls for dynamic stock searches and sentiment data.
- **Backend**: Utilizes Flask to connect the frontend with Python calculations for risk and sentiment analysis.
- **Data Processing**: News and Reddit data are processed to gauge market sentiment, providing a user-friendly interpretation of stock risks and public opinion.

## Status
⚠️ **This project is a work in progress**. Additional functionality and improvements are ongoing as InvestiSense evolves into a more robust and user-centered tool.

## Installation
1. Clone the repository: 
   ```bash
   git clone https://github.com/yourusername/InvestiSense.git
   ```
   
2.	Navigate to the project directory:
   ```bash
   cd InvestiSense
   ```

3. Install frontend dependecies:
   ```bash
   cd frontend
   ```
   
4.	Run the app:
	•	Start the backend server (Flask)
	•	Run the frontend (React + Vite)
