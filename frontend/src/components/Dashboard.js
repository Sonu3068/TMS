import React from "react";
import "./Dashboard.css";

export default function Dashboard(props) {
  const pastCourses = [
    { title: "Course1-title", code: "Course1-code" },
    { title: "Course2-title", code: "Course2-code" },
    { title: "Course3-title", code: "Course3-code" },
    { title: "Course4-title", code: "Course4-code" },
    { title: "Course5-title", code: "Course5-code" },
  ];

  return (
    <div className="main-content">
      <main
        style={{
        marginLeft: window.innerWidth<768? "3rem" : "0rem",
        }}
      >
        <h1 className="ml-2">Dashboard</h1>
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <div className="dashboard-section total">
            <h3>Total Courses</h3>
            <p>07</p>
          </div>
          <div className="dashboard-section attendance">
            <h3>Attendance</h3>
            <p>60%</p>
            <p>24% Absent</p>
          </div>
        </div>

        <div className="dashboard-section past">
          <h3>Past Classes</h3>
          <div className="cou">
          <div className="d-flex flex-column " aria-label="Size 3 select example">
            {pastCourses.map((course, index) => (
              <div key={index} className="class-item">
                <p>{course.title}</p>
                <p className="code">{course.code}</p>
              </div>
            ))}
          </div>
        </div></div>
      </main>
    </div>
  );
}