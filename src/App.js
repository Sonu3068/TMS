import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Userportal from "./Userportal";
import Student from "./Student";
import ForgotPassword from "./ForgotPassword"; // Create this component
import Admin from "./Admin";
import Proffessor from "./Proffessor";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/Userportal" />} />
      <Route path="/Userportal/*" element={<Userportal />} />
      <Route path="/Student/*" element={<Student />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/Admin/*" element={<Admin />} />
      <Route path="/Proffessor/*" element={<Proffessor />} />
    </Routes>
  );
}
