import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersByServiceType } from '../store/slice/providerSlice';
import ProviderList from '../components/ProviderList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Electrician = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector(state => state.provider);
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.error('Please login to access this page');
    } else {
      dispatch(fetchProvidersByServiceType('electrician'));
    }
  }, [dispatch]);

  const handleBookNowClick = (provider) => {
    navigate('/booking-form', { state: { providerId: provider._id, serviceType: 'electrician' } });
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="electrician-service-page">
        <div className="hero-section bg-blue-50 py-16 px-4 text-center">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">Expert Electrical Services</h1>
          <p className="text-xl text-gray-600 mb-8">Book skilled electricians for all your electrical needs</p>
        </div>

        <div className="services-section py-16 px-4 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Electrical Services</h2>
          <ProviderList providers={providers} onBookNow={handleBookNowClick} />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Electrical Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Licensed Electricians</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Quality Equipment</h3>
              <p className="text-gray-600">We use high-grade electrical components</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock emergency assistance</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-12 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Need Electrical Services?</h2>
        <p className="text-xl mb-8">Get a free consultation for your electrical needs today!</p>
      </div>
    </div>
  );
};

export default Electrician;
