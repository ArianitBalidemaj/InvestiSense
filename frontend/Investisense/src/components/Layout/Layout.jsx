import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar.jsx';

const Layout = () => {
  return (
    <div className="App">
      <Sidebar />
        <div className="page">
            <Outlet />
        </div>

    </div>
  );
};

export default Layout;
