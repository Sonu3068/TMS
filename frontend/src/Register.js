import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Register(props) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: '',
    role: 'student',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:4000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 409) {
          throw new Error('User already exists. Try logging in.');
        }
        throw new Error(errorData.error || `HTTP error ${response.status}`);
      }

      await response.json();
      setFormData({ email: '', username: '', password: '', role: 'student' });
      navigate('/Userportal/Login');
    } catch (err) {
      props.Setalert(err.message);
     setTimeout(() => {
      props.Setalert(null);
     }, 2000); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register r">
      <div className="right">
        <h1>Register Here</h1>
        {error && (
          <p className="error">
            {error}
            {error.includes('already exists') && (
              <>
            
                <Link to="/Userportal/Login">Log in here</Link>.
              </>
            )}
          </p>
        )}
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
            <i className="fa-solid fa-circle-user"></i>
            <input
              type="username"
              name="username"
              placeholder="Please Enter your Username"
              value={formData.username}
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
          <p>
            <i className="fa-solid fa-user-tag"></i>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="student">Student</option>
              <option value="professor">Professor</option>
              <option value="admin">Admin</option>
            </select>
          </p>
          <button type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Submit'}
          </button>
          <p>
            Have an account?{' '}
            <Link to="/Userportal/Login" className="reg">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}