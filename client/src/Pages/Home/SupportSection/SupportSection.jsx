import React from 'react';

const SupportSection = () => {
  return (
    <section className="max-w-5xl mx-auto px-4 mb-12">
      <div className="bg-gradient-to-r from-blue-500 to-cyan-400 rounded-3xl shadow-lg flex flex-col md:flex-row items-center justify-between py-12 px-8 md:px-16 overflow-hidden relative">
        
        {/* Left Heading */}
        <h2 className="text-white text-3xl md:text-4xl font-extrabold leading-snug text-center md:text-left mb-8 md:mb-0 md:mr-12">
          Working for <br className="hidden sm:block"/> Your Better Health
        </h2>
        
        {/* Contact Options */}
        <div className="flex flex-col md:flex-row gap-10 items-center">
          
          {/* Phone */}
          <div className="flex items-center gap-4 group">
            <span className="bg-white rounded-full p-4 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
              <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10a3 3 0 11-6 0 3 3 0 016 0z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.4 15a8 8 0 10-14.8 0"/>
              </svg>
            </span>
            <div className="text-white leading-snug">
              <div className="font-semibold text-base md:text-lg">Customer Support</div>
              <div className="text-sm opacity-90">+1 56589 54598</div>
            </div>
          </div>
          
          {/* Email */}
          <div className="flex items-center gap-4 group">
            <span className="bg-white rounded-full p-4 shadow-md transition-transform duration-300 group-hover:scale-110 group-hover:shadow-xl">
              <svg className="w-7 h-7 text-cyan-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 15a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v8z"/>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 11h8M8 15h8"/>
              </svg>
            </span>
            <div className="text-white leading-snug">
              <div className="font-semibold text-base md:text-lg">Drop Us an Email</div>
              <div className="text-sm opacity-90">info1256@example.com</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};

export default SupportSection;