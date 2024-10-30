import React, { useState } from 'react';
import './SignUp.scss'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../../../firebase.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';

const SignUp = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); 

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                if (errorCode === 'auth/email-already-in-use') {
                    setErrorMessage('Email already in use. Please use another email.');
                }
                else if (errorCode === 'auth/invalid-email') {
                    setErrorMessage('Invalid email format. Please check your email.');
                }
                else if (errorCode === 'auth/weak-password') {
                    setErrorMessage('Password is too weak. Please use a stronger password.');
                }
                else {
                    setErrorMessage('An error occurred. Please try again.');
                }
            });
    };

    return (
        <div>
            <div className="signup-template">
                <div className="sign-left">
                    <form>
                        <h2>Sign Up</h2>
                        <input 
                            type="name"
                            placeholder="Name"
                            />
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
                        >
                            Sign Up</button>
                    </form>
                </div>

                <div className="sign-right">
                    <h2>Already have an account?</h2>
                    <button
                    onClick={() => window.location.href='/Login'}
                    >Log In</button>
                    {errorMessage && (
                                <div className="error-popup">
                                    <p>{errorMessage}</p>
                                    <button onClick={() => setErrorMessage('')}>
                                        <FontAwesomeIcon icon={faClose} />
                                    </button>
                                </div> )}
                </div>
                
            </div>
        </div>
        
    );
}

export default SignUp;