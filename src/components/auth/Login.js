import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: "", // Change 'username' to 'emailOrUsername'
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send a POST request to your login API with the correct data format
      const response = await fetch(
        "https://moviesearch-api.onrender.com/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData), // Send formData as JSON
        }
      );

      if (!response.ok) {
        // Check if the status code is not 200
        console.error("Login failed with status code:", response.status);
        // Handle the error (e.g., display an error message)
        // You can also decide not to redirect to the dashboard here
      } else {
        // Redirect to the dashboard for a successful login
        navigate("/dashboard");
      }
    } catch (error) {
      // Handle login error (display an error message, etc.)
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="left-side-image"></div>
      <form onSubmit={handleSubmit} className="form-login">
        <h2>Login</h2>
        <div className="form-group">
          <input
            type="text"
            id="emailOrUsername"
            name="emailOrUsername"
            value={formData.emailOrUsername}
            onChange={handleChange}
            required
            placeholder="Enter your email address"
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter your password"
          />
        </div>
        <Link to="/signup">Not Registered? Click here</Link>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
