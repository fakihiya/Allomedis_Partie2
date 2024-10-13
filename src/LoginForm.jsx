import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./UserContext";  

const LoginForm = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUserEmail } = useUser();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/users/login",
        {
          email,
          password,
        }
      );

      const data = response.data;
      if (response.status === 200) {
        localStorage.setItem('token',data.token)

        const {message} = response.data;
        if(message === 'OTP sent to your email'){
          setUserEmail(email); 
          toast.success("OTP sent! Please check your email.");
          setTimeout(() => {
                      navigate("/otp"); 
                }, 1000);

        }
        else{
          toast.success("Login successful!");
            setTimeout(() => {
              navigate("/home"); 
            }, 1000);
        }
      
      
      } else {
        toast.error("Login failed.");
      }
    } catch (error) {
      toast.error("Login failed.");
      console.error("Login error:", error);
    }
  };

  return (
    <div>
      <div className="font-[sans-serif] bg-white flex items-center justify-center md:h-screen p-4">
        <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg rounded-md p-6">
          <div className="grid md:grid-cols-2 items-center gap-8">
            <div className="max-md:order-1 lg:min-w-[450px]">
              <img
                src="https://readymadeui.com/signin-image.webp"
                className="lg:w-11/12 w-full object-cover"
                alt="login-image"
              />
            </div>

            <form className="md:max-w-md w-full mx-auto" onSubmit={handleLogin}>
              <div className="mb-12">
                <h3 className="text-4xl font-extrabold text-[#007F81]">
                  Sign in
                </h3>
              </div>

              <div>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter email"
                  />
                </div>
              </div>

              <div className="mt-8">
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-blue-600 px-2 py-3 outline-none"
                    placeholder="Enter password"
                  />
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-[#007F81] focus:ring-[#007F81] border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="text-gray-800 ml-3 block text-sm"
                  >
                    Remember me
                  </label>
                </div>
                <div>
                  <button
                   onClick={() => navigate('/forgot-password')}
                    className="text-[#007F81] font-semibold text-sm hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              <div className="mt-12">
                <button
                  type="submit"
                  className="w-full mt-8 py-3 text-lg text-white rounded-md border-none bg-[#007F81] font-semibold shadow-md"
                >
                  Sign in
                </button>
                {/* Toast Container */}
                <ToastContainer position="top-right" autoClose={5000} />
                <p className="text-gray-800 text-sm text-center mt-6">
                  Dont have an account?
                  <button
                    onClick={() => navigate("/registration-form")}
                    className="text-[#007F81] font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Register here
                  </button>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
