import React, { useState } from 'react';
import './Logout.scss'
import { auth } from '../../../../firebase.js';
import AuthDetails from '../../AuthDetails';

const Logout = () => {

    const handleLogout = () => {
        auth.signOut()
            .then(() => {
                console.log("User signed out");
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    return (
        <div className="button-out">
            <AuthDetails />
            <button onClick={handleLogout}>Log Out</button>
        </div>
    );
}


export default Logout;
