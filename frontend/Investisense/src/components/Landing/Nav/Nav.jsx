import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import './Nav.scss'
import logo from '../../../assets/Logo.png'

const Nav = () => {
    return ( 
        <div className="navi">
            <div className="navi__logo">
                <img src={logo} alt="Investisense Logo" />
                    <div className="navi__left">
                        <ul className="navi__left__items">

                            <a href="#hero" className="navi__left__items__item">Home</a>
                            <a href="#works" className="navi__left__items__item">About</a>
                            <a href="#contact" className="navi__left__items__item">Contact</a>
                            <NavLink className="navi__right__login" to="/Login">Login</NavLink>
                            <NavLink className="navi__right__signup" to="/SignUp">Sign Up</NavLink>
                
                        </ul>
                    </div>
                </div>
            </div>
    );
};

export default Nav;
