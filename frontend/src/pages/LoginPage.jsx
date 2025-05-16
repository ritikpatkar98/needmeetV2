// src/pages/LoginPage.jsx
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log('Login:', { email, password });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <div className="bg-white shadow-lg rounded-lg p-10 w-full max-w-md transform transition-all duration-300 hover:scale-[1.02]">
        <div className="text-center mb-6">
          <img
            src="/logo192.png"
            alt="Login "
            className="w-16 h-16 mx-auto mb-2"
          />
          <h2 className="text-3xl font-extrabold text-blue-700">Welcome Back</h2>
          <p className="text-gray-500 text-sm mt-1">Please login to your account</p>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <div className="flex justify-between items-center mb-4 text-sm">
            <label className="text-gray-600">
              <input type="checkbox" className="mr-1" /> Remember me
            </label>
            <a href="#" className="text-blue-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Login
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don’t have an account?{' '}
          <a href="#" className="text-blue-600 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
