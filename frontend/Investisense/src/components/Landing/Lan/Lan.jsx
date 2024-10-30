import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../Nav/Nav';
import Hero from '../Hero/Hero';
import Works from '../Works/Works';
import Contact from '../Contact/Contact';

const Lan = () => {
    return (
    <div className="App">
    <Nav />
    <div className="page">
        <Hero />
        <Works />
        <Contact />
    </div>

    </div>
    );
};

export default Lan;