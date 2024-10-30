// src/components/Layout/Layout.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faPerson, faHome } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

const Sidebar = () => {
  return ( 
    <div className="navBar">
        <nav>


            <NavLink
            exact="true"
            activeclassname="active"
            to="/Search"
            onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faSearch} color="#000000" />
            </NavLink>

            <NavLink
            exact="true"
            className="home-icon"
            activeclassname="active"
            to="/Home"
            onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faHome} color="#000000" />
            </NavLink>

            {/* #4d4d4e */}

            <NavLink
            exact="true"
            className="profile-icon"
            activeclassname="active"
            to="/Profile"
            onClick={() => setShowNav(false)}>
                <FontAwesomeIcon icon={faPerson} color="#000000" />
            </NavLink>
        </nav>
    </div>
  );
};

export default Sidebar;