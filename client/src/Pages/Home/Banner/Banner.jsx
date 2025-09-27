import { FaSearch, FaMapMarkerAlt, FaVenusMars, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";

const floatingAnimation = {
  y: [0, -10, 0, 10, 0], // smooth float
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
  }
};

const Banner = () => {
  return (
    <section className="relative w-full min-h-[90vh] flex items-center bg-gradient-to-br from-[#e6f7f9] via-white to-[#dff7f9] overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-72 h-72 lg:w-96 lg:h-96 bg-[#04B2B5]/10 rounded-full blur-3xl -top-20 -left-20"></div>
        <div className="absolute w-60 h-60 lg:w-80 lg:h-80 bg-[#049CA0]/10 rounded-full blur-3xl bottom-0 right-0"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 flex flex-col lg:grid lg:grid-cols-2 items-center gap-10 lg:gap-16 z-10 w-full">
        
        {/* LEFT: Text + Search */}
        <div className="w-full text-center lg:text-left order-2 lg:order-1">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-extrabold text-[#0a2540] leading-snug mb-4 drop-shadow-sm">
            Sheba Point: Your Trusted Healthcare Partner{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#04B2B5] to-[#049CA0] drop-shadow">
              Doctors
            </span>{" "}
            & Services
          </h1>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl mb-6 max-w-xl mx-auto lg:mx-0">
            Connect with top medical professionals, book appointments, and
            manage your health all in one trusted space.
          </p>

          {/* Search Filter Section */}
          <div className="bg-white/80 backdrop-blur-md shadow-xl rounded-xl p-4 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 items-stretch">
            {/* Search Doctors */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1 bg-white min-w-[140px]">
              <FaSearch className="text-[#04B2B5]" />
              <input
                type="text"
                placeholder="Search doctors, clinics..."
                className="outline-none flex-1 text-sm"
              />
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1 bg-white min-w-[120px]">
              <FaMapMarkerAlt className="text-[#04B2B5]" />
              <input
                type="text"
                placeholder="Location"
                className="outline-none flex-1 text-sm"
              />
            </div>

            {/* Gender */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 flex-1 bg-white min-w-[120px]">
              <FaVenusMars className="text-[#04B2B5]" />
              <select className="outline-none flex-1 text-sm bg-transparent">
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            {/* Button */}
            <button className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-[#04B2B5] to-[#049CA0] text-white rounded-lg font-semibold hover:opacity-95 transition">
              Search
            </button>
          </div>
        </div>

        {/* RIGHT: Doctor Image + Floating Stats */}
        <div className="relative flex justify-center order-1 lg:order-2 w-full">
          <img
            src="https://images.unsplash.com/photo-1511174511562-5f7f18b874f8?auto=format&fit=crop&w=500&q=80"
            alt="Doctor"
            className="w-[240px] sm:w-[300px] md:w-[360px] lg:w-[440px] object-cover rounded-2xl shadow-lg"
          />

          {/* Floating - 5K+ Appointments */}
          <motion.div
            animate={floatingAnimation}
            className="absolute top-4 sm:top-6 left-4 sm:left-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg px-3 py-2 sm:px-4 sm:py-2 flex items-center gap-2"
          >
            <FaStar className="text-yellow-400 text-sm sm:text-base" />
            <span className="font-semibold text-xs sm:text-sm text-gray-700">
              5K+ Appointments
            </span>
          </motion.div>

          {/* Floating - Patients avatars bottom-right */}
          <motion.div
            animate={floatingAnimation}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute bottom-4 sm:bottom-6 right-4 sm:right-6 bg-white/80 backdrop-blur-md rounded-lg shadow-lg px-3 py-2 sm:px-4 sm:py-3"
          >
            <span className="font-bold text-xs sm:text-sm text-[#04B2B5]">
              15K+ Satisfied Patients
            </span>
            <div className="flex mt-2 -space-x-2">
              <img
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/65.jpg"
                alt="patient"
              />
              <img
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="patient"
              />
              <img
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-white"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="patient"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Banner;