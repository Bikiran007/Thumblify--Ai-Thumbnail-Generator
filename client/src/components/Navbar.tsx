import { MenuIcon, XIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { isLoggedIn, user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const navigate = useNavigate();
    const dropdownRef = useRef<HTMLDivElement>(null);

    // 🔥 Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* NAVBAR */}
            <motion.nav
                className="fixed top-0 z-50 flex items-center justify-between w-full py-4 px-6 md:px-16 lg:px-24 xl:px-32 backdrop-blur bg-black/20"
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 70 }}
            >
                {/* LOGO */}
                <Link to="/">
                    <img src="/logo.svg" alt="logo" className="h-8 w-auto" />
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="hover:text-pink-500 transition">Home</Link>
                    <Link to="/generate" className="hover:text-pink-500 transition">Generate</Link>

                    {isLoggedIn ? (
                        <Link to="/my-generation" className="hover:text-pink-500 transition">
                            My Generations
                        </Link>
                    ) : (
                        <Link to="#" className="hover:text-pink-500 transition">About</Link>
                    )}

                    <Link to="#" className="hover:text-pink-500 transition">Contact Us</Link>
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-3">
                    {isLoggedIn ? (
                        <div ref={dropdownRef} className="relative">
                            {/* Avatar */}
                            <button
                                onClick={() => setDropdownOpen(prev => !prev)}
                                className="w-9 h-9 rounded-full bg-pink-600 flex items-center justify-center font-semibold text-white"
                            >
                                {user?.name?.charAt(0)?.toUpperCase() || "U"}
                            </button>

                            {/* Dropdown */}
                            {dropdownOpen && (
                                <div className="absolute right-0 mt-3 w-36 bg-white text-black rounded-lg shadow-lg overflow-hidden">
                                    <button
                                        onClick={() => {
                                            logout();
                                            setDropdownOpen(false);
                                        }}
                                        className="w-full text-left px-4 py-2 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => navigate("/login")}
                            className="hidden md:block px-6 py-2 bg-pink-600 hover:bg-pink-700 transition rounded-full"
                        >
                            Get Started
                        </button>
                    )}

                    {/* MOBILE MENU BUTTON */}
                    <button onClick={() => setIsOpen(true)} className="md:hidden">
                        <MenuIcon size={26} />
                    </button>
                </div>
            </motion.nav>

            {/* MOBILE MENU */}
            <div
                className={`fixed inset-0 z-[100] bg-black/70 backdrop-blur flex flex-col items-center justify-center text-lg gap-8 md:hidden transition-transform duration-300 ${
                    isOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                <Link onClick={() => setIsOpen(false)} to="/">Home</Link>
                <Link onClick={() => setIsOpen(false)} to="/generate">Generate</Link>

                {isLoggedIn ? (
                    <Link onClick={() => setIsOpen(false)} to="/my-generation">
                        My Generations
                    </Link>
                ) : (
                    <Link onClick={() => setIsOpen(false)} to="#">About</Link>
                )}

                <Link onClick={() => setIsOpen(false)} to="#">Contact Us</Link>

                {isLoggedIn ? (
                    <button
                        onClick={() => {
                            logout();
                            setIsOpen(false);
                        }}
                        className="text-red-400"
                    >
                        Logout
                    </button>
                ) : (
                    <Link onClick={() => setIsOpen(false)} to="/login">
                        Login
                    </Link>
                )}

                {/* CLOSE BUTTON */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute top-6 right-6 bg-pink-600 p-2 rounded-md"
                >
                    <XIcon />
                </button>
            </div>
        </>
    );
}