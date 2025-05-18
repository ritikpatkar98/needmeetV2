import React, { useState, useEffect } from 'react';
import ProviderList from '../components/ProviderList';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProvidersByServiceType } from '../store/slice/providerSlice';
// import axios from 'axios';

const Plumber = () => {

  const dispatch = useDispatch();
  const { providers, loading, error } = useSelector(state => state.provider);
  
  useEffect(() => {
    dispatch(fetchProvidersByServiceType('electrician'));
  }, [dispatch]);

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Professional Plumbing Services</h1>
        <p className="text-xl text-gray-600 mb-8">Expert plumbing solutions for your home and business</p>
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Plumbing Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Licensed Plumbers</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">We use high-grade plumbing components</p>
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
        <h2 className="text-3xl font-bold mb-4">Need Plumbing Services?</h2>
        <p className="text-xl mb-8">Get a free consultation for your plumbing needs today!</p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full text-lg">
          Get Quote
        </button>
      </div>
    </div>
  );
};

export default Plumber;
