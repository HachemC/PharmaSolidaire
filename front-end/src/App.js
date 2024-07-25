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


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  // Listen for storage changes in different tabs
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    setIsAuthenticated(false);
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
            <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path='/register' element={<Register />} />
            <Route path='/demandePage' element={<DemandePage />} />
          </Route>

          {/* Protected Route */}
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route 
              path='/pharmapage' 
              element={<Pharmapage onLogout={handleLogout} />} 
            />
         
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
