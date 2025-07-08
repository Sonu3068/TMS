import React from 'react';
import './Timetable.css';

const Timetable = () => {
  
   const timetableData = {
    Monday: [
      { time: '6:00-9:25', subject: 'Mathematics', room: 'Room 101' },
      { time: '9:30-11:25', subject: 'Physics', room: 'Room 102' },
    ],
    Tuesday: [
      { time: '6:00-9:25', subject: 'Chemistry', room: 'Room 103' },
      { time: '9:30-11:25', subject: 'Biology', room: 'Room 104' },
    ],
    Wednesday: [
      { time: '6:00-9:25', subject: 'English', room: 'Room 105' },
      { time: '9:30-11:25', subject: 'History', room: 'Room 106' },
    ],
    Thursday: [
      { time: '6:00-9:25', subject: 'Computer Science', room: 'Room 107' },
      { time: '9:30-11:25', subject: 'Mathematics', room: 'Room 108' },
    ],
    Friday: [
      { time: '6:00-9:25', subject: 'Physics', room: 'Room 109' },
      { time: '9:30-11:25', subject: 'Chemistry', room: 'Room 110' },
    ],
    Saturday: [
      { time: '6:00-9:25', subject: 'Biology', room: 'Room 111' },
      { time: '9:30-11:25', subject: 'English', room: 'Room 112' },
    ],
  };

  const timeSlots = [
    '6:00-9:25', '9:30-11:25', '11:25-12:25', '12:30-1:35', '1:30-2:35',
    '2:30-3:25', '3:30-4:25', '5:30-6:25',
  ];

  return (
    <div className="timetable-wrapper">
      <table className="timetable">
        <thead>
          <tr>
            <th>Day</th>
            {timeSlots.map((slot) => (
              <th key={slot}>{slot}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(timetableData).map((day) => (
            <tr key={day}>
              <td>{day}</td>
              {timeSlots.map((slot) => {
                const schedule = timetableData[day].find((item) => item.time === slot);
                return (
                  <td key={slot} className={schedule ? 'scheduled' : ''}>
                    {schedule ? `${schedule.subject}\n${schedule.room}` : ''}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default Timetable;