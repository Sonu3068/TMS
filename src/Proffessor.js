import React from "react";
import Header from "./Proffessor/Header";
import Left from "./Proffessor/Left";
import { Routes, Route, Navigate } from "react-router-dom";
import Proffessordashboard from "./Proffessor/Proffessordashboard";
import Timetable from "./Proffessor/Timetable";
import Proffessorpolls from "./Proffessor/Proffessorpolls";
import { useState } from "react";
export default function Proffessor() {
  const [isExpanded, setIsExpanded] = useState(true);
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <>
      <Header />
      <Left isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Navigate to="Proffessordashboard" />} />
        <Route path="Proffessordashboard" element={<Proffessordashboard />} />
        <Route path="Proffessortimetable" element={<Timetable />} />
        <Route path="Proffessorpolls" element={<Proffessorpolls />} />
      </Routes>
    </>
  );
}
