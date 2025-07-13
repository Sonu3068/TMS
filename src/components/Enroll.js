import React from "react";
import "./Enroll.css";

export default function Enroll(props) {
  const [formData, setFormData] = React.useState({
    fullname: "",
    email: "",
    courses: [], // Changed to array to handle multiple selections
  });

  const courseOptions = [
    { id: "maths-calculus-1", label: "Maths-calculus-1" },
    { id: "maths-differentiation-1", label: "Maths-Differentiation-1" },
    { id: "physics", label: "Physics" },
    { id: "chemistry", label: "Chemistry" },
    { id: "electronics", label: "Electronics" },
    { id: "manufacturing", label: "Manufacturing" },
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        courses: checked
          ? [...prev.courses, value]
          : prev.courses.filter((course) => course !== value),
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.fullname && formData.email && formData.courses.length > 0) {
      console.log("Form submitted:", formData);
      setFormData({ fullname: "", email: "", courses: [] });
    }
  };

  return (
    <div className="m">
      <main
        
        style={{
          marginLeft:window.innerWidth < 768
              ? "2.5rem"
              : "11.5rem"
          
        }}
      >
        <div className="enroll">
          <h1>Course Enrollment</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="enter">
              <label >Full Name</label>
               <input
                type="fullname"
                name="fullname"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            <div  className="enter">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </div>
            
              <h1 className="ml-0">Select Course</h1>
            <div className="course">  
              {courseOptions.map((course) => (
                <div key={course.id} className="check">
                  <input
                    className="input"
                    type="checkbox"
                    name="courses"
                    value={course.id}
                    id={course.id}
                    checked={formData.courses.includes(course.id)}
                    onChange={handleChange}
                  />
                  <label className="form-check-label" htmlFor={course.id}>
                    {course.label}
                  </label>
                </div>
              ))}
            </div>
            <button
              type="submit"
              className="w-full p-2 sm:p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 text-sm sm:text-base"
            >
              Enroll Now
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}