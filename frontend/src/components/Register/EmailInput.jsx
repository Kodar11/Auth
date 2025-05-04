import React, { useState } from 'react';
import api from '../../../utils/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';


function EmailInput() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      const res = await axios.post('http://localhost:8000/api/v1/users/send-otp', { email });
      if (res.data.success) {
        toast.success('OTP sent to your email');
        navigate('/verify-otp', { state: { email } });
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('Error sending OTP');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="max-w-md w-full p-6 border border-gray-200 rounded-lg shadow bg-white">
        <h2 className="text-2xl font-semibold text-center mb-4">Enter your email</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError('');
            }}
            required
            placeholder="Email"
            className="p-2 mb-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-red-500 text-center mb-3">{error}</p>}
          <button type="submit" className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200">
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
}

export default EmailInput;
