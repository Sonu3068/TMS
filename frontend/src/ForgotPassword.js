import React from 'react';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  return (
    <div className="forgot-password">
      <h1>Forgot Password</h1>
      <p>Enter your email to reset your password:</p>
      <form>
        <input type="email" placeholder="Enter your email" required />
        <button type="submit">Submit</button>
      </form>
      <p>
        Back to <Link to="/Userportal/Login">Login</Link>
      </p>
    </div>
  );
}