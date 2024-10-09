// import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegistrationForm from './RegistrationForm';
import LoginForm from "./LoginForm";
import LoggedInPage from "./LoggedInPage";
import { UserProvider } from "./UserContext.jsx";  // Add back the .jsx extension
import "./index.css";

function App() {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/registration-form" element={<RegistrationForm />} />
          <Route path="/otp" element={<LoggedInPage />} />
          <Route path="/login-form" element={<LoginForm />} />
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;