import React, { useState, useEffect } from "react";
import "./Enroll.css";

const token = localStorage.getItem('token');
const params = {dept: "ME"}
const queryString = new URLSearchParams(params).toString()

export default function Enroll() {
  const [formData, setFormData] = useState({ fullname: "", email: "", courses: [] });
  const [available, setavailable] = useState([{course_code: "hi", course_name: "bye"}]);
  const [enrolled, setEnrolled] = useState([]);

  // Fetch available courses
  useEffect(() => {
    fetch(`http://localhost:4000/student/courses?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add the Authorization header
        'Authorization': `Bearer ${token}`
      }
    }
  )
  .then(res => res.json())
  .then(
    data=>
      {
        console.log(data)
        // setavailable(data)
        }
        )
  .then(() => console.log(available))
      .catch(console.error);
  console.log("hi")

  }, []);
  // Fetch currently enrolled courses
  useEffect(() => {
    fetch("http://localhost:4000/student/enrollment", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }})
      .then(res => res.json())
      .then(setEnrolled)
      .catch(console.error);
  }, []);

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
      formData.courses.forEach(code =>
        fetch("http://localhost:4000/student/enrollment", {
          method: "POST",
          headers: { 
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ course_code: code })
        })
      );
      setFormData(prev => ({ ...prev, courses: [] }));
      // Refresh enrolled list
      fetch("http://localhost:4000/student/enrollment", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }})
        .then(res => res.json())
        .then(setEnrolled);
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
    }).then(() =>
      fetch("http://localhost:4000/student/courses", {
      method: "GET",
      headers: { 
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }})
        .then(res => res.json())
        .then(setEnrolled)
    );
  };

  return (
    <div className="m">
      <main style={{ marginLeft: window.innerWidth < 768 ? "2.5rem" : "11.5rem" }}>
        <div className="enroll">
          <h1>Course courses</h1>
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
              {available.map(c => (
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
              ))}
            </div>
            <button type="submit" className="...">Enroll Now</button>
          </form>

          {/* Enrolled Courses */}
          <h2>Enrolled Courses</h2>
          {/* <ul>
            {enrolled.map(c => (
              <div>hi</div>
            ))}
          </ul> */}
        </div>
      </main>
    </div>
  );
}
