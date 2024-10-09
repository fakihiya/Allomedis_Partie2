import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const RegistrationForm = () => {
  const navigate = useNavigate();

  

  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState(""); 
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [email, setEmail] = useState(""); 
  // const [message, setMessage] = useState(""); // Message state
  const [isEmailValid, setIsEmailValid] = useState(false); 

const buttonisdisbled = 
  username == ""|| 
    password == ""|| email == "";
  

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

 
  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsEmailValid(emailPattern.test(value));
  };

 
  const handleRegistration = async (e) => {
    e.preventDefault();

    if (!username || !email || !password || !isEmailValid) {
      toast.info("Please enter your info");        

      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/register", {
        username,
        email,
        password,
      });
      

      if (response.status === 201) {
        toast.success("Registration successful! Virify You Email");        
        setTimeout(() => {
          navigate("/login-form");
        }, 2000); 
      } else {
        toast.error(response.data.message || "Registration failed.");
      }
    } catch (error) {
      toast.error("Error connecting to the server");        
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
              <h3 className="text-3xl font-bold text-[#007F81]">Register</h3>
            </div>

            {/* Username Input */}
            <div className="mt-8">
              <label className="text-white text-xs font-bold block mb-2" >Username</label>
              
              <input 
                name="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={`w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none ${username ? "border-[#007F81]" :  "border-gray-300"} rounded-md"`}
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
                className={`w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none ${isEmailValid ? "border-[#007F81]" : "border-gray-300"} rounded-md`}
                placeholder="Enter email"
              />
              <p className={`text-xs font-bold mt-2 ${isEmailValid ? "text-[#007F81]" : "text-gray-300"}`}>
                
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
                className={`w-full text-sm bg-transparent text-white border-2 px-2 py-3 outline-none ${password ? "border-[#007F81]" : "border-gray-300"}  rounded-md`}
                placeholder="Enter password"
              />
              <div className="w-full bg-gray-300 rounded-full h-2 mt-4">
                <div
                  className={`h-2 rounded-full ${
                    passwordStrength <= 40
                      ? "bg-red-500"
                      : passwordStrength <= 80
                      ? "bg-yellow-400"
                      : "bg-[#007F81]"
                  }`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>

            {/* Submit Button */}
            <button
            disabled = {buttonisdisbled}

              type="submit"
              className={`w-full mt-8 py-3   rounded-md border-none shadow-md ${
                buttonisdisbled ? "bg-[#007f819c] text-gray-400"  : "bg-[#007F81] text-white text-lg font-semibold "
              }`}
              
            >
              Register
            </button>
                  
            {/* Toast Container */}
            <ToastContainer />

            <p className="text-white text-sm text-center mt-6">Dont have an account?
            <button onClick={()=> navigate('/Login-form')}
                    className="text-[#007F81] font-semibold hover:underline ml-1 whitespace-nowrap"
            >
            Login here
            </button>
            </p>

       
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;

