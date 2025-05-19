import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector, useDispatch } from 'react-redux';
import {
  createBooking,
  fetchUserBookings,
  updateBookingStatus,
  cancelBooking,
} from '../store/slice/bookingSlice';

const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { providerId, serviceType } = location.state;
      setFormData((prev) => ({
        ...prev,
        providerId: providerId || '',
        serviceType: serviceType || '',
      }));
    }
  }, [location.state]);

  const [formData, setFormData] = useState({
    providerId: '',
    serviceType: '',
    date: '',
    location: '',
    shareLocation: false,
  });
  const [statusFilter, setStatusFilter] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  // Get userId and bookings from Redux store
  const userId = useSelector((state) => state.user.user?._id);
  const bookings = useSelector((state) => state.booking.bookings);
  const loading = useSelector((state) => state.booking.loading);
  const error = useSelector((state) => state.booking.error);

  // Fetch providers (mocked for simplicity)
  const [providers, setProviders] = useState([]);
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

  // Fetch user bookings
  const fetchBookings = useCallback(() => {
    if (userId) {
      dispatch(fetchUserBookings(userId));
    }
  }, [dispatch, userId]);

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
      await dispatch(createBooking({ ...formData, userId })).unwrap();
      fetchBookings();
      setFormData({ providerId: '', serviceType: '', date: '', location: '', shareLocation: false });
      setErrors({});
    } catch (err) {
      setErrors({ form: err || 'Error creating booking' });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (bookingId, status) => {
    try {
      await dispatch(updateBookingStatus(bookingId, status)).unwrap();
      fetchBookings();
    } catch (err) {
      setErrors({ form: err || 'Error updating booking' });
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      fetchBookings();
    } catch (err) {
      setErrors({ form: err || 'Error cancelling booking' });
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
            <input
              type="text"
              name="serviceType"
              value={formData.serviceType}
              onChange={handleChange}
            />
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

        <h2>Your Bookings</h2>
        {loading && <p>Loading bookings...</p>}
        {bookings.length === 0 && !loading && <p>No bookings found.</p>}
        <ul>
          {bookings.map((booking) => (
            <li key={booking._id}>
              <p>
                Provider: {booking.providerId?.name || 'N/A'} | Service: {booking.serviceType} | Date:{' '}
                {new Date(booking.date).toLocaleDateString()} | Status: {booking.status}
              </p>
              <button onClick={() => handleStatusUpdate(booking._id, 'completed')}>
                Mark as Completed
              </button>
              <button onClick={() => handleCancelBooking(booking._id)}>Cancel Booking</button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default BookingPage;
