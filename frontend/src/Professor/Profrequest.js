import React,{useState} from 'react'
import './Profrequest.css';

export default function Profrequest() {
  const [formData, setFormData] = useState({
    professorName: '',
    courseName: '',
    currentSlot: '',
    requestedSlot: '',
    reason: '',
  });
  const [status, setStatus] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    if (!formData.professorName || !formData.courseName || !formData.currentSlot || !formData.requestedSlot || !formData.reason) {
      setStatus('Please fill out all fields.');
      return;
    }
    // Simulate sending request to admin (replace with API call)
    console.log('Submitting request:', formData);
    setStatus('Request submitted successfully!');
    setFormData({
      professorName: '',
      courseName: '',
      currentSlot: '',
      requestedSlot: '',
      reason: '',
    });
    setTimeout(() => setStatus(''), 3000);
  };

  const InputField = ({ label, name, value, onChange, placeholder }) => (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input-field"
      />
    </div>
  );

  const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
    <div className="input-group">
      <label className="input-label">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows="4"
        className="textarea-field"
      />
    </div>
  );

  return (
    <div  >
    <div className="page-container" style={{ marginLeft: "2.5rem" }}>
      <div className="form-container">
        <h2 className="form-title">
          Professor Course Time/Slot Change Request
        </h2>
        {status && (
          <div className={`status-message ${status.includes('successfully') ? 'status-success' : 'status-error'}`}>
            {status}
          </div>
        )}
        <div className="form-content">
          <InputField
            label="Professor Name"
            name="professorName"
            value={formData.professorName}
            onChange={handleInputChange}
            placeholder="Enter your full name"
          />
          <InputField
            label="Course Name"
            name="courseName"
            value={formData.courseName}
            onChange={handleInputChange}
            placeholder="Enter course name"
          />
          <InputField
            label="Current Time Slot"
            name="currentSlot"
            value={formData.currentSlot}
            onChange={handleInputChange}
            placeholder="e.g., Monday 10:00 AM - 11:00 AM"
          />
          <InputField
            label="Requested Time Slot"
            name="requestedSlot"
            value={formData.requestedSlot}
            onChange={handleInputChange}
            placeholder="e.g., Tuesday 2:00 PM - 3:00 PM"
          />
          <TextAreaField
            label="Reason for Change"
            name="reason"
            value={formData.reason}
            onChange={handleInputChange}
            placeholder="Explain why you need this change"
          />
          <button
            onClick={handleSubmit}
            className="submit-button"
          >
            Submit Request
          </button>
        </div>
      </div>
    </div></div>
  );
}
