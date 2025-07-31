import React, { useState, useEffect } from "react";
import "./Enroll.css";

const token = localStorage.getItem('token');
const params = { dept: "ME" };
const queryString = new URLSearchParams(params).toString();

export default function Enroll(props) {
  const [formData, setFormData] = useState({ courses: [] });
  const [available, setAvailable] = useState([]);
  const [enrolledCourseCodes, setEnrolledCourseCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const enrolledCoursesWithDetails = available.filter(course =>
    enrolledCourseCodes.includes(course.course_code)
  );

  useEffect(() => {
    const fetchAvailableCourses = async () => {
      setLoading(true);
      setError(null);
      if (!token) {
        setError("Authorization token not found. Please log in.");
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(`http://localhost:4000/student/courses?${queryString}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          setAvailable(data.data);
        } else if (Array.isArray(data)) {
          setAvailable(data);
        } else {
          throw new Error("Invalid data format received for available courses.");
        }
      } catch (err) {
        console.error("Error fetching available courses:", err);
        setError(`Failed to load available courses: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchAvailableCourses();
  }, []);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      if (!token) {
        return;
      }
      try {
        const response = await fetch("http://localhost:4000/student/enrollment", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: 'Failed to parse error response' }));
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        let codes = [];
        if (data && Array.isArray(data.data)) {
            codes = data.data.map(item => item.course_code);
        } else if (Array.isArray(data)) {
            codes = data.map(item => item.course_code);
        } else {
            throw new Error("Invalid data format received for enrolled courses.");
        }
        setEnrolledCourseCodes(codes);
      } catch (err) {
        console.error("Error fetching enrolled courses:", err);
      }
    };
    fetchEnrolledCourses();
  }, []);

  const handleChange = e => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      courses: checked
        ? [...prev.courses, value]
        : prev.courses.filter(c => c !== value)
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (formData.courses.length === 0) {
      props.Setalert({mssg:"Please select at least one course.", result:"warning"});
      setTimeout(() => {
        props.Setalert(null);
      }, 2000); 
      return;
    }
    if (!token) {
      props.Setalert({mssg:"Authorization token not found. Please log in.", result:"danger"});
      setTimeout(() => {
        props.Setalert(null);
      }, 2000); 
      return;
    }
    try {
      const enrollmentPromises = formData.courses.map(async (courseCode) => {
        const response = await fetch("http://localhost:4000/student/enrollment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ course_code: courseCode })
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({ message: `Failed to parse error for ${courseCode}` }));
          throw new Error(errorData.message || `Failed to enroll in ${courseCode}. Status: ${response.status}`);
        }
        return response.json();
      });
      await Promise.all(enrollmentPromises);
      
      // Update enrolled courses state directly after successful enrollment
      setEnrolledCourseCodes(prevCodes => [...prevCodes, ...formData.courses]);
      
      // Clear the form and show success message
      setFormData(prev => ({ ...prev, courses: [] }));
      props.Setalert({mssg:"Courses enrolled successfully!",result:"success"});
      setTimeout(() => {
        props.Setalert(null);
      }, 2000); 
    } catch (err) {
      console.error("Enrollment failed:", err);
      props.Setalert({mssg:`Error during enrollment: ${err.message}`,result:"danger"});
      setTimeout(() => {
        props.Setalert(null);
      }, 2000); 
    }
  };

  const removeCourse = async (course_code) => {
    if (!window.confirm(`Are you sure you want to drop ${course_code}?`)) {
      return;
    }
    if (!token) {
      props.Setalert({mssg:"Authorization token not found. Please log in.",result:"danger"});
      setTimeout(() => {
        props.Setalert(null);
      }, 2000); 
      return;
    }
    try {
      const response = await fetch("http://localhost:4000/student/enrollment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ course_code })
      });
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ message: `Failed to parse error for ${course_code}` }));
        throw new Error(errorData.message || `Failed to drop course ${course_code}. Status: ${response.status}`);
      }
      await response.json();
      setEnrolledCourseCodes(prevCodes => prevCodes.filter(code => code !== course_code));
      props.Setalert({mssg:`Course ${course_code} dropped successfully!`,result:"success"});
      setTimeout(() => {
        props.Setalert(null);
      }, 2000); 
    } catch (err) {
      console.error("Error removing course:", err);
      props.Setalert({mssg:`Error dropping course: ${err.message}`,result:"danger"});
      setTimeout(() => {
        props.Setalert(null);
      }, 2000); 
    }
  };

  return (
    <div className="m">
      <main style={{ marginLeft: window.innerWidth < 768 ? "2.5rem" : "11.5rem" }}>
        <div className="enroll">
          <h1>Course Enrollment</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <h2>Select Courses</h2>
            <div className="course">
              {loading ? (
                <p>Loading available courses...</p>
              ) : error ? (
                <p className="error-message" style={{ color: 'red' }}>{error}</p>
              ) : available.length > 0 ? (
                available.map(c => (
                  <div key={c.course_code} className="check">
                    <input
                      type="checkbox"
                      name="courses"
                      value={c.course_code}
                      id={`course-${c.course_code}`}
                      checked={formData.courses.includes(c.course_code)}
                      onChange={handleChange}
                    />
                    <label htmlFor={`course-${c.course_code}`}>{c.course_name}{c.course_code}</label>
                  </div>
                ))
              ) : (
                <p>No available courses to display.</p>
              )}
            </div>
            <button type="submit" className="your-button-styles">Enroll Now</button>
          </form>

          <h2>Enrolled Courses</h2>
          <ul>
            {enrolledCoursesWithDetails.length > 0 ? (
              enrolledCoursesWithDetails.map(c => (
                <li key={c.course_code}>
                  {c.course_name} ({c.course_code})
                  <button onClick={() => removeCourse(c.course_code)}>Remove</button>
                </li>
              ))
            ) : (
              <p>No courses currently enrolled.</p>
            )}
          </ul>
        </div>
      </main>
    </div>
  );
}