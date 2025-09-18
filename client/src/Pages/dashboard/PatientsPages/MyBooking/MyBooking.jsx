// MyBooking.jsx
import React, { useState } from "react";
import DataTable from "./../../../../Shared/DataTable";
import DataCardGrid from "./../../../../Shared/DataCardGrid";
import { FaVideo, FaPhone, FaClinicMedical, FaEye } from "react-icons/fa";

// Sample booking data with doctorId & paymentStatus
const bookingData = [
  {
    _id: "1",
    patientId: "64fabd1234567890abcdef34",
    doctorId: "SP-DOC-101",
    scheduledTime: "2024-08-20T15:30:00Z",
    status: "confirmed",
    consultationType: "video",
    paymentStatus: "paid",
    notes: "Patient complains of chest pain and shortness of breath.",
    createdAt: "2024-08-10T09:00:00Z",
    updatedAt: "2024-08-15T14:00:00Z",
  },
  {
    _id: "2",
    patientId: "64fabd2234567890abcdef45",
    doctorId: "SP-DOC-102",
    scheduledTime: "2024-08-22T10:00:00Z",
    status: "pending",
    consultationType: "audio",
    paymentStatus: "unpaid",
    notes: "Mild fever and sore throat for 3 days.",
    createdAt: "2024-08-12T11:20:00Z",
    updatedAt: "2024-08-12T11:20:00Z",
  },
  {
    _id: "3",
    patientId: "64fabd3234567890abcdef56",
    doctorId: "SP-DOC-103",
    scheduledTime: "2024-08-25T18:00:00Z",
    status: "cancelled",
    consultationType: "in-person",
    paymentStatus: "pending",
    notes: "Follow-up appointment for diabetes management.",
    createdAt: "2024-08-15T08:45:00Z",
    updatedAt: "2024-08-17T09:30:00Z",
  },
  {
    _id: "4",
    patientId: "64fabd4234567890abcdef67",
    doctorId: "SP-DOC-104",
    scheduledTime: "2024-08-28T14:15:00Z",
    status: "confirmed",
    consultationType: "video",
    paymentStatus: "paid",
    notes: "Severe migraine headaches occurring twice a week.",
    createdAt: "2024-08-16T10:10:00Z",
    updatedAt: "2024-08-19T15:00:00Z",
  },
  {
    _id: "5",
    patientId: "64fabd5234567890abcdef78",
    doctorId: "SP-DOC-105",
    scheduledTime: "2024-08-30T09:45:00Z",
    status: "rescheduled",
    consultationType: "audio",
    paymentStatus: "unpaid",
    notes: "Discuss blood test results and cholesterol levels.",
    createdAt: "2024-08-18T12:00:00Z",
    updatedAt: "2024-08-21T13:30:00Z",
  },
  {
    _id: "6",
    patientId: "64fabd6234567890abcdef89",
    doctorId: "SP-DOC-106",
    scheduledTime: "2024-09-02T11:15:00Z",
    status: "confirmed",
    consultationType: "video",
    paymentStatus: "paid",
    notes: "Persistent cough and mild breathing difficulty.",
    createdAt: "2024-08-20T08:20:00Z",
    updatedAt: "2024-08-25T09:10:00Z",
  },
  {
    _id: "7",
    patientId: "64fabd7234567890abcdef90",
    doctorId: "SP-DOC-107",
    scheduledTime: "2024-09-05T16:00:00Z",
    status: "pending",
    consultationType: "in-person",
    paymentStatus: "pending",
    notes: "Back pain after recent injury.",
    createdAt: "2024-08-22T10:40:00Z",
    updatedAt: "2024-08-22T10:40:00Z",
  },
  {
    _id: "8",
    patientId: "64fabd8234567890abcdef91",
    doctorId: "SP-DOC-108",
    scheduledTime: "2024-09-08T13:30:00Z",
    status: "confirmed",
    consultationType: "audio",
    paymentStatus: "paid",
    notes: "Medication review for hypertension.",
    createdAt: "2024-08-23T09:00:00Z",
    updatedAt: "2024-08-27T11:00:00Z",
  },
  {
    _id: "9",
    patientId: "64fabd9234567890abcdef92",
    doctorId: "SP-DOC-109",
    scheduledTime: "2024-09-10T08:45:00Z",
    status: "completed",
    consultationType: "video",
    paymentStatus: "paid",
    notes: "Routine annual check-up.",
    createdAt: "2024-08-25T07:50:00Z",
    updatedAt: "2024-09-10T09:50:00Z",
  },
  {
    _id: "10",
    patientId: "64fabda234567890abcdef93",
    doctorId: "SP-DOC-110",
    scheduledTime: "2024-09-12T15:00:00Z",
    status: "cancelled",
    consultationType: "in-person",
    paymentStatus: "unpaid",
    notes: "Severe allergic reaction follow-up.",
    createdAt: "2024-08-28T12:20:00Z",
    updatedAt: "2024-09-01T14:40:00Z",
  },
];

const columns = [
  {
    header: "Date & Time",
    accessorKey: "scheduledTime",
    cell: ({ getValue }) =>
      new Date(getValue()).toLocaleString("en-US", {
        dateStyle: "medium",
        timeStyle: "short",
      }),
  },
  {
    header: "Doctor ID",
    accessorKey: "doctorId",
  },
  {
    header: "Type",
    accessorKey: "consultationType",
    cell: ({ getValue }) => (
      <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
        {getValue() === "video" && <FaVideo className="text-blue-500" />}
        {getValue() === "audio" && <FaPhone className="text-green-500" />}
        {getValue() === "in-person" && <FaClinicMedical className="text-purple-500" />}
        {getValue().charAt(0).toUpperCase() + getValue().slice(1)}
      </span>
    ),
  },
  {
    header: "Payment Status",
    accessorKey: "paymentStatus",
    cell: ({ getValue }) => (
      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
        {getValue() === "paid" && (
          <span className="text-green-600 font-semibold">Paid</span>
        )}
        {getValue() === "unpaid" && (
          <span className="text-red-600 font-semibold">Unpaid</span>
        )}
        {getValue() === "pending" && (
          <span className="text-yellow-600 font-semibold">Pending</span>
        )}
      </span>
    ),
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ getValue }) => (
      <span className="px-3 py-1 rounded-full bg-gray-100  text-gray-600 text-sm">
        {getValue().charAt(0).toUpperCase() + getValue().slice(1)}
      </span>
    ),
  },
  {
    header: "Action",
    cell: ({ row }) => (
      <button
        onClick={() => alert(`Viewing booking ID: ${row.original._id}`)}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-sky-400  font-medium rounded-lg cursor-pointer">
        <FaEye /> 
      </button>
    ),
  },
];


const MyBooking = () => {
  const totalPages = Math.ceil(bookingData.length / 5);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">My Booking</h1>
      </div>

      <div className="hidden lg:block max-w-[1600px] mx-auto">
        <DataTable
          data={bookingData}
          columns={columns}
          pageCount={totalPages}
          pagination={pagination}
          onPaginationChange={setPagination}
        />
      </div>
      <div className="lg:hidden">
        <DataCardGrid data={bookingData} columns={columns} />
      </div>
    </div>
  );
};

export default MyBooking;
