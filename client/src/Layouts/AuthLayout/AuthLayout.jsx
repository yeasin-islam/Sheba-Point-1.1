import React from "react";
import { Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      {/* Main container for the layout - responsive two-column */}
      <div className="relative flex flex-col lg:flex-row w-full max-w-6xl bg-white rounded-2xl shadow-sm">
        {/* Left Section - Image Background & Blobs */}
        <div className="relative lg:w-1/2 min-h-[200px] lg:min-h-[500px] flex items-center justify-center">
          {/* Background image for the left panel */}
          <img
            src="/login.png"
            alt="Welcome"
            className="object-cover w-full h-full"
          />
        </div>

        {/* Right Section - Content (where Login/Register forms will be rendered) */}
        <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white/80">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;