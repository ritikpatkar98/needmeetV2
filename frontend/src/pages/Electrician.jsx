import React from 'react';

const Electrician = () => {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section bg-blue-50 py-16 px-4 text-center">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">Professional Electrical Services</h1>
        <p className="text-xl text-gray-600 mb-8">Expert electrical solutions for your home and business</p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg">
          Book Now
        </button>
      </div>

      {/* Services Section */}
      <div className="services-section py-16 px-4 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Electrical Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              title: "Electrical Installation",
              description: "Complete electrical wiring and installation services",
              price: "₹2000/point",
              time: "1-2 days"
            },
            {
              id: 2,
              title: "Repairs & Maintenance",
              description: "Quick electrical repairs and routine maintenance",
              price: "₹500/hour",
              time: "2-3 hours"
            },
            {
              id: 3,
              title: "Circuit Breaker Service",
              description: "Installation and repair of circuit breakers",
              price: "₹1500/unit",
              time: "1-2 hours"
            },
            {
              id: 4,
              title: "Emergency Services",
              description: "24/7 emergency electrical support",
              price: "₹1000/visit",
              time: "ASAP"
            },
            {
              id: 5,
              title: "Home Safety Inspection",
              description: "Comprehensive electrical safety audits",
              price: "₹2500",
              time: "3-4 hours"
            },
            {
              id: 6,
              title: "Commercial Services",
              description: "Electrical solutions for businesses and industries",
              price: "Custom",
              time: "Project based"
            }
          ].map(service => (
            <div key={service.id} className="service-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600 mb-4">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">{service.price}</span>
                <span className="text-gray-500">{service.time}</span>
              </div>
              <button className="mt-4 w-full bg-blue-100 hover:bg-blue-200 text-blue-800 py-2 px-4 rounded-lg font-medium">
                Book Service
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Electrical Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Licensed Electricians</h3>
              <p className="text-gray-600">Certified professionals with years of experience</p>
            </div>
            <div className="text-center p-6">
              <h3 className="text-xl font-semibold mb-2">Quality Equipment</h3>
              <p className="text-gray-600">We use high-grade electrical components</p>
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
        <h2 className="text-3xl font-bold mb-4">Need Electrical Services?</h2>
        <p className="text-xl mb-8">Get a free consultation for your electrical needs today!</p>
        <button className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full text-lg">
          Get Quote
        </button>
      </div>
    </div>
  )
}

export default Electrician;