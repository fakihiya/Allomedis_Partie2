import React, { useState } from "react";

const RegistrationForm = () => {
  const [action, setAction] = useState("Sign Up");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [username, setUsername] = useState("");
  const [usernameStrength, setUsernameStrength] = useState(0);
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);

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

  // Username validation
  const checkUsernameStrength = (value) => {
    let strength = 0;
    if (value.length >= 3) strength += 50;
    if (value.match(/[a-z]+/i)) strength += 50;
    setUsernameStrength(strength);
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    checkUsernameStrength(value);
  };

  // Email validation
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    // Check for a basic email pattern
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(value));
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
          <form className="max-w-lg w-full mx-auto">
            <div className="mb-12">
              <h3 className="text-3xl font-bold text-yellow-400">{action}</h3>
            </div>

            {action === "Sign Up" && (
              <>
                {/* Username Input */}
                <div className="mb-6">
                  <label className="block text-white font-bold mb-2">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    className={`w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none ${
                      usernameStrength === 0
                        ? "border-gray-300"
                        : usernameStrength === 50
                        ? "border-yellow-500"
                        : "border-green-500"
                    } rounded-md`}
                    placeholder="Enter username"
                  />
                  <p
                    className={`text-xs font-bold mt-2 ${
                      usernameStrength === 0
                        ? "text-gray-300"
                        : usernameStrength === 50
                        ? "text-yellow-500"
                        : "text-green-500"
                    }`}
                  >
                    {usernameStrength === 0
                      ? ""
                      : usernameStrength === 50
                      ? "Moderate Username"
                      : "Strong Username"}
                  </p>

                  
                </div>

                {/* Email Input */}
                <div className="mt-8">
                  <label className="text-white text-xs font-bold block mb-2">
                    Email
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="email"
                      type="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                      className={`w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none ${
                        isEmailValid ? "border-green-500" : "border-gray-300"
                      } rounded-md`}
                      placeholder="Enter email"
                    />
                  </div>
                  <p
                    className={`text-xs font-bold mt-2 ${
                      isEmailValid ? "text-green-500" : "text-gray-300"
                    }`}
                  >
                    {isEmailValid ? "Valid Email" : ""}
                  </p>
                </div>
              </>
            )}

            {/* Password Input */}
            <div className="mt-8">
              <label className="text-white text-xs font-bold block mb-2">
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => checkPasswordStrength(e.target.value)}
                  required
                  className={`w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none ${
                    passwordStrength === 0
                      ? "border-gray-300"
                      : passwordStrength <= 40
                      ? "border-red-500"
                      : passwordStrength <= 80
                      ? "border-yellow-400"
                      : "border-green-500"
                  } rounded-md`}
                  placeholder="Enter password"
                />
              </div>
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
              <p
                className={`mt-2 text-sm ${
                  passwordStrength >= 80 ? "text-green-400" : "text-red-400"
                }`}
              >
                {passwordStrength >= 80 ? "Strong password" : ""}
              </p>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center mt-8">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 shrink-0 rounded"
              />yy
              <label
                htmlFor="remember-me"
                className="text-white ml-3 block text-sm"
              >
                I accept the{" "}
                <a
                  href="#"
                  className="text-yellow-500 font-semibold hover:underline ml-1"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex justify-center space-x-4">
              <button
                type="button"
                className={`w-max shadow-xl py-3 px-6 text-sm font-semibold rounded-md focus:outline-none ${
                  action === "Sign Up"
                    ? "bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                    : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                }`}
                onClick={() => setAction("Sign Up")}
              >
                Sign Up
              </button>

              <button
                type="button"
                className={`w-max shadow-xl py-3 px-6 text-sm font-semibold rounded-md focus:outline-none ${
                  action === "Login"
                    ? "bg-yellow-400 text-gray-800 hover:bg-yellow-500"
                    : "bg-gray-800 text-yellow-400 hover:bg-gray-700"
                }`}
                onClick={() => setAction("Login")}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
