import React, { useRef, useState, useEffect } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaEye,
  FaFlask,
  FaHeartbeat,
  FaTooth,
  FaBrain,
  FaBone,
  FaWaveSquare,
  FaStethoscope,
} from "react-icons/fa";

const specialties = [
  {
    name: "Ophthalmology",
    doctors: 12,
    patients: "2.5k+",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaEye className="text-2xl" />,
    description: "Expert eye care and vision solutions"
  },
  {
    name: "Laboratory",
    doctors: 8,
    patients: "5k+",
    image: "https://images.unsplash.com/photo-1582719471384-894fbb16e074?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaFlask className="text-2xl" />,
    description: "Advanced diagnostic testing services"
  },
  {
    name: "Cardiology",
    doctors: 15,
    patients: "3.2k+",
    image: "https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaHeartbeat className="text-2xl" />,
    description: "Comprehensive heart care specialists"
  },
  {
    name: "Dentistry",
    doctors: 10,
    patients: "4.1k+",
    image: "https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaTooth className="text-2xl" />,
    description: "Complete dental health solutions"
  },
  {
    name: "Neurology",
    doctors: 7,
    patients: "1.8k+",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaBrain className="text-2xl" />,
    description: "Advanced neurological treatments"
  },
  {
    name: "Orthopedic",
    doctors: 9,
    patients: "2.9k+",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaBone className="text-2xl" />,
    description: "Bone and joint care experts"
  },
  {
    name: "Ultrasound",
    doctors: 6,
    patients: "3.5k+",
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaWaveSquare className="text-2xl" />,
    description: "Modern imaging diagnostics"
  },
  {
    name: "General Medicine",
    doctors: 20,
    patients: "6k+",
    image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=600&q=80",
  gradient: "bg-[#2196F3]",
    icon: <FaStethoscope className="text-2xl" />,
    description: "Primary healthcare services"
  },
];

const TopSpecialties = () => {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollCards = (direction) => {
    if (scrollRef.current) {
      const cardWidth = 320;
      const newIndex = direction === "left" 
        ? Math.max(0, currentIndex - 1)
        : Math.min(specialties.length - 1, currentIndex + 1);
      
      setCurrentIndex(newIndex);
      scrollRef.current.scrollTo({
        left: newIndex * cardWidth,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-16 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent mb-6">
            Top Medical Specialties
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive range of medical specialties with world-class healthcare professionals dedicated to your wellbeing
          </p>
        </div>

        {/* Cards Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-8 overflow-x-auto scrollbar-hide pb-6"
            style={{ scrollSnapType: "x mandatory" }}
          >
            {specialties.map((specialty, index) => (
              <div
                key={index}
                className={`flex-shrink-0 w-80 group cursor-pointer transform transition-all duration-700 hover:scale-105 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
                }`}
                style={{ 
                  scrollSnapAlign: "start",
                  transitionDelay: `${index * 100}ms`
                }}
              >
                <div className="relative h-64 rounded-2xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-all duration-500 bg-white">
                  {/* Image with overlay */}
                  <div className="absolute inset-0">
                    <img
                      src={specialty.image}
                      alt={specialty.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-br ${specialty.gradient} opacity-80 group-hover:opacity-70 transition-opacity duration-500`}></div>
                  </div>

                  {/* Content overlay */}
                  <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 group-hover:bg-white/30 transition-all duration-500">
                        {specialty.icon}
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-medium opacity-90">{specialty.patients}</div>
                        <div className="text-xs opacity-75">Patients</div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-200 transition-colors duration-300">
                        {specialty.name}
                      </h3>
                      <p className="text-sm opacity-90 mb-3 leading-relaxed">
                        {specialty.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">
                          {specialty.doctors} Expert Doctors
                        </span>
                        <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                          <FaChevronRight className="text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hover effect border */}
                  <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/30 rounded-2xl transition-all duration-500"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="flex justify-center gap-4 mt-12">
            <button
              onClick={() => scrollCards("left")}
              disabled={currentIndex === 0}
              className="group w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-100"
            >
              <FaChevronLeft className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300" size={18} />
            </button>
            <button
              onClick={() => scrollCards("right")}
              disabled={currentIndex === specialties.length - 1}
              className="group w-14 h-14 rounded-full bg-white shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center transition-all duration-300 hover:scale-110 border border-gray-100"
            >
              <FaChevronRight className="text-gray-600 group-hover:text-blue-600 transition-colors duration-300" size={18} />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {specialties.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentIndex(index);
                  scrollRef.current?.scrollTo({
                    left: index * 320,
                    behavior: "smooth"
                  });
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-blue-600 w-8' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              />
            ))}
          </div>
        </div>

      </div>

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default TopSpecialties;