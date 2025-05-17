import React from 'react';
import { motion } from 'framer-motion';

const Tutor = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    visible: {
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="font-sans">
      {/* Hero Section */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
        className="hero-section bg-gradient-to-r from-blue-500 to-indigo-600 py-20 px-4 text-center text-white"
      >
        <motion.h1 variants={fadeIn} className="text-4xl md:text-5xl font-bold mb-6">
          Expert Tutoring Services
        </motion.h1>
        <motion.p variants={fadeIn} className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          Personalized learning with certified educators for all academic levels
        </motion.p>
        <motion.button 
          variants={fadeIn}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg"
        >
          Find Your Tutor
        </motion.button>
      </motion.div>

      {/* Subjects Section */}
      <div className="py-16 px-4 max-w-6xl mx-auto">
        <motion.h2 
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="text-3xl font-bold text-center mb-12"
        >
          Our Tutoring Subjects
        </motion.h2>
        
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {[
            {
              id: 1,
              title: "Mathematics",
              description: "From basic arithmetic to advanced calculus",
              levels: "All Levels",
              icon: "🧮"
            },
            {
              id: 2,
              title: "Science",
              description: "Physics, Chemistry, Biology concepts",
              levels: "Grade 6 to University",
              icon: "🔬"
            },
            {
              id: 3,
              title: "Programming",
              description: "Python, Java, Web Development and more",
              levels: "Beginner to Advanced",
              icon: "💻"
            },
            {
              id: 4,
              title: "Languages",
              description: "English, Spanish, French and other languages",
              levels: "Conversational to Professional",
              icon: "🌎"
            },
            {
              id: 5,
              title: "Test Preparation",
              description: "SAT, GRE, GMAT and other competitive exams",
              levels: "Comprehensive Coaching",
              icon: "📝"
            },
            {
              id: 6,
              title: "Business Studies",
              description: "Accounting, Economics, Finance",
              levels: "High School to MBA",
              icon: "📊"
            }
          ].map((subject, index) => (
            <motion.div 
              key={subject.id}
              variants={fadeIn}
              whileHover={{ y: -5 }}
              className="subject-card bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all border-l-4 border-blue-500"
            >
              <div className="text-4xl mb-4">{subject.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{subject.title}</h3>
              <p className="text-gray-600 mb-4">{subject.description}</p>
              <div className="flex items-center text-sm text-blue-600 font-medium">
                <span>📚 {subject.levels}</span>
              </div>
              <button className="mt-4 w-full bg-blue-50 hover:bg-blue-100 text-blue-600 py-2 px-4 rounded-lg font-medium transition-colors">
                Find Tutors
              </button>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Featured Tutors */}
      <div className="bg-gray-50 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            Our Expert Tutors
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                id: 1,
                name: "Dr. Sarah Johnson",
                subject: "Mathematics",
                rating: "4.9",
                experience: "10+ years",
                image: "https://randomuser.me/api/portraits/women/44.jpg"
              },
              {
                id: 2,
                name: "Prof. Michael Chen",
                subject: "Computer Science",
                rating: "4.8",
                experience: "8 years",
                image: "https://randomuser.me/api/portraits/men/32.jpg"
              },
              {
                id: 3,
                name: "Dr. Emily Wilson",
                subject: "Physics",
                rating: "4.95",
                experience: "12 years",
                image: "https://randomuser.me/api/portraits/women/68.jpg"
              }
            ].map((tutor) => (
              <motion.div 
                key={tutor.id}
                variants={fadeIn}
                whileHover={{ scale: 1.02 }}
                className="tutor-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="relative h-48 bg-gray-200">
                  <img 
                    src={tutor.image} 
                    alt={tutor.name} 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-4 right-4 bg-white px-3 py-1 rounded-full shadow-sm flex items-center">
                    <span className="text-yellow-500 mr-1">★</span>
                    <span className="font-bold">{tutor.rating}</span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{tutor.name}</h3>
                  <p className="text-blue-600 font-medium mb-2">{tutor.subject}</p>
                  <p className="text-gray-500 text-sm mb-4">{tutor.experience} teaching experience</p>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    View Profile
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="py-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12"
          >
            Why Learn With Us
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: "🎓",
                title: "Certified Educators",
                description: "All tutors are vetted professionals with teaching credentials"
              },
              {
                icon: "⏱️",
                title: "Flexible Scheduling",
                description: "Learn at your own pace with 24/7 availability"
              },
              {
                icon: "📱",
                title: "Online & In-Person",
                description: "Choose between virtual or face-to-face sessions"
              },
              {
                icon: "💬",
                title: "1-on-1 Attention",
                description: "Personalized learning plans for each student"
              },
              {
                icon: "💰",
                title: "Affordable Rates",
                description: "Quality education at competitive prices"
              },
              {
                icon: "📈",
                title: "Proven Results",
                description: "90% of students show significant improvement"
              }
            ].map((feature, index) => (
              <motion.div 
                key={index}
                variants={fadeIn}
                whileHover={{ scale: 1.03 }}
                className="feature-card bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* CTA Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="bg-gradient-to-r from-indigo-600 to-blue-500 py-16 px-4 text-center text-white"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Learning?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">Join thousands of students achieving their academic goals with our tutors</p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-full text-lg shadow-lg"
          >
            Find Your Tutor
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-transparent hover:bg-blue-700 border-2 border-white text-white font-bold py-3 px-8 rounded-full text-lg"
          >
            Free Consultation
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Tutor;