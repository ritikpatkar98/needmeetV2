
import React, { useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import { userRegister } from '../store/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { Check, ChevronLeft, Eye, EyeOff } from 'lucide-react';

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'user',
    services: [],
    location: '',
    phone: '',
    address: '',
    experience: '',
    priceRange: '',
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const servicesOptions = ['Plumber', 'Electrician', 'Cleaning', 'Painting', 'Carpenter', 'Tutor'];
  const experienceOptions = ['1-3 years', '4-6 years', '7-10 years', '10+ years'];
  const priceRangeOptions = ['₹100-₹300/hour', '₹300-₹500/hour', '₹500-₹800/hour', '₹800+/hour'];

  const validateStep1 = useCallback(() => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[\w.-]+@[\w.-]+\.\w+$/)) newErrors.email = 'Invalid email';
    if (formData.password.length < 6) newErrors.password = 'Password must be 6+ characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  }, [formData]);

  const validateStep2 = useCallback(() => {
    const newErrors = {};
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.phone.match(/^\+?\d{10,12}$/)) newErrors.phone = 'Invalid phone number';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    
    if (formData.role === 'Provider') {
      if (!formData.services.length) newErrors.services = 'Select at least one service';
      if (!formData.experience) newErrors.experience = 'Experience is required';
      if (!formData.priceRange) newErrors.priceRange = 'Price range is required';
    }
    return newErrors;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => {
      const newServices = prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service];
      
      return { ...prev, services: newServices };
    });
    if (errors.services) setErrors((prev) => ({ ...prev, services: '' }));
  };

  const handleNextStep = () => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      return;
    }
    setStep(2);
  };

  const handlePrevStep = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const stepErrors = validateStep2();
    if (Object.keys(stepErrors).length) {
      setErrors(stepErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      // Remove confirmPassword before submitting
      const submitData = { ...formData };
      delete submitData.confirmPassword;
      await dispatch(userRegister(submitData));
      navigate('/');
    } catch (error) {
      setErrors({ form: error.message || 'Signup failed' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <Helmet>
        <title>Signup | NeedMeet</title>
      </Helmet>
      
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Join NeedMeet to connect with service providers or offer your services
          </p>
          {errors.form && (
            <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-200">
              {errors.form}
            </div>
          )}
        </div>
        
        {/* Step indicator */}
        <div className="flex justify-center items-center space-x-4">
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 1 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            1
          </div>
          <div className={`h-1 w-8 ${step >= 2 ? 'bg-indigo-600' : 'bg-gray-200'}`}></div>
          <div className={`flex items-center justify-center h-8 w-8 rounded-full ${step >= 2 ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
            2
          </div>
        </div>

        <form className="mt-8 space-y-6" onSubmit={step === 1 ? handleNextStep : handleSubmit}>
          {step === 1 ? (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                    placeholder="Your full name"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email address</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                    placeholder="you@example.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      className={`mt-1 block w-full rounded-md border ${errors.password ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 pr-10`}
                      placeholder="At least 6 characters"
                    />
                    <button 
                      type="button" 
                      className="absolute inset-y-0 right-0 pr-3 flex items-center mt-1"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1 text-sm text-red-600">{errors.password}</p>}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.confirmPassword ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                    placeholder="Confirm your password"
                  />
                  {errors.confirmPassword && <p className="mt-1 text-sm text-red-600">{errors.confirmPassword}</p>}
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium text-gray-700">I want to</label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                  >
                    <option value="Customer">user</option>
                    <option value="Provider">provider</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-sm">
                  <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Already have an account?
                  </a>
                </div>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="group relative flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Next
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700">City</label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    value={formData.location}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.location ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                    placeholder="Your city"
                  />
                  {errors.location && <p className="mt-1 text-sm text-red-600">{errors.location}</p>}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.address ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                    placeholder="Your address"
                  />
                  {errors.address && <p className="mt-1 text-sm text-red-600">{errors.address}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 block w-full rounded-md border ${errors.phone ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                    placeholder="Your phone number"
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                </div>

                {formData.role === 'Provider' && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Services you provide</label>
                      <div className="grid grid-cols-2 gap-2">
                        {servicesOptions.map((service) => (
                          <div 
                            key={service}
                            onClick={() => handleServiceToggle(service)}
                            className={`cursor-pointer rounded-md px-3 py-2 text-sm flex items-center gap-2 ${
                              formData.services.includes(service)
                                ? 'bg-indigo-100 border border-indigo-300 text-indigo-800'
                                : 'bg-gray-50 border border-gray-300 text-gray-800 hover:bg-gray-100'
                            }`}
                          >
                            {formData.services.includes(service) && <Check size={16} className="text-indigo-600" />}
                            {service}
                          </div>
                        ))}
                      </div>
                      {errors.services && <p className="mt-1 text-sm text-red-600">{errors.services}</p>}
                    </div>

                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700">Experience</label>
                      <select
                        id="experience"
                        name="experience"
                        value={formData.experience}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${errors.experience ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                      >
                        <option value="">Select Experience</option>
                        {experienceOptions.map((exp) => (
                          <option key={exp} value={exp}>{exp}</option>
                        ))}
                      </select>
                      {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                    </div>

                    <div>
                      <label htmlFor="priceRange" className="block text-sm font-medium text-gray-700">Price Range</label>
                      <select
                        id="priceRange"
                        name="priceRange"
                        value={formData.priceRange}
                        onChange={handleChange}
                        className={`mt-1 block w-full rounded-md border ${errors.priceRange ? 'border-red-300' : 'border-gray-300'} px-3 py-2 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500`}
                      >
                        <option value="">Select Price Range</option>
                        {priceRangeOptions.map((range) => (
                          <option key={range} value={range}>{range}</option>
                        ))}
                      </select>
                      {errors.priceRange && <p className="mt-1 text-sm text-red-600">{errors.priceRange}</p>}
                    </div>
                  </>
                )}
              </div>

              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <ChevronLeft size={16} className="mr-1" />
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="group relative flex justify-center py-2 px-6 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
                >
                  {isSubmitting ? 'Creating account...' : 'Create account'}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}