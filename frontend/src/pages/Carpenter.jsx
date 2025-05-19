import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersByServiceType } from '../store/slice/providerSlice';
import ProviderList from '../components/ProviderList';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Carpenter = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector(state => state.provider);
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.warn('Please login to access this page', {
        position: "bottom-left",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light"
      });
    }

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
