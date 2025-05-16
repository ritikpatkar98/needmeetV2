import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

// Improved ProviderCard with better accessibility and responsive design
const ProviderCard = React.memo(({ provider, isNew }) => (
  <div className={`bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition duration-300 transform hover:-translate-y-1 h-full flex flex-col ${isNew ? 'flex-row' : ''}`}>
    <Link
      to={`/provider/${provider.id}`}
      className={`${isNew ? 'flex-1' : 'block'}`}
      aria-label={`View ${provider.name} profile`}
    >
      <div className={isNew ? 'h-full' : ''}>
        <div className="relative">
          <img
            src={provider.image || 'https://via.placeholder.com/300x160?text=Provider+Photo'}
            alt={`${provider.name} photo`}
            className={`object-cover w-full ${isNew ? 'h-full' : 'h-48'}`}
            loading="lazy"
            width={isNew ? 200 : 300}
            height={isNew ? 200 : 160}
          />
          <div className="absolute top-3 right-3 bg-white text-xs font-semibold px-2 py-1 rounded-full text-blue-700 shadow-sm">
            {provider.experience}
          </div>
        </div>
      </div>
    </Link>
    <div className={`${isNew ? 'flex-1 p-4' : 'p-5'} flex flex-col flex-grow`}>
      <div className="flex-grow">
        {isNew && (
          <span className="text-xs font-semibold px-2 py-1 rounded-full text-blue-700 bg-blue-100 inline-block mb-2">
            {provider.experience}
          </span>
        )}
        <h3 className="font-bold text-lg mb-2 text-gray-800">{provider.name}</h3>
        <p className="text-sm text-gray-600 mb-2">{provider.service} • {provider.location}</p>
        <div className="flex items-center mb-2">
          <StarRating rating={provider.rating} />
          <span className="text-xs text-gray-500 ml-2">({provider.reviews} reviews)</span>
        </div>
      </div>
      <div className="flex justify-between items-center mt-4">
        <span className="font-bold text-blue-700">{provider.price}</span>
        <Link 
          to={`/book/${provider.id}`}
          className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          aria-label={`Book ${provider.name}`}
        >
          {isNew ? 'Book' : 'Book Now'}
        </Link>
      </div>
    </div>
  </div>
));

// Enhanced StarRating with better accessibility
const StarRating = React.memo(({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center" aria-label={`Rating: ${rating} out of 5 stars`}>
      {[...Array(fullStars)].map((_, i) => (
        <svg
          key={`full-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-yellow-500"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      {hasHalfStar && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-yellow-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
          />
        </svg>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <svg
          key={`empty-${i}`}
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-gray-300"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
      <span className="ml-1 text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
});

const HomePage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const navigate = useNavigate();

  // Service Categories with better icons
  const categories = [
    { id: 1, name: 'Plumber', icon: '🔧', color: 'bg-blue-100', iconColor: 'text-blue-600' },
    { id: 2, name: 'Electrician', icon: '⚡', color: 'bg-yellow-100', iconColor: 'text-yellow-600' },
    { id: 3, name: 'Cleaning', icon: '🧹', color: 'bg-green-100', iconColor: 'text-green-600' },
    { id: 4, name: 'Painting', icon: '🎨', color: 'bg-red-100', iconColor: 'text-red-600' },
    { id: 5, name: 'Carpenter', icon: '🪚', color: 'bg-orange-100', iconColor: 'text-orange-600' },
    { id: 6, name: 'Tutor', icon: '📚', color: 'bg-purple-100', iconColor: 'text-purple-600' },
  ];

  // Top Service Providers with better data
  const topProviders = [
    {
      id: 101,
      name: 'Rajesh Plumbing',
      service: 'Plumber',
      rating: 4.8,
      reviews: 243,
      price: '₹499/hour',
      location: 'Delhi',
      experience: '10 years exp',
      image: 'https://images.unsplash.com/photo-1600881336146-562bc8ffa1e3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 102,
      name: 'Sunil Electricals',
      service: 'Electrician',
      rating: 4.7,
      reviews: 187,
      price: '₹399/hour',
      location: 'Noida',
      experience: '8 years exp',
      image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9aabd?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 103,
      name: 'Clean Home Services',
      service: 'Cleaning',
      rating: 4.9,
      reviews: 312,
      price: '₹299/hour',
      location: 'Gurgaon',
      experience: '5 years exp',
      image: 'https://images.unsplash.com/photo-1600585152220-90363fe7e115?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
    },
  ];

  // New Service Providers with better data
  const newProviders = [
    {
      id: 201,
      name: 'Fresh Paint Studio',
      service: 'Painting',
      rating: 4.6,
      reviews: 87,
      price: '₹599/hour',
      location: 'Faridabad',
      experience: '3 years exp',
      image: 'https://images.unsplash.com/photo-1580913428735-bd3c269d6a82?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
    {
      id: 202,
      name: 'Smart Tutors Academy',
      service: 'Tutor',
      rating: 4.5,
      reviews: 56,
      price: '₹100',
      location: 'Ghaziabad',
      experience: '7 years exp',
      image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
  ];

  const handleSearch = useCallback((e) => {
    e.preventDefault();
    if (searchTerm.trim() && location.trim()) {
      navigate(`/search?service=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`);
    }
  }, [searchTerm, location, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 font-sans antialiased">
      <Helmet>
        <title>NeedMeet - Trusted Local Service Providers</title>
        <meta
          name="description"
          content="Book trusted plumbers, electricians, cleaners, and more with NeedMeet. Affordable, verified, and quick services at your doorstep."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-pattern opacity-10" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}></div>
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight animate-fade-in">
              Discover Trusted Local Services
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in delay-100">
              From plumbers to tutors, find verified professionals at your doorstep
            </p>
            <form onSubmit={handleSearch} className="bg-white rounded-full p-1.5 flex flex-col sm:flex-row items-center max-w-2xl mx-auto shadow-2xl animate-slide-up">
              <input
                type="text"
                placeholder="What service do you need? (e.g. Plumber)"
                className="w-full py-3 px-6 rounded-full focus:outline-none text-gray-700 sm:border-r sm:border-gray-200 focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                aria-label="Service search"
                required
              />
              <input
                type="text"
                placeholder="Your location (e.g. Delhi)"
                className="w-full py-3 px-6 rounded-full focus:outline-none text-gray-700 mt-2 sm:mt-0 focus:ring-2 focus:ring-blue-500"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                aria-label="Location search"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-full p-3 hover:bg-blue-800 transition duration-200 mt-2 sm:mt-0 sm:ml-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
                aria-label="Search for services"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        {/* Categories */}
        <section className="mb-16" aria-labelledby="categories-heading">
          <h2 id="categories-heading" className="text-3xl font-bold mb-8 text-gray-800 animate-fade-in">Explore Our Services</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category) => (
              <Link
                to={`/services/${category.name.toLowerCase()}`}
                key={category.id}
                className="flex flex-col items-center p-4 rounded-xl hover:bg-gray-100 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label={`Explore ${category.name} services`}
              >
                <div className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mb-3 shadow-md`}>
                  <span className={`text-2xl ${category.iconColor}`}>{category.icon}</span>
                </div>
                <p className="font-medium text-gray-700 text-center">{category.name}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Top Providers */}
        <section className="mb-16" aria-labelledby="top-providers-heading">
          <div className="flex justify-between items-center mb-8">
            <h2 id="top-providers-heading" className="text-3xl font-bold text-gray-800 animate-fade-in">Top Service Providers</h2>
            <Link 
              to="/providers" 
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} isNew={false} />
            ))}
          </div>
        </section>

        {/* New Providers */}
        <section className="mb-16" aria-labelledby="new-providers-heading">
          <div className="flex justify-between items-center mb-8">
            <h2 id="new-providers-heading" className="text-3xl font-bold text-gray-800 animate-fade-in">New Providers</h2>
            <Link 
              to="/providers/new" 
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded px-2 py-1"
            >
              View All
            </Link>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {newProviders.map((provider) => (
              <ProviderCard key={provider.id} provider={provider} isNew={true} />
            ))}
          </div>
        </section>

        {/* Highlights */}
        <section className="mb-16" aria-labelledby="highlights-heading">
          <h2 id="highlights-heading" className="text-3xl font-bold mb-8 text-gray-800 animate-fade-in">Why Choose NeedMeet?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
              <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-gray-800">Verified Professionals</h3>
              <p className="text-gray-600 text-sm">All providers are background-checked and rated by customers</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-gray-800">Affordable Pricing</h3>
              <p className="text-gray-600 text-sm">No hidden charges, pay only for what you need</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-lg text-center transform hover:scale-105 transition duration-300 focus-within:ring-2 focus-within:ring-blue-500">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-purple-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold mb-2 text-gray-800">Quick Service</h3>
              <p className="text-gray-600 text-sm">Book instantly and get service within hours</p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 text-center shadow-lg" aria-labelledby="cta-heading">
          <h2 id="cta-heading" className="text-2xl md:text-3xl font-bold mb-4 text-gray-800 animate-fade-in">Need Help Right Now?</h2>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto animate-fade-in delay-100">
            Book a service provider in minutes and get your problem solved today.
          </p>
          <Link
            to="/book"
            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg hover:bg-blue-700 transition duration-200 inline-block transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-500"
            aria-label="Book a service now"
          >
            Book a Service
          </Link>
        </section>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }
        .animate-slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
        .delay-100 {
          animation-delay: 0.1s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;