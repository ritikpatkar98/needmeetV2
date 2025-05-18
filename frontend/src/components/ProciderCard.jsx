import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import StarRating from './StarRating';
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

export default ProviderCard;
