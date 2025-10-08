import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import { FaChevronLeft, FaChevronRight, FaCalendarAlt, FaStar, FaMapMarkerAlt, FaUserMd } from "react-icons/fa";

// Dummy doctor data (your 6 doctors)
const mockDoctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    rating: 4.8,
    reviews: 245,
    fees: 250,
    available: true,
    experience: "12+ years",
    location: "New York",
    image:
      "https://img.freepik.com/free-photo/woman-doctor-wearing-lab-coat-with-stethoscope-isolated_1303-29791.jpg",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    rating: 4.9,
    reviews: 189,
    fees: 180,
    available: true,
    experience: "15+ years",
    location: "California",
    image:
      "https://img.freepik.com/free-photo/portrait-smiling-male-doctor_171337-1532.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Martinez",
    specialty: "Pediatrician",
    rating: 4.7,
    reviews: 312,
    fees: 200,
    available: true,
    experience: "8+ years",
    location: "Texas",
    image:
      "https://img.freepik.com/free-photo/female-doctor-hospital-with-stethoscope_23-2148827776.jpg",
  },
  {
    id: 4,
    name: "Dr. David Wilson",
    specialty: "Orthopedic Surgeon",
    rating: 4.9,
    reviews: 156,
    fees: 300,
    available: true,
    experience: "20+ years",
    location: "Florida",
    image:
      "https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5790.jpg",
  },
  {
    id: 5,
    name: "Dr. Lisa Anderson",
    specialty: "Dermatologist",
    rating: 4.8,
    reviews: 278,
    fees: 220,
    available: true,
    experience: "10+ years",
    location: "Illinois",
    image:
      "https://img.freepik.com/free-photo/front-view-female-doctor-with-medical-mask-posing-with-crossed-arms_23-2148445082.jpg",
  },
  {
    id: 6,
    name: "Dr. James Thompson",
    specialty: "Psychiatrist",
    rating: 4.9,
    reviews: 203,
    fees: 210,
    available: true,
    experience: "14+ years",
    location: "Washington",
    image:
      "https://img.freepik.com/free-photo/young-handsome-physician-medical-robe-with-stethoscope_1303-17818.jpg",
  },
];

const TopRatedDoctors = ({ doctors = mockDoctors }) => {
  const rowRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // compute visible count based on viewport width
  const getVisibleCount = () => {
    if (typeof window === "undefined") return 3;
    const w = window.innerWidth;
    if (w >= 1024) return 3; // lg
    if (w >= 640) return 2; // md/sm
    return 1; // mobile
  };

  // scroll by one page (visibleCount * card width + gap)
  const scrollByPage = (direction = "right") => {
    const el = rowRef.current;
    if (!el) return;

    const children = el.querySelectorAll(".doc-card");
    if (!children.length) return;

    const firstCard = children[0];
    const cardWidth = firstCard.offsetWidth;
    const gap = 24;
    const visible = getVisibleCount();
    const scrollAmount = (cardWidth + gap) * visible;

    const newIndex = direction === "left" 
      ? Math.max(0, currentIndex - visible)
      : Math.min(doctors.length - visible, currentIndex + visible);
    
    setCurrentIndex(newIndex);

    el.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-slate-50 py-16 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[#049CA0]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Title */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center mb-6">
            <span className="bg-[#049CA0] text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <FaUserMd className="inline mr-2" />
              Featured Doctors
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Our Highlighted Doctors
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Meet our exceptional healthcare professionals dedicated to providing world-class medical care
          </p>
        </div>

        {/* Horizontal scroll row */}
        <div className="relative">
          <div
            ref={rowRef}
            className="flex gap-8 overflow-x-auto pb-6 scroll-smooth scrollbar-hide"
          >
            {doctors.map((doctor, index) => (
              <div
                key={doctor.id}
                className={`doc-card relative flex-shrink-0 w-80 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden group hover:scale-105 transform ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Rating badge */}
                <div className="absolute top-4 left-4 bg-orange-500 text-white text-sm font-bold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1">
                  <FaStar className="text-xs" />
                  {doctor.rating}
                </div>

                {/* Available badge */}
                {doctor.available && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg z-10 flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    Available
                  </div>
                )}

                {/* Doctor image with overlay */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>

                {/* Doctor details */}
                <div className="p-6">
                  {/* Specialty */}
                  <div className="mb-3">
                    <span className="text-sm font-semibold text-[#049CA0] border-l-4 border-[#049CA0] pl-3 bg-[#049CA0]/5 py-1 rounded-r-lg">
                      {doctor.specialty}
                    </span>
                  </div>

                  {/* Name */}
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-[#049CA0] transition-colors duration-300">
                    {doctor.name}
                  </h3>

                  {/* Experience and Location */}
                  <div className="flex items-center gap-4 mb-4 text-sm text-slate-600">
                    <div className="flex items-center gap-1">
                      <FaCalendarAlt className="text-[#049CA0]" />
                      <span>{doctor.experience}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaMapMarkerAlt className="text-orange-500" />
                      <span>{doctor.location}</span>
                    </div>
                  </div>

                  {/* Reviews */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex text-orange-400">
                      {[...Array(5)].map((_, i) => (
                        <FaStar key={i} className={`text-xs ${i < Math.floor(doctor.rating) ? 'text-orange-500' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <span className="text-sm text-slate-600">({doctor.reviews} reviews)</span>
                  </div>

                  {/* Fees + Book button */}
                  <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                    <div>
                      <p className="text-2xl font-bold text-[#E63946]">
                        ${doctor.fees}
                      </p>
                      <p className="text-xs text-slate-500">Consultation fee</p>
                    </div>
                    <Link
                      to="/book-appointment"
                      className="group/btn px-6 py-3 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-all duration-300 hover:scale-105 hover:shadow-lg flex items-center gap-2"
                    >
                      <FaCalendarAlt className="text-xs group-hover/btn:animate-pulse" />
                      Book Now
                    </Link>
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-[#049CA0]/20 rounded-2xl transition-all duration-500"></div>
              </div>
            ))}
          </div>

          {/* Arrows centered under the row */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => scrollByPage("left")}
              aria-label="scroll left"
              className="group w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-lg flex items-center justify-center hover:shadow-xl hover:border-[#049CA0] transition-all duration-300 hover:scale-110"
            >
              <FaChevronLeft className="text-slate-700 group-hover:text-[#049CA0] transition-colors duration-300" />
            </button>
            <button
              onClick={() => scrollByPage("right")}
              aria-label="scroll right"
              className="group w-12 h-12 rounded-full bg-white border-2 border-slate-200 shadow-lg flex items-center justify-center hover:shadow-xl hover:border-[#049CA0] transition-all duration-300 hover:scale-110"
            >
              <FaChevronRight className="text-slate-700 group-hover:text-[#049CA0] transition-colors duration-300" />
            </button>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-6">
            {doctors.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  const el = rowRef.current;
                  if (el) {
                    const cardWidth = 320 + 32; // card width + gap
                    el.scrollTo({
                      left: index * cardWidth,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / getVisibleCount()) === Math.floor(index / getVisibleCount())
                    ? 'bg-[#049CA0] w-8' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <Link
            to="/doctors"
            className="group inline-flex items-center gap-3 bg-[#049CA0] hover:bg-[#037a7d] text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <FaUserMd className="group-hover:animate-pulse" />
            <span>View All Doctors</span>
            <FaChevronRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* hide native scrollbar */}
      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default TopRatedDoctors;