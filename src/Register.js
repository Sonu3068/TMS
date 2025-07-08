import React, { useState } from "react";
import { Link } from "react-router-dom";
 // Assuming you have a CSS file for styling

export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your submission logic here (e.g., API call)
    setFormData({ email: "", username: "", password: "" }); // Reset form
  };

  return (
    <div className="register active">
      <div className="right">
        <h1>Register Here</h1>
        <form onSubmit={handleSubmit}>
          <p>
            <i className="fa-solid fa-envelope"></i>
            <input
              type="email"
              name="email"
              placeholder="Please Enter your mail Id"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </p>
          <p>
            <i className="fa-solid fa-circle-user"></i>
            <input
              type="text" // Changed from "username" to "text" as "username" is not a valid input type
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
          <button type="submit">Submit</button>
          <p>
            Have an account?
            <Link to="/Userportal/Login" className="reg">
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}