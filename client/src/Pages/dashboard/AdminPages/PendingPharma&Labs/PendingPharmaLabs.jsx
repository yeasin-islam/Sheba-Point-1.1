import React, { useState } from 'react';
import { FaFlask, FaCapsules, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt, FaCheckCircle, FaTimesCircle, FaEye, FaBolt, FaRegBuilding } from 'react-icons/fa';

// Static data for pending pharmacies and labs
const pendingPharmaLabs = [
    {
        id: 1,
        name: 'Green Life Pharmacy',
        type: 'Pharmacy',
        email: 'greenlife@pharma.com',
        phone: '01711000001',
        address: '123 Green Road, Dhaka',
        status: 'pending',
        details: '24/7 service, Home delivery available',
        icon: <FaCapsules className="text-[#209187]" />,
    },
    {
        id: 2,
        name: 'LabTech Diagnostics',
        type: 'Lab',
        email: 'info@labtech.com',
        phone: '01711000002',
        address: '456 Lab Street, Chittagong',
        status: 'pending',
        details: 'ISO certified, Advanced equipment',
        icon: <FaFlask className="text-[#e0ad1f]" />,
    },
    {
        id: 3,
        name: 'MediCare Pharmacy',
        type: 'Pharmacy',
        email: 'medicare@pharma.com',
        phone: '01711000003',
        address: '789 Health Ave, Sylhet',
        status: 'pending',
        details: 'Discounts on bulk orders',
        icon: <FaCapsules className="text-[#209187]" />,
    },
];

const PendingPharmaLabs = () => {
    const [items, setItems] = useState(pendingPharmaLabs);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleAccept = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };
    const handleReject = (id) => {
        setItems(items.filter((item) => item.id !== id));
    };
    const handleView = (item) => {
        setSelected(item);
        setShowModal(true);
    };
    const closeModal = () => {
        setShowModal(false);
        setSelected(null);
    };

    return (
        <section className="min-h-screen bg-[#fafdff] p-4 md:p-8">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-[#1F7A6F]">
                        Pending Pharmacies & Labs
                    </h1>
                    <p className="text-[#2D2F32] text-lg mt-2">
                        Review and manage pharmacy & lab applications
                    </p>
                </div>

                {/* Table View */}
                <div className="overflow-hidden rounded-2xl shadow-2xl bg-white border border-[#b2ece6]/40">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-[#e6f8f7] text-[#209187]">
                                <tr>
                                    <th className="py-4 px-6 text-left font-bold">Type</th>
                                    <th className="py-4 px-6 text-left font-bold">Name</th>
                                    <th className="py-4 px-6 text-left font-bold hidden md:table-cell">Email</th>
                                    <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">Phone</th>
                                    <th className="py-4 px-6 text-left font-bold hidden xl:table-cell">Address</th>
                                    <th className="py-4 px-6 text-center font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {items.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-4">
                                                <span className="text-6xl">🎉</span>
                                                <p className="text-xl text-gray-500 font-medium">No pending pharmacies or labs!</p>
                                                <p className="text-gray-400">All applications have been processed.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    items.map((item) => (
                                        <tr key={item.id} className="hover:bg-[#b2ece6]/40 transition-all duration-200 group">
                                            <td className="py-4 px-6 text-xl">{item.icon}</td>
                                            <td className="py-4 px-6 font-semibold text-gray-800 group-hover:text-[#209187] transition-colors">{item.name}</td>
                                            <td className="py-4 px-6 hidden md:table-cell text-gray-600 text-sm">{item.email}</td>
                                            <td className="py-4 px-6 hidden lg:table-cell text-gray-600 font-mono text-sm">{item.phone}</td>
                                            <td className="py-4 px-6 hidden xl:table-cell text-gray-600 text-sm">{item.address}</td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    <button
                                                        className="px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm bg-[#b2ece6] text-[#209187] border border-[#209187]/30"
                                                        onClick={() => handleAccept(item.id)}
                                                    >
                                                        <FaCheckCircle /> Accept
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm bg-[#fff5d6] text-[#e0ad1f] border border-[#e0ad1f]/30"
                                                        onClick={() => handleReject(item.id)}
                                                    >
                                                        <FaTimesCircle /> Reject
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm bg-[#f3f4f6] text-[#27292b] border border-[#27292b]/10"
                                                        onClick={() => handleView(item)}
                                                    >
                                                        <FaEye /> Details
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Modal */}
                {showModal && selected && (
                    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden animate-modalIn border border-[#b2ece6]/40">
                            <button
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#b2ece6] flex items-center justify-center text-[#209187] hover:bg-[#e0ad1f] hover:text-white transition-all duration-200 shadow"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                <FaTimesCircle size={24} />
                            </button>
                            <div className="bg-[#e6f8f7] p-6 text-[#209187] flex items-center gap-4 rounded-t-3xl">
                                <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center text-3xl">
                                    {selected.icon}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{selected.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-lg"><FaRegBuilding /></span>
                                        <span className="text-sm opacity-90">{selected.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xl"><FaEnvelope /></span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Email</p>
                                        <p className="text-sm text-gray-800 font-medium">{selected.email}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xl"><FaPhoneAlt /></span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Phone</p>
                                        <p className="text-sm text-gray-800 font-medium font-mono">{selected.phone}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xl"><FaMapMarkerAlt /></span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Address</p>
                                        <p className="text-sm text-gray-800 font-medium">{selected.address}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xl"><FaBolt /></span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Details</p>
                                        <p className="text-sm text-gray-800 font-medium">{selected.details}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                                    <span className="text-xl"><FaCheckCircle /></span>
                                    <div>
                                        <p className="text-xs text-yellow-600 font-medium">Status</p>
                                        <p className="text-sm text-yellow-800 font-bold capitalize">{selected.status}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};
export default PendingPharmaLabs;