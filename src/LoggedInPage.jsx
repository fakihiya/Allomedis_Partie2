import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUser } from "./UserContext";  

const LoggedInPage = () => {
  const navigate = useNavigate();
  const [otpcode, setOtp] = useState("");  // Update initial state to empty string
  const [message, setMessage] = useState("");
  const { userEmail, setUserEmail } = useUser();  // Destructure userEmail from context

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    console.log('User email from context:', userEmail);  // Log the user's email from context
    console.log('OTP code:', otpcode); 

    try {
      const res = await axios.post("http://localhost:3000/api/users/verify-otp",
        {
          email: userEmail,  // Include the user email in the request body
          otp: otpcode       // Send the OTP code as a separate field
        }
      );

      if (res.status === 200) {
        setUserEmail(userEmail);  // Use the existing email value in context (if necessary)
        toast.success("OTP verified successfully");
        navigate('/');  // Navigate to the home page or any other page after successful OTP verification
      } else if (res.status === 400) {
        toast.info("Invalid or expired OTP");
        setMessage("Invalid OTP or expired. Please try again.");
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please check your code or try again.");
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="w-full max-w-md bg-[#007F81] rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Verify Your OTP</h1>
        <form onSubmit={handleOtpSubmit} className="space-y-4">
          <input
            type="text"
            value={otpcode}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#2a4ba7] text-white py-2 rounded-md hover:bg-[#171758] transition duration-300"
          >
            Submit OTP
          </button>
        </form>
        <ToastContainer />   
        {message && (
          <p className="mt-4 text-green-500 text-center font-semibold">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default LoggedInPage;
