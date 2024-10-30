import React from 'react';
import './Hero.scss';
import HeroImg from '../../../assets/hero.svg';


const Hero = () => {
    return (
        <div id="hero" className="container home-page">
            <img src={HeroImg} alt="hero" className="hero-img"/>
            <div className="text-box">
                <h1 className="htitle">Stock <span className="break1">Choices</span> Made <span className="break1">Easy</span></h1>
                <p className="hsubtitle">Helping you understand more about the stocks you pick</p>
                <button className="btn-sign">Get Started</button>
            </div>
        </div>
    );
}

// #00004d

export default Hero;