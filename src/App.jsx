// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from './RegistrationForm';
import LoginForm from "./LoginForm";
import LoggedInPage from "./LoggedInPage";
import { UserProvider } from "./UserContext.jsx";  
import "./index.css";
import ForgotPassword from "./ForgotPassword.jsx";
import ResetPassword from "./ResetPassword.jsx";
import  Home from "./Home.jsx";
import VerifyEmail from "./VerifyEmail.jsx";


function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/registration-form" element={<RegistrationForm />} />
          <Route path="/otp" element={<LoggedInPage />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route path="/login-form" element={<LoginForm />} />
          <Route path="/" element={<Home />} />
          <Route path="/verify-email/:token" element={<VerifyEmail />} />

        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;