import React from 'react';
import { NavLink } from 'react-router';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Main Footer Section */}
            <div className="container mx-auto px-6 py-10 md:px-16 md:py-12">
                <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-16">
                    
                    {/* Column 1 - Logo & Tagline */}
                    <div className="flex flex-col space-y-4 md:w-1/3">
                        <div className="w-42 md:w-48"> {/* Added wrapper div with fixed width */}
                            <img 
                                src="/sheba-point.png" 
                                alt="Sheba Point Logo" 
                                className="w-full h-auto object-contain"
                            />
                        </div>
                        <p className="text-lg font-medium">Your health, anywhere, anytime.</p>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            Connecting patients, doctors, pharmacies, and labs through smart telemedicine.
                        </p>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div className="md:w-1/3">
                        <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                        <nav className="flex flex-col space-y-2">
                            <NavLink to="/" className="hover:text-[#5EC4CF] transition-colors duration-200">
                                Home
                            </NavLink>
                            <NavLink to="/about" className="hover:text-[#5EC4CF] transition-colors duration-200">
                                About
                            </NavLink>
                            <NavLink to="/search-doctors" className="hover:text-[#5EC4CF] transition-colors duration-200">
                                Search Doctors
                            </NavLink>
                            <NavLink to="/symptom-checker" className="hover:text-[#5EC4CF] transition-colors duration-200">
                                Symptom Checker
                            </NavLink>
                            <NavLink to="/health-tips" className="hover:text-[#5EC4CF] transition-colors duration-200">
                                Health Tips
                            </NavLink>
                            <NavLink to="/terms" className="hover:text-[#5EC4CF] transition-colors duration-200">
                                Terms & Privacy
                            </NavLink>
                        </nav>
                    </div>

                    {/* Column 3 - Contact & Social */}
                    <div className="md:w-1/3">
                        <h3 className="text-white font-semibold mb-4">Contact Us</h3>
                        <div className="space-y-2 mb-6">
                            <p>+880 1712 345 678</p>
                            <p>support@shebapoint.com</p>
                            <p>123 Green Road, Dhaka, Bangladesh</p>
                        </div>
                        
                        {/* Social Icons */}
                        <div className="flex space-x-4">
                            <a href="https://facebook.com" 
                               aria-label="Visit our Facebook page"
                               className="hover:text-[#5EC4CF] transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5L14.17.5C10.24.5,9.1,3.3,9.1,5.47V7.47H5.5v3.68h3.6V22h5.4V11.14h3.47Z"/>
                                </svg>
                            </a>
                            <a href="https://twitter.com"
                               aria-label="Visit our Twitter page"
                               className="hover:text-[#5EC4CF] transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M23.95,4.57a10,10,0,0,1-2.82.77,4.96,4.96,0,0,0,2.16-2.72,9.9,9.9,0,0,1-3.12,1.19,4.92,4.92,0,0,0-8.39,4.49A14,14,0,0,1,1.64,3.16,4.92,4.92,0,0,0,3.2,9.72,4.86,4.86,0,0,1,.96,9.11v.06A4.93,4.93,0,0,0,4.88,14a5,5,0,0,1-2.23.08,4.93,4.93,0,0,0,4.6,3.42A9.87,9.87,0,0,1,0,19.54a13.94,13.94,0,0,0,7.55,2.21,13.89,13.89,0,0,0,14-13.95c0-.21,0-.42-.01-.63A10,10,0,0,0,24,4.59Z"/>
                                </svg>
                            </a>
                            <a href="https://linkedin.com"
                               aria-label="Visit our LinkedIn page"
                               className="hover:text-[#5EC4CF] transition-colors duration-200">
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.47,2H3.53A1.45,1.45,0,0,0,2.06,3.43V20.57A1.45,1.45,0,0,0,3.53,22H20.47a1.45,1.45,0,0,0,1.47-1.43V3.43A1.45,1.45,0,0,0,20.47,2ZM8.09,18.74h-3v-9h3ZM6.59,8.48A1.56,1.56,0,1,1,8.15,6.92,1.57,1.57,0,0,1,6.59,8.48ZM18.91,18.74h-3V13.91c0-1.38-.49-2.18-1.72-2.18A1.89,1.89,0,0,0,12.42,13a2.4,2.4,0,0,0-.11.85v4.89h-3s.05-8,0-9h3v1.37a3.35,3.35,0,0,1,3-1.65c2.18,0,3.81,1.43,3.81,4.48Z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Copyright Bar */}
            <div className="border-t border-slate-700">
                <div className="container mx-auto px-6 py-4">
                    <p className="text-slate-500 text-sm text-center">
                        © {currentYear} ShebaPoint. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;