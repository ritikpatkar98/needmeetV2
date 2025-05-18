import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

export default function BookingPage() {
  const [formData, setFormData] = useState({
    providerId: '',
    serviceType: '',
    date: '',
    time: '',
    location: '',
    shareLocation: false,
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState('new');
  const [statusFilter, setStatusFilter] = useState('all');
  
  const dispatch = useDispatch();
  
  // Mock data for demonstration
  const userId = useSelector(state => state.user?.user?._id) || 'user123';
  const loading = useSelector(state => state.booking?.loading) || false;
  const error = useSelector(state => state.booking?.error) || null;
  
  const [providers, setProviders] = useState([
    { _id: '101', name: 'Rajesh Plumbing', services: ['Plumbing', 'Pipe Repair', 'Installation'] },
    { _id: '102', name: 'Sunil Electricals', services: ['Electrical Repair', 'Wiring', 'Installation'] },
    { _id: '103', name: 'Clean Home Services', services: ['House Cleaning', 'Office Cleaning', 'Deep Cleaning'] }
  ]);
  
  const [bookings, setBookings] = useState([
    { 
      _id: 'b1', 
      providerId: { _id: '101', name: 'Rajesh Plumbing' }, 
      serviceType: 'Pipe Repair', 
      date: '2025-05-20',
      time: '14:00',
      location: '123 Main St',
      status: 'pending',
      notes: 'Leaking pipe in kitchen'
    },
    { 
      _id: 'b2', 
      providerId: { _id: '102', name: 'Sunil Electricals' }, 
      serviceType: 'Wiring', 
      date: '2025-05-22',
      time: '10:00',
      location: '123 Main St',
      status: 'confirmed',
      notes: 'Need new wiring in bedroom'
    }
  ]);
  
  // Get services for selected provider
  const availableServices = providers.find(p => p._id === formData.providerId)?.services || [];
  
  // Fetch user bookings
  const fetchBookings = useCallback(() => {
    if (userId) {
      // In a real app, this would dispatch an action
      console.log("Fetching bookings for user:", userId);
      // dispatch(fetchUserBookings(userId));
    }
  }, [userId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Validate form
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.providerId) newErrors.providerId = 'Provider is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.time) newErrors.time = 'Time is required';
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
      // In a real app, this would dispatch an action
      console.log("Creating booking:", { ...formData, userId });
      // await dispatch(createBooking({ ...formData, userId })).unwrap();
      
      // Mock successful booking
      const newBooking = {
        _id: `b${bookings.length + 1}`,
        providerId: providers.find(p => p._id === formData.providerId),
        serviceType: formData.serviceType,
        date: formData.date,
        time: formData.time,
        location: formData.location,
        status: 'pending',
        notes: formData.notes
      };
      
      setBookings(prev => [...prev, newBooking]);
      
      // Reset form
      setFormData({
        providerId: '',
        serviceType: '',
        date: '',
        time: '',
        location: '',
        shareLocation: false,
        notes: ''
      });
      setErrors({});
      
      // Switch to bookings tab
      setActiveTab('bookings');
    } catch (err) {
      setErrors({ form: err?.message || 'Error creating booking' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = (bookingId, status) => {
    // In a real app, this would dispatch an action
    console.log("Updating booking status:", bookingId, status);
    // dispatch(updateBookingStatus(bookingId, status))
    
    // Mock update
    setBookings(prev => 
      prev.map(booking => 
        booking._id === bookingId ? { ...booking, status } : booking
      )
    );
  };

  // Handle booking cancellation
  const handleCancelBooking = (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking?')) {
      // In a real app, this would dispatch an action
      console.log("Cancelling booking:", bookingId);
      // dispatch(cancelBooking(bookingId))
      
      // Mock cancellation
      setBookings(prev => 
        prev.map(booking => 
          booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );
    }
  };
  
  // Filter bookings based on status
  const filteredBookings = statusFilter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === statusFilter);
  
  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Service Booking Portal</h1>
      
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('new')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'new'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              New Booking
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'bookings'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Your Bookings
            </button>
          </nav>
        </div>
      </div>
      
      {activeTab === 'new' ? (
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Book a Service</h2>
          <form onSubmit={handleBooking}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Provider
                </label>
                <select
                  name="providerId"
                  value={formData.providerId}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Provider</option>
                  {providers.map(provider => (
                    <option key={provider._id} value={provider._id}>
                      {provider.name}
                    </option>
                  ))}
                </select>
                {errors.providerId && <p className="text-red-500 text-sm mt-1">{errors.providerId}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Service Type
                </label>
                <select
                  name="serviceType"
                  value={formData.serviceType}
                  onChange={handleChange}
                  disabled={!formData.providerId}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Service</option>
                  {availableServices.map(service => (
                    <option key={service} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
                {errors.serviceType && <p className="text-red-500 text-sm mt-1">{errors.serviceType}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Time
                </label>
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your address"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Add any special instructions or details"
                  rows="3"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="shareLocation"
                    checked={formData.shareLocation}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-700">
                    Share my real-time location with service provider
                  </span>
                </label>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-300"
              >
                {isSubmitting || loading ? 'Processing...' : 'Book Service'}
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Your Bookings</h2>
            <div>
              <label className="text-sm font-medium text-gray-700 mr-2">Filter:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
          
          {loading ? (
            <div className="text-center py-4">Loading bookings...</div>
          ) : filteredBookings.length === 0 ? (
            <div className="text-center py-4 text-gray-500">
              {statusFilter === 'all' 
                ? 'No bookings found.' 
                : `No ${statusFilter} bookings found.`}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <div key={booking._id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-semibold text-lg">{booking.providerId.name}</h3>
                      <p className="text-gray-600">{booking.serviceType}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status]}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                    <div>
                      <p className="text-sm text-gray-500">Date & Time</p>
                      <p>
                        {new Date(booking.date).toLocaleDateString()} at {booking.time}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Location</p>
                      <p>{booking.location}</p>
                    </div>
                  </div>
                  
                  {booking.notes && (
                    <div className="mb-3">
                      <p className="text-sm text-gray-500">Notes</p>
                      <p className="text-sm">{booking.notes}</p>
                    </div>
                  )}
                  
                  <div className="flex space-x-2 mt-2">
                    {booking.status === 'pending' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="text-sm bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md"
                      >
                        Cancel
                      </button>
                    )}
                    
                    {booking.status === 'confirmed' && (
                      <>
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'completed')}
                          className="text-sm bg-green-50 text-green-700 hover:bg-green-100 px-3 py-1 rounded-md"
                        >
                          Mark Completed
                        </button>
                        <button
                          onClick={() => handleCancelBooking(booking._id)}
                          className="text-sm bg-red-50 text-red-700 hover:bg-red-100 px-3 py-1 rounded-md"
                        >
                          Cancel
                        </button>
                      </>
                    )}
                    
                    {booking.status === 'completed' && (
                      <button
                        className="text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 px-3 py-1 rounded-md"
                        onClick={() => alert('Rate and review feature coming soon!')}
                      >
                        Leave Review
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}