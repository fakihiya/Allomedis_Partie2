import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "./UserContext";


const emailverification = () =>{
    const navigate = useNavigate();
    const {token} = useParams();
    const [message, SetMessage] = useState*
}