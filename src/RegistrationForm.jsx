import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState(""); // Username state
  const [password, setPassword] = useState(""); // Password state
  const [passwordStrength, setPasswordStrength] = useState(0); // Password strength state
  const [email, setEmail] = useState(""); // Email state
  const [message, setMessage] = useState(""); // Message state
  const [isEmailValid, setIsEmailValid] = useState(false); // Email validation state

  // Password validation
  const checkPasswordStrength = (pass) => {
    let strength = 0;
    if (pass.length > 8) strength += 20;
    if (pass.match(/[a-z]+/)) strength += 20;
    if (pass.match(/[A-Z]+/)) strength += 20;
    if (pass.match(/[0-9]+/)) strength += 20;
    if (pass.match(/[$@#&!]+/)) strength += 20;
    setPasswordStrength(strength);
    setPassword(pass);
  };

  // Email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(value));
  };

  // Handle Registration
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !isEmailValid) {
      setMessage("Please enter your info correctly.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        username,
        email,
        password,
      });

      if (response.status === 201) {
        setMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login-form");
        }, 2000); // Redirect after 2 seconds
      } else {
        setMessage(response.data.message || "Registration failed.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Error connecting to the server.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="font-[sans-serif] bg-white md:h-screen">
      <div className="grid md:grid-cols-2 items-center gap-8 h-full">
        {/* Left Image Section */}
        <div className="max-md:order-1 p-4">
          <img
            src="https://readymadeui.com/signin-image.webp"
            className="lg:max-w-[85%] w-full h-full object-contain block mx-auto"
            alt="login-image"
          />
        </div>

        {/* Form Section */}
        <div className="flex items-center md:p-8 p-6 bg-[#0C172C] h-full lg:w-11/12 lg:ml-auto">
          <form className="max-w-lg w-full mx-auto" onSubmit={handleRegistration}>
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">Register</h3>
            </div>

            {/* Username Input */}
            <div className="mt-8">
              <label className="text-white text-xs font-bold block mb-2">Username</label>
              <input
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none border-gray-300 rounded-md"
                placeholder="Enter username"
              />
            </div>

            {/* Email Input */}
            <div className="mt-8">
              <label className="text-white text-xs font-bold block mb-2">Email</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
                className={`w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none ${isEmailValid ? "border-green-500" : "border-gray-300"} rounded-md`}
                placeholder="Enter email"
              />
              <p className={`text-xs font-bold mt-2 ${isEmailValid ? "text-green-500" : "text-gray-300"}`}>
                {isEmailValid ? "Valid Email" : ""}
              </p>
            </div>

            {/* Password Input */}
            <div className="mt-8">
              <label className="text-white text-xs font-bold block mb-2">Password</label>
              <input
                name="password"
                type="password"
                value={password}
                onChange={(e) => checkPasswordStrength(e.target.value)} // Call password strength check
                required
                className="w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none border-gray-300 rounded-md"
                placeholder="Enter password"
              />
              <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength <= 40
                      ? "bg-red-500"
                      : passwordStrength <= 80
                      ? "bg-yellow-400"
                      : "bg-green-500"
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-8 py-3 text-lg text-white rounded-md border-none bg-yellow-400 font-semibold shadow-md"
            >
              Register
            </button>

            <p className="text-white text-sm text-center mt-6">Don't have an account?
            <button onClick={()=> navigate('/Login-form')}
                    className="text-yellow-400 font-semibold hover:underline ml-1 whitespace-nowrap"
            >
            Login here
            </button>
            </p>

            {/* Message Display */}
            {message && (
              <div className={`mt-4 text-center ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
                <p>{message}</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
