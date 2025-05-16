// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold text-blue-600">NeedMeet</h1>
      <ul className="flex gap-6 text-gray-700">
        <li className="hover:text-blue-500 cursor-pointer">
          <Link to="/">Home</Link> {/* Home page link */}
        </li>
        <li className="hover:text-blue-500 cursor-pointer">
          <Link to="/services">Services</Link> {/* Services page link */}
        </li>
        <li className="hover:text-blue-500 cursor-pointer">
          <Link to="/login">Login</Link> {/* Login page link */}
        </li>
        <li className="hover:text-blue-500 cursor-pointer">
          <Link to="/signup">Signup</Link> {/* Signup page link */}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
