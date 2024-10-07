
// import './App.css'

// function App() {

//   return (
//     <>
      
//     </>
//   )
// }

// export default App


// import React from 'react';
import RegistrationForm from './RegistrationForm';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginForm from "./LoginForm"; // Ensure you have this component
import LoggedInPage from "./LoggedInPage"; // New component for OTP input

import './index.css';
function App() {
  return (
    // <div className="App">
    //   <RegistrationForm />
    // </div>
    <Router>
    <Routes>
      <Route path="/" element={<RegistrationForm />} />
      <Route path="/otp" element={<LoggedInPage />} />
      <Route path="/login-form" element={<LoginForm />} />
    </Routes>
  </Router>
  );
}

export default App;
