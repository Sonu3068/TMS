import React,{useState} from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Left from "./Admin/Left";
import AdminDashboard from "./Admin/AdminDashboard";
import Header from "./Admin/Header";
import Edit from "./Admin/Edit";
import AdminTimetable from "./Admin/AdminTimetable";

export default function Admin() {
   const [isExpanded, setIsExpanded] = useState(true);
  
    const toggleSidebar = () => {
      setIsExpanded(!isExpanded);
    };
  return (
    <>
      <Header />
     <Left isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
      <Routes>
        <Route path="/" element={<Navigate to="AdminDashboard" />} />
        <Route path="AdminDashboard" element={<AdminDashboard />} />
        <Route path="Admintimetable" element={<AdminTimetable />} />
        <Route path="Edit" element={<Edit/>} />
      </Routes>
    </>
  );
}
