// src/components/ForgotPassword.jsx
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import  { useState } from "react";



const ForgotPassword = () => {

const [email, setemail] = useState("");

const handelforhotpassword = async (e) =>{

    e.preventDefault();
    try{
        const res = await axios.post("http://localhost:3000/api/forgot-password", 
            {
                email
            }
        );
        console.log(res);
        toast.success("Password reset link sent to your email");
    }
    catch(error){
        toast.error(error);

    }
};

return(

    <div>
      <h2>Forgot Password</h2>
      <form onSubmit={handelforhotpassword}>
        <input
          type="email"
          value={email}
         onChange={(e) => setemail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <button type="submit">Send Reset Link</button>
      </form>
    </div>

)
}
export default ForgotPassword;
