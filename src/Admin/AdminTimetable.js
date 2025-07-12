import React, { useState } from 'react';

import './Admintimetable.css';

export default function AdminTimetable() {
   const [selectedYear, setSelectedYear] = useState('1st Year');

  const timetableData = [
    {
      studentYear: '1st Year',
      schedule: {
        Monday: [
          { time: '6:00-9:25', subject: 'Mathematics', room: 'Room 101', professor: 'Dr. Smith' },
          { time: '9:30-11:25', subject: 'Physics', room: 'Room 102', professor: 'Dr. Jones' },
        ],
        Tuesday: [
          { time: '6:00-9:25', subject: 'Chemistry', room: 'Room 103', professor: 'Prof. Brown' },
          { time: '9:30-11:25', subject: 'Biology', room: 'Room 104', professor: 'Dr. Taylor' },
        ],
        Wednesday: [
          { time: '6:00-9:25', subject: 'English', room: 'Room 105', professor: 'Prof. Wilson' },
          { time: '9:30-11:25', subject: 'History', room: 'Room 106', professor: 'Dr. Adams' },
        ],
        Thursday: [
          { time: '6:00-9:25', subject: 'Computer Science', room: 'Room 107', professor: 'Prof. Clark' },
          { time: '9:30-11:25', subject: 'Mathematics', room: 'Room 108', professor: 'Dr. Lewis' },
        ],
        Friday: [
          { time: '6:00-9:25', subject: 'Physics', room: 'Room 109', professor: 'Dr. Jones' },
          { time: '9:30-11:25', subject: 'Chemistry', room: 'Room 110', professor: 'Prof. Brown' },
        ],
        Saturday: [
          { time: '6:00-9:25', subject: 'Biology', room: 'Room 111', professor: 'Dr. Taylor' },
          { time: '9:30-11:25', subject: 'English', room: 'Room 112', professor: 'Prof. Wilson' },
        ],
      },
    },
    {
      studentYear: '2nd Year Electrical',
      schedule: {
        Monday: [
          { time: '6:00-9:25', subject: 'Circuit Theory', room: 'Room 201', professor: 'Dr. Taylor' },
          { time: '9:30-11:25', subject: 'Electronics', room: 'Room 202', professor: 'Prof. Wilson' },
        ],
        Tuesday: [
          { time: '6:00-9:25', subject: 'Signals and Systems', room: 'Room 203', professor: 'Dr. Adams' },
          { time: '9:30-11:25', subject: 'Digital Logic', room: 'Room 204', professor: 'Prof. Clark' },
        ],
        Wednesday: [
          { time: '6:00-9:25', subject: 'Electromagnetics', room: 'Room 205', professor: 'Dr. Lewis' },
        ],
        Thursday: [
          { time: '9:30-11:25', subject: 'Control Systems', room: 'Room 206', professor: 'Dr. Smith' },
        ],
        Friday: [
          { time: '6:00-9:25', subject: 'Power Systems', room: 'Room 207', professor: 'Dr. Jones' },
        ],
        Saturday: [
          { time: '6:00-9:25', subject: 'Embedded Systems', room: 'Room 208', professor: 'Prof. Brown' },
        ],
      },
    },
    {
      studentYear: '2nd Year Mechanical',
      schedule: {
        Monday: [
          { time: '6:00-9:25', subject: 'Thermodynamics', room: 'Room 301', professor: 'Prof. Brown' },
          { time: '9:30-11:25', subject: 'Mechanics', room: 'Room 302', professor: 'Dr. Taylor' },
        ],
        Tuesday: [
          { time: '6:00-9:25', subject: 'Fluid Mechanics', room: 'Room 303', professor: 'Prof. Wilson' },
        ],
        Wednesday: [
          { time: '9:30-11:25', subject: 'Materials Science', room: 'Room 304', professor: 'Dr. Adams' },
        ],
        Thursday: [
          { time: '6:00-9:25', subject: 'Machine Design', room: 'Room 305', professor: 'Prof. Clark' },
        ],
        Friday: [
          { time: '9:30-11:25', subject: 'Manufacturing', room: 'Room 306', professor: 'Dr. Lewis' },
        ],
        Saturday: [
          { time: '6:00-9:25', subject: 'Dynamics', room: 'Room 307', professor: 'Dr. Smith' },
        ],
      },
    },
  ];

  const timeSlots = [
    '6:00-9:25', '9:30-11:25', '11:25-12:25', '12:30-1:35', '1:30-2:35',
    '2:30-3:25', '3:30-4:25', '5:30-6:25',
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const selectedTimetable = timetableData.find(t => t.studentYear === selectedYear)?.schedule || {};

  return (
    <div style={{backgroundColor: "#2bacfd3c",height: "93.475vh",}}>
    <div className="timetable-container"style={{marginLeft:window.innerWidth < 768 ? "3rem" : "3rem",textAlign: "center"}}>
      <select
      style={{width: "90%", padding: "10px", fontSize: "16px",backgroundColor: "#ffffff", border: "1px solid #1500fe", borderRadius: "4px",boxShadow: " 4px 4px 4px 4px rgba(97, 35, 241, 0.1)"}}
        value={selectedYear}
        onChange={(e) => setSelectedYear(e.target.value)}
        className="year-select"
      >
        {timetableData.map(t => (
          <option key={t.studentYear} value={t.studentYear}>{t.studentYear}</option>
        ))}
      </select>
      <div className="timetable-wrapper">
        <table className="timetable">
          <thead>
            <tr>
              <th>Day</th>
              {timeSlots.map(slot => (
                <th key={slot}>{slot}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {days.map(day => (
              <tr key={day}>
                <td>{day}</td>
                {timeSlots.map(slot => {
                  const schedule = selectedTimetable[day]?.find(item => item.time === slot);
                  return (
                    <td key={slot} className={schedule ? 'scheduled' : ''}>
                      {schedule ? `${schedule.subject}\n${schedule.room}\n${schedule.professor}` : ''}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div></div>
  );
}