import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const SignupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer',
    services: [],
    location: '',
    phone: '',
    address: '',
    experience: '',
    priceRange: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  // Predefined options
  const servicesOptions = [
    'Plumber',
    'Electrician',
    'Cleaning',
    'Painting',
    'Carpenter',
    'Tutor',
  ];
  const experienceOptions = ['1-3 years', '4-6 years', '7-10 years', '10+ years'];
  const priceRangeOptions = ['₹100-₹300/hour', '₹300-₹500/hour', '₹500-₹800/hour', '₹800+/hour'];

  // Validation function
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
      newErrors.email = 'Invalid email address';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.role === 'Provider') {
      if (!formData.services.length) newErrors.services = 'At least one service is required';
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.priceRange) newErrors.priceRange = 'Price range is required';
    }
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.phone.match(/^\+?\d{10,12}$/)) newErrors.phone = 'Invalid phone number';
    return newErrors;
  }, [formData]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  // Handle multi-select services
  const handleServicesChange = (e) => {
    const options = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData((prev) => ({ ...prev, services: options }));
    if (errors.services) setErrors((prev) => ({ ...prev, services: '' }));
  };

  // Handle form submission
  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error('Signup failed');
      navigate('/login');
    } catch (error) {
      setErrors({ form: 'Signup failed. Please try again.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <Helmet>
        <title>NeedMeet - Sign Up</title>
        <meta
          name="description"
          content="Join NeedMeet to book or provide trusted local services like plumbing, electrical work, and more."
        />
      </Helmet>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 text-white py-16 overflow-hidden">
        <div
          className="absolute inset-0 bg-pattern opacity-10"
          style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/cubes.png')" }}
        ></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight animate-fade-in">
              Join NeedMeet Today
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in delay-100">
              Sign up as a customer or provider to access trusted local services
            </p>
          </div>
        </div>
      </div>

      {/* Form Section */}
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Your Account</h2>
          {errors.form && (
            <p className="text-red-500 text-sm mb-4 text-center">{errors.form}</p>
          )}
          <form onSubmit={handleSignup} noValidate>
            {/* Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                className={`w-full px-4 py-2 border ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? 'name-error' : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-xs mt-1">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className={`w-full px-4 py-2 border ${
                  errors.email ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                required
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className={`w-full px-4 py-2 border ${
                  errors.password ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                required
                aria-invalid={!!errors.password}
                aria-describedby={errors.password ? 'password-error' : undefined}
              />
              {errors.password && (
                <p id="password-error" className="text-red-500 text-xs mt-1">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Role */}
            <div className="mb-4">
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
                required
              >
                <option value="Customer">Customer</option>
                <option value="Provider">Service Provider</option>
              </select>
            </div>

            {/* Conditional Fields for Providers */}
            {formData.role === 'Provider' && (
              <>
                {/* Services */}
                <div className="mb-4">
                  <label
                    htmlFor="services"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Services
                  </label>
                  <select
                    id="services"
                    name="services"
                    multiple
                    value={formData.services}
                    onChange={handleServicesChange}
                    className={`w-full px-4 py-2 border ${
                      errors.services ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                    aria-invalid={!!errors.services}
                    aria-describedby={errors.services ? 'services-error' : undefined}
                  >
                    {servicesOptions.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                  {errors.services && (
                    <p id="services-error" className="text-red-500 text-xs mt-1">
                      {errors.services}
                    </p>
                  )}
                </div>

                {/* Experience */}
                <div className="mb-4">
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Experience
                  </label>
                  <select
                    id="experience"
                    name="experience"
                    value={formData.experience}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.experience ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                    required
                    aria-invalid={!!errors.experience}
                    aria-describedby={errors.experience ? 'experience-error' : undefined}
                  >
                    <option value="">Select experience</option>
                    {experienceOptions.map((exp) => (
                      <option key={exp} value={exp}>
                        {exp}
                      </option>
                    ))}
                  </select>
                  {errors.experience && (
                    <p id="experience-error" className="text-red-500 text-xs mt-1">
                      {errors.experience}
                    </p>
                  )}
                </div>

                {/* Price Range */}
                <div className="mb-4">
                  <label
                    htmlFor="priceRange"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Price Range
                  </label>
                  <select
                    id="priceRange"
                    name="priceRange"
                    value={formData.priceRange}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border ${
                      errors.priceRange ? 'border-red-500' : 'border-gray-300'
                    } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                    required
                    aria-invalid={!!errors.priceRange}
                    aria-describedby={errors.priceRange ? 'priceRange-error' : undefined}
                  >
                    <option value="">Select price range</option>
                    {priceRangeOptions.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                  {errors.priceRange && (
                    <p id="priceRange-error" className="text-red-500 text-xs mt-1">
                      {errors.priceRange}
                    </p>
                  )}
                </div>
              </>
            )}

            {/* Location */}
            <div className="mb-4">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Enter your location (e.g., Delhi)"
                className={`w-full px-4 py-2 border ${
                  errors.location ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                required
                aria-invalid={!!errors.location}
                aria-describedby={errors.location ? 'location-error' : undefined}
              />
              {errors.location && (
                <p id="location-error" className="text-red-500 text-xs mt-1">
                  {errors.location}
                </p>
              )}
            </div>

            {/* Phone */}
            <div className="mb-6">
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                className={`w-full px-4 py-2 border ${
                  errors.phone ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                required
                aria-invalid={!!errors.phone}
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="text-red-500 text-xs mt-1">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Address */}
            <div className="mb-6">
              <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter your address"
                className={`w-full px-4 py-2 border ${
                  errors.address ? 'border-red-500' : 'border-gray-300'
                } rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200`}
                required
                aria-invalid={!!errors.address}
                aria-describedby={errors.address ? 'address-error' : undefined}
              />
              {errors.address && (
                <p id="address-error" className="text-red-500 text-xs mt-1">
                  {errors.address}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition duration-200 transform hover:scale-105 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              aria-label="Sign up"
            >
              {isSubmitting ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link
              to="/login"
              className="text-blue-600 hover:text-blue-800 font-medium transition duration-200"
              aria-label="Go to login page"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>

      {/* Custom CSS for Animations */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
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

export default SignupPage;