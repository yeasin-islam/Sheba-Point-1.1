import React from 'react';
import { FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';
import { FaClock, FaVideo } from 'react-icons/fa6';

const BookingCard = ({ booking, onCancel, onReschedule, onJoin }) => {
  const getStatusChip = (status) => {
    const styles = {
      Upcoming: "badge bg-blue-100 text-blue-700 border-blue-200",
      Completed: "badge bg-green-100 text-green-700 border-green-200",
      Cancelled: "badge bg-red-100 text-red-700 border-red-200",
    };
    return (
      <div className={styles[status] || "badge badge-ghost"}>{status}</div>
    );
  };

  return (
    <div className="bg-white shadow-lg rounded-xl p-5 transition-all hover:shadow-xl duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-gray-100 pb-4">
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-14 rounded-full ring-2 ring-primary">
              <img
                className="rounded-full"
                src={booking.patient.avatar}
                alt={booking.patient.name}
              />
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg text-gray-800">
              {booking.patient.name}
            </h3>
            <p className="text-sm text-gray-400">Booking ID: {booking.id}</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">{getStatusChip(booking.status)}</div>
      </div>
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pt-4">
        <div className="text-gray-600 space-y-2">
          <p className="flex items-center gap-3">
            <FaCalendarAlt className="text-blue-500" /> <strong>Date:</strong>
            {new Date(booking.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="flex items-center gap-3">
            <FaClock className="text-blue-500" /> <strong>Time:</strong>{" "}
            {booking.time}
          </p>
          <p className="flex items-center gap-3">
            {booking.type === "Video Call" ? (
              <FaVideo className="text-blue-500" />
            ) : (
              <FaPhoneAlt className="text-green-500" />
            )}{" "}
            <span>{booking.type}</span>
          </p>
        </div>
        <div className="w-full sm:w-auto flex flex-col justify-end items-stretch sm:items-end gap-2">
          {booking.status === "Upcoming" && (
            <div className="flex gap-2 flex-wrap justify-end">
              <button
                onClick={() => onCancel(booking)}
                className="btn btn-sm btn-outline btn-error"
              >
                Cancel
              </button>
              <button
                onClick={() => onReschedule(booking)}
                className="btn btn-sm btn-outline btn-info"
              >
                Reschedule
              </button>
              <button
                onClick={() => onJoin(booking)}
                className="btn btn-sm bg-primary text-white border-0"
              >
                Join Call
              </button>
            </div>
          )}
          {booking.status === "Completed" && (
            <button className="btn btn-sm btn-outline btn-primary">
              View Prescription
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;