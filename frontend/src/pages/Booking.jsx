import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const BookingPage = () => {
  const [formData, setFormData] = useState({
    providerId: '',
    serviceType: '',
    date: '',
    location: '',
    shareLocation: false,
  });
  const [bookings, setBookings] = useState([]);
  const [providers, setProviders] = useState([]);
  const [statusFilter, setStatusFilter] = useState('');
  const [ratingData, setRatingData] = useState({ providerId: '', rating: 0 });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Mock userId (replace with actual auth context or token)
  const userId = 'mock-user-id'; // In production, get from auth context or JWT

  // Fetch providers (mocked for simplicity)
  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('/api/providers'); // Replace with actual endpoint
        const data = await response.json();
        setProviders(data || [
          { _id: '101', name: 'Rajesh Plumbing', services: ['Plumber'] },
          { _id: '102', name: 'Sunil Electricals', services: ['Electrician'] },
          { _id: '103', name: 'Clean Home Services', services: ['Cleaning'] },
        ]);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };
    fetchProviders();
  }, []);

  // Fetch user bookings
  const fetchBookings = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/bookings/user/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Failed to fetch bookings');
      const data = await response.json();
      setBookings(data);
    } catch (error) {
      setErrors({ form: 'Error fetching bookings' });
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.providerId) newErrors.providerId = 'Provider is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    return newErrors;
  }, [formData]);

  // Handle booking submission
  const handleBooking = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ ...formData, userId }),
      });
      if (!response.ok) throw new Error('Failed to create booking');
      await fetchBookings();
      setFormData({ providerId: '', serviceType: '', date: '', location: '', shareLocation: false });
      setErrors({});
    } catch (error) {
      setErrors({ form: 'Error creating booking' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ status }),
      });
      if (!response.ok) throw new Error('Failed to update booking');
      await fetchBookings();
    } catch (error) {
      setErrors({ form: 'Error updating booking' });
    }
  };

  // Handle booking cancellation
  const handleCancel = async (bookingId) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      if (!response.ok) throw new Error('Failed to cancel booking');
      await fetchBookings();
    } catch (error) {
      setErrors({ form: 'Error cancelling booking' });
    }
  };

  // Handle rating submission
  const handleRating = async (e) => {
    e.preventDefault();
    if (!ratingData.providerId || !ratingData.rating) {
      setErrors({ rating: 'Provider and rating are required' });
      return;
    }

    try {
      const response = await fetch('/api/bookings/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ ...ratingData, userId }),
      });
      if (!response.ok) throw new Error('Failed to submit rating');
      setRatingData({ providerId: '', rating: 0 });
      setErrors({});
    } catch (error) {
      setErrors({ rating: 'Error submitting rating' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Helmet>
        <title>NeedMeet - Book a Service</title>
        <meta name="description" content="Book trusted local services with NeedMeet. View, manage, and rate your bookings." />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white py-16 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight animate-fade-in">
              Book Your Service Now
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in delay-100">
              Schedule with trusted providers in just a few clicks
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        {/* Booking Form */}
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 mb-12 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create a Booking</h2>
          {errors.form && <p className="text-red-500 text-sm mb-4 text-center">{errors.form}</p>}
          <form onSubmit={handleBooking} noValidate>
            <div className="mb-4">
              <label htmlFor="providerId" className="block text-sm font-medium text-gray-700 mb-1">Provider</label>
              <select
                id="providerId"
                name="providerId"
                value={formData.providerId}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.providerId ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              >
                <option value="">Select a provider</option>
                {providers.map((provider) => (
                  <option key={provider._id} value={provider._id}>{provider.name}</option>
                ))}
              </select>
              {errors.providerId && <p className="text-red-500 text-xs mt-1">{errors.providerId}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700 mb-1">Service Type</label>
              <select
                id="serviceType"
                name="serviceType"
                value={formData.serviceType}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.serviceType ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              >
                <option value="">Select a service</option>
                {formData.providerId &&
                  providers.find((p) => p._id === formData.providerId)?.services.map((service) => (
                    <option key={service} value={service}>{service}</option>
                  ))}
              </select>
              {errors.serviceType && <p className="text-red-500 text-xs mt-1">{errors.serviceType}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="datetime-local"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className={`w-full px-4 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
              {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter location (e.g., Delhi)"
                className={`w-full px-4 py-2 border ${errors.location ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500`}
                required
              />
              {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
            </div>
            <div className="mb-6">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="shareLocation"
                  checked={formData.shareLocation}
                  onChange={handleChange}
                  className="mr-2 h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700">Share location with provider</span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isSubmitting ? 'Booking...' : 'Book Now'}
            </button>
          </form>
        </div>

        {/* Filter and Bookings List */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-800 animate-fade-in">Your Bookings</h2>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                // Fetch filtered bookings
                fetch(`/api/bookings?status=${e.target.value}`, {
                  headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
                })
                  .then((res) => res.json())
                  .then((data) => setBookings(data))
                  .catch(() => setErrors({ form: 'Error fetching filtered bookings' }));
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="">All Bookings</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
          {isLoading ? (
            <p className="text-center text-gray-600">Loading bookings...</p>
          ) : bookings.length === 0 ? (
            <p className="text-center text-gray-600">No bookings found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition duration-300 transform hover:-translate-y-1">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">{booking.providerId?.name || 'Unknown Provider'}</h3>
                  <p className="text-sm text-gray-600 mb-1"><strong>Service:</strong> {booking.serviceType}</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Date:</strong> {new Date(booking.date).toLocaleString()}</p>
                  <p className="text-sm text-gray-600 mb-1"><strong>Location:</strong> {booking.location || 'Not provided'}</p>
                  <p className="text-sm text-gray-600 mb-4"><strong>Status:</strong> {booking.status}</p>
                  <div className="flex justify-between items-center">
                    {booking.status === 'Active' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'Completed')}
                          className="bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700 transition duration-200"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleCancel(booking._id)}
                          className="bg-red-600 text-white px-4 py-1 rounded text-sm hover:bg-red-700 transition duration-200"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                  </div>
                  {booking.status === 'Completed' && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Rate this Provider</h4>
                      <form onSubmit={handleRating}>
                        <input
                          type="hidden"
                          value={(ratingData.providerId = booking.providerId._id)}
                        />
                        <select
                          value={ratingData.rating}
                          onChange={(e) => setRatingData({ ...ratingData, rating: Number(e.target.value) })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
                        >
                          <option value="0">Select rating</option>
                          {[1, 2, 3, 4, 5].map((num) => (
                            <option key={num} value={num}>{num} Star{num > 1 ? 's' : ''}</option>
                          ))}
                        </select>
                        <button
                          type="submit"
                          className="bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700 transition duration-200"
                        >
                          Submit Rating
                        </button>
                        {errors.rating && <p className="text-red-500 text-xs mt-1">{errors.rating}</p>}
                      </form>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default BookingPage;