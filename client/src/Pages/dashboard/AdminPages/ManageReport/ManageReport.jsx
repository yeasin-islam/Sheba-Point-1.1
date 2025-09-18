import React, { useState } from 'react';
import { FaUser, FaFileAlt, FaCalendarAlt, FaCheckCircle, FaTimesCircle, FaEye, FaTrashAlt, FaFlag, FaRegCommentDots } from 'react-icons/fa';

// Static data for reports
const staticReports = [
    {
        id: 1,
        type: 'Abuse',
        user: 'John Doe',
        userType: 'Patient',
        date: '2025-09-10',
        status: 'pending',
        details: 'Reported inappropriate language during consultation.',
    },
    {
        id: 2,
        type: 'Spam',
        user: 'Dr. Ayesha Rahman',
        userType: 'Doctor',
        date: '2025-09-12',
        status: 'resolved',
        details: 'Received multiple spam messages from this user.',
    },
    {
        id: 3,
        type: 'Fake Info',
        user: 'LabTech Diagnostics',
        userType: 'Lab',
        date: '2025-09-13',
        status: 'pending',
        details: 'Lab provided incorrect test results.',
    },
];

const ManageReport = () => {
    const [reports, setReports] = useState(staticReports);
    const [selected, setSelected] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleResolve = (id) => {
        setReports(reports.map(r => r.id === id ? { ...r, status: 'resolved' } : r));
    };
    const handleDelete = (id) => {
        setReports(reports.filter(r => r.id !== id));
    };
    const handleView = (report) => {
        setSelected(report);
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
                        Manage Reports
                    </h1>
                    <p className="text-[#2D2F32] text-lg mt-2">
                        Review, resolve, or delete user reports
                    </p>
                </div>

                {/* Table View */}
                <div className="overflow-hidden rounded-2xl shadow-2xl bg-white border border-[#b2ece6]/40">
                    <div className="overflow-x-auto">
                        <table className="min-w-full">
                            <thead className="bg-[#e6f8f7] text-[#209187]">
                                <tr>
                                    <th className="py-4 px-6 text-left font-bold">Type</th>
                                    <th className="py-4 px-6 text-left font-bold">User</th>
                                    <th className="py-4 px-6 text-left font-bold hidden md:table-cell">Date</th>
                                    <th className="py-4 px-6 text-left font-bold hidden md:table-cell">Status</th>
                                    <th className="py-4 px-6 text-center font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {reports.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="text-center py-12">
                                            <div className="flex flex-col items-center gap-4">
                                                <span className="text-6xl">🎉</span>
                                                <p className="text-xl text-gray-500 font-medium">No pending reports!</p>
                                                <p className="text-gray-400">All reports have been managed.</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    reports.map((report) => (
                                        <tr key={report.id} className="hover:bg-[#b2ece6]/40 transition-all duration-200 group">
                                            <td className="py-4 px-6 font-semibold text-gray-800 group-hover:text-[#209187] transition-colors flex items-center gap-2">
                                                <FaFileAlt className="text-[#e0ad1f]" /> {report.type}
                                            </td>
                                            <td className="py-4 px-6 flex items-center gap-2">
                                                <FaUser className="text-[#209187]" />
                                                <span className="font-medium">{report.user}</span>
                                                <span className="text-xs px-2 py-1 rounded bg-[#e6f8f7] text-[#209187] ml-2">{report.userType}</span>
                                            </td>
                                            <td className="py-4 px-6 hidden md:table-cell text-gray-600 text-sm flex items-center gap-2">
                                                <FaCalendarAlt /> {report.date}
                                            </td>
                                            <td className="py-4 px-6 hidden md:table-cell">
                                                {report.status === 'pending' ? (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-50 text-yellow-700 text-sm font-medium gap-1">
                                                        <FaTimesCircle /> Pending
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-green-50 text-green-700 text-sm font-medium gap-1">
                                                        <FaCheckCircle /> Resolved
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6">
                                                <div className="flex flex-wrap gap-2 justify-center">
                                                    <button
                                                        className="px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm bg-[#b2ece6] text-[#209187] border border-[#209187]/30"
                                                        onClick={() => handleResolve(report.id)}
                                                        disabled={report.status === 'resolved'}
                                                    >
                                                        <FaCheckCircle /> Resolve
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm bg-[#fff5d6] text-[#e0ad1f] border border-[#e0ad1f]/30"
                                                        onClick={() => handleDelete(report.id)}
                                                    >
                                                        <FaTrashAlt /> Delete
                                                    </button>
                                                    <button
                                                        className="px-4 py-2 rounded-xl font-semibold shadow-lg transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center gap-2 text-sm bg-[#f3f4f6] text-[#27292b] border border-[#27292b]/10"
                                                        onClick={() => handleView(report)}
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
                                <FaFileAlt className="text-3xl" />
                                <div>
                                    <h3 className="text-xl font-bold">{selected.type} Report</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <FaUser />
                                        <span className="text-sm opacity-90">{selected.user} ({selected.userType})</span>
                                    </div>
                                </div>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                                    <FaCalendarAlt className="text-xl" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Date</p>
                                        <p className="text-sm text-gray-800 font-medium">{selected.date}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl">
                                    <FaRegCommentDots className="text-xl" />
                                    <div>
                                        <p className="text-xs text-gray-500 font-medium">Details</p>
                                        <p className="text-sm text-gray-800 font-medium">{selected.details}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border border-yellow-200">
                                    {selected.status === 'pending' ? <FaTimesCircle className="text-xl text-yellow-600" /> : <FaCheckCircle className="text-xl text-green-600" />}
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
export default ManageReport;