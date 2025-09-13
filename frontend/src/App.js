import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Register from './Register';
import Contacts from './ContactPage'; 
import './App.css'; 

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contacts" element={<Contacts />} />
    </Routes>
  );
}

export default App;
