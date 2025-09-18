import React, { useMemo, useRef, useState } from "react";
// Make sure to install react-icons: npm install react-icons
import {
  FaVideo,
  FaPhoneAlt,
  FaCalendarCheck,
  FaCalendarTimes,
  FaCalendarDay,
  FaSearch,
  FaClock,
  FaCalendarAlt,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import BookingCard from "./BookingCard";
import Swal from "sweetalert2";

// --- Dummy Data for Bookings ---
const initialBookingsData = [
  {
    id: "BK001",
    patient: {
      name: "Rahim Ahmed",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=RA",
    },
    date: "2025-08-15",
    time: "10:30 AM",
    type: "Video Call",
    status: "Upcoming",
  },
  {
    id: "BK002",
    patient: {
      name: "Fatima Begum",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=FB",
    },
    date: "2025-08-15",
    time: "11:00 AM",
    type: "Audio Call",
    status: "Upcoming",
  },
  {
    id: "BK003",
    patient: {
      name: "Abdullah Al Mamun",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=AM",
    },
    date: "2025-08-14",
    time: "09:00 AM",
    type: "Video Call",
    status: "Completed",
  },
  {
    id: "BK004",
    patient: {
      name: "Sadia Islam",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=SI",
    },
    date: "2025-08-13",
    time: "02:30 PM",
    type: "Video Call",
    status: "Completed",
  },
  {
    id: "BK005",
    patient: {
      name: "John Doe",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=JD",
    },
    date: "2025-08-12",
    time: "04:00 PM",
    type: "Audio Call",
    status: "Cancelled",
  },
  {
    id: "BK006",
    patient: {
      name: "Karim Chowdhury",
      avatar: "https://placehold.co/100x100/E2E8F0/4A5568?text=KC",
    },
    date: "2025-08-16",
    time: "11:30 AM",
    type: "Video Call",
    status: "Upcoming",
  },
];

// --- Main ManageBookings Component ---
const ManageBookings = () => {
  const [bookings, setBookings] = useState(initialBookingsData);
  const [activeTab, setActiveTab] = useState("Upcoming");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const [bookingToCancel, setBookingToCancel] = useState(null);
  const [bookingToReschedule, setBookingToReschedule] = useState(null);

  const cancelModalRef = useRef(null);
  const rescheduleModalRef = useRef(null);

  const handleCancelClick = (booking) => {
    setBookingToCancel(booking);
    cancelModalRef.current.showModal();
  };

  const confirmCancel = () => {
    setBookings((prevBookings) =>
      prevBookings.map((b) =>
        b.id === bookingToCancel.id ? { ...b, status: "Cancelled" } : b
      )
    );
    setBookingToCancel(null);
    cancelModalRef.current.close();
  };

  const handleRescheduleClick = (booking) => {
    setBookingToReschedule(booking);
    rescheduleModalRef.current.showModal();
  };

  const confirmReschedule = (e) => {
    e.preventDefault();
    // In a real app, you would handle the date/time change here
    alert(`Rescheduling appointment for ${bookingToReschedule.patient.name}`);
    rescheduleModalRef.current.close();
  };

    const handleJoinCall = (booking) => {
Swal.fire(`Joining call with ${booking.patient.name}...`);
  };

  const filteredBookings = useMemo(() => {
    return bookings
      .filter((b) => b.status === activeTab)
      .filter((b) =>
        b.patient.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((b) => (filterDate ? b.date === filterDate : true));
  }, [bookings, activeTab, searchTerm, filterDate]);

  const TabButton = ({ title, icon }) => (
    <button
      onClick={() => setActiveTab(title)}
      className={`flex items-center gap-2 px-4 py-2 text-sm sm:text-base font-semibold rounded-lg transition-all duration-300 ${
        activeTab === title
          ? "bg-primary text-white shadow-md"
          : "text-gray-600 hover:bg-blue-50"
      }`}
    >
      {icon} {title}
    </button>
  );

  return (
    <>
      {/* Cancel Confirmation Modal */}
      <dialog ref={cancelModalRef} className="modal">
        <div className="modal-box">
          <div className="text-center">
            <FaExclamationTriangle className="mx-auto text-5xl text-red-500 mb-4" />
            <h3 className="font-bold text-xl text-gray-800">Are you sure?</h3>
            <p className="py-4 text-gray-600">
              Do you really want to cancel the appointment with{" "}
              <span className="font-semibold">
                {bookingToCancel?.patient.name}
              </span>
              ? This action cannot be undone.
            </p>
          </div>
          <div className="modal-action justify-center">
            <form method="dialog" className="flex gap-4">
              <button className="btn btn-outline">No, Keep It</button>
              <button
                onClick={confirmCancel}
                className="btn bg-red-600 hover:bg-red-700 text-white"
              >
                Yes, Cancel
              </button>
            </form>
          </div>
        </div>
      </dialog>

      {/* Reschedule Modal */}
      <dialog ref={rescheduleModalRef} className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg mb-4">Reschedule Appointment</h3>
          <p className="mb-4">
            Patient:{" "}
            <span className="font-semibold">
              {bookingToReschedule?.patient.name}
            </span>
          </p>
          <form onSubmit={confirmReschedule}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">New Date</span>
              </label>
              <input type="date" className="input input-bordered w-full" />
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">New Time</span>
              </label>
              <input type="time" className="input input-bordered w-full" />
            </div>
            <div className="modal-action mt-6">
              <button type="submit" className="btn btn-primary">
                Confirm Reschedule
              </button>
            </div>
          </form>
        </div>
      </dialog>

      <div className="min-h-screen bg-slate-50 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Manage Bookings
            </h1>
            <p className="text-gray-500 mt-1">
              View and manage all your patient appointments here.
            </p>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-md mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-center">
              <div className="lg:col-span-2 p-1.5 bg-slate-100 rounded-lg flex gap-2 flex-wrap justify-start">
                <TabButton title="Upcoming" icon={<FaCalendarDay />} />
                <TabButton title="Completed" icon={<FaCalendarCheck />} />
                <TabButton title="Cancelled" icon={<FaCalendarTimes />} />
              </div>
              <div className="flex gap-2 flex-col sm:flex-row">
                <div className="relative w-full">
                  <input
                    type="text"
                    placeholder="Search patient..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="input input-bordered w-full pr-10"
                  />
                  <FaSearch className="absolute top-1/2 right-4 transform -translate-y-1/2 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={filterDate}
                  onChange={(e) => setFilterDate(e.target.value)}
                  className="input input-bordered w-full sm:w-auto"
                />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((b) => (
                <BookingCard
                  key={b.id}
                  booking={b}
                  onCancel={handleCancelClick}
                  onReschedule={handleRescheduleClick}
                  onJoin={handleJoinCall}
                />
              ))
            ) : (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <img
                  src="https://cdni.iconscout.com/illustration/premium/thumb/no-schedule-found-4454977-3723332.png"
                  alt="No bookings found"
                  className="w-48 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-500">
                  No Bookings Found
                </h3>
                <p className="text-gray-400 mt-2">
                  There are no {activeTab.toLowerCase()} bookings matching your
                  criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageBookings;
