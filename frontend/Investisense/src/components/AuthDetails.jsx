import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from '../../firebase'; 
import './AuthDetails.scss';


const AuthDetails = () => {
    const [user, setUser] = useState(null);

    onAuthStateChanged(auth, (currentUser) => {
        if (currentUser) {
            setUser(currentUser);
        }
        else {
            setUser(null);
        }
    }, [])

    return (
        <div className="main">
            {user ? (
                <div>
                    <h2>Welcome, {user.email}</h2>
                </div>
            ) : (
                <h2>Please log in</h2>
            )}
        </div>
    );
}

export default AuthDetails;