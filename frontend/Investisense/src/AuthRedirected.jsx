import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth'; 
import { auth } from '../firebase.js'; 

const AuthRedirect = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <p>Loading...</p>; 
    }

    if (user) {
        return <Navigate to="/Home" />; 
    }

    return children;
};

export default AuthRedirect;