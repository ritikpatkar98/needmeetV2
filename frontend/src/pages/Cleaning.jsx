import React from 'react';
import { FaBroom, FaShower, FaHome, FaBuilding, FaStar, FaCheck, FaClock, FaShieldAlt } from 'react-icons/fa';
import { MdAir, MdKitchen } from 'react-icons/md';
import { GiVacuumCleaner } from 'react-icons/gi';

const Cleaning = () => {
  const services = [
    {
      id: 1,
      icon: <FaBroom size={30} />,
      title: "Full Home Cleaning",
      description: "Complete cleaning of entire home including living room, bedrooms, kitchen, and bathrooms",
      price: "₹1,499",
      time: "3-4 hours"
    },
    {
      id: 2,
      icon: <FaShower size={30} />,
      title: "Bathroom Cleaning",
      description: "Deep cleaning of bathrooms including tiles, fixtures, and sanitization",
      price: "₹499",
      time: "1 hour"
    },
    {
      id: 3,
      icon: <MdKitchen size={30} />,
      title: "Kitchen Cleaning",
      description: "Thorough kitchen cleaning including appliances, countertops, and cabinets",
      price: "₹699",
      time: "1.5 hours"
    },
    {
      id: 4,
      icon: <GiVacuumCleaner size={30} />,
      title: "Sofa & Carpet Cleaning",
      description: "Professional deep cleaning for sofas, carpets, and upholstery",
      price: "₹999",
      time: "2 hours"
    },
    {
      id: 5,
      icon: <MdAir size={30} />,
      title: "AC Service & Cleaning",
      description: "AC servicing including gas refill, coil cleaning, and maintenance",
      price: "₹1,199",
      time: "2 hours"
    },
    {
      id: 6,
      icon: <FaBuilding size={30} />,
      title: "Office Cleaning",
      description: "Commercial cleaning service for offices and workspaces",
      price: "₹2,499",
      time: "4-5 hours"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      rating: 5,
      comment: "The cleaner was very professional and did an excellent job. My home has never been cleaner!"
    },
    {
      id: 2,
      name: "Rahul Patel",
      rating: 4,
      comment: "Great service at reasonable prices. Will definitely book again."
    },
    {
      id: 3,
      name: "Anjali Mehta",
      rating: 5,
      comment: "They arrived on time and cleaned everything thoroughly. Highly recommended!"
    }
  ];

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
        <h2 className="text-3xl font-bold text-center mb-12">Our Cleaning Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map(service => (
            <div key={service.id} className="service-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="icon text-blue-600 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{service.price}</span>
                <span className="text-gray-500 flex items-center">
                  <FaClock className="mr-1" /> {service.time}
                </span>
              </div>
              <button className="mt-4 w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg font-medium">
                Book Service
              </button>
            </div>
          ))}
        </div>
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

      {/* Testimonials */}
      <div className="testimonials py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="testimonial-card bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} />
                ))}
              </div>
              <p className="text-gray-700 mb-4 italic">"{testimonial.comment}"</p>
              <p className="font-semibold text-gray-800">{testimonial.name}</p>
            </div>
          ))}
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