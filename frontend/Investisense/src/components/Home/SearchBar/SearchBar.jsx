import React, { useState } from 'react';
import './SearchBar.scss';
import { FaSearch } from 'react-icons/fa';


const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);
    const [stockTickers, setStockTickers] = useState([]);
    const [stockNames, setStockNames] = useState([]);
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

            const stocks = Array.isArray(data) ? data : data.stocks; 

            const tickers = stocks.map(stock => stock.Symbol);
            const names = stocks.map(stock => stock.Name);

            setStockTickers(tickers);
            setStockNames(names);
            setResults(stocks);

            setCache((prevCache) => ({
                ...prevCache,
                [searchQuery]: stocks
            }));

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
                setStockTickers([]);
                setStockNames([]); 
            }
        }, 500);

        setDebounceTimeout(newTimeout);
    };

    const handleStockSelect = (stock) => {
        setQuery(stock.symbol);
        setSelectedStock(stock);
        setResults([]); 
    };

    return (
        <div className="search-container">
            <div className="input-wrapper">
                <FaSearch className="search"/>
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
                            key={index}
                            onClick={() => handleStockSelect({ Symbol: ticker, Name: stockNames[index] })}
                        >
                            {ticker} - {stockNames[index]} 
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;