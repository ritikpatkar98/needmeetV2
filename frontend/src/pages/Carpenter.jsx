import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersByServiceType } from '../store/slice/providerSlice';
import ProviderList from '../components/ProviderList';

const Carpenter = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector(state => state.provider);


  

  useEffect(() => {
    dispatch(fetchProvidersByServiceType('carpenter'));
  }, [dispatch]);

  if (loading) {
    return <p>Loading providers...</p>;
  }

  if (error) {
    return <p>Error loading providers: {error}</p>;
  }

  return (
    <div className="carpentry-service-page">
      <div className="hero-section bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Expert Carpentry Services</h1>
        <p className="text-xl text-gray-600 mb-8">Book skilled carpenters for all your wooden furniture and fixture needs</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg">
          Book Now
        </button>
      </div>

      <div className="services-section py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Carpentry Services</h2>
        <ProviderList providers={providers} />
      </div>
    </div>
  );
};

export default Carpenter;
