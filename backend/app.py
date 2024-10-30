from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

@app.route('/search', methods=['GET'])
def search():
    query = request.args.get('query', '').lower()

    stock_data_1 = pd.read_csv('./data/NYSE.csv')
    stock_data_2 = pd.read_csv('./data/NASDAQ.csv')

    combined_stocks = pd.concat([stock_data_1, stock_data_2])

    filtered_stocks = combined_stocks[
        combined_stocks['Symbol'].str.contains(query, case=False) |
        combined_stocks['Name'].str.contains(query, case=False)
    ]

    top_5_stocks = filtered_stocks[['Symbol', 'Name']].head(5).to_dict(orient='records')

    print(top_5_stocks)

    return jsonify(top_5_stocks)

if __name__ == '__main__':
    app.run(debug=True)