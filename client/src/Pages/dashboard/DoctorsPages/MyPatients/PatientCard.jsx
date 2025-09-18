import React from "react";
import { FaUserMd, FaCalendarAlt, FaPhone } from "react-icons/fa";
import { Link } from "react-router";

const PatientCard = ({ patient }) => (
  <div className="bg-white shadow-md rounded-xl p-5 transition-all hover:shadow-xl duration-300 flex flex-col justify-between group">
    <div>
      <div className="flex items-center gap-4 mb-5">
        <div className="avatar">
          <div className="w-16 rounded-full ring-2 ring-slate-100 group-hover:ring-blue-200 transition-all duration-300">
            <img src={patient.avatar} alt={patient.name} />
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors duration-300">
            {patient.name}
          </h3>
          <p className="text-sm text-gray-400">ID: {patient._id}</p>
        </div>
      </div>
      <div className="space-y-3 text-gray-600 text-sm">
        <p className="flex items-center gap-3">
          <FaCalendarAlt className="text-slate-400" />
          <strong>Last Visit:</strong>
          {new Date(patient.lastVisit).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </p>
        <p className="flex items-center gap-3">
          <FaUserMd className="text-slate-400" />
          <strong>Appointments:</strong>
          {patient.totalAppointments}
        </p>
        <p className="flex items-center gap-3">
          <FaPhone className="text-slate-400" />
          <strong>Contact:</strong>
          {patient.contact}
        </p>
      </div>
    </div>
    <div className="mt-6">
      <Link
        to={`/dashboard/patient/${patient._id}`}
        className="btn btn-sm btn-outline btn-primary w-full group-hover:bg-primary group-hover:text-white transition-all duration-300"
      >
        View Profile
      </Link>
    </div>
  </div>
);

export default PatientCard;
