// src/pages/ServiceDetailPage.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ServiceDetailPage = () => {
  const { id } = useParams();
  const [provider, setProvider] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { isAuthenticated } = useSelector(state => state.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast.error('Please login to access this page');
    }
    const fetchProvider = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/providers/${id}`);
        setProvider(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProvider();
  }, [id]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">Error: {error}</div>;
  if (!provider) return <div className="text-center py-8">Provider not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Provider Image */}
        <div className="h-64 bg-gray-200 flex items-center justify-center">
          {provider.image ? (
            <img src={provider.image} alt={provider.name} className="h-full w-full object-cover" />
          ) : (
            <svg className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          )}
        </div>

        {/* Provider Details */}
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{provider.name}</h1>
              <p className="text-gray-600">{provider.service} • {provider.location}</p>
            </div>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {provider.experience || '2+ years exp'}
            </span>
          </div>

          {/* Rating */}
          <div className="flex items-center mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(provider.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-gray-600">{provider.rating || 'No'} rating ({provider.reviews || 0} reviews)</span>
          </div>

          {/* Price */}
          <div className="mt-4">
            <span className="text-2xl font-bold text-blue-600">{provider.price || '₹499/hour'}</span>
            <span className="text-sm text-gray-500 ml-2">(minimum 1 hour)</span>
          </div>

          {/* Services Offered */}
          <div className="mt-6">
            <h3 className="font-semibold mb-2">Services Offered:</h3>
            <div className="flex flex-wrap gap-2">
              {provider.services?.map((service, index) => (
                <span key={index} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                  {service}
                </span>
              ))}
            </div>
          </div>

          {/* Book Button */}
          <button className="mt-8 w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition duration-200">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;