import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Userlogin() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(''); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/authentication/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      const data = await response.json();
      localStorage.setItem('token', data.token); // Store JWT
      localStorage.setItem('role', data.role); // Store role

      // Navigate based on role
      const rolePath = {
        student: '/Student',
        professor: '/Professor',
        admin: '/Admin',
      }[data.role];

      if (!rolePath) throw new Error('Invalid role');
      navigate(rolePath);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="right">
        <h1>Log In</h1>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <p>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="useremail"
              name="email"
              placeholder="Please Enter your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <i className="fa-solid fa-lock"></i>
            <input
              type="password"
              name="password"
              placeholder="Please Enter your Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </p>
          <button type="submit" disabled={loading}>
            {loading ? 'Logging in...' : 'Submit'}
          </button>
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