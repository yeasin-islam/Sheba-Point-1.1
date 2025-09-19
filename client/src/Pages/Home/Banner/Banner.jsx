import { useState, useEffect } from "react";
import { Link } from "react-router";

const Banner = () => {
  const images = [
    "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?auto=format&fit=crop&w=2091&q=80", // doctor consultation
    "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?auto=format&fit=crop&w=2070&q=80", // medical team
    "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2080&q=80", // modern hospital
  ];

  const [current, setCurrent] = useState(0);

  // Simple autoplay
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <div className="relative w-full h-[90vh] overflow-hidden">
      {/* Background images carousel */}
      <div
        className="flex transition-transform duration-700 w-full h-full"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0 relative"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* Dark overlay */}
            <div className="absolute inset-0 bg-black/50"></div>
          </div>
        ))}
      </div>

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg">
          Your health, anywhere, anytime.
        </h1>
        <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
          Consult top doctors, order medicines, and book lab tests — all in one platform.
        </p>
        <div className="flex flex-col md:flex-row gap-4">
          <Link
            to="/book-appointment"
            className="px-6 py-3 bg-[#049CA0] text-white rounded-lg font-semibold hover:bg-[#037c80] transition-colors duration-300"
          >
            Book Appointment
          </Link>
          <Link
            to="/symptom-checker"
            className="px-6 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-[#049CA0] transition-colors duration-300"
          >
            Symptom Checker
          </Link>
        </div>
      </div>

      {/* Dots Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 ${
              current === index ? "bg-[#049CA0]" : "bg-gray-400"
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Banner;