import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
//   const navigate = useNavigate();
  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/api/forgot-password", {
        email,
      });
      console.log(res);
      toast.success("Password reset link sent to your email");
      
    } catch (error) {
      toast.error("Failed to send reset link. Please try again.",error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-[#96adad]  p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>
        <form onSubmit={handleForgotPassword} className="space-y-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#007F81] text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Send Reset Link
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ForgotPassword;
