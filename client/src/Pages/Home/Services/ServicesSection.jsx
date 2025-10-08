import React from 'react';
import { Link } from 'react-router';
import { 
    FaCalendarAlt, 
    FaUserMd, 
    FaHospital, 
    FaHeartbeat, 
    FaPills, 
    FaFlask, 
    FaHome 
} from 'react-icons/fa';

const services = [
    {
        label: 'Book Appointment',
        color: '#7C3AED',
        icon: FaCalendarAlt,
        link: '/book-appointment'
    },
    {
        label: 'Talk to Doctors',
        color: '#2196F3',
        icon: FaUserMd,
        link: '/doctors'
    },
    {
        label: 'Hospitals & Clinics',
        color: '#E91E63',
        icon: FaHospital,
        link: '/hospitals'
    },
    {
        label: 'Healthcare',
        color: '#4CAF50',
        icon: FaHeartbeat,
        link: '/healthcare'
    },
    {
        label: 'Medicine & Supplies',
        color: '#FF9800',
        icon: FaPills,
        link: '/medicine'
    },
    {
        label: 'Lab Testing',
        color: '#F4511E',
        icon: FaFlask,
        link: '/lab-testing'
    },
    {
        label: 'Home Care',
        color: '#009688',
        icon: FaHome,
        link: '/home-care'
    },
];

const ServicesSection = () => (
    <section className="w-full py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                    Our Services
                </h2>
                <p className="text-gray-600">
                    Complete healthcare solutions at your fingertips
                </p>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-6">
                {services.map((service) => {
                    const IconComponent = service.icon;
                    return (
                        <Link 
                            key={service.label} 
                            to={service.link}
                            className="group cursor-pointer block"
                        >
                            <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 h-36 flex flex-col justify-center items-center">
                                {/* Icon with 3D flip effect */}
                                <div 
                                    className="w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-3 transition-all duration-700 ease-in-out group-hover:[transform:rotateY(360deg)]"
                                    style={{ 
                                        backgroundColor: `${service.color}15`,
                                        transformStyle: 'preserve-3d',
                                        perspective: '1000px'
                                    }}
                                >
                                    <IconComponent 
                                        size={28} 
                                        style={{ color: service.color }}
                                        className="transition-all duration-700 ease-in-out group-hover:scale-125"
                                    />
                                </div>
                                
                                {/* Label */}
                                <h3 className="text-xs font-medium text-gray-800 leading-tight group-hover:text-gray-900">
                                    {service.label}
                                </h3>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    </section>
);

export default ServicesSection;