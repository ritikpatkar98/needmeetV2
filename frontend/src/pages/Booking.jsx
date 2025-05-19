import React, { useState, useEffect, useCallback } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBooking,
  fetchUserBookings,
  updateBookingStatus,
  cancelBooking,
} from '../store/slice/bookingSlice';

const initialFormData = {
  providerId: '',
  serviceType: '',
  date: '',
  location: '',
  shareLocation: false,
};

const BookingPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [providers, setProviders] = useState([]);

  const userId = useSelector((state) => state.user.user?._id);
  const bookings = useSelector((state) => state.booking.bookings);
  const loading = useSelector((state) => state.booking.loading);
  const error = useSelector((state) => state.booking.error);

  useEffect(() => {
    if (location?.state) {
      const { providerId, serviceType } = location.state;
      setFormData((prev) => ({
        ...prev,
        providerId: providerId || '',
        serviceType: serviceType || '',
      }));
    }
  }, [location]);

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch('/api/providers', { credentials: 'include' });
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

  const fetchBookings = useCallback(() => {
    if (userId) {
      dispatch(fetchUserBookings(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    fetchBookings();
  }, [fetchBookings]);

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

    setIsSubmitting(true);
    try {
      await dispatch(createBooking({ ...formData, userId })).unwrap();
      fetchBookings();
      setFormData(initialFormData);
      setErrors({});
    } catch (err) {
      setErrors({ form: err?.message || 'Error creating booking' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await dispatch(updateBookingStatus(bookingId, status)).unwrap();
      fetchBookings();
    } catch (err) {
      setErrors({ form: err?.message || 'Error updating booking' });
    }
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      fetchBookings();
    } catch (err) {
      setErrors({ form: err?.message || 'Error cancelling booking' });
    }
  };

  return (
    <>
      <Helmet>
        <title>Booking Page</title>
      </Helmet>
      <div>
        <h1>Book a Service</h1>
        {errors.form && <p style={{ color: 'red' }}>{errors.form}</p>}
        <form onSubmit={handleBooking}>
          <label>
            Provider:
            <select name="providerId" value={formData.providerId} onChange={handleChange}>
              <option value="">Select Provider</option>
              {providers.map((provider) => (
                <option key={provider._id} value={provider._id}>
                  {provider.name}
                </option>
              ))}
            </select>
            {errors.providerId && <span style={{ color: 'red' }}>{errors.providerId}</span>}
          </label>
          <br />
          <label>
            Service Type:
            <select name="serviceType" value={formData.serviceType} onChange={handleChange}>
              <option value="">Select Service Type</option>
              <option value="Plumber">Plumber</option>
              <option value="Electrician">Electrician</option>
              <option value="Cleaning">Cleaning</option>
            </select>
            {errors.serviceType && <span style={{ color: 'red' }}>{errors.serviceType}</span>}
          </label>
          <br />
          <label>
            Date:
            <input type="date" name="date" value={formData.date} onChange={handleChange} />
            {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
          </label>
          <br />
          <label>
            Location:
            <input type="text" name="location" value={formData.location} onChange={handleChange} />
            {errors.location && <span style={{ color: 'red' }}>{errors.location}</span>}
          </label>
          <br />
          <label>
            Share Location:
            <input
              type="checkbox"
              name="shareLocation"
              checked={formData.shareLocation}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit" disabled={isSubmitting || loading}>
            {isSubmitting || loading ? 'Booking...' : 'Book'}
          </button>
        </form>
      </div>
    </>
  );
};

export default BookingPage;
