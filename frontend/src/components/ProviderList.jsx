import React from 'react';

const ProviderList = ({ providers }) => {
  if (!providers || providers.length === 0) {
    return <p>No providers found.</p>;
  }

  return (
    <div className="provider-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {providers.map(provider => (
        <div key={provider._id} className="provider-card bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
          <img
            src={provider.profilePicture ? provider.profilePicture : '/default.jpg'}
            alt={provider.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-xl font-semibold mb-2">{provider.name}</h3>
          <p className="text-gray-600 mb-2">Location: {provider.location}</p>
          <p className="text-gray-600 mb-2">Experience: {provider.experience} years</p>
          <p className="text-gray-600 mb-2">Price Range: ₹{provider.priceRange.min} - ₹{provider.priceRange.max}</p>
          <p className="text-gray-600 mb-2">Rating: {provider.rating.toFixed(1)} / 5</p>
          <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium">
            View Details
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProviderList;
