import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import Header from "./Professor/Header";
import Left from "./Professor/Left";
import Profprofile from "./Professor/Profprofile";
import Professordashboard from "./Professor/Professordashboard";
import  Professorpolls   from './Professor/Professorpolls';
import Profrequest from "./Professor/Profrequest";

export default function Professor() {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <Header/>
      <Left isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Navigate to="professordashboard" />} />
        <Route path="Professordashboard" element={<Professordashboard/>} />
        <Route path="Profprofile" element={<Profprofile/>} />
        <Route path="Professorpolls" element={<Professorpolls/>} />
        <Route path="Profrequest" element={<Profrequest/>} />
      </Routes>
    </>
  );
}
