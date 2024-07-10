import React from 'react';
import './App.css';
import Home from './components/home';
import Choose from './components/choose';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Donationpage from './components/donationpage';
import Fabricant from './components/fabricant';
import Login from './components/login';
import { Register } from './components/register';
import DemandePage from './components/demandePage';

function App() {
  return (
  
    <div>

      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/choose' element={< Choose/>} />
          <Route path='/donationpage' element={< Donationpage/>} />
          <Route path='/fabricant' element={< Fabricant/>} />
          <Route path='/login' element={< Login/>} />
          <Route path='/register' element={< Register/>} />
          <Route path='/demandePage' element={<DemandePage></DemandePage>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
