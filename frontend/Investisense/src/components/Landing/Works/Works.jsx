import React from 'react';
import './Works.scss';
import Search from '../../../assets/search.svg';
import Data from '../../../assets/data.svg';
import Card from '../../../assets/card.svg';

const Works = () => {
    return ( 
        <div id="works" className="works-page">
            <h1>How It Works</h1>

            <div className="steps-container">
                <div className="left-one">
                    <h2>Create an Account</h2>
                    <img src={Card} alt="card"/>
                    <p>Make an account for free and explore the different aspects of how you can upgrade 
                        your searching experience for stocks, ETFs, etc. A way to get an unbiased view of a stock.</p>
                </div>

                <div className="middle-one">
                    <h2>Search & Add</h2>
                    <img src={Search} alt="search"/>
                    <p>Search for any stock and get real-time data on the stock. Add the stock to your watchlist.
                        An all in one UI made to simplify the experience of researching a stock. Different categories to look through</p>
                </div>

                <div className="right-one">
                    <h2>Read & Analyze</h2>
                    <img src={Data} alt="data"/>
                    <p>Articles related to the stock will show up in the news section of the stock. Be able to see the 
                        sentiment of the stock and how everyone feels about the stock. Analyze the stock and make a decision.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Works;
