import React, { useState, useEffect } from 'react';
import './Request.css';

function Request() {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');

  // Fetch requests on component mount using fetch
  useEffect(() => {
   const fetchRequests = async () => {
    try {
      const response = await fetch('/api/course-change-requests');
      setRequests(Array.isArray(response.data) ? response.data : []);
    } catch (err) {
      setError('Failed to fetch requests. Please try again later.');
      setRequests([]);
    }
  };
  fetchRequests();
}, []);
  // Simulated data as fallback (uncomment if no API is available)
  /*
  const [requests, setRequests] = useState([
    {
      id: 1,
      professorName: 'Dr. Ashok Kumar Mocherla',
      courseName: 'HS 102: Environmental Studies',
      currentSlot: 'Monday 10:00 AM - 11:00 AM',
      requestedSlot: 'Tuesday 2:00 PM - 3:00 PM',
      reason: 'Scheduling conflict with another course.',
    },
    {
      id: 2,
      professorName: 'Dr. Jane Smith',
      courseName: 'CS 201: Data Structures',
      currentSlot: 'Wednesday 9:00 AM - 10:00 AM',
      requestedSlot: 'Thursday 3:00 PM - 4:00 PM',
      reason: 'Better aligns with department meetings.',
    },
  ]);
  */

  return (
    <div className="page-container">
      <div className="view-container">
        <h2 className="view-title">Course Time/Slot Change Requests</h2>
        {error && (
          <p className="error-message">{error}</p>
        )}
        {(requests.length === 0) ? (
          <p className="no-requests">No requests available.</p>
        ) : (
          <table className="request-table">
            <thead>
              <tr>
                <th>Professor Name</th>
                <th>Course Name</th>
                <th>Current Slot</th>
                <th>Requested Slot</th>
                <th>Reason</th>
              </tr>
            </thead>
            <tbody>
              {requests.map(request => (
                <tr key={request.id}>
                  <td>{request.professorName}</td>
                  <td>{request.courseName}</td>
                  <td>{request.currentSlot}</td>
                  <td>{request.requestedSlot}</td>
                  <td>{request.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Request;