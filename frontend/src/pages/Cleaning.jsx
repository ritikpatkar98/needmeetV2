import React, { useEffect } from 'react';
import { FaBroom, FaShower, FaHome, FaBuilding, FaStar, FaCheck, FaClock, FaShieldAlt } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersByServiceType } from '../store/slice/providerSlice';
import ProviderList from '../components/ProviderList';

const Cleaning = () => {

  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector(state => state.provider);
  useEffect(() => {
    dispatch(fetchProvidersByServiceType('electrician'));
  }, [dispatch]);

  return (
    <div className="cleaning-service-page">
      {/* Hero Section */}
      <div className="hero-section bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Professional Cleaning Services</h1>
        <p className="text-xl text-gray-600 mb-8">Book trained professionals for all your home and office cleaning needs</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg">
          Book Now
        </button>
      </div>

      {/* Services Section */}
      <div className="services-section py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Carpentry Services</h2>
        <ProviderList providers={providers} />
      </div>

      {/* Why Choose Us Section */}
      <div className="why-choose-us bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Cleaning Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-6">
              <div className="flex justify-center text-blue-600 mb-4">
                <FaCheck size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Trained Professionals</h3>
              <p className="text-gray-600">All our cleaners are background-verified and trained in modern cleaning techniques</p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="flex justify-center text-blue-600 mb-4">
                <FaShieldAlt size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Satisfaction</h3>
              <p className="text-gray-600">We guarantee your satisfaction or we'll re-clean for free</p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="flex justify-center text-blue-600 mb-4">
                <FaClock size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">On-Time Service</h3>
              <p className="text-gray-600">Our professionals arrive on time as promised</p>
            </div>
          </div>
        </div>
      </div>
      {/* CTA Section */}
      <div className="cta-section bg-blue-600 py-12 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready for a Spotless Home?</h2>
        <p className="text-xl mb-8">Book our professional cleaning service today!</p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full text-lg">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default Cleaning;