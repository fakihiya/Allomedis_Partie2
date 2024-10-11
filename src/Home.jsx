
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";


import "react-toastify/dist/ReactToastify.css";
console.log("asASDsd");

const  Home = () =>{
  const navigate = useNavigate();

  const handellogout = () =>{

    localStorage.removeItem('token');

    navigate("/login-form");

  }

return(
<div className="flex justify-center items-center min-h-screen bg-gray-100">

  <div className="bg-[#96adad]  p-8 rounded-lg shadow-lg max-w-md w-full">
    <form className="space-y-6" onSubmit={handellogout}>
      <button
        type="submit"
        className="w-full py-2 bg-[#007F81] text-black rounded-md hover:bg-blue-600 transition-colors"
      >
        Logout
      </button>
    </form>
    <ToastContainer />
  </div>
</div>
    );
};

export default Home;