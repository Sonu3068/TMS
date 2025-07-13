import React, { useState } from "react";
import "./Edit.css";

export default function Edit() {
const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    courseCode: '',
    name: '',
    day: '',
    startTime: '',
    endTime: '',
    professor: '',
    room: '',
    period: '',
    studentYear: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [profSearch, setProfSearch] = useState('');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const periods = ['Full Semester', 'Half Semester', 'Week'];
  const professors = [
    'Dr. Smith', 'Dr. Jones', 'Prof. Brown', 'Dr. Taylor',
    'Prof. Wilson', 'Dr. Adams', 'Prof. Clark', 'Dr. Lewis'
  ];
  const studentYears = ['1st Year', '2nd Year Electrical', '2nd Year Mechanical'];

  const filteredProfessors = professors.filter(prof =>
    prof.toLowerCase().includes(profSearch.toLowerCase())
  );

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleProfSearchChange = (e) => {
    setProfSearch(e.target.value);
  };

  const handleProfSelect = (prof) => {
    setFormData({ ...formData, professor: prof });
    setProfSearch('');
  };

  const hasTimeConflict = (newCourse, existingCourses) => {
    const newStart = newCourse.startTime;
    const newEnd = newCourse.endTime;
    const newDay = newCourse.day;
    const newRoom = newCourse.room;
    const newId = newCourse.id;

    for (const course of existingCourses) {
      if (course.id === newId) continue;
      if (course.day === newDay && course.room === newRoom) {
        const existingStart = course.startTime;
        const existingEnd = course.endTime;
        if (newStart < existingEnd && newEnd > existingStart) {
          return course;
        }
      }
    }
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.courseCode || !formData.name || !formData.day || !formData.startTime ||
        !formData.endTime || !formData.professor || !formData.room || !formData.period ||
        !formData.studentYear) {
      alert('Please fill all fields');
      return;
    }

    const conflict = hasTimeConflict(formData, courses);
    if (conflict) {
      alert(`Time conflict on ${formData.day} in room ${formData.room} with course ${conflict.courseCode}: ${conflict.name}`);
      return;
    }

    if (isEditing) {
      setCourses(courses.map(course =>
        course.id === formData.id ? formData : course
      ));
      setIsEditing(false);
    } else {
      setCourses([...courses, { ...formData, id: Date.now() }]);
    }

    setFormData({
      id: null,
      courseCode: '',
      name: '',
      day: '',
      startTime: '',
      endTime: '',
      professor: '',
      room: '',
      period: '',
      studentYear: ''
    });
  };

  const handleEdit = (course) => {
    setFormData(course);
    setIsEditing(true);
  };

  const handleDelete = (id) => {
    setCourses(courses.filter(course => course.id !== id));
  };

  const filteredCourses = courses.filter(course =>
    course.courseCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.professor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{marginLeft: window.innerWidth < 768 ? "2.5rem" : "11.5rem"}}>
     <div className="container" style={{ width: window.innerWidth < 768 ? "90%" : "80%" }}>
      <h1 className="title">{isEditing ? 'Edit Course' : 'Add Course'}</h1>

      <div className="form" >
        <div className="form-grid" >
          <input
            type="text"
            name="courseCode"
            value={formData.courseCode}
            onChange={handleInputChange}
            placeholder="Course Code"
            className="input"
          />
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Course Name"
            className="input"
          />
          <select name="day" value={formData.day} onChange={handleInputChange} className="input">
            <option value="">Select Day</option>
            {days.map(day => <option key={day} value={day}>{day}</option>)}
          </select>
          <input
            type="time"
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="input"
          />
          <input
            type="time"
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="input"
          />
          <div className="dropdown">
            <input
              type="text"
              value={profSearch || formData.professor}
              onChange={handleProfSearchChange}
              placeholder="Search or Select Professor"
              className="input"
            />
            {profSearch && (
              <ul className="dropdown-list">
                {filteredProfessors.length > 0 ? (
                  filteredProfessors.map(prof => (
                    <li
                      key={prof}
                      className="dropdown-item"
                      onClick={() => handleProfSelect(prof)}
                    >
                      {prof}
                    </li>
                  ))
                ) : (
                  <li className="dropdown-item no-results">No professors found</li>
                )}
              </ul>
            )}
          </div>
          <input
            type="text"
            name="room"
            value={formData.room}
            onChange={handleInputChange}
            placeholder="Room Number"
            className="input"
          />
          <select name="period" value={formData.period} onChange={handleInputChange} className="input">
            <option value="">Select Period</option>
            {periods.map(period => <option key={period} value={period}>{period}</option>)}
          </select>
          <select name="studentYear" value={formData.studentYear} onChange={handleInputChange} className="input">
            <option value="">Select Student Year</option>
            {studentYears.map(year => <option key={year} value={year}>{year}</option>)}
          </select>
        </div>
        <button onClick={handleSubmit} className="submit-button">
          {isEditing ? 'Update' : 'Add'}
        </button>
      </div>

      <div className="search-container">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search by Code, Name, or Professor"
          className="input"
        />
      </div>

      <div className="table-container">
        <h2 className="table-title">Courses</h2>
        {filteredCourses.length === 0 ? (
          <p className="no-courses">No courses found.</p>
        ) : (
          <table className="course-table">
            <thead>
              <tr className="table-header">
                <th className="table-cell">Code</th>
                <th className="table-cell">Name</th>
                <th className="table-cell">Day</th>
                <th className="table-cell">Start</th>
                <th className="table-cell">End</th>
                <th className="table-cell">Professor</th>
                <th className="table-cell">Room</th>
                <th className="table-cell">Period</th>
                <th className="table-cell">Student Year</th>
                <th className="table-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map(course => (
                <tr key={course.id} className="table-row">
                  <td className="table-cell">{course.courseCode}</td>
                  <td className="table-cell">{course.name}</td>
                  <td className="table-cell">{course.day}</td>
                  <td className="table-cell">{course.startTime}</td>
                  <td className="table-cell">{course.endTime}</td>
                  <td className="table-cell">{course.professor}</td>
                  <td className="table-cell">{course.room}</td>
                  <td className="table-cell">{course.period}</td>
                  <td className="table-cell">{course.studentYear}</td>
                  <td className="table-cell">
                    <button onClick={() => handleEdit(course)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(course.id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div></div>
  );
};