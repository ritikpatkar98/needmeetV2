import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { userLogout } from '../store/slice/userSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    dispatch(userLogout());
  };

  // Helper function to render links based on role
  const renderLinksByRole = () => {
    if (!user) return null;

    if (user.isAdmin) {
      // Super admin links
      return (
        <>
          <Link to="/admin/dashboard" className="hover:text-blue-500 transition-colors py-2">
            Admin Dashboard
          </Link>
          <Link to="/admin/users" className="hover:text-blue-500 transition-colors py-2">
            Manage Users
          </Link>
           <Link to="/news" className="hover:text-blue-500 transition-colors py-2">
            News
          </Link>
          <Link to="/admin/providers" className="hover:text-blue-500 transition-colors py-2">
            Manage Providers
          </Link>
        </>
      );
    } else if (user.role === 'provider' ) {
      // Provider links
      return (
        <>
          <Link to="/provider/dashboard" className="hover:text-blue-500 transition-colors py-2">
            Provider Dashboard
          </Link>
          <Link to="/provider/services" className="hover:text-blue-500 transition-colors py-2">
            My Services
          </Link>
           <Link to="/news" className="hover:text-blue-500 transition-colors py-2">
            News
          </Link>
          <Link to="/provider/bookings" className="hover:text-blue-500 transition-colors py-2">
            Bookings
          </Link>
        </>
      );
    } else {
      // Regular user links
      return (
        <>
          <Link to="/" className="hover:text-blue-500 transition-colors py-2">
            Home
          </Link>
          <Link to="/services" className="hover:text-blue-500 transition-colors py-2">
            Services
          </Link>
          <Link to="/news" className="hover:text-blue-500 transition-colors py-2">
            News
          </Link>
          <Link to="/bookings" className="hover:text-blue-500 transition-colors py-2">
            My Bookings
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="bg-white shadow-md px-4 py-3">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-600">
              NeedMeet
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-gray-700 items-center">
            {isAuthenticated ? (
              <>
                {renderLinksByRole()}
                <button
                  onClick={handleLogout}
                  className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/" className="hover:text-blue-500 transition-colors py-2">
                  Home
                </Link>
                <Link to="/services" className="hover:text-blue-500 transition-colors py-2">
                  Services
                </Link>
                <Link to="/login" className="hover:text-blue-500 transition-colors py-2">
                  Login
                </Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors">
                  Signup
                </Link>
              </>
            )}
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-blue-600 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4">
            <div className="flex flex-col gap-3 text-gray-700">
              {isAuthenticated ? (
                <>
                  {renderLinksByRole()}
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-md transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/" className="hover:text-blue-500 transition-colors px-2 py-2" onClick={() => setIsMenuOpen(false)}>
                    Home
                  </Link>
                  <Link to="/services" className="hover:text-blue-500 transition-colors px-2 py-2" onClick={() => setIsMenuOpen(false)}>
                    Services
                  </Link>
                  <Link to="/login" className="hover:text-blue-500 transition-colors py-2" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                  <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition-colors" onClick={() => setIsMenuOpen(false)}>
                    Signup
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
