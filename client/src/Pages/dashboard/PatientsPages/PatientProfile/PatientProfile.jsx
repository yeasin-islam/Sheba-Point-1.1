import { useState } from "react";
import { Mail, Phone, Stethoscope, CreditCard, Calendar, History, Edit } from "lucide-react";

const PatientProfile = () => {
  const [patient] = useState({
    name: "Tanmay Islam",
    age: 24,
    gender: "Male",
    bloodGroup: "B+",
    email: "tanmay@example.com",
    phone: "+880123456789",
    allergies: "None",
    conditions: "Diabetes",
    medications: "Metformin",
  });

  const upcomingAppointments = [
    { id: 1, doctor: "Dr. Sarah Johnson", date: "2025-08-25", time: "4:00 PM", status: "Confirmed" },
    { id: 2, doctor: "Dr. Ahmed Hossain", date: "2025-09-01", time: "11:30 AM", status: "Pending" },
  ];

  const pastAppointments = [
    { id: 1, doctor: "Dr. Emily White", date: "2025-07-20", prescription: "prescription1.pdf" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 h-40 sm:h-48 rounded-b-3xl relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-20 sm:top-28">
          <img
            src="https://i.ibb.co/7yz3b2J/avatar.png"
            alt="Patient"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 sm:mt-28 space-y-8">
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">{patient.name}</h2>
          <p className="text-gray-500 mt-1">
            {patient.age} yrs | {patient.gender} | Blood Group: {patient.bloodGroup}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4 text-gray-600 text-sm sm:text-base">
            <p className="flex items-center gap-2"><Mail size={18} /> {patient.email}</p>
            <p className="flex items-center gap-2"><Phone size={18} /> {patient.phone}</p>
          </div>
          <button className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition flex items-center gap-2 mx-auto">
            <Edit size={18} /> Edit Profile
          </button>
        </div>

        {/* Medical & Payment Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
              <Stethoscope size={20} /> Medical Information
            </h3>
            <p><strong>Allergies:</strong> {patient.allergies}</p>
            <p><strong>Conditions:</strong> {patient.conditions}</p>
            <p><strong>Medications:</strong> {patient.medications}</p>
          </div>

          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
            <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
              <CreditCard size={20} /> Payment Info
            </h3>
            <p>No pending payments.</p>
            <p>Last payment: 2025-07-20</p>
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
            <Calendar size={20} /> Upcoming Appointments
          </h3>
          <ul className="space-y-3">
            {upcomingAppointments.map((a) => (
              <li key={a.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border p-3 rounded-lg hover:bg-gray-50">
                <span className="text-sm sm:text-base">{a.doctor} - {a.date} at {a.time}</span>
                <span className={`mt-2 sm:mt-0 text-xs sm:text-sm font-medium ${a.status === "Confirmed" ? "text-green-600" : "text-yellow-600"}`}>
                  {a.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Past Appointments */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
            <History size={20} /> Past Appointments
          </h3>
          <ul className="space-y-3">
            {pastAppointments.map((a) => (
              <li key={a.id} className="flex flex-col sm:flex-row sm:justify-between sm:items-center border p-3 rounded-lg hover:bg-gray-50">
                <span className="text-sm sm:text-base">{a.doctor} - {a.date}</span>
                <a href={a.prescription} download className="text-teal-600 hover:underline text-sm sm:text-base mt-2 sm:mt-0">
                  Download Prescription
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PatientProfile;
