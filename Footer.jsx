import React from "react";
import Logo from "./src/assets/logo.svg";

const Footer = () => {
    return (
        <footer className="w-full bg-gray-900 text-white py-8">
            <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-6">

                {/* Logo and App Name */}
                <div className="flex items-center gap-2">
                    <img src={Logo} alt="App Logo" className="w-52 h-52 object-contain"/>
                </div>

                {/* Navigation Links */}
                <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
                    <a href="#home" className="hover:text-purple-500 transition">Home</a>
                    <a href="#movies" className="hover:text-purple-500 transition">Movies</a>
                    <a href="#trending" className="hover:text-purple-500 transition">Trending</a>
                    <a href="#about" className="hover:text-purple-500 transition">About</a>
                    <a href="#contact" className="hover:text-purple-500 transition">Contact</a>
                </div>

                {/* Copyright */}
                <div className="text-sm text-gray-400 text-center sm:text-right">
                    &copy; {new Date().getFullYear()} CineFind. All rights reserved.
                </div>

            </div>
        </footer>
    );
};

export default Footer;
