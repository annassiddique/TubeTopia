import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/user/userSlice';
import Avatar from './Avatar';

const navLinks = [
    {
        name: "Vote",
        link: "/",
        id: 1,
    },
    {
        name: "Top-rated",
        link: "/ranks",
        id: 2,
    },
];

const Navbar = () => {
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // Track mobile menu state

    const handleLogout = () => {
        localStorage.removeItem('authToken'); // Clear token
        dispatch(logout()); // Clear user state
    };

    return (
        <div className="w-full h-16 flex items-center justify-between bg-[#31363F] text-white px-4">
            {/* Logo */}
            <Link
                to="/"
                className="font-spaceMono text-lg sm:text-3xl  font-bold"
            >
                TubeTopia
            </Link>

            {/* Hamburger Menu (visible on small screens) */}
            <button
                className="sm:hidden text-white focus:outline-none"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {/* Hamburger Icon */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.75 5.25h16.5M3.75 12h16.5M3.75 18.75h16.5"
                    />
                </svg>
            </button>

            {/* Desktop Navigation Links */}
            <div className="hidden sm:flex items-center gap-8 font-spaceMono font-semibold mr-5">
                {navLinks.map((link) => (
                    <Link key={link.id} to={link.link}>
                        {link.name}
                    </Link>
                ))}
                {user ? (
                    <Link to={`/profile`}>
                        <Avatar user={user} />
                    </Link>
                ) : (
                    <Link
                        to={`/signup`}
                        className="border px-3 py-2 rounded-md bg-[#EEEEEE] text-[#31363F] hover:bg-[#31363F] hover:text-[#EEE] transition"
                    >
                        Signup
                    </Link>
                )}
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="sm:hidden absolute top-16 left-0 w-full bg-[#31363F] border-t border-[#ffffff62] flex flex-col gap-4 items-center py-4 z-10">
                    {navLinks.map((link) => (
                        <Link
                            key={link.id}
                            to={link.link}
                            className="text-white font-spaceMono font-semibold"
                            onClick={() => setIsMenuOpen(false)} // Close menu after navigation
                        >
                            {link.name}
                        </Link>
                    ))}
                    {user ? (
                        <Link to={`/profile`} className='text-white font-spaceMono font-semibold' onClick={() => setIsMenuOpen(false)}>
                            Profile
                        </Link>
                    ) : (
                        <Link
                            to={`/signup`}
                            className="border px-3 py-2 rounded-md bg-[#EEEEEE] text-[#31363F] hover:bg-[#31363F] hover:text-[#EEE] transition"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Signup
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Navbar;
