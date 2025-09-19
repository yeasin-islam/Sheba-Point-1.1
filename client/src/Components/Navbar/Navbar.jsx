import { useState } from 'react';
import { NavLink, Link } from 'react-router';
import useAuth from '../../Hooks/useAuth';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { user, logOut } = useAuth();
    console.log(user)
    const handleLogOut = () => {
        logOut();
    };
    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/all-available-doctors', label: 'Search Doctors' },
        { path: '/dashboard', label: 'Dashboard' },
        
    ];

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="bg-white shadow-sm sticky top-0 z-10">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img 
                            src="/public/sheba-point.png" 
                            alt="Sheba Point Logo" 
                            className="h-8 md:h-10" 
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200
                                    ${isActive 
                                        ? 'text-[#049CA0] font-bold border-b-2 border-[#049CA0]' 
                                        : 'text-slate-700 hover:text-[#049CA0]'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        {user ? (
                            <Link
                                onClick={handleLogOut}
                                className="px-4 py-2 text-sm font-medium text-white bg-[#049CA0] rounded-md hover:bg-[#038286] transition-colors duration-200"
                            >
                                Logout
                            </Link>
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
                    <div className="md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-slate-700 hover:text-[#049CA0] focus:outline-none"
                            aria-expanded="false"
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
                                    `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200
                                    ${isActive 
                                        ? 'text-[#049CA0] font-bold bg-slate-50' 
                                        : 'text-slate-700 hover:text-[#049CA0] hover:bg-slate-50'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                        <NavLink
                            to="/auth/login"
                            onClick={() => setIsMenuOpen(false)}
                            className="block px-3 py-2 rounded-md text-base font-medium text-white bg-[#049CA0] hover:bg-[#038286] transition-colors duration-200"
                        >
                            Login
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;