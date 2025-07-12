import React from 'react'
import { useState, useEffect } from 'react';
import './AdminDashboard.css';

export default function AdminDashboard() {
    const [requests, setRequests] = useState([]);

  const currentDate = new Date().toLocaleString('en-US', {
    timeZone: 'Asia/Kolkata',
    dateStyle: 'full',
    timeStyle: 'short',
  });

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('/api/course-change-requests');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setRequests(Array.isArray(data) ? data : []);
      } catch (err) {
   
        setRequests([]); // Ensure requests is always an array
      }
    };
    fetchRequests();
  }, []);

  // Simulated data as fallback (uncomment if no API is available)
  /*
  const [requests, setRequests] = useState([
    { id: 1, studentName: 'Amit Sharma', courseName: 'CS 101: Introduction to Programming', currentSlot: 'Monday 10:00 AM - 11:00 AM', requestedSlot: 'Tuesday 2:00 PM - 3:00 PM', reason: 'Clash with another class.', status: 'Pending' },
    { id: 2, studentName: 'Priya Patel', courseName: 'MA 102: Calculus II', currentSlot: 'Wednesday 9:00 AM - 10:00 AM', requestedSlot: 'Thursday 3:00 PM - 4:00 PM', reason: 'Better timing for study group.', status: 'Approved' },
    { id: 3, studentName: 'Ravi Kumar', courseName: 'EE 201: Circuits', currentSlot: 'Friday 11:00 AM - 12:00 PM', requestedSlot: 'Monday 1:00 PM - 2:00 PM', reason: 'Personal emergency.', status: 'Rejected' },
  ]);
  */

  const totalRequests = requests.length;
  const pendingRequests = requests.filter(r => r.status === 'Pending').length;
  const approvedRequests = requests.filter(r => r.status === 'Approved').length;

  return (
    <div className="dashboard-container text-center" style={{ marginLeft: window.innerWidth < 768 ? "2.5rem" : "2.5rem" }}>
      <header className="dashboard-header">
        <h1 className="dashboard-title">Admin Dashboard</h1>
        <p className="dashboard-date">{currentDate}</p>
      </header>
      <div className="summary-section">
        <div className="summary-card">
          <h3>Total Requests</h3>
          <p className="summary-value text-dark">{totalRequests}</p>
        </div>
        <div className="summary-card">
          <h3>Pending Requests</h3>
          <p className="summary-value text-danger">{pendingRequests}</p>
        </div>
        <div className="summary-card">
          <h3>Approved Requests</h3>
          <p className="summary-value text-success">{approvedRequests}</p>
        </div>
      </div>
     
    </div>
  );
}