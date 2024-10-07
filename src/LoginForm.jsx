import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setMessage("Please enter your email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/login", {
        email,
        password,
      });
      if (response.status === 200) {
        navigate("/otp"); // Redirect to OTP page on successful login
      } else {
        setMessage(response.data.message || "Login failed.");
      }
    } catch (error) {
      setMessage("Error connecting to the server.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      {/* Your login form structure goes here */}
      <form onSubmit={handleLogin}>
        {/* Email and Password fields */}
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <button type="submit">Login</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
};

export default LoginForm;
