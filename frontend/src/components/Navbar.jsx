import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../utils/api';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogOut = async (e) => {
    try {
      await api.post(
        '/logout'
      );
    } catch (error) {
      console.error('Error completing the task:', error);
    }

    // sessionStorage.clear();
    localStorage.clear();

    // history.back();
    // history.forward();
    // window.onpopstate = function () {
    //   history.go(1);
    // };

    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
      <button
        onClick={handleLogOut}
        className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
