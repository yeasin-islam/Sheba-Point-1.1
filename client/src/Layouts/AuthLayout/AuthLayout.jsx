import React from "react";
import { Outlet } from "react-router";
const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-tr from-[#6dd5ed] via-[#2193b0] to-[#f7797d]/80">
      {/* Main container for the layout - responsive two-column */}
      <div className="relative flex flex-col lg:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* Left Section - Image Background & Blobs */}
        <div className="relative lg:w-1/2 min-h-[200px] lg:min-h-[500px] flex items-center justify-center p-4 bg-gradient-to-br from-[#f7797d]/30 to-[#6dd5ed]/30">
          {/* Background image for the left panel */}
          <img
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
            alt="Welcome"
            className="rounded-xl shadow-lg object-cover w-full h-full"
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
