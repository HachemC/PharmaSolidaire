import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './components/home';
import Choose from './components/choose';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Donationpage from './components/donationpage';
import Fabricant from './components/fabricant';
import Login from './components/login';
import { Register } from './components/register';
import DemandePage from './components/demandePage';
import Pharmapage from './components/pharmapage';
import ProtectedRoute from './components/protectedroute';
import PublicRoute from './components/publicroute';
import Listmeds from './components/listmeds';
import ProtectedAdmin from './components/protectedadmin';
import AdminPage from './components/adminPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const [isAdmin, setIsAdmin] = useState(localStorage.getItem('role') === 'superadmin' || localStorage.getItem('role') === 'admin');

  useEffect(() => {
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsAdmin(localStorage.getItem('role') === 'superadmin' || localStorage.getItem('role') === 'admin');
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  return (
    <div>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route element={<PublicRoute isAuthenticated={isAuthenticated} />}>
            <Route path='/' element={<Home />} />
            <Route path='/choose' element={<Choose />} />
            <Route path='/donationpage' element={<Donationpage />} />
            <Route path='/fabricant' element={<Fabricant />} />
            <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} setIsAdmin={setIsAdmin} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/demandePage' element={<DemandePage />} />
          </Route>

          {/* Protected Route for Users */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} isAdmin={isAdmin} />}>
            <Route path='/pharmapage' element={<Pharmapage onLogout={handleLogout} />} />
            <Route path='/listmeds' element={<Listmeds onLogout={handleLogout} />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedAdmin isAuthenticated={isAuthenticated} isAdmin={isAdmin} />}>
            <Route path='/adminPage' element={<AdminPage onLogout={handleLogout} />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
