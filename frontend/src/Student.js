import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Left from './components/Left';
import Right from './components/Right';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import Enroll from './components/Enroll';
import Timetable from './components/Timetable';
import Polls from './components/Polls';

export default function Student() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Header />
      <div className="student-container">
        <Left isExpanded={isExpanded} toggleSidebar={toggleSidebar} />
        <div className="content">
          <Routes>
            <Route path="/" element={<Navigate to="Dashboard" />} />
            <Route path="Dashboard" element={<Dashboard isExpanded={isExpanded} />} />
            <Route path="Profile" element={<Profile isExpanded={isExpanded} />} />
            <Route path="Enroll" element={<Enroll isExpanded={isExpanded} />} />
            <Route path="Timetable" element={<Timetable isExpanded={isExpanded} />} />
            <Route path="Polls" element={<Polls isExpanded={isExpanded} />} />
          </Routes>
        </div>
        <Right />
      </div>
    </>
  );
}