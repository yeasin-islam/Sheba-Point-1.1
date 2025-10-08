import React from 'react';

const marqueeItems = [
  'Lab Testing Services',
  'Medecines & Supplies',
  'Hospitals & Clinics',
  'Health Care Services',
  'Talk to Doctors',
  'Home Care Services',
  'Multi Speciality Treatments & Doctors',
  'Lab Testing Services'
];

const MarqueeSection = () => {
  return (
    <div className="w-full bg-gradient-to-r from-[#1192FE] to-[#038286] py-2 text-white font-medium mb-4 overflow-hidden relative">
      <div
        className="flex whitespace-nowrap animate-marquee items-center"
        style={{ animation: 'marquee 18s linear infinite' }}
      >
        {marqueeItems.map((item, idx) => (
          <span className="flex items-center mx-4" key={idx}>
            {item}
            {idx !== marqueeItems.length - 1 && (
              <span className="mx-3 text-cyan-200 font-bold">&#8212;&#8212;&#8212;</span>
            )}
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
};

export default MarqueeSection;
