import React from 'react'

const Painter = () => {
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
        <h2 className="text-3xl font-bold text-center mb-12">Our Painting Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              title: "Interior Painting",
              description: "Professional interior wall painting with premium quality paints",
              price: "₹15/sqft",
              time: "2-3 days"
            },
            {
              id: 2, 
              title: "Exterior Painting",
              description: "Weather-resistant exterior painting solutions for your building",
              price: "₹18/sqft",
              time: "4-5 days"
            },
            {
              id: 3,
              title: "Texture Painting",
              description: "Custom texture designs and decorative wall finishes",
              price: "₹25/sqft", 
              time: "3-4 days"
            },
            {
              id: 4,
              title: "Wood Painting",
              description: "Furniture and woodwork painting and polishing services",
              price: "₹999/piece",
              time: "1-2 days"
            },
            {
              id: 5,
              title: "Waterproofing",
              description: "Long-lasting waterproofing solutions with warranty",
              price: "₹35/sqft",
              time: "2-3 days"
            },
            {
              id: 6,
              title: "Commercial Painting",
              description: "Large scale painting services for offices and businesses",
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

