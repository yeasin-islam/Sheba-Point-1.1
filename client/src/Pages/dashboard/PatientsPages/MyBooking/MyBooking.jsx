// MyBooking.jsx
import React, { useState } from "react";
import DataTable from "./../../../../Shared/DataTable";
import DataCardGrid from "./../../../../Shared/DataCardGrid";
import { FaVideo, FaPhone, FaClinicMedical, FaEye } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./../../../../Hooks/useAxiosSecure";
import useAuth from "../../../../Hooks/useAuth";

const MyBooking = () => {
  const axiosSecure = useAxiosSecure();
  const {user}=useAuth()
    const { data: bookingData = [], } = useQuery({
    queryKey: ["userBookings"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/appointments/${user?.email}`);
      return res.data;
    },
  });
  const totalPages = Math.ceil(bookingData.length / 5);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
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
          {getValue() === "in-person" && (
            <FaClinicMedical className="text-purple-500" />
          )}
          {getValue().charAt(0).toUpperCase() + getValue().slice(1)}
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
          className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-sky-400  font-medium rounded-lg cursor-pointer"
        >
          <FaEye />
        </button>
      ),
    },
  ];
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
