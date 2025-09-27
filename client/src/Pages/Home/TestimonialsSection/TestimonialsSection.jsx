import React from 'react';

const testimonials = [
  {
    name: 'Jennifer Robinson',
    role: 'Patient',
    text: 'Nice Treatment. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    rating: 5
  },
  {
    name: 'Denise Stevens',
    role: 'Patient',
    text: 'Good Hospitality. It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.',
    img: 'https://randomuser.me/api/portraits/women/65.jpg',
    rating: 5
  },
  {
    name: 'Charles Ortega',
    role: 'Patient',
    text: 'Excellent atmosphere and amazing doctors. Truly felt cared for!',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    rating: 5
  }
];

const stats = [
  { label: 'Doctors Available', value: '500+', color: 'text-cyan-600', underline: 'border-cyan-400' },
  { label: 'Specialities', value: '18+', color: 'text-purple-600', underline: 'border-purple-400' },
  { label: 'Bookings Done', value: '30K', color: 'text-cyan-600', underline: 'border-cyan-400' },
  { label: 'Hospitals & Clinic', value: '97+', color: 'text-purple-600', underline: 'border-purple-400' },
  { label: 'Lab Tests Available', value: '317+', color: 'text-cyan-600', underline: 'border-cyan-400' }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-14 text-center">
          <span className="px-5 py-1 rounded-full bg-cyan-500 text-white text-xs font-semibold uppercase tracking-wider mb-3 shadow-sm">
            Testimonials
          </span>
          <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
            15k+ Users <span className="text-cyan-600">Trust Sheba Point</span>
          </h2>
        </div>

        {/* Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl shadow-md p-6 flex flex-col justify-between transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
            >
              <div>
                {/* Ratings */}
                <div className="flex items-center mb-3">
                  {[...Array(t.rating)].map((_, i) => (
                    <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 
                      1 0 00.95.69h4.175c.969 0 
                      1.371 1.24.588 
                      1.81l-3.38 
                      2.455a1 1 0 
                      00-.364 
                      1.118l1.287 
                      3.966c.3.921-.755 
                      1.688-1.54 
                      1.118l-3.38-2.455a1 
                      1 0 
                      00-1.175 
                      0l-3.38 
                      2.455c-.784.57-1.838-.197-1.539-1.118l1.287-3.966a1 
                      1 0 
                      00-.364-1.118L2.174 
                      9.393c-.783-.57-.38-1.81.588-1.81h4.175a1 
                      1 0 
                      00.95-.69l1.286-3.966z"/>
                    </svg>
                  ))}
                </div>

                <h3 className="font-semibold text-lg text-gray-800 mb-2">{t.text.split('.')[0]}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{t.text.split('.').slice(1).join('.')}</p>
              </div>

              {/* User */}
              <div className="flex items-center mt-5">
                <img src={t.img} alt={t.name} className="w-12 h-12 rounded-full object-cover border-2 border-cyan-200 shadow-sm mr-3" />
                <div>
                  <span className="text-cyan-700 font-semibold block">{t.name}</span>
                  <span className="text-xs text-gray-400">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="transform hover:scale-105 transition-transform duration-300"
            >
              <span className={`text-3xl font-extrabold ${stat.color} block mb-1`}>
                {stat.value}
              </span>
              <div className={`w-12 mx-auto border-b-2 ${stat.underline} mb-2`}></div>
              <span className="text-sm text-gray-600 font-medium">{stat.label}</span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;