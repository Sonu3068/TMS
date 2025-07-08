import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Userlogin from './Userlogin';
import './style.css';

export default function Userportal() {
  return (
    <div className="body">
      
    
    <Routes>
      <Route path="/" element={<Navigate to="Login" />} />
      <Route path="Login" element={<Userlogin />} />
      <Route path="Register" element={<Register />} />
    </Routes>  </div>

  );
}