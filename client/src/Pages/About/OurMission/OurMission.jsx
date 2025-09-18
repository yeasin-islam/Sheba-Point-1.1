// src/components/OurMission.jsx
import React from 'react';
import { FaLightbulb } from 'react-icons/fa';

export default function OurMission() {
    return (
        <section className="border-b pb-5 rounded-xl border-gray-300 py-16 px-6">
            <div className=" text-center space-y-3">
                {/* Icon */}
                <div className="flex justify-center">
                    <FaLightbulb className="text-[#049CA0] text-5xl animate-bounce" />
                </div>

                {/* Heading */}
                <h2 className="text-4xl font-bold text-[#049CA0]">Our Mission</h2>

                {/* Description */}
                <p className="text-gray-700 text-sm md:text-lg leading-relaxed">
                    To connect patients, doctors, pharmacies and labs into a unified ecosystem where healthcare is <span className="font-bold text-[#049ba0a4]">affordable, accessible, and reliable</span> — anytime.
                </p>

                {/* Core Values */}
                <div className="mt-8 grid md:grid-cols-2 gap-6 text-left">
                    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-[#049CA0] mb-2">Accessibility</h3>
                        <p className="text-gray-600">Healthcare for everyone, regardless of location or socio-economic status.</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-[#049CA0] mb-2">Innovation</h3>
                        <p className="text-gray-600">Leveraging AI and real-time communication to improve healthcare delivery.</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-[#049CA0] mb-2">Security & Trust</h3>
                        <p className="text-gray-600">Ensuring patient privacy and safety with HIPAA-aligned policies and strong encryption.</p>
                    </div>
                    <div className="bg-white rounded-xl border border-gray-100 shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-xl font-semibold text-[#049CA0] mb-2">Collaboration</h3>
                        <p className="text-gray-600">Building bridges between medical professionals, patients, and service providers.</p>
                    </div>
                </div>
            </div>
        </section>
    );
}
