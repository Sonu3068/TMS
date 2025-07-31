import React, { useState, useEffect } from "react";
import "./Enroll.css";

const token = localStorage.getItem('token');
const params = {dept: "ME"}
const queryString = new URLSearchParams(params).toString()

export default function Enroll() {
  const [formData, setFormData] = useState({ fullname: "", email: "", courses: [] });
  const [available, setAvailable] = useState([]); // Initialize with an empty array
  const [enrolled, setEnrolled] = useState([]);

  // Fetch available courses
  useEffect(() => {
    fetch(`http://localhost:4000/student/courses?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(data => {
      console.log("Fetched available courses data:", data); // This log shows the actual data from the fetch
      setAvailable(data); // This schedules the state update
    })
    .catch(error => console.error("Error fetching available courses:", error));
    console.log("Fetch available courses initiated."); // This runs when the effect is first called
  }, []); // Empty dependency array means this runs once on mount

  // --- NEW useEffect for logging available state ---
  // This effect runs whenever 'available' state changes
  useEffect(() => {
    console.log("Available courses state updated:", available);
  }, [available]); // Dependency array includes 'available'

  // Fetch currently enrolled courses
  useEffect(() => {
    fetch("http://localhost:4000/student/enrollment", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }})
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(setEnrolled)
      .catch(error => console.error("Error fetching enrolled courses:", error));
  }, []); // Empty dependency array means this runs once on mount


  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData(prev => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter(c => c !== value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (formData.fullname && formData.email && formData.courses.length) {
      // Use Promise.all to wait for all enrollments to complete
      Promise.all(
        formData.courses.map(code =>
          fetch("http://localhost:4000/student/enrollment", {
            method: "POST",
            headers: { 
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ course_code: code })
          })
          .then(res => {
            if (!res.ok) {
                // Log error details if the response is not OK
                return res.json().then(err => { throw new Error(err.message || 'Failed to enroll course'); });
            }
            return res.json();
          })
          .catch(error => {
              console.error(`Error enrolling course ${code}:`, error);
              // Handle specific error for this course, e.g., show a toast notification
          })
        )
      )
      .then(() => {
        setFormData(prev => ({ ...prev, courses: [] })); // Clear selected courses after all enrollments
        // Refresh enrolled list AFTER all enrollments are attempted
        fetch("http://localhost:4000/student/enrollment", {
          method: "GET",
          headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }})
          .then(res => {
            if (!res.ok) {
              throw new Error(`HTTP error! status: ${res.status}`);
            }
            return res.json();
          })
          .then(setEnrolled)
          .catch(error => console.error("Error refreshing enrolled courses:", error));
      })
      .catch(error => {
          console.error("One or more enrollment fetches failed:", error);
      });
    } else {
        console.warn("Please fill in all fields and select at least one course.");
    }
  };

  const removeCourse = course_code => {
    fetch("http://localhost:4000/student/enrollment", {
      method: "DELETE",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ course_code })
    })
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then(() => {
      // After successful deletion, refresh the enrolled courses list
      fetch("http://localhost:4000/student/enrollment", { // Changed from /student/courses to /student/enrollment
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }})
        .then(res => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
          }
          return res.json();
        })
        .then(setEnrolled)
        .catch(error => console.error("Error refreshing enrolled courses after removal:", error));
    })
    .catch(error => console.error("Error removing course:", error));
  };

  return (
    <div className="m">
      <main style={{ marginLeft: window.innerWidth < 768 ? "2.5rem" : "11.5rem" }}>
        <div className="enroll">
          <h1>Course Enrollment</h1> {/* Changed from 'Course courses' for clarity */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name & Email */}
            <div className="enter">
              <label>Full Name</label>
              <input name="fullname" value={formData.fullname} onChange={handleChange} placeholder="Enter your name" />
            </div>
            <div className="enter">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" />
            </div>
            <h2>Select Courses</h2>
            <div className="course">
              {available.length > 0 ? ( // Conditionally render if available courses exist
                available.map(c => (
                  <div key={c.course_code} className="check">
                    <input
                      type="checkbox"
                      name="courses"
                      value={c.course_code}
                      id={c.course_code}
                      checked={formData.courses.includes(c.course_code)}
                      onChange={handleChange}
                    />
                    <label htmlFor={c.course_code}>{c.course_name}</label>
                  </div>
                ))
              ) : (
                <p>No available courses to display.</p> // Message if no courses are available
              )}
            </div>
            <button type="submit" className="your-button-styles">Enroll Now</button> {/* Add your actual button styles */}
          </form>

          {/* Enrolled Courses */}
          <h2>Enrolled Courses</h2>
            <ul>
            {enrolled.length > 0 ? ( // Conditionally render if enrolled courses exist
              enrolled.map(c => (
                <li key={c.course_code}> {/* Use <li> for list items and c.course_code for key */}
                  {c.course_name} ({c.course_code})
                  <button onClick={() => removeCourse(c.course_code)}>Remove</button>
                </li>
              ))
            ) : (
              <p>No courses currently enrolled.</p> // Message if no courses are enrolled
            )}
          </ul> 
        </div>
      </main>
    </div>
  );
}