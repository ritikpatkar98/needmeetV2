import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

export default function BookingPage() {
  const user = useSelector((state) => state.user.user);
  const userId = user?._id;

  const [formData, setFormData] = useState({
    providerId: '',
    serviceType: '',
    date: '',
    location: '',
    shareLocation: false,
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [providers, setProviders] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState('book');

  useEffect(() => {
    // Fetch providers from backend API
    const fetchProviders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/providers', { withCredentials: true });
        setProviders(response.data.providers || []);
      } catch (error) {
        console.error('Error fetching providers:', error);
      }
    };

    fetchProviders();
  }, []);

  useEffect(() => {
    // Fetch bookings for logged-in user
    if (!userId) return;

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/bookings/user/${userId}`, { withCredentials: true });
        setBookings(response.data.bookings || []);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.providerId) newErrors.providerId = 'Provider is required';
    if (!formData.serviceType) newErrors.serviceType = 'Service type is required';
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.location) newErrors.location = 'Location is required';
    return newErrors;
  }, [formData]);

  const handleBooking = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    if (!userId) {
      setErrors({ form: 'User not logged in' });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        'http://localhost:8080/api/bookings',
        {
          userId,
          providerId: formData.providerId,
          serviceType: formData.serviceType,
          date: formData.date,
          location: formData.location,
          shareLocation: formData.shareLocation,
        },
        { withCredentials: true }
      );

      const newBooking = response.data;
      // Fetch provider name from providers list
      const provider = providers.find((p) => p._id === newBooking.providerId);
      newBooking.providerName = provider ? provider.name : '';

      setBookings((prev) => [...prev, newBooking]);
      setFormData({
        providerId: '',
        serviceType: '',
        date: '',
        location: '',
        shareLocation: false,
      });
      setErrors({});
      setActiveTab('bookings');
    } catch (error) {
      console.error('Error creating booking:', error);
      setErrors({ form: error.response?.data?.message || 'Failed to create booking' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await axios.patch(
        `http://localhost:8080/api/bookings/booking/status/${bookingId}`,
        { status },
        { withCredentials: true }
      );
      setBookings((prev) =>
        prev.map((booking) => (booking._id === bookingId ? { ...booking, status } : booking))
      );
    } catch (error) {
      console.error('Error updating booking status:', error);
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await axios.delete(`http://localhost:8080/api/bookings/booking/delete/${bookingId}`, { withCredentials: true });
      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === bookingId ? { ...booking, status: 'cancelled' } : booking
        )
      );
    } catch (error) {
      console.error('Error cancelling booking:', error);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-5xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Service Booking</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex -mb-px space-x-8">
            <button
              onClick={() => setActiveTab('book')}
              className={`pb-4 px-1 ${
                activeTab === 'book'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Book a Service
            </button>
            <button
              onClick={() => setActiveTab('bookings')}
              className={`pb-4 px-1 ${
                activeTab === 'bookings'
                  ? 'border-b-2 border-blue-500 text-blue-600 font-medium'
                  : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Bookings
            </button>
          </nav>
        </div>

        {/* Book a Service Form */}
        {activeTab === 'book' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Book a Service</h2>

              {errors.form && (
                <div className="mb-4 p-4 rounded-md bg-red-50">
                  <p className="text-sm text-red-700">{errors.form}</p>
                </div>
              )}

              <form onSubmit={handleBooking} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  {/* Provider */}
                  <div>
                    <label htmlFor="providerId" className="block text-sm font-medium text-gray-700">
                      Provider
                    </label>
                    <div className="mt-1">
                      <select
                        id="providerId"
                        name="providerId"
                        value={formData.providerId}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Provider</option>
                        {providers.map((provider) => (
                          <option key={provider._id} value={provider._id}>
                            {provider.name}
                          </option>
                        ))}
                      </select>
                      {errors.providerId && (
                        <p className="mt-2 text-sm text-red-600">{errors.providerId}</p>
                      )}
                    </div>
                  </div>

                  {/* Service Type */}
                  <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">
                      Service Type
                    </label>
                    <div className="mt-1">
                      <select
                        id="serviceType"
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      >
                        <option value="">Select Service Type</option>
                        <option value="Plumber">Plumber</option>
                        <option value="Electrician">Electrician</option>
                        <option value="Cleaning">Cleaning</option>
                      </select>
                      {errors.serviceType && (
                        <p className="mt-2 text-sm text-red-600">{errors.serviceType}</p>
                      )}
                    </div>
                  </div>

                  {/* Date */}
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                      Date
                    </label>
                    <div className="mt-1">
                      <input
                        type="date"
                        name="date"
                        id="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      />
                      {errors.date && <p className="mt-2 text-sm text-red-600">{errors.date}</p>}
                    </div>
                  </div>

                  {/* Location */}
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                      Location
                    </label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="location"
                        id="location"
                        value={formData.location}
                        onChange={handleChange}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        placeholder="Enter your address"
                      />
                      {errors.location && (
                        <p className="mt-2 text-sm text-red-600">{errors.location}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Share Location */}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="shareLocation"
                      name="shareLocation"
                      type="checkbox"
                      checked={formData.shareLocation}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="shareLocation" className="font-medium text-gray-700">
                      Share my current location
                    </label>
                    <p className="text-gray-500">Use my device location for more accurate service</p>
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Book Service'
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* My Bookings */}
        {activeTab === 'bookings' && (
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <div className="px-4 py-5 sm:p-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">My Bookings</h2>

              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">You don't have any bookings yet.</p>
                  <button
                    onClick={() => setActiveTab('book')}
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Book a Service
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Provider
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Service
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {bookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{booking.providerName}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">{booking.serviceType}</div>
                            <div className="text-sm text-gray-500">{booking.location}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              {new Date(booking.date).toLocaleDateString()}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                                booking.status
                              )}`}
                            >
                              {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {booking.status === 'pending' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleCancelBooking(booking._id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                            {booking.status === 'confirmed' && (
                              <div className="flex space-x-2">
                                <button
                                  onClick={() => handleStatusUpdate(booking._id, 'completed')}
                                  className="text-green-600 hover:text-green-900"
                                >
                                  Mark Complete
                                </button>
                                <button
                                  onClick={() => handleCancelBooking(booking._id)}
                                  className="text-red-600 hover:text-red-900"
                                >
                                  Cancel
                                </button>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
