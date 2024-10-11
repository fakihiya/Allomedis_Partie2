import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./UserContext";

const LoggedInPage = () => {
  const navigate = useNavigate();
  const [otpcode, setOtp] = useState("");
  const { userEmail, setUserEmail } = useUser();

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        
        "http://localhost:3000/api/users/verify-otp",
        {
          email: userEmail,
          otp: otpcode,
        }
      );
      const data =  res.data;

      if (res.status === 200) {
        localStorage.setItem('token',data.token)
        setUserEmail(userEmail);
        toast.success("OTP verified successfully");
        navigate("/");
      } else if (res.status === 400) {
        toast.info("Invalid or expired OTP");
      }
    } catch (error) {
      toast.error("Error verifying OTP. Please check your code");
      console.error("OTP verification error:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9f9f9]">
      <div className="w-full max-w-md bg-[#96adad] rounded-lg shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Verify Your OTP
        </h1>
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
            className="w-full bg-[#007F81] text-white py-2 rounded-md hover:bg-[#171758] transition duration-300"
          >
            Submit OTP
          </button>
        </form>
        <ToastContainer />

        <button
          onClick={() => navigate("/registration-form")}
          className="text-black font-semibold hover:underline ml-64 whitespace-nowrap"
        >
          Resend OTP ?
        </button>
      </div>
    </div>
  );
};

export default LoggedInPage;
