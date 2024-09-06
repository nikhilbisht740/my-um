import React from "react";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa"; // Import an icon for the logo

function Header() {
  return (
    <header className="bg-[#333] shadow">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* App Name with Icon */}
        <div className="flex items-center space-x-2">
          <FaUsers size={24} color="white" /> {/* User icon */}
          <h1 className="text-white font-bold text-xl sm:text-2xl">UMApp</h1>
        </div>
        {/* Navigation Links */}
        <ul className="flex space-x-4 sm:space-x-8 text-white font-semibold">
          <li>
            <Link to="/" className="hover:text-gray-400 transition-colors">
              User List
            </Link>
          </li>
          <li>
            <Link
              to="/create"
              className="hover:text-gray-400 transition-colors"
            >
              Create User
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
