import React, { useState } from "react";
import { FaUserMd, FaHospitalSymbol, FaEnvelope, FaPhoneAlt, FaBolt, FaCheckCircle, FaTimesCircle, FaEye, FaUserNurse, FaBaby, FaStethoscope, FaTable, FaIdBadge, FaClipboardList, FaHourglassHalf } from "react-icons/fa";

// Dummy data for pending doctors
const pendingDoctors = [
    {
        id: 1,
        name: 'Dr. Ayesha Rahman',
        specialty: 'Cardiology',
        email: 'ayesha.rahman@example.com',
        phone: '01710000001',
        status: 'pending',
        details: 'MBBS, FCPS, 10 years experience',
    avatar: <FaUserNurse />,
    specialtyIcon: <FaStethoscope />
    },
    {
        id: 2,
        name: 'Dr. Imran Hossain',
        specialty: 'Dermatology',
        email: 'imran.hossain@example.com',
        phone: '01710000002',
        status: 'pending',
        details: 'MBBS, MD, 8 years experience',
    avatar: <FaUserMd />,
    specialtyIcon: <FaHospitalSymbol />
    },
    {
        id: 3,
        name: 'Dr. Nusrat Jahan',
        specialty: 'Pediatrics',
        email: 'nusrat.jahan@example.com',
        phone: '01710000003',
        status: 'pending',
        details: 'MBBS, DCH, 5 years experience',
    avatar: <FaUserNurse />,
    specialtyIcon: <FaBaby />
    },
];

// Static functions
function getAllPendingDoctors() {
    return pendingDoctors;
}
function acceptDoctor(id) {
    return { success: true, id };
}
function rejectDoctor(id) {
    return { success: true, id };
}

const PendingDoctors = () => {
    const [doctors, setDoctors] = useState(getAllPendingDoctors());
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [viewMode, setViewMode] = useState('table'); // 'table' or 'cards'

    // Enhanced toast with react-icons
    const showToast = (msg, type = 'success') => {
        const toast = document.createElement("div");
        let iconHtml = '';
        if (type === 'success') iconHtml = `<span style='margin-right:8px;vertical-align:middle;'>✔️</span>`;
        else if (type === 'error') iconHtml = `<span style='margin-right:8px;vertical-align:middle;'>✖️</span>`;
        else iconHtml = `<span style='margin-right:8px;vertical-align:middle;'>ℹ️</span>`;
        toast.innerHTML = `${iconHtml}${msg}`;
        toast.style.position = "fixed";
        toast.style.bottom = "30px";
        toast.style.right = "30px";
        toast.style.background = type === 'success' ? "#10b981" : type === 'error' ? "#ef4444" : "#3b82f6";
        toast.style.color = "white";
        toast.style.padding = "12px 20px";
        toast.style.borderRadius = "12px";
        toast.style.boxShadow = "0 10px 25px rgba(0,0,0,0.2)";
        toast.style.zIndex = 9999;
        toast.style.fontWeight = "500";
        toast.style.display = "flex";
        toast.style.alignItems = "center";
        toast.style.animation = "slideIn 0.3s ease";
        document.body.appendChild(toast);
        setTimeout(() => {
            toast.style.animation = "slideOut 0.3s ease";
            setTimeout(() => document.body.removeChild(toast), 300);
        }, 2500);
    };

    const handleAccept = (id) => {
        acceptDoctor(id);
        showToast("Doctor accepted successfully!", 'success');
        setDoctors(doctors.filter((doc) => doc.id !== id));
    };

    const handleReject = (id) => {
        rejectDoctor(id);
        showToast("Doctor rejected!", 'error');
        setDoctors(doctors.filter((doc) => doc.id !== id));
    };

    const handleViewDetails = (doctor) => {
        setSelectedDoctor(doctor);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedDoctor(null);
    };

    const ActionButton = ({ onClick, variant, icon, children, className = "" }) => {
        const baseClasses = "px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm";
        const variants = {
            accept: "bg-[#b2ece6] hover:bg-[#d2f6f2] text-[#209187] border border-[#209187]/30",
            reject: "bg-[#fff5d6] hover:bg-[#ffeeb0] text-[#e0ad1f] border border-[#e0ad1f]/30",
            view: "bg-[#f3f4f6] hover:bg-[#e5e7eb] text-[#27292b] border border-[#27292b]/10"
        };
        
        return (
            <button
                className={`${baseClasses} ${variants[variant]} ${className}`}
                onClick={onClick}
            >
                <span className="text-lg">{icon}</span>
                {children}
            </button>
        );
    };

    const TableView = () => (
    <div className="overflow-hidden rounded-2xl shadow-2xl bg-white border border-[#b2ece6]/40">
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-[#e6f8f7] text-[#209187]">
                        <tr>
                            <th className="py-4 px-6 text-left font-bold flex items-center gap-2">
                                <span className="text-xl"><FaUserMd /></span> Doctor
                            </th>
                            <th className="py-4 px-6 text-left font-bold">
                                <span className="flex items-center gap-2">
                                    <span className="text-xl"><FaHospitalSymbol /></span> Specialty
                                </span>
                            </th>
                            <th className="py-4 px-6 text-left font-bold hidden md:table-cell">
                                <span className="flex items-center gap-2">
                                    <span className="text-xl"><FaEnvelope /></span> Email
                                </span>
                            </th>
                            <th className="py-4 px-6 text-left font-bold hidden lg:table-cell">
                                <span className="flex items-center gap-2">
                                    <span className="text-xl"><FaPhoneAlt /></span> Phone
                                </span>
                            </th>
                            <th className="py-4 px-6 text-center font-bold">
                                <span className="flex items-center justify-center gap-2">
                                    <span className="text-xl"><FaBolt /></span> Actions
                                </span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {doctors.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="text-center py-12">
                                    <div className="flex flex-col items-center gap-4">
                                        <span className="text-6xl">🎉</span>
                                        <p className="text-xl text-gray-500 font-medium">No pending doctors!</p>
                                        <p className="text-gray-400">All applications have been processed.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            doctors.map((doctor) => (
                                <tr key={doctor.id} className="hover:bg-[#b2ece6]/40 transition-all duration-200 group">
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-xl font-bold shadow-lg">
                                                {doctor.avatar}
                                            </div>
                                            <div>
                                                <p className="font-bold text-gray-800 group-hover:text-blue-600 transition-colors">{doctor.name}</p>
                                                <p className="text-sm text-gray-500">ID: #{doctor.id}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex items-center gap-2">
                                            <span className="text-2xl">{doctor.specialtyIcon}</span>
                                            <span className="font-semibold text-gray-700">{doctor.specialty}</span>
                                        </div>
                                    </td>
                                    <td className="py-4 px-6 hidden md:table-cell">
                                        <span className="text-gray-600 text-sm">{doctor.email}</span>
                                    </td>
                                    <td className="py-4 px-6 hidden lg:table-cell">
                                        <span className="text-gray-600 font-mono text-sm">{doctor.phone}</span>
                                    </td>
                                    <td className="py-4 px-6">
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            <ActionButton
                                                variant="accept"
                                                icon={<FaCheckCircle />}
                                                onClick={() => handleAccept(doctor.id)}
                                                className="text-xs"
                                            >
                                                Accept
                                            </ActionButton>
                                            <ActionButton
                                                variant="reject"
                                                icon={<FaTimesCircle />}
                                                onClick={() => handleReject(doctor.id)}
                                                className="text-xs"
                                            >
                                                Reject
                                            </ActionButton>
                                            <ActionButton
                                                variant="view"
                                                icon={<FaEye />}
                                                onClick={() => handleViewDetails(doctor)}
                                                className="text-xs"
                                            >
                                                View
                                            </ActionButton>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );

    const CardView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {doctors.length === 0 ? (
                <div className="col-span-full text-center py-12">
                    <div className="flex flex-col items-center gap-4">
                        <span className="text-6xl text-green-400"><FaCheckCircle /></span>
                        <p className="text-xl text-gray-500 font-medium">No pending doctors!</p>
                        <p className="text-gray-400">All applications have been processed.</p>
                    </div>
                </div>
            ) : (
                doctors.map((doctor) => (
                    <div key={doctor.id} className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-[#b2ece6]/40 overflow-hidden">
                        <div className="bg-[#e6f8f7] p-6 text-[#209187]">
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                                    {doctor.avatar}
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">{doctor.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xl">{doctor.specialtyIcon}</span>
                                        <span className="text-sm opacity-90">{doctor.specialty}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="p-6 space-y-4">
                            <div className="space-y-3">
                                <div className="flex items-center gap-3">
                                    <span className="text-lg"><FaEnvelope /></span>
                                    <span className="text-sm text-gray-600 truncate">{doctor.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className="text-lg"><FaPhoneAlt /></span>
                                    <span className="text-sm text-gray-600 font-mono">{doctor.phone}</span>
                                </div>
                                <div className="flex items-start gap-3">
                                    <span className="text-lg"><FaClipboardList /></span>
                                    <span className="text-sm text-gray-600">{doctor.details}</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col gap-2 pt-4 border-t border-gray-100">
                                <ActionButton
                                    variant="accept"
                                    icon={<FaCheckCircle />}
                                    onClick={() => handleAccept(doctor.id)}
                                    className="w-full justify-center"
                                >
                                    Accept Doctor
                                </ActionButton>
                                <div className="flex gap-2">
                                    <ActionButton
                                        variant="reject"
                                        icon={<FaTimesCircle />}
                                        onClick={() => handleReject(doctor.id)}
                                        className="flex-1 justify-center"
                                    >
                                        Reject
                                    </ActionButton>
                                    <ActionButton
                                        variant="view"
                                        icon={<FaEye />}
                                        onClick={() => handleViewDetails(doctor)}
                                        className="flex-1 justify-center"
                                    >
                                        Details
                                    </ActionButton>
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );

    return (
    <section className="min-h-screen bg-[#fafdff] p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <span className="text-4xl"><FaUserMd /></span>
                        <h1 className="text-4xl md:text-5xl font-extrabold bg-clip-text text-transparent"
                            style={{
                                background: 'linear-gradient(90deg, #209187 0%, #b2ece6 50%, #e0ad1f 100%)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent',
                                color: '#209187',
                                display: 'inline-block',
                                minHeight: '1em',
                            }}>
                            Pending Doctors
                        </h1>
                        <span className="text-4xl"><FaUserNurse /></span>
                    </div>
                    <p className="text-[#209187] text-lg">Review and manage doctor applications</p>
                    
                    {/* View Toggle */}
                    <div className="flex items-center justify-center gap-2 mt-6">
                        <button
                            onClick={() => setViewMode('table')}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                                viewMode === 'table' 
                                    ? 'bg-[#b2ece6] text-[#209187] shadow-lg border border-[#209187]/30' 
                                    : 'bg-white text-[#209187] hover:bg-[#b2ece6]/40 border border-[#b2ece6]/40'
                            }`}
                        >
                            <span className="text-lg"><FaTable /></span>
                            Table View
                        </button>
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 flex items-center gap-2 ${
                                viewMode === 'cards' 
                                    ? 'bg-[#b2ece6] text-[#209187] shadow-lg border border-[#209187]/30' 
                                    : 'bg-white text-[#209187] hover:bg-[#b2ece6]/40 border border-[#b2ece6]/40'
                            }`}
                        >
                            <span className="text-lg"><FaIdBadge /></span>
                            Card View
                        </button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="bg-[#e6f8f7] rounded-2xl p-6 text-[#209187] shadow-xl border border-[#b2ece6]/40">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[#209187] text-sm font-medium">Total Pending</p>
                                <p className="text-3xl font-bold">{doctors.length}</p>
                            </div>
                            <span className="text-4xl opacity-80"><FaHourglassHalf /></span>
                        </div>
                    </div>
                    <div className="bg-[#fff5d6] rounded-2xl p-6 text-[#e0ad1f] shadow-xl border border-[#e0ad1f]/20">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[#e0ad1f] text-sm font-medium">Ready to Review</p>
                                <p className="text-3xl font-bold">{doctors.length}</p>
                            </div>
                            <span className="text-4xl opacity-80"><FaCheckCircle /></span>
                        </div>
                    </div>
                    <div className="bg-[#f3f4f6] rounded-2xl p-6 text-[#27292b] shadow-xl border border-[#27292b]/10">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[#27292b] text-sm font-medium">Specialties</p>
                                <p className="text-3xl font-bold">{new Set(doctors.map(d => d.specialty)).size}</p>
                            </div>
                            <span className="text-4xl opacity-80"><FaHospitalSymbol /></span>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                {viewMode === 'table' ? <TableView /> : <CardView />}
            </div>

            {/* Enhanced Modal */}
            {showModal && selectedDoctor && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full relative overflow-hidden animate-modalIn border border-[#b2ece6]/40">
                        {/* Modal Header */}
                        <div className="bg-[#e6f8f7] p-6 text-[#209187] relative">
                            <button
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#b2ece6] flex items-center justify-center text-[#209187] hover:bg-[#e0ad1f] hover:text-white transition-all duration-200 shadow"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                <FaTimesCircle size={24} />
                            </button>
                            <button
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-all duration-200"
                                onClick={closeModal}
                                aria-label="Close"
                            >
                                ✕
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl">
                                    {selectedDoctor.avatar}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold">{selectedDoctor.name}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xl">{selectedDoctor.specialtyIcon}</span>
                                        <span className="text-sm opacity-90">{selectedDoctor.specialty}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 space-y-6">
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xl"><FaEnvelope /></span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Email Address</p>
                                        <p className="text-sm text-gray-800 font-medium">{selectedDoctor.email}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xl"><FaPhoneAlt /></span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Phone Number</p>
                                        <p className="text-sm text-gray-800 font-medium font-mono">{selectedDoctor.phone}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <span className="text-xl"><FaClipboardList /></span>
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Qualifications & Experience</p>
                                        <p className="text-sm text-gray-800 font-medium">{selectedDoctor.details}</p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                                    <span className="text-xl"><FaHourglassHalf /></span>
                                    <div>
                                        <p className="text-xs text-yellow-600 font-medium">Status</p>
                                        <p className="text-sm text-yellow-800 font-bold capitalize">{selectedDoctor.status}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Modal Actions */}
                            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100">
                                <ActionButton
                                    variant="accept"
                                    icon={<FaCheckCircle />}
                                    onClick={() => {
                                        handleAccept(selectedDoctor.id);
                                        closeModal();
                                    }}
                                    className="w-full justify-center"
                                >
                                    Accept Doctor
                                </ActionButton>
                                <ActionButton
                                    variant="reject"
                                    icon={<FaTimesCircle />}
                                    onClick={() => {
                                        handleReject(selectedDoctor.id);
                                        closeModal();
                                    }}
                                    className="w-full justify-center"
                                >
                                    Reject Application
                                </ActionButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Enhanced Styles */}
            <style>{`
                @keyframes slideIn {
                    from { 
                        opacity: 0; 
                        transform: translateX(100%); 
                    }
                    to { 
                        opacity: 1; 
                        transform: translateX(0); 
                    }
                }
                
                @keyframes slideOut {
                    from { 
                        opacity: 1; 
                        transform: translateX(0); 
                    }
                    to { 
                        opacity: 0; 
                        transform: translateX(100%); 
                    }
                }
                
                @keyframes modalIn {
                    from { 
                        opacity: 0; 
                        transform: scale(0.9) translateY(-20px); 
                    }
                    to { 
                        opacity: 1; 
                        transform: scale(1) translateY(0); 
                    }
                }
                
                .animate-modalIn {
                    animation: modalIn 0.3s ease-out;
                }
                
                /* Custom scrollbar */
                .overflow-x-auto::-webkit-scrollbar {
                    height: 8px;
                }
                
                .overflow-x-auto::-webkit-scrollbar-track {
                    background: #f1f5f9;
                    border-radius: 4px;
                }
                
                .overflow-x-auto::-webkit-scrollbar-thumb {
                    background: linear-gradient(to right, #3b82f6, #8b5cf6);
                    border-radius: 4px;
                }
                
                .overflow-x-auto::-webkit-scrollbar-thumb:hover {
                    background: linear-gradient(to right, #2563eb, #7c3aed);
                }
                
                /* Hover effects */
                .group:hover .group-hover\\:text-blue-600 {
                    color: #2563eb;
                }
                
                /* Button hover animations */
                button:hover {
                    transform: translateY(-1px);
                }
                
                button:active {
                    transform: translateY(0);
                }
                
                /* Card hover effects */
                .hover\\:-translate-y-2:hover {
                    transform: translateY(-8px);
                }
                
                /* Responsive table improvements */
                @media (max-width: 768px) {
                    .table-responsive {
                        font-size: 14px;
                    }
                    
                    .table-responsive td {
                        padding: 8px 12px;
                    }
                    
                    .table-responsive th {
                        padding: 12px 12px;
                    }
                }
                
                /* Loading states */
                .loading {
                    opacity: 0.7;
                    pointer-events: none;
                }
                
                /* Focus states for accessibility */
                button:focus {
                    outline: 2px solid #3b82f6;
                    outline-offset: 2px;
                }
                
                /* Smooth transitions */
                * {
                    transition: all 0.2s ease;
                }
            `}</style>
        </section>
    );
};

export default PendingDoctors;