import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Search from './components/Search/Search.jsx';
import Layout from './components/Layout/Layout.jsx';
import Home from './components/Home/Home.jsx';
import Lan from './components/Landing/Lan/Lan.jsx';
import SignUp from './components/LoginSup/SignUp/SignUp.jsx';
import Login from './components/LoginSup/Login/Login.jsx';
import ProtectedRoute from './ProtectedRoute.jsx';
import AuthRedirected from './AuthRedirected.jsx';

function App() {
  const [count, setCount] = useState(0);

  return (
    <Router>
      <Routes> 
        {/* Public Routes */}
        <Route path="/Welcome" element={
            <AuthRedirected>
              <Lan />
            </AuthRedirected>
        } />
        
        <Route path="/SignUp" element={
            <AuthRedirected>
              <SignUp />
            </AuthRedirected>
        } />
        <Route path="/Login" element={<Login />} />
        
        {/* Protected Routes */}
        <Route path="/Home" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/Search" element={
            <ProtectedRoute>
              <Search />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;