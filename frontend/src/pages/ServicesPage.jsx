// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    id: 1,
    name: 'Raj Electric Works',
    category: 'Electrician',
    location: 'Bhopal',
    rating: 4.5,
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    price: '₹499/hour',
    experience: '8 years exp',
    services: ['Wiring', 'Switch Repair', 'Panel Installation'],
    available: 'Available today'
  },
  {
    id: 2,
    name: 'Quick Plumber',
    category: 'Plumber',
    location: 'Indore',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    price: '₹399/hour',
    experience: '5 years exp',
    services: ['Pipe Repair', 'Bathroom Fitting', 'Water Tank'],
    available: 'Available now'
  },
  {
    id: 3,
    name: 'AC Repair Experts',
    category: 'AC Technician',
    location: 'Delhi',
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1558002038-1055907df827?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    price: '₹599/hour',
    experience: '10 years exp',
    services: ['AC Installation', 'Gas Refill', 'Maintenance'],
    available: 'Available tomorrow'
  },
  {
    id: 4,
    name: 'Carpenter King',
    category: 'Carpenter',
    location: 'Mumbai',
    rating: 4.6,
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    price: '₹699/hour',
    experience: '12 years exp',
    services: ['Furniture Repair', 'Custom Work', 'Polishing'],
    available: 'Available today'
  },
  {
    id: 5,
    name: 'Paint Masters',
    category: 'Painter',
    location: 'Bangalore',
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1582731595319-5e8ce8cd3472?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    price: '₹899/hour',
    experience: '15 years exp',
    services: ['Wall Painting', 'Texture', 'Waterproofing'],
    available: 'Available now'
  },
  {
    id: 6,
    name: 'Appliance Wizards',
    category: 'Appliance Repair',
    location: 'Hyderabad',
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80',
    price: '₹499/hour',
    experience: '7 years exp',
    services: ['Washing Machine', 'Refrigerator', 'Microwave'],
    available: 'Available today'
  },
];

const ServicesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         service.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['All', ...new Set(services.map(service => service.category))];

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        i <= rating ? 
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg> : 
        <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      );
    }
    return stars;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600">Finding the best service providers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-700 text-white pt-16 pb-24 px-6 mb-8 rounded-b-3xl overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute right-0 top-0 h-full w-full opacity-20">
            <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-white"></div>
            <div className="absolute right-20 top-40 h-40 w-40 rounded-full bg-white"></div>
          </div>
        </div>
          
        <div className="container mx-auto relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Find Trusted Service <br className="hidden sm:block"/>Providers Near You
          </h1>
          <p className="text-blue-100 mb-8 max-w-lg text-lg">
            Get instant access to verified professionals for your home and office needs
          </p>
          
          <div className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-xl shadow-lg">
            <div className="flex-1 flex items-center border-b md:border-b-0 md:border-r border-gray-200 px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search services (e.g. Electrician)"
                className="flex-1 p-2 rounded-lg focus:outline-none text-gray-800 border-0"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center px-3 py-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <select 
                className="p-2 rounded-lg focus:outline-none text-gray-800 border-0 bg-transparent w-full"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 hidden md:flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
          
          <div className="flex flex-wrap gap-4 mt-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium">Verified Professionals</span>
            </div>
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <div className="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="ml-2 text-sm font-medium">100% Money Back</span>
            </div>
          </div>
        </div>
      </div>

      {/* Category Chips */}
      <div className="container mx-auto px-4 sm:px-6 mb-8">
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`py-2 px-4 rounded-full text-sm font-medium transition duration-200 ${
                selectedCategory === category 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-700 hover:bg-gray-100 shadow-sm'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Services Listing */}
      <div className="container mx-auto px-4 sm:px-6 py-4 mb-12">
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredServices.map(service => (
              <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300 group">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={service.image} 
                    alt={service.name} 
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105" 
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium text-blue-700">
                    {service.experience}
                  </div>
                  <div className="absolute bottom-4 left-4 bg-green-500 text-white text-xs font-medium px-2 py-1 rounded">
                    {service.available}
                  </div>
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-lg mb-1">{service.name}</h3>
                      <div className="flex items-center text-sm text-gray-600">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {service.location}
                      </div>
                    </div>
                    <div className="flex items-center bg-blue-50 px-2 py-1 rounded">
                      <div className="flex">
                        {renderStars(service.rating)}
                      </div>
                      <span className="ml-1 font-medium text-gray-700 text-sm">{service.rating}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1 my-3">
                    <span className="inline-block bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                      {service.category}
                    </span>
                    {service.services.slice(0, 2).map((item, index) => (
                      <span key={index} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                        {item}
                      </span>
                    ))}
                    {service.services.length > 2 && (
                      <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full">
                        +{service.services.length - 2} more
                      </span>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="font-bold text-lg text-blue-700">{service.price}</span>
                    <Link 
                      to={`/book/${service.id}`}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center"
                    >
                      Book Now
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <div className="max-w-md mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <h3 className="text-xl font-medium mt-6 text-gray-800">No services found</h3>
              <p className="text-gray-600 mt-2">We couldn't find any services matching your criteria.</p>
              <button 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All');
                }}
                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition duration-200 inline-flex items-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Reset Filters
              </button>
            </div>
          </div>
        )}
      </div>
      
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-10">
        <Link to="/chat" className="bg-blue-600 hover:bg-blue-700 text-white h-14 w-14 rounded-full shadow-lg flex items-center justify-center focus:outline-none transition duration-300 hover:scale-110">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ServicesPage;