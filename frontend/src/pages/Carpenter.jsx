import React from 'react';
import { FaHammer, FaDoorOpen, FaChair, FaTools, FaHome, FaStar, FaCheck, FaClock, FaShieldAlt } from 'react-icons/fa';
import { GiWoodBeam, GiWoodCabin, GiBookshelf } from 'react-icons/gi';
import { MdCarpenter } from 'react-icons/md';

const Carpenter = () => {
  const services = [
    {
      id: 1,
      icon: <FaHammer size={30} />,
      title: "Furniture Repair",
      description: "Professional repair of wooden furniture including chairs, tables, beds, and cabinets",
      price: "₹799",
      time: "1-2 hours"
    },
    {
      id: 2,
      icon: <FaDoorOpen size={30} />,
      title: "Door Installation & Repair",
      description: "Expert door installation, repair, and maintenance services for all types of wooden doors",
      price: "₹1,299",
      time: "2-3 hours"
    },
    {
      id: 3,
      icon: <GiBookshelf size={30} />,
      title: "Custom Shelving & Storage",
      description: "Custom-built wooden shelves, cabinets, and storage solutions tailored to your space",
      price: "₹1,899",
      time: "4-6 hours"
    },
    {
      id: 4,
      icon: <FaChair size={30} />,
      title: "Custom Furniture Making",
      description: "Handcrafted custom furniture built to your specifications and design preferences",
      price: "₹3,499",
      time: "Varies by project"
    },
    {
      id: 5,
      icon: <GiWoodBeam size={30} />,
      title: "Wooden Flooring",
      description: "Installation, repair, and refinishing of hardwood and laminate flooring",
      price: "₹120/sq.ft",
      time: "Depends on area"
    },
    {
      id: 6,
      icon: <MdCarpenter size={30} />,
      title: "Carpentry Maintenance",
      description: "Regular maintenance of all wooden structures and furniture in homes and offices",
      price: "₹1,499",
      time: "3-4 hours"
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: "Vikram Singh",
      rating: 5,
      comment: "The carpenter was highly skilled and fixed my broken wardrobe perfectly. Very satisfied with the quality of work!"
    },
    {
      id: 2,
      name: "Meera Kapoor",
      rating: 4,
      comment: "Got custom bookshelves made for my study. The workmanship is excellent and exactly what I wanted."
    },
    {
      id: 3,
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Prompt service and excellent craftsmanship. The custom dining table they built is beautiful and sturdy."
    }
  ];

  return (
    <div className="carpentry-service-page">
      {/* Hero Section */}
      <div className="hero-section bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Expert Carpentry Services</h1>
        <p className="text-xl text-gray-600 mb-8">Book skilled carpenters for all your wooden furniture and fixture needs</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg">
          Book Now
        </button>
      </div>

      {/* Services Section */}
      <div className="services-section py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Carpentry Services</h2>
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
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Carpentry Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="feature-card text-center p-6">
              <div className="flex justify-center text-blue-600 mb-4">
                <FaTools size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Expert Craftsmen</h3>
              <p className="text-gray-600">Our carpenters have years of experience and are skilled in traditional and modern techniques</p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="flex justify-center text-amber-600 mb-4">
                <GiWoodCabin size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Materials</h3>
              <p className="text-gray-600">We use only premium-grade wood and materials for all our carpentry projects</p>
            </div>
            <div className="feature-card text-center p-6">
              <div className="flex justify-center text-amber-600 mb-4">
                <FaShieldAlt size={40} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Warranty Service</h3>
              <p className="text-gray-600">All our carpentry work comes with a 1-year service warranty</p>
            </div>
          </div>
        </div>
      </div>

      {/* Work Showcase */}
      <div className="work-showcase py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Craftsmanship</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="work-item">
            <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
            <h3 className="font-semibold text-lg">Custom Kitchen Cabinets</h3>
          </div>
          <div className="work-item">
            <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
            <h3 className="font-semibold text-lg">Wooden Flooring Installation</h3>
          </div>
          <div className="work-item">
            <div className="bg-gray-200 h-64 rounded-lg mb-3"></div>
            <h3 className="font-semibold text-lg">Handcrafted Dining Table</h3>
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
        <h2 className="text-3xl font-bold mb-4">Need Quality Carpentry Work?</h2>
        <p className="text-xl mb-8">Book our professional carpentry services today!</p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full text-lg">
          Book Now
        </button>
      </div>

      {/* Process Section */}
      <div className="process-section py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="process-step text-center">
            <div className="step-number bg-blue-100 text-blue-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-lg font-semibold mb-2">Book a Service</h3>
            <p className="text-gray-600">Choose the service you need and select a convenient time slot</p>
          </div>
          <div className="process-step text-center">
            <div className="step-number bg-amber-100 text-amber-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-lg font-semibold mb-2">Carpenter Visit</h3>
            <p className="text-gray-600">Our expert carpenter will visit your home to assess the work</p>
          </div>
          <div className="process-step text-center">
            <div className="step-number bg-amber-100 text-amber-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-lg font-semibold mb-2">Get a Quote</h3>
            <p className="text-gray-600">Receive a detailed quote based on your specific requirements</p>
          </div>
          <div className="process-step text-center">
            <div className="step-number bg-amber-100 text-amber-800 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">4</div>
            <h3 className="text-lg font-semibold mb-2">Job Completion</h3>
            <p className="text-gray-600">Our carpenter completes the work with quality craftsmanship</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carpenter;