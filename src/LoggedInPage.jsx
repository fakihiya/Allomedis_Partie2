import React, { useState } from "react";

const LoggedInPage = () => {
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleOtpSubmit = (e) => {
    e.preventDefault();
    // Add your OTP verification logic here
    // If successful, proceed to the next step
    setMessage("OTP submitted successfully!");
  };

  return (
    <div className="container">
      <h1>Enter OTP</h1>
      <form onSubmit={handleOtpSubmit}>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          required
        />
        <button type="submit">Submit OTP</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoggedInPage;
