import { useState, useEffect, useRef } from "react";
import { NavLink, Link } from "react-router";
import useAuth from "../../Hooks/useAuth";
import { Search } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsProfileOpen(false);
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("click", handleOutsideClick);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("click", handleOutsideClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleLogOut = async () => {
    try {
      await logoutUser();
    } catch (err) {
      // optional: show toast or console
      console.error("Logout failed", err);
    }
  };
  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/all-available-doctors", label: "Search Doctors" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50">
      <div className="backdrop-blur bg-white/60 border-b border-slate-200/20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-6">
            {/* Logo */}
            <div className="flex items-center flex-shrink-0">
              <Link to="/" className="flex items-center">
                <img
                  src="/public/sheba-point.png"
                  alt="Sheba Point Logo"
                  className="h-9 md:h-10"
                />
              </Link>
            </div>

            {/* Center Nav + Search */}
            <div className="flex-1 flex items-center justify-center">
              <div className="hidden md:flex items-center gap-6">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                        isActive
                          ? "text-[#049CA0] font-semibold border-b-2 border-[#049CA0]"
                          : "text-slate-700 hover:text-[#049CA0] hover:scale-[1.02]"
                      }`
                    }
                  >
                    {link.label}
                  </NavLink>
                ))}
              </div>

              <div className="hidden lg:flex items-center ml-6 bg-slate-50 border border-[#049CA0] rounded-md px-2 py-1">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  placeholder="Search doctors"
                  className="pl-2 bg-transparent outline-none text-sm w-48"
                />
              </div>
            </div>

            {/* Right actions (desktop) */}
            <div className="hidden md:flex items-center gap-4">
              {user ? (
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsProfileOpen((s) => !s);
                    }}
                    className="flex items-center gap-2 p-1 rounded-full focus:outline-none ring-1 ring-transparent hover:ring-slate-200 transition-all"
                    aria-expanded={isProfileOpen}
                    aria-haspopup="true"
                  >
                    {user.profileImage ? (
                      <img
                        src={user.profileImage}
                        alt="User avatar"
                        className="h-9 w-9 rounded-full object-cover border border-white/40"
                      />
                    ) : (
                      <div className="h-9 w-9 rounded-full bg-[#049CA0] text-white flex items-center justify-center font-medium">
                        <img
                          src={`https://ui-avatars.com/api/?name=${
                            user?.name || "Sheba User"
                          }&background=random&color=fff&bold=true`}
                          alt=""
                        />
                      </div>
                    )}
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white/95 backdrop-blur-sm rounded-md z-30 overflow-hidden">
                      <div className="px-4 py-3 border-b border-slate-100">
                        <div className="flex items-center gap-3">
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt="avatar"
                              className="h-10 w-10 rounded-full object-cover"
                            />
                          ) : (
                            <div className="h-10 w-10 rounded-full bg-[#049CA0] text-white flex items-center justify-center font-medium">
                              <img
                                src={`https://ui-avatars.com/api/?name=${
                                  user?.name || "Sheba User"
                                }&background=random&color=fff&bold=true`}
                                alt=""
                              />
                            </div>
                          )}
                          <div>
                            <div className="text-sm font-semibold text-slate-800">
                              {user.displayName || user.name || "User"}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              {user.email || ""}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <Link
                          to="/profile"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Profile
                        </Link>
                        <Link
                          to="/dashboard"
                          className="block px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                        >
                          Dashboard
                        </Link>
                      </div>
                      <div className="py-2 px-3 border-t border-slate-100">
                        <button
                          onClick={() => {
                            handleLogOut();
                            setIsProfileOpen(false);
                          }}
                          className="w-full font-medium text-base px-4 py-2 rounded-md bg-[#049CA0] text-white text-center hover:bg-[#038286]"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  to="/auth/login"
                  className="px-4 py-2 text-sm font-medium text-white bg-[#049CA0] rounded-md hover:bg-[#038286] transition-colors duration-200"
                >
                  Login
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden ml-auto">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#049CA0] focus:outline-none"
                aria-expanded={isMenuOpen}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white shadow-lg">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "text-[#049CA0] font-bold bg-slate-50"
                      : "text-slate-700 hover:text-[#049CA0] hover:bg-slate-50"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}

            {user ? (
              <>
                <NavLink
                  to="/dashboard/patient/profile"
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-[#049CA0] hover:bg-slate-50"
                >
                  Profile
                </NavLink>
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    handleLogOut();
                  }}
                  className="block w-full text-left px-4 py-2 rounded-md text-base font-medium text-white bg-[#049CA0] hover:bg-[#038286] transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/auth/login"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#049CA0] hover:bg-[#038286] transition-colors duration-200"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
