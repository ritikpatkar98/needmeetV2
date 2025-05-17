// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // ✅ Import HomePage
import LoginPage from './pages/LoginPage';
import SignupPage from "./pages/SignupPage";
import ServicesPage from './pages/ServicesPage';
import Plumber from './pages/Plumber';
import Electrician from './pages/Electrician';
import Cleaning from './pages/Cleaning';
import Painter from './pages/Painter';
import Carpenter from './pages/Carpenter';

import BookingPage from './pages/Booking';
import { ToastContainer } from 'react-toastify';
import Tutor from './pages/Tutor';
const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />        {/* ✅ Correct */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/services/plumber" element={<Plumber />} />
        <Route path="/services/electrician" element={<Electrician />} />
        <Route path="/services/cleaning" element={<Cleaning />} />
        <Route path="/services/painting" element={<Painter />} />
        <Route path="/services/carpenter" element={<Carpenter />} />
        <Route path="/services/Tutor" element={<Tutor />} />
        <Route path="/bookings" element={<BookingPage />} />
      </Routes>
      <ToastContainer position='top-right' />
    </Router>
  );
};

export default App;

