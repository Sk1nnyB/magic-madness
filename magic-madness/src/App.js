import React from 'react';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Decks from './components/pages/Decks';
import RandomEffect from './components/pages/RandomEffect';
import Login from './components/pages/Login';
import Signup from './components/pages/Signup';
import Account from './components/pages/Account';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router basename="/magic-madness">
        <Navbar />
        <Routes>
          <Route path='/' index element={<Home />} />
          <Route path='/decks' element={<Decks />} />
          <Route path='/random-effect' element={<RandomEffect />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
