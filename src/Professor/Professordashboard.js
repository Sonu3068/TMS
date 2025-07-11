import React from 'react'
import './ProfDashboard.css'

export default function Professordashboard() {
 const pastCourses = [
    { title: "Course1-title ", code: "Course1-code",Timeslot: "9:00 AM - 10:30 AM" ,Day: "Monday",room:"Room1" },
    { title: "Course2-title", code: "Course2-code", Timeslot: "10:30 AM - 12:00 PM", Day: "Tuesday", room:"Room2" },
    { title: "Course3-title", code: "Course3-code", Timeslot: "12:00 PM - 1:30 PM", Day: "Wednesday", room:"Room3" },
    { title: "Course4-title", code: "Course4-code", Timeslot: "1:30 PM - 3:00 PM",  Day: "Thursday",  room:"Room4" },
    { title: "Course5-title", code: "Course5-code" ,  Timeslot: "3:00 PM - 4:30 PM", Day: "Friday", room:"Room5" },
    { title: "Course6-title", code: "Course6-code", Timeslot: "4:30 PM - 6:00 PM", Day: "Saturday", room:"Room6" },
    { title: "Course7-title", code: "Course7-code", Timeslot: "6:00 PM - 7:30 PM", Day: "Sunday", room:"Room7" }
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
            <h3>Total polls</h3>
            <p >6</p>
           
          </div>
        </div>

        <div className="dashboard-section past">
          <h3>This week schedule</h3>
          <div className="cou">
          <div className="d-flex flex-column " aria-label="Size 3 select example">
            {pastCourses.map((course, index) => (
              <div key={index} className="class-item">
                <p>{course.title}</p>
                <p className="code">{course.code}</p>
                <p>{course.Timeslot}</p>
                <p>{course.Day}</p>
                <p>{course.room}</p>
              </div>
            ))}
          </div>
        </div></div>
      </main>
    </div>
  );
}