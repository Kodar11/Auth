import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EmailInput from './components/Register/EmailInput';
import VerifyOtp from './components/Register/VerifyOtp';
import CompleteRegistration from './components/Register/CompleteRegistration';
import Login from './components/Login';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRouter';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<EmailInput />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/complete-registration" element={<CompleteRegistration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute element={<Home />} />} />
      </Routes>
    </Router>
  );
}

export default App;
