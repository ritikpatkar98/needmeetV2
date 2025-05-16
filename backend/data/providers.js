const providers = [
  {
    _id: "1",
    name: "John's Plumbing",
    services: ["Plumbing", "Pipe Repair", "Water Heater Installation", "Drain Cleaning"],
    location: "New York, NY",
    rating: 4.8,
    experience: 15,
    priceRange: {
      min: 50,
      max: 200
    },
    description: "Professional plumbing services with 15 years of experience.",
    reviews: [
      {
        _id: "r1",
        userName: "Sarah M.",
        rating: 5,
        comment: "Excellent service! Fixed my leaking pipe quickly.",
        date: "2024-03-15"
      },
      {
        _id: "r2",
        userName: "Mike D.",
        rating: 4.5,
        comment: "Very professional and punctual.",
        date: "2024-03-10"
      }
    ],
    availability: ["Mon-Fri: 8AM-6PM", "Sat: 9AM-3PM"]
  },
  {
    _id: "2",
    name: "Elite Electrical Services",
    services: ["Electrical Repair", "Wiring Installation", "Light Fixture Installation", "Circuit Breaker Service"],
    location: "Brooklyn, NY",
    rating: 4.9,
    experience: 12,
    priceRange: {
      min: 60,
      max: 250
    },
    description: "Licensed electricians providing quality electrical services.",
    reviews: [
      {
        _id: "r3",
        userName: "John K.",
        rating: 5,
        comment: "Very knowledgeable and professional team.",
        date: "2024-03-14"
      },
      {
        _id: "r4",
        userName: "Lisa R.",
        rating: 4.8,
        comment: "Fixed our electrical issues efficiently.",
        date: "2024-03-12"
      }
    ],
    availability: ["Mon-Sat: 7AM-7PM"]
  },
  {
    _id: "3",
    name: "Quick Fix Carpentry",
    services: ["Carpentry", "Furniture Assembly", "Wood Repair", "Custom Cabinets"],
    location: "Queens, NY",
    rating: 4.7,
    experience: 8,
    priceRange: {
      min: 45,
      max: 180
    },
    description: "Expert carpentry solutions for your home and office.",
    reviews: [
      {
        _id: "r5",
        userName: "David M.",
        rating: 4.7,
        comment: "Great work on my custom cabinets!",
        date: "2024-03-13"
      }
    ],
    availability: ["Mon-Fri: 9AM-5PM"]
  },
  {
    _id: "4",
    name: "Spotless Cleaning Co",
    services: ["House Cleaning", "Deep Cleaning", "Move-in/Move-out Cleaning", "Office Cleaning"],
    location: "Manhattan, NY",
    rating: 4.8,
    experience: 10,
    priceRange: {
      min: 80,
      max: 300
    },
    description: "Professional cleaning services for homes and offices.",
    reviews: [
      {
        _id: "r6",
        userName: "Emily W.",
        rating: 5,
        comment: "Best cleaning service I've ever used!",
        date: "2024-03-15"
      }
    ],
    availability: ["Mon-Sun: 8AM-6PM"]
  },
  {
    _id: "5",
    name: "Green Thumb Gardens",
    services: ["Gardening", "Lawn Care", "Landscaping", "Tree Trimming"],
    location: "Staten Island, NY",
    rating: 4.6,
    experience: 20,
    priceRange: {
      min: 75,
      max: 400
    },
    description: "Complete garden maintenance and landscaping solutions.",
    reviews: [
      {
        _id: "r7",
        userName: "Patricia L.",
        rating: 4.6,
        comment: "Transformed our garden beautifully!",
        date: "2024-03-11"
      }
    ],
    availability: ["Mon-Sat: 7AM-5PM"]
  },
  {
    _id: "6",
    name: "Tech Home Solutions",
    services: ["Smart Home Installation", "TV Mounting", "Home Theater Setup", "Network Setup"],
    location: "Brooklyn, NY",
    rating: 4.9,
    experience: 7,
    priceRange: {
      min: 90,
      max: 500
    },
    description: "Making homes smarter with latest technology solutions.",
    reviews: [
      {
        _id: "r8",
        userName: "Robert T.",
        rating: 5,
        comment: "Excellent smart home setup service!",
        date: "2024-03-14"
      }
    ],
    availability: ["Mon-Fri: 9AM-7PM", "Sat: 10AM-4PM"]
  },
  {
    _id: "7",
    name: "Paint Perfect",
    services: ["Interior Painting", "Exterior Painting", "Wallpaper Installation", "Color Consulting"],
    location: "Queens, NY",
    rating: 4.7,
    experience: 15,
    priceRange: {
      min: 200,
      max: 2000
    },
    description: "Professional painting services for any space.",
    reviews: [
      {
        _id: "r9",
        userName: "Jennifer H.",
        rating: 4.7,
        comment: "Great attention to detail!",
        date: "2024-03-12"
      }
    ],
    availability: ["Mon-Sat: 8AM-6PM"]
  },
  {
    _id: "8",
    name: "AC Comfort Zone",
    services: ["AC Installation", "AC Repair", "HVAC Maintenance", "Heating Services"],
    location: "Bronx, NY",
    rating: 4.8,
    experience: 18,
    priceRange: {
      min: 80,
      max: 1000
    },
    description: "Complete HVAC solutions for your comfort.",
    reviews: [
      {
        _id: "r10",
        userName: "Michael P.",
        rating: 4.8,
        comment: "Fast and efficient AC repair service.",
        date: "2024-03-15"
      }
    ],
    availability: ["Mon-Sun: 24/7 Emergency Service"]
  },
  {
    _id: "9",
    name: "Pest Control Experts",
    services: ["Pest Control", "Termite Treatment", "Rodent Control", "Bed Bug Treatment"],
    location: "Manhattan, NY",
    rating: 4.7,
    experience: 25,
    priceRange: {
      min: 100,
      max: 500
    },
    description: "Safe and effective pest control solutions.",
    reviews: [
      {
        _id: "r11",
        userName: "Susan K.",
        rating: 4.7,
        comment: "Very thorough and professional service.",
        date: "2024-03-13"
      }
    ],
    availability: ["Mon-Fri: 8AM-6PM", "Sat: 9AM-2PM"]
  },
  {
    _id: "10",
    name: "Security Systems Pro",
    services: ["Security Camera Installation", "Alarm System Setup", "Door Lock Installation", "Intercom Systems"],
    location: "Brooklyn, NY",
    rating: 4.9,
    experience: 14,
    priceRange: {
      min: 150,
      max: 1500
    },
    description: "Keeping your home safe with modern security solutions.",
    reviews: [
      {
        _id: "r12",
        userName: "William R.",
        rating: 4.9,
        comment: "Excellent security system installation!",
        date: "2024-03-14"
      }
    ],
    availability: ["Mon-Fri: 9AM-6PM"]
  },
  {
    _id: "11",
    name: "Moving Masters",
    services: ["Local Moving", "Packing Services", "Furniture Moving"],
    location: "Queens, NY",
    rating: 4.6,
    experience: 10,
    priceRange: {
      min: 100,
      max: 500
    },
    description: "Professional and reliable moving services.",
    reviews: [
      {
        _id: "r13",
        userName: "James L.",
        rating: 4.6,
        comment: "Very professional and efficient moving service.",
        date: "2024-03-12"
      }
    ],
    availability: ["Mon-Fri: 8AM-6PM"]
  },
  {
    _id: "12",
    name: "Appliance Repair Team",
    services: ["Refrigerator Repair", "Washer/Dryer Repair", "Dishwasher Repair"],
    location: "Bronx, NY",
    rating: 4.8,
    experience: 5,
    priceRange: {
      min: 50,
      max: 200
    },
    description: "Expert repair services for all major appliances.",
    reviews: [
      {
        _id: "r14",
        userName: "Linda S.",
        rating: 4.8,
        comment: "Fast and efficient appliance repair service.",
        date: "2024-03-15"
      }
    ],
    availability: ["Mon-Fri: 9AM-5PM"]
  }
];

module.exports = providers;
