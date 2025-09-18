import React from 'react';
import { Link } from 'react-router-dom';

// Star icon component
const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? 'text-[#049CA0]' : 'text-gray-300'}`}
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

// Rating component
const Rating = ({ value }) => {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, index) => (
        <StarIcon key={index} filled={index < Math.floor(value)} />
      ))}
      <span className="ml-1 text-sm font-medium text-slate-600">({value})</span>
    </div>
  );
};

// Static doctor data
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    image: "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.9,
    image: "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Martinez",
    specialty: "Pediatrician",
    rating: 4.7,
    image: "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg",
  },
  {
    id: 4,
    name: "Dr. David Wilson",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    image: "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Dermatologist",
    rating: 4.8,
    image: "https://img.freepik.com/free-photo/front-view-female-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg",
  },
  {
    id: 6,
    name: "Dr. James Thompson",
    specialty: "Psychiatrist",
    rating: 4.9,
    image: "https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg",
  },
];

const TopRatedDoctors = ({ doctors = mockDoctors }) => {
  return (
    <section className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Top Rated Doctors
          </h2>
          <p className="text-slate-600 text-lg">
            Choose from trusted specialists with high patient ratings
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-6 flex flex-col items-center"
            >
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-24 h-24 rounded-full object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-slate-900 mb-1">
                {doctor.name}
              </h3>
              <p className="text-slate-600 mb-3">{doctor.specialty}</p>
              <Rating value={doctor.rating} />
              <Link
                to="/book-appointment"
                className="mt-4 px-6 py-2 bg-[#049CA0] text-white rounded-lg font-semibold hover:bg-[#038387] transition-colors duration-300"
              >
                Book Now
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopRatedDoctors;