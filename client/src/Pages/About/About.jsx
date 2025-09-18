import React from 'react';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaGlobe, FaFacebook, FaLinkedin, FaTwitter } from 'react-icons/fa';
import OurMission from './OurMission/OurMission';

const About = () => {
    return (
        <div className='max-w-7xl mx-auto px-3 md:px-4 my-10'>
            {/* Header */}
            <div className="text-center border-b pb-5 rounded-xl border-gray-300 space-y-2">
                <h1 className="text-3xl md:text-5xl font-bold text-[#049CA0]">About ShebaPlus</h1>
                <p className="text-gray-600 text-sm md:text-lg">
                    ShebaPlus is a next-generation telemedicine platform designed to revolutionize healthcare by seamlessly connecting patients, doctors, pharmacies, and laboratories within a single, integrated ecosystem. Our platform empowers patients to access timely medical consultations through video and audio calls, receive AI-powered symptom assessments, book lab tests, order prescribed medicines, and even request emergency tele-ambulance services — all from the comfort of their home.
                    For healthcare professionals, ShebaPlus provides a secure, efficient, and fully digital workspace to manage appointments, patient records, prescriptions, and lab results while maintaining compliance with HIPAA and other healthcare regulations. By combining advanced AI tools, real-time communication, and offline support for low-connectivity regions, ShebaPlus ensures healthcare is not just accessible but also reliable, efficient, and patient-centered.
                </p>
            </div>

            {/* Mission & Values */}
            <OurMission />

            {/* Contact Information */}
            <div className="bg-white flex items-center justify-center border-b pb-5 rounded-xl border-gray-300  mt-10 shadow-lg p-8">
                <h2 className="flex animate-pulse delay-100 items-center text-xl font-semibold">
                    Contact Information Updating
                    <span className="flex space-x-1 ml-2">
                        <span className="animate-pulse">.</span>
                        <span className="animate-pulse delay-150">.</span>
                        <span className="animate-pulse delay-300">.</span>
                    </span>
                </h2>

                {/* We have not available our information. */}

                {/* <h2 className="text-2xl font-semibold text-blue-800 mb-6">Contact Information</h2>
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="flex items-center space-x-3">
                        <FaMapMarkerAlt className="text-blue-600 text-xl" />
                        <span>ShebaPlus HQ, Level 5, Tech Valley Tower, Dhaka, Bangladesh</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaPhoneAlt className="text-blue-600 text-xl" />
                        <span>+880 1XXX-XXXXXX</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaEnvelope className="text-blue-600 text-xl" />
                        <span>support@shebaplus.com</span>
                    </div>
                    <div className="flex items-center space-x-3">
                        <FaGlobe className="text-blue-600 text-xl" />
                        <a href="https://www.shebaplus.com" className="text-blue-600 underline">www.shebaplus.com</a>
                    </div>
                </div>
                <div className="flex space-x-6 mt-6">
                    <a href="https://facebook.com/shebaplus" className="text-blue-600 text-2xl hover:text-blue-800"><FaFacebook /></a>
                    <a href="https://linkedin.com/company/shebaplus" className="text-blue-600 text-2xl hover:text-blue-800"><FaLinkedin /></a>
                    <a href="https://twitter.com/shebaplus" className="text-blue-600 text-2xl hover:text-blue-800"><FaTwitter /></a>
                </div> */}
            </div>
        </div>
    );
};

export default About;