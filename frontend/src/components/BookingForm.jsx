import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../store/slice/bookingSlice';
import { useNavigate, useLocation } from 'react-router-dom';

const BookingForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useSelector(state => state.user.user?._id);

  // Get providerId and serviceType from location state
  const { providerId, serviceType } = location.state || {};

  const [date, setDate] = useState('');
  const [locationInput, setLocationInput] = useState('');
  const [shareLocation, setShareLocation] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!date) {
      setError('Please select a date for the booking');
      return;
    }
    if (!providerId || !serviceType) {
      setError('Invalid provider or service type');
      return;
    }
    const bookingData = {
      userId,
      providerId,
      serviceType,
      date,
      location: locationInput,
      shareLocation,
    };
    try {
      await dispatch(createBooking(bookingData)).unwrap();
      navigate('/bookings');
    } catch (err) {
      setError(err.message || 'Failed to create booking');
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Book Service</h2>
      {error && <p className="text-red-600 mb-2">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Service Type</label>
          <input type="text" value={serviceType || ''} disabled className="w-full border px-3 py-2 rounded" />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Location (optional)</label>
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Enter location"
          />
        </div>
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={shareLocation}
            onChange={() => setShareLocation(!shareLocation)}
            id="shareLocation"
            className="mr-2"
          />
          <label htmlFor="shareLocation">Share my location with provider</label>
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
