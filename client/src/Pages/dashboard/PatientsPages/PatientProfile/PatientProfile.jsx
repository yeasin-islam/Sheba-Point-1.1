import { useState } from "react";
import {
  Mail,
  Phone,
  Stethoscope,
  CreditCard,
  Calendar,
  History,
  Edit,
  Save,
  X,
} from "lucide-react";
import useAuth from "../../../../Hooks/useAuth";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";

const PatientProfile = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [patient, setPatient] = useState({
    name: user?.name || "Unnamed",
    age: user?.age || "",
    gender: user?.gender || "",
    bloodGroup: user?.bloodGroup || "",
    email: user?.email || "",
    phone: user?.phone || "",
    allergies: user?.allergies || "",
    conditions: user?.conditions || "",
    medications: user?.medications || "",
    profileImage:
      user?.profileImage || "https://i.ibb.co/7yz3b2J/avatar.png",
    lastLogin: user?.lastLogin || "",
    createdAt: user?.createdAt || "",
    role: user?.role || "patient",
  });
console.log(patient);
  const [isEditing, setIsEditing] = useState({
    profile: false,
    medical: false,
    payment: false,
  });

  const [formData, setFormData] = useState(patient);

  // Static sample appointments
  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Sarah Johnson",
      date: "2025-08-25",
      time: "4:00 PM",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Ahmed Hossain",
      date: "2025-09-01",
      time: "11:30 AM",
      status: "Pending",
    },
  ];

  const pastAppointments = [
    {
      id: 1,
      doctor: "Dr. Emily White",
      date: "2025-07-20",
      prescription: "prescription1.pdf",
    },
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async (section) => {
    setPatient(formData);
    setIsEditing({ ...isEditing, [section]: false });
    const res = await axiosSecure.patch(`/patients/${user?.email}`, formData);
    console.log(res.data);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-600 to-teal-700 h-40 sm:h-48 rounded-b-3xl relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 top-20 sm:top-28">
          <img
            src={patient.profileImage}
            alt="Patient"
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white shadow-lg object-cover"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-24 sm:mt-28 space-y-8">
        {/* Profile Info */}
        <div className="bg-white shadow-lg rounded-2xl p-6 sm:p-8 text-center relative">
          {!isEditing.profile ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">
                {patient.name}
              </h2>
              <p className="text-gray-500 mt-1">
                {patient.age
                  ? `${patient.age} yrs`
                  : "Age not set"}{" "}
                | {patient.gender || "Gender not set"} | Blood Group:{" "}
                {patient.bloodGroup || "N/A"}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 mt-4 text-gray-600 text-sm sm:text-base">
                <p className="flex items-center gap-2">
                  <Mail size={18} /> {patient.email}
                </p>
                <p className="flex items-center gap-2">
                  <Phone size={18} /> {patient.phone || "Not added"}
                </p>
              </div>
              <button
                onClick={() => setIsEditing({ ...isEditing, profile: true })}
                className="mt-6 px-6 py-2 bg-teal-600 text-white rounded-xl shadow hover:bg-teal-700 transition flex items-center gap-2 mx-auto"
              >
                <Edit size={18} /> Edit Profile
              </button>
            </>
          ) : (
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Full Name"
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  name="age"
                  value={formData.age}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Age"
                />
                <input
                  type="text"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-2"
                  placeholder="Gender"
                />
              </div>
              <input
                type="text"
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Blood Group"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Email"
              />
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Phone"
              />
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={() => handleSave("profile")}
                  className="px-6 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700 flex items-center gap-2"
                >
                  <Save size={18} /> Save
                </button>
                <button
                  onClick={() =>
                    setIsEditing({ ...isEditing, profile: false })
                  }
                  className="px-6 py-2 bg-gray-300 text-gray-800 rounded-xl shadow hover:bg-gray-400 flex items-center gap-2"
                >
                  <X size={18} /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Medical Info */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition relative">
          <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
            <Stethoscope size={20} /> Medical Information
          </h3>
          {!isEditing.medical ? (
            <>
              <p>
                <strong>Allergies:</strong> {patient.allergies || "Not set"}
              </p>
              <p>
                <strong>Conditions:</strong> {patient.conditions || "Not set"}
              </p>
              <p>
                <strong>Medications:</strong> {patient.medications || "Not set"}
              </p>
              <button
                onClick={() => setIsEditing({ ...isEditing, medical: true })}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition flex items-center gap-2"
              >
                <Edit size={16} /> Edit Medical Info
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Allergies"
              />
              <input
                type="text"
                name="conditions"
                value={formData.conditions}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Conditions"
              />
              <input
                type="text"
                name="medications"
                value={formData.medications}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
                placeholder="Medications"
              />
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleSave("medical")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 flex items-center gap-2"
                >
                  <Save size={16} /> Save
                </button>
                <button
                  onClick={() =>
                    setIsEditing({ ...isEditing, medical: false })
                  }
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 flex items-center gap-2"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Payment Info */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition relative">
          <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
            <CreditCard size={20} /> Payment Info
          </h3>
          {!isEditing.payment ? (
            <>
              <p>No pending payments.</p>
              <p>
                Last login:{" "}
                {patient.lastLogin
                  ? new Date(patient.lastLogin).toLocaleString()
                  : "N/A"}
              </p>
              <button
                onClick={() => setIsEditing({ ...isEditing, payment: true })}
                className="mt-4 px-4 py-2 bg-teal-600 text-white rounded-lg shadow hover:bg-teal-700 transition flex items-center gap-2"
              >
                <Edit size={16} /> Edit Payment Info
              </button>
            </>
          ) : (
            <div className="space-y-3">
              <input
                type="text"
                name="paymentStatus"
                className="w-full border rounded-lg p-2"
                placeholder="Payment status (e.g., Paid)"
              />
              <input
                type="date"
                name="lastPayment"
                className="w-full border rounded-lg p-2"
                placeholder="Last Payment Date"
              />
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => handleSave("payment")}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700 flex items-center gap-2"
                >
                  <Save size={16} /> Save
                </button>
                <button
                  onClick={() =>
                    setIsEditing({ ...isEditing, payment: false })
                  }
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg shadow hover:bg-gray-400 flex items-center gap-2"
                >
                  <X size={16} /> Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
          <h3 className="flex items-center gap-2 text-lg sm:text-xl font-semibold mb-4 border-b pb-2">
            <Calendar size={20} /> Upcoming Appointments
          </h3>
          <ul className="space-y-3">
            {upcomingAppointments.map((a) => (
              <li
                key={a.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border p-3 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm sm:text-base">
                  {a.doctor} - {a.date} at {a.time}
                </span>
                <span
                  className={`mt-2 sm:mt-0 text-xs sm:text-sm font-medium ${
                    a.status === "Confirmed"
                      ? "text-green-600"
                      : "text-yellow-600"
                  }`}
                >
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
              <li
                key={a.id}
                className="flex flex-col sm:flex-row sm:justify-between sm:items-center border p-3 rounded-lg hover:bg-gray-50"
              >
                <span className="text-sm sm:text-base">
                  {a.doctor} - {a.date}
                </span>
                <a
                  href={a.prescription}
                  download
                  className="text-teal-600 hover:underline text-sm sm:text-base mt-2 sm:mt-0"
                >
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
