import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersByServiceType } from '../store/slice/providerSlice';
import ProviderList from '../components/ProviderList';

const Painter = () => {
  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector(state => state.provider);

  useEffect(() => {
    dispatch(fetchProvidersByServiceType('painter'));
  }, [dispatch]);
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Professional Painting Services</h1>
        <p className="text-xl text-gray-600 mb-8">Transform your space with our expert painting solutions</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg">
          Book Now
        </button>
      </div>
      {/* Services Section */}
      <div className="services-section py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Carpentry Services</h2>
        <ProviderList providers={providers} />
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Painting Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Expert Painters</h3>
              <p className="text-gray-600">Skilled professionals with years of experience</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">We use premium paints and materials</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Timely Completion</h3>
              <p className="text-gray-600">Projects completed within promised timeline</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-12 px-4 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Space?</h2>
        <p className="text-xl mb-8">Get a free quote for your painting project today!</p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full text-lg">
          Get Quote
        </button>
      </div>
    </div>
  )
}

export default Painter;

