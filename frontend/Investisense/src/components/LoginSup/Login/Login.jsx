import React, { useState } from 'react';
import './Login.scss'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const { navigate } = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault(); 

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                setErrorMessage(''); 
                setSuccessMessage('Logged in successfully. Redirecting to dashboard...');

                navigate('/Home'); 
                
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error(errorCode, errorMessage);
                if (errorCode === 'auth/wrong-password') {
                    setErrorMessage('Incorrect password. Please try again.');
                }
                else if (errorCode === 'auth/user-not-found') {
                    setErrorMessage('No user found with this email. Please sign up.');
                }
                else if (errorCode === 'auth/invalid-email') {
                    setErrorMessage('Invalid email format. Please check your email.');
                }
                else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            });

        // If user is logged in, redirect to the dashboard
        auth.onAuthStateChanged((user) => {
            if (user) {
                window.location.href = '/Home';
            }
        });
    };

    return (
        <div>
            <div className="login-template">
                <div className="login-left">
                    <form>
                        <h2>Login Here</h2>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        <input 
                            type="password" 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} 
                            />
                        <button 
                        type="submit"
                        onClick={handleSubmit}
                        // pP
                        >
                            Log In</button>
                    </form>
                </div>

                <div className="login-right">
                    <h2>Don't have an account?</h2>
                    <button
                    onClick={() => window.location.href='/SignUp'}
                    >Sign Up!</button>
                    {errorMessage && (
                                <div className="error-popup">
                                    <p>{errorMessage}</p>
                                    <button onClick={() => setErrorMessage('')}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </div> )}

                    {successMessage && (
                        <div className="success-popup">
                            <p>{successMessage}</p>
                            <button onClick={() => setSuccessMessage('')}>
                                <FontAwesomeIcon icon={faClose} />
                            </button>
                        </div>
                    )}
                </div>
                
                
            </div>
        </div>
    );
}

export default Login;