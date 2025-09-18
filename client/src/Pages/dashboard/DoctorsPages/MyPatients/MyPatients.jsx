import React, { useState, useMemo } from "react";
import { FaSearch, FaUserMd, FaCalendarAlt, FaPhone } from "react-icons/fa";
import PatientCard from "./PatientCard";

const patients = [
  {
    _id: "P001",
    name: "Rahim Ahmed",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=RA",
    lastVisit: "2025-08-15",
    totalAppointments: 5,
    contact: "01700000001",
  },
  {
    _id: "P002",
    name: "Fatima Begum",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=FB",
    lastVisit: "2025-08-15",
    totalAppointments: 3,
    contact: "01800000002",
  },
  {
    _id: "P003",
    name: "Abdullah Al Mamun",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=AM",
    lastVisit: "2025-08-14",
    totalAppointments: 8,
    contact: "01900000003",
  },
  {
    _id: "P004",
    name: "Sadia Islam",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=SI",
    lastVisit: "2025-08-13",
    totalAppointments: 2,
    contact: "01600000004",
  },
  {
    _id: "P005",
    name: "John Doe",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=JD",
    lastVisit: "2025-08-12",
    totalAppointments: 1,
    contact: "01500000005",
  },
  {
    _id: "P006",
    name: "Karim Chowdhury",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=KC",
    lastVisit: "2025-08-16",
    totalAppointments: 4,
    contact: "01300000006",
  },
  {
    _id: "P007",
    name: "Ayesha Sultana",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=AS",
    lastVisit: "2025-08-17",
    totalAppointments: 6,
    contact: "01400000007",
  },
  {
    _id: "P008",
    name: "Mohammad Hasan",
    avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=MH",
    lastVisit: "2025-08-18",
    totalAppointments: 2,
    contact: "01200000008",
  },
];

// --- Main MyPatients Component ---
const MyPatients = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = useMemo(() => {
    if (!searchTerm) {
      return patients; // Return all patients if no search term
    }
    return patients.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.contact.includes(searchTerm)
    );
  }, [searchTerm]);

  if (patients.length === 0) {
    return (
      <div className="col-span-full text-center py-6 bg-white rounded-xl shadow-md">
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-4971221-4144448.png"
          alt="No patients found"
          className="w-16 mx-auto mb-4"
        />
        <h3 className="text-xl font-semibold text-gray-500">
          No Patients Available
        </h3>
        <p className="text-gray-400 mt-2">
          There are currently no patients in the system.
        </p>
      </div>
    );
  }
    return (
      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">All Patients</h1>
              <p className="text-gray-500 mt-1">
                Here is a list of all your patients who have booked
                appointments.
              </p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md mb-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by name or contact number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input border-2 focus:border-primary  focus:outline-none w-full pr-10"
              />
              <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400 z-10" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredPatients.length > 0 ? (
              filteredPatients.map((p) => (
                <PatientCard key={p._id} patient={p} />
              ))
            ) : (
              <div className="col-span-full text-center py-6 bg-white rounded-xl shadow-md">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-4971221-4144448.png"
                  alt="No patients found"
                  className="w-16 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-500">
                  No Patients Found
                </h3>
                <p className="text-gray-400 mt-2">
                  Your search did not match any patient records.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
};

export default MyPatients;
