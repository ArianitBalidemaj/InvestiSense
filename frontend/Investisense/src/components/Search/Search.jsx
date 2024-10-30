import React, { useState } from 'react';
import './index.scss';

const Search = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [stockTickers, setStockTickers] = useState([]); // Array for stock tickers
    const [stockNames, setStockNames] = useState([]); // Array for stock names
    const [debounceTimeout, setDebounceTimeout] = useState(null);
    const [cache, setCache] = useState({}); 

    const fetchStocks = async (searchQuery) => {
        if (cache[searchQuery]) {
            setResults(cache[searchQuery]);
            return;
        }

        try {
            const response = await fetch(`http://127.0.0.1:5000/search?query=${searchQuery}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            // Log the entire array of stocks for debugging
            console.log(data); // This will show the full structure of the data

            // Check if the data structure is correct
            // Assuming data is an array of stocks
            const stocks = Array.isArray(data) ? data : data.stocks; // Adjust this based on your actual data structure

            // Create separate arrays for tickers and names
            const tickers = stocks.map(stock => stock.Symbol);
            const names = stocks.map(stock => stock.Name);

            // Update state with the results
            setStockTickers(tickers);
            setStockNames(names);
            setResults(stocks);

            // Cache results
            setCache((prevCache) => ({
                ...prevCache,
                [searchQuery]: stocks
            }));

            // Log the separate arrays
            console.log("Tickers:", tickers);
            console.log("Names:", names);
        } catch (error) {
            console.error('Error fetching stock data:', error);
        }
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        setQuery(value);

        if (debounceTimeout) {
            clearTimeout(debounceTimeout);
        }

        const newTimeout = setTimeout(() => {
            if (value) {
                fetchStocks(value);
            } else {
                setResults([]);
                setStockTickers([]); // Clear tickers
                setStockNames([]); // Clear names
            }
        }, 500);

        setDebounceTimeout(newTimeout);
    };

    const handleStockSelect = (stock) => {
        setQuery(stock.symbol);
        setSelectedStock(stock);
        setResults([]); // Clear results after selection
    };

    return (
        <div className="search-container">
            <div className="input-wrapper">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for stocks..."
                />
            </div>
            
            {selectedStock && (
                <div className="selected-stock">
                    <p>
                        Selected Stock: <strong>{selectedStock.Symbol}</strong> - {selectedStock.Name}
                    </p>
                </div>
            )}
    
            {stockTickers.length > 0 && (
                <ul className="autocomplete-dropdown">
                    {stockTickers.map((ticker, index) => (
                        <li 
                            key={index} // Use the index as the key (or a unique identifier if available)
                            onClick={() => handleStockSelect({ Symbol: ticker, Name: stockNames[index] })} // Create an object for selection
                        >
                            {ticker} - {stockNames[index]} {/* Use the index to access the corresponding name */}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Search;