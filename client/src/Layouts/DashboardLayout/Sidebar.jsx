import React, { useState } from "react";
import { Link, NavLink } from "react-router";
import classNames from "classnames";
import Logo from "/public/FavIcon.png";
import {
  FiFileText,
  FiHome,
  FiSettings,
  FiUser,
  FiUserCheck,
  FiUserPlus,
  FiUsers,
} from "react-icons/fi";
import { GiMedicinePills } from "react-icons/gi";
import {
  FaAngleLeft,
  FaAngleRight,
  FaClipboard,
  FaTimes,
  FaUserMd,
} from "react-icons/fa";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineLocalPharmacy } from "react-icons/md";
import { FaUserDoctor } from "react-icons/fa6";

const Sidebar = ({ isMobileOpen, setIsMobileOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(true); 
  const routes = [
    {
      title: "Home",
      path: "/dashboard",
      icon: <FiHome className="text-xl" />,
      end: true,
    },
    {
      title: "My Booking",
      path: "/dashboard/patient/my-booking",
      icon: <FaClipboard className="text-xl" />,
    },
    {
      title: "Doctor Application",
      path: "/dashboard/patient/doctor-application",
      icon: <FaUserDoctor className="text-xl" />,
    },
    {
      title: "Patient Profile",
      path: "/dashboard/patient/profile",
      icon: <FiUser className="text-xl" />,
    },
    {
      title: "Appointments",
      path: "/dashboard/doctor/appointments",
      icon: <LuCalendarCheck className="text-xl" />,
    },
    {
      title: "Doctor Profile",
      path: "/dashboard/doctor/profile",
      icon: <FiUser className="text-xl" />,
    },
    {
      title: "Manage Bookings",
      path: "/dashboard/doctor/manage-bookings",
      icon: <FiUser className="text-xl" />,
    },
    {
      title: "My Patients",
      path: "/dashboard/my-patients",
      icon: <FiUsers className="text-xl" />,
    },
    {
      title: "All Patients",
      path: "/dashboard/all-patients",
      icon: <FiUsers className="text-xl" />,
    },
    {
      title: "All Doctors",
      path: "/dashboard/all-doctors",
      icon: <FaUserMd className="text-xl" />,
    },
    {
      title: "Report Management",
      path: "/dashboard/reports",
      icon: <FiFileText className="text-xl" />,
    },
    {
      title: "Pending Pharmacies & Labs",
      path: "/dashboard/pending-pharmacies&labs",
      icon: <MdOutlineLocalPharmacy className="text-xl" />,
    },
    {
      title: "Pending Doctors",
      path: "/dashboard/pending-doctors",
      icon: <FiUserCheck className="text-xl" />,
    },
    {
      title: "Admin Profile",
      path: "/dashboard/admin-profile",
      icon: <FiSettings className="text-xl" />,
    },
  ];

  // Base styles for links
  const linkBaseStyle =
    "flex items-center gap-3 px-3 py-2 rounded-md transition-all";
  const linkCollapsedStyle = "justify-center text-xl"; // Center icon only when collapsed
  const linkExpandedStyle = "text-base"; // Normal text when expanded

  return (
    <>
      {/* 🔹 Mobile Sidebar */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 md:hidden">
          <div className="fixed top-0 left-0 h-full w-64 bg-white p-4 z-50 shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setIsMobileOpen(false)}>
                <FaTimes size={18} />
              </button>
            </div>

            {/* Links */}
            <ul className="space-y-2">
              {routes.map((route) => (
                <li key={route.path}>
                  <NavLink
                    to={route.path}
                    end={route.end || false} // Only Home uses exact match
                    onClick={() => setIsMobileOpen(false)} // Close sidebar after clicking
                    className={({ isActive }) =>
                      classNames(
                        linkBaseStyle,
                        "text-gray-700 hover:bg-gray-100",
                        {
                          "bg-primary/10 text-primary font-medium": isActive,
                        }
                      )
                    }
                  >
                    <span className="text-lg">{route.icon}</span>
                    <span>{route.title}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 🔹 Desktop Sidebar */}
      <aside
        className={classNames(
          "hidden md:flex flex-col h-full bg-white shadow transition-all duration-300 overflow-y-auto",
          {
            "w-20": isCollapsed, // Collapsed width
            "w-64": !isCollapsed, // Expanded width
          }
        )}
      >
        {/* Logo or App Name */}
        <div className="flex items-center justify-center h-16 border-b">
          {isCollapsed ? (
            <Link to={"/"} className="flex items-center">
              <img src={Logo} className="w-10 h-10" alt="Logo" />
            </Link>
          ) : (
            <h2 className="text-lg font-bold">Sheba Point</h2>
          )}
        </div>

        {/* Collapse/Expand Toggle */}
        <div className="flex justify-end px-2 py-3 text-black">
          <button
            className="text-xl cursor-pointer px-2 py-1 rounded hover:bg-gray-300 transition"
            onClick={() => setIsCollapsed((prev) => !prev)}
          >
            {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-2 space-y-2">
          {routes.map((route) => (
            <NavLink
              key={route.path}
              to={route.path}
              end={route.end || false} // Only Home uses exact match
              className={({ isActive }) =>
                classNames(
                  linkBaseStyle,
                  isCollapsed ? linkCollapsedStyle : linkExpandedStyle,
                  "text-gray-700 bg-gray-100 hover:bg-gray-300",
                  {
                    "bg-primary/10 text-primary font-semibold": isActive,
                  }
                )
              }
            >
              <span className="text-lg">{route.icon}</span>
              {!isCollapsed && <span>{route.title}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
