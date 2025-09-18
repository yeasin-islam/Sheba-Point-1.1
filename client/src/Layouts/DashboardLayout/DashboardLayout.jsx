import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router";
import { FaBars } from "react-icons/fa";

const DashboardLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
 // for desktop

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar
        isMobileOpen={isMobileOpen}
        setIsMobileOpen={setIsMobileOpen}

      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="flex items-center justify-between p-4 bg-white shadow-md md:hidden">
          <button
            className="text-gray-700"
            onClick={() => setIsMobileOpen(true)}
          >
            <FaBars size={20} />
          </button>
          <h2 className="text-lg font-semibold">Dashboard</h2>
        </header>


        {/* Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
