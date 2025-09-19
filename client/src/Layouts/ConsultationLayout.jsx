import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    FiMessageSquare,
    FiFileText,
    FiVideo,
    FiMic,
    FiMicOff,
    FiVideoOff,
    FiPhone,
    FiArrowLeft,
    FiSend,
    FiMoreVertical,
    FiSettings,
    FiUsers,
    FiX,
    FiUser,
    FiClock
} from "react-icons/fi";
import { Link } from "react-router";

const ConsultationLayout = () => {
    const [activeTab, setActiveTab] = useState("chat");
    const [isVideoOn, setIsVideoOn] = useState(true);
    const [isAudioOn, setIsAudioOn] = useState(true);
    const [message, setMessage] = useState("");
    const [notes, setNotes] = useState("");
    const [showMobilePanel, setShowMobilePanel] = useState(false);

    const handleSendMessage = () => {
        if (message.trim()) {
            // Handle sending message logic here
            setMessage("");
        }
    };

    const handleGoBack = () => {
        // Handle navigation back to dashboard
        console.log("Going back to dashboard");
    };

    // Sample messages data
    const messages = [
        {
            id: 1,
            sender: "patient",
            name: "John Doe",
            time: "2:30 PM",
            content: "Hello Doctor, I've been experiencing headaches and fatigue for the past 3 days. The pain is mostly in my temples.",
            avatar: "JD"
        },
        {
            id: 2,
            sender: "doctor",
            name: "Dr. Sarah Johnson",
            time: "2:32 PM",
            content: "Hello John. I understand your concern. Could you describe the intensity of the headaches on a scale from 1 to 10?",
            avatar: "SJ"
        },
        {
            id: 3,
            sender: "patient",
            name: "John Doe",
            time: "2:34 PM",
            content: "I'd say about a 6 or 7. It's persistent but not unbearable. I've been taking ibuprofen which helps temporarily.",
            avatar: "JD"
        },
        {
            id: 4,
            sender: "doctor",
            name: "Dr. Sarah Johnson",
            time: "2:36 PM",
            content: "Thank you. Have you noticed any other symptoms like nausea, vision changes, or sensitivity to light?",
            avatar: "SJ"
        }
    ];

    return (
        <div className="h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <motion.header
                className="flex items-center justify-between px-6 py-4 bg-white shadow-sm border-b border-gray-200"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <div className="flex items-center gap-4">
                    <motion.button
                        onClick={handleGoBack}
                        className="btn btn-ghost btn-sm btn-circle text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to={'/dashboard'}><FiArrowLeft className="w-5 h-5" /></Link>
                    </motion.button>
                    <div>
                        <h1 className="text-xl font-semibold text-gray-800">Consultation Session</h1>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                                <FiUser className="w-3 h-3" />
                                Dr. Sarah Johnson
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <FiUser className="w-3 h-3" />
                                John Doe
                            </span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <FiClock className="w-3 h-3" />
                                05:42
                            </span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="badge badge-success gap-1.5 px-3 py-1.5 text-sm font-medium">
                        <div className="w-2 h-2 rounded-full bg-success animate-pulse"></div>
                        Active Consultation
                    </div>

                    <div className="dropdown dropdown-end">
                        <motion.button
                            tabIndex={0}
                            className="btn btn-ghost btn-sm btn-circle text-gray-600 hover:bg-blue-50 hover:text-blue-600"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <FiMoreVertical className="w-5 h-5" />
                        </motion.button>
                        <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow-lg bg-white rounded-lg w-52 border border-gray-200">
                            <li>
                                <a className="flex items-center gap-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    <FiUsers className="w-4 h-4" />
                                    Participants
                                </a>
                            </li>
                            <li>
                                <a className="flex items-center gap-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                                    <FiSettings className="w-4 h-4" />
                                    Settings
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </motion.header>

            {/* Main Content */}
            <div className="flex flex-1 overflow-hidden">
                {/* Video Call Area */}
                <motion.div
                    className="flex-1 bg-gray-100 relative overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Video Stream Container */}
                    <div className="absolute inset-4 rounded-xl overflow-hidden">
                        <motion.div
                            className="w-full h-full flex items-center justify-center relative bg-gradient-to-br from-blue-50 to-blue-100"
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            {/* Main Video Area */}
                            <div className="w-full h-full bg-gray-200 rounded-xl flex items-center justify-center border border-gray-300">
                                <div className="text-center">
                                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto border-2 border-blue-200">
                                        <FiVideo className="w-10 h-10 text-blue-500" />
                                    </div>
                                    <p className="text-gray-600 text-lg">Connecting to Dr. Sarah Johnson...</p>
                                    <div className="loading loading-dots loading-md text-blue-500 mt-4"></div>
                                </div>
                            </div>

                            {/* Picture-in-Picture (User's own video) */}
                            <motion.div
                                className="absolute top-6 right-6 w-36 h-28 md:w-48 md:h-36 bg-white rounded-xl border-2 border-blue-200 overflow-hidden shadow-lg"
                                initial={{ x: 100, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                            >
                                <div className="w-full h-full flex items-center justify-center bg-blue-50">
                                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center border border-blue-200">
                                        <FiVideo className="w-6 h-6 text-blue-500" />
                                    </div>
                                </div>
                            </motion.div>

                            {/* Call Status Indicator */}
                            <div className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                                <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-sm font-medium text-gray-700">Connected • 05:42</span>
                            </div>
                        </motion.div>
                    </div>

                    {/* Control Bar */}
                    <motion.div
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex items-center gap-4 bg-white/90 backdrop-blur-md rounded-full px-6 py-3 border border-gray-200 shadow-lg"
                        initial={{ y: 100, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                    >
                        <motion.button
                            onClick={() => setIsAudioOn(!isAudioOn)}
                            className={`btn btn-circle ${isAudioOn ? 'btn-ghost bg-blue-50 text-blue-600 hover:bg-blue-100' : 'btn-error text-white'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isAudioOn ? <FiMic className="w-5 h-5" /> : <FiMicOff className="w-5 h-5" />}
                        </motion.button>

                        <motion.button
                            onClick={() => setIsVideoOn(!isVideoOn)}
                            className={`btn btn-circle ${isVideoOn ? 'btn-ghost bg-blue-50 text-blue-600 hover:bg-blue-100' : 'btn-error text-white'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isVideoOn ? <FiVideo className="w-5 h-5" /> : <FiVideoOff className="w-5 h-5" />}
                        </motion.button>

                        <motion.button
                            className="btn btn-circle btn-error text-white hover:bg-red-600"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FiPhone className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </motion.div>

                {/* Desktop Sidebar - Chat */}
                <motion.div
                    className="hidden lg:flex flex-col w-96 border-l border-gray-200 bg-white"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="flex items-center justify-between p-5 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                                <FiMessageSquare className="w-5 h-5" />
                            </div>
                            Consultation Chat
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                            Active
                        </div>
                    </div>

                    <div className="flex-1 p-5 overflow-y-auto space-y-6">
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: msg.id * 0.1 }}
                            >
                                <div className={`flex max-w-xs md:max-w-md ${msg.sender === 'doctor' ? 'flex-row-reverse' : ''}`}>
                                    <div className={`flex-shrink-0 h-10 w-10 rounded-full flex items-center justify-center ${msg.sender === 'doctor' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                        {msg.avatar}
                                    </div>
                                    <div className={`ml-3 mr-3 ${msg.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
                                        <div className="text-sm font-medium text-gray-700 mb-1">
                                            {msg.name} • <span className="text-gray-500">{msg.time}</span>
                                        </div>
                                        <div className={`px-4 py-3 rounded-xl text-sm ${msg.sender === 'doctor'
                                            ? 'bg-blue-50 text-gray-800 border border-blue-100'
                                            : 'bg-gray-50 text-gray-800 border border-gray-200'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="p-5 border-t border-gray-200 bg-gray-50">
                        <div className="relative">
                            <input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Type your message..."
                                className="input input-bordered w-full pl-4 pr-12 py-3 bg-white border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                            />
                            <motion.button
                                onClick={handleSendMessage}
                                className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-circle text-blue-600 hover:bg-blue-100"
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                disabled={!message.trim()}
                            >
                                <FiSend className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </div>
                </motion.div>

                {/* Desktop Sidebar - Notes */}
                <motion.div
                    className="hidden xl:flex flex-col w-96 border-l border-gray-200 bg-white"
                    initial={{ x: 100, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                >
                    <div className="p-5 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-800 flex items-center gap-3">
                            <div className="p-2 bg-teal-100 rounded-lg text-teal-600">
                                <FiFileText className="w-5 h-5" />
                            </div>
                            Medical Notes
                        </h3>
                        <p className="text-sm text-gray-500 mt-1">Document symptoms, observations, and treatment plans</p>
                    </div>

                    <div className="flex-1 p-5 overflow-y-auto">
                        <div className="bg-gray-50 rounded-lg p-4 h-full">
                            <textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                className="textarea w-full h-full resize-none text-sm bg-transparent focus:outline-none text-gray-700"
                                placeholder={`# Patient: John Doe
# Date: ${new Date().toLocaleDateString()}

## Symptoms Reported:
- Persistent headaches (6/10 intensity)
- Fatigue for 3 days
- Responds to ibuprofen

## Observations:
- Patient appears tired
- No visible signs of distress

## Assessment:
- Possible tension headaches
- Rule out migraine

## Treatment Plan:
- Recommend hydration
- Sleep hygiene evaluation
- Follow up in 1 week`}
                            />
                        </div>
                    </div>

                    <div className="p-5 border-t border-gray-200 bg-gray-50 space-y-3">
                        <motion.button
                            className="btn w-full bg-teal-600 hover:bg-teal-700 text-white border-none"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <FiFileText className="w-4 h-4" />
                            Save Clinical Notes
                        </motion.button>
                        <motion.button
                            className="btn w-full btn-outline border-gray-300 hover:bg-gray-100 hover:border-gray-400 text-gray-700"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Generate Medical Report
                        </motion.button>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Bottom Navigation */}
            <div className="lg:hidden bg-white border-t border-gray-200">
                <div className="flex">
                    <motion.button
                        className={`flex-1 py-4 flex flex-col items-center transition-colors ${activeTab === "chat"
                            ? "text-blue-600 bg-blue-50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() => {
                            setActiveTab("chat");
                            setShowMobilePanel(true);
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <div className="relative">
                            <FiMessageSquare className="w-6 h-6" />
                            {activeTab !== "chat" && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                            )}
                        </div>
                        <span className="text-xs mt-1 font-medium">Chat</span>
                    </motion.button>

                    <motion.button
                        className={`flex-1 py-4 flex flex-col items-center transition-colors ${activeTab === "notes"
                            ? "text-teal-600 bg-teal-50"
                            : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                            }`}
                        onClick={() => {
                            setActiveTab("notes");
                            setShowMobilePanel(true);
                        }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <FiFileText className="w-6 h-6" />
                        <span className="text-xs mt-1 font-medium">Notes</span>
                    </motion.button>
                </div>
            </div>

            {/* Mobile Panel Overlay */}
            <AnimatePresence>
                {showMobilePanel && (
                    <motion.div
                        className="lg:hidden fixed inset-0 bg-black/50 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowMobilePanel(false)}
                    >
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] border-t border-gray-200"
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                                <h3 className="font-semibold text-gray-800 capitalize flex items-center gap-2">
                                    {activeTab === "chat" ? (
                                        <>
                                            <FiMessageSquare className="w-5 h-5 text-blue-600" />
                                            Consultation Chat
                                        </>
                                    ) : (
                                        <>
                                            <FiFileText className="w-5 h-5 text-teal-600" />
                                            Medical Notes
                                        </>
                                    )}
                                </h3>
                                <button
                                    onClick={() => setShowMobilePanel(false)}
                                    className="btn btn-ghost btn-sm btn-circle text-gray-500 hover:text-gray-700"
                                >
                                    <FiX className="w-5 h-5" />
                                </button>
                            </div>

                            {activeTab === "chat" && (
                                <div className="flex flex-col h-[70vh]">
                                    <div className="flex-1 p-4 overflow-y-auto space-y-4">
                                        {messages.map((msg) => (
                                            <div key={msg.id} className={`flex ${msg.sender === 'doctor' ? 'justify-end' : 'justify-start'}`}>
                                                <div className={`flex max-w-xs ${msg.sender === 'doctor' ? 'flex-row-reverse' : ''}`}>
                                                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center text-xs ${msg.sender === 'doctor' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}>
                                                        {msg.avatar}
                                                    </div>
                                                    <div className={`ml-2 mr-2 ${msg.sender === 'doctor' ? 'text-right' : 'text-left'}`}>
                                                        <div className="text-xs font-medium text-gray-700 mb-1">
                                                            {msg.name} • <span className="text-gray-500">{msg.time}</span>
                                                        </div>
                                                        <div className={`px-3 py-2 rounded-lg text-sm ${msg.sender === 'doctor'
                                                            ? 'bg-blue-50 text-gray-800 border border-blue-100'
                                                            : 'bg-gray-50 text-gray-800 border border-gray-200'}`}>
                                                            {msg.content}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="Type your message..."
                                                className="input input-bordered w-full pl-3 pr-10 py-2 bg-white border-gray-300 text-sm"
                                            />
                                            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-ghost btn-circle text-blue-600 hover:bg-blue-100 p-1">
                                                <FiSend className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeTab === "notes" && (
                                <div className="p-4 h-[70vh] flex flex-col gap-4">
                                    <div className="bg-gray-50 rounded-lg p-3 flex-1">
                                        <textarea
                                            className="textarea w-full h-full resize-none text-sm bg-transparent focus:outline-none text-gray-700"
                                            placeholder={`# Patient Notes\n\n- Symptoms observed\n- Treatment administered\n- Follow-up required`}
                                        />
                                    </div>
                                    <div className="flex gap-3">
                                        <button className="btn flex-1 bg-teal-600 hover:bg-teal-700 text-white border-none text-sm">
                                            <FiFileText className="w-4 h-4" />
                                            Save Notes
                                        </button>
                                        <button className="btn btn-outline border-gray-300 hover:bg-gray-100 text-gray-700 text-sm">
                                            Report
                                        </button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ConsultationLayout;