import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // for the success icon
const EmailVerification = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  const [message, setMessage] = useState("");
  const [isverified, setEmailVerified] = useState(false); 
  const verifyEmail = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/api/users/verify/${token}`);
      if (res.status === 200) {
        setEmailVerified(true);
        setMessage("Your email was verified. You can continue using the application.");
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      }
    } catch (error) {
      setMessage("Invalid or expired token. Verification failed.");
    }
  };
  useEffect(() => {
    verifyEmail();
  }, []);
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <div className="mb-4">
          <svg
            className="mx-auto h-16 w-16 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold mb-2">Email is Verified</h2>
        <p className="text-gray-600">
          Your email was verified. You can<br />
          continue using the application.
        </p>
      </div>
    </div>
 );
};
export default EmailVerification;