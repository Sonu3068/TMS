import React,{useState} from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Register from './Register';
import Userlogin from './Userlogin';
import './style.css';
import Alert from './Alert';

export default function Userportal() {
  const [alert, Setalert] = useState('');
  return (
    <div className="user">
   <Alert alert={alert}/>
    <Routes>
      <Route path="/" element={<Navigate to="Login" />} />
      <Route path="Login" element={<Userlogin alert={alert} Setalert={Setalert}/>} />
      <Route path="Register" element={<Register alert={alert} Setalert={Setalert} />} />
    </Routes>  
    </div>

  );
}