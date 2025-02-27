import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import './App.css';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        <Route path="/Login" element={!user ? <Login onLogin={setUser} /> : <Navigate to="/" />} />
        <Route path="/Register" element={!user ? <Register onRegister={setUser} /> : <Navigate to="/" />} />
        <Route path="/" element={user ? <Home /> : <Navigate to="/Login" />} />
      </Routes>
    </Router>
  );
};

export default App;