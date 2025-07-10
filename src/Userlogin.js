import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';


export default function Userlogin() {
  const [formData, setFormData] = useState({ useremail: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic (e.g., API call)
    console.log('Login:', formData);
    navigate('/Proffessor');
  };

  return (
    <div className="login">
      <div className="right">
        <h1>Log In</h1>
        <form onSubmit={handleSubmit}>
          <p className="d-flex justify-content-between align-items-center gap-2">
            <i className="fa-solid fa-circle-user"></i>
            <input
              type="useremail"
              name="useremail"
              placeholder="Please Enter your mail Id"
              value={formData.useremail}
              onChange={handleChange}
              required
            />
          </p>
          <p className="d-flex justify-content-between align-items-center gap-2">
            <i className="fa-solid fa-envelope"></i>
            <input
              type="password"
              name="password"
              placeholder="Please Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </p>
          <button type="submit">Submit</button>
          <br />
          <Link to="/forgot-password" className="fg">
            Forgot password
          </Link>
          <p>
            Don't have an account?{' '}
            <Link to="/Userportal/Register" className="reg">
              Register
            </Link>
          </p>
        </form>
      </div>
      
    </div>
  );
}