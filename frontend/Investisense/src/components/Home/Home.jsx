import React from 'react';
import './index.scss';
import SearchBar from './SearchBar/SearchBar';
import Logout from '../LoginSup/Logout/Logout';

const Home = () => {

    return (
        <>
        <div className="container home-page">
            <Logout />
            <SearchBar />
            <h1>Home</h1>
            
        </div>
        </>
    );
    }


export default Home;