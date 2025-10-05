import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="flex space-x-4">
        <Link to="/" className="text-white hover:text-gray-300">
          Home
        </Link>
        <Link to="/about" className="text-white hover:text-gray-300">
          About
        </Link>

        <Link to="/login" className="text-white hover:text-gray-300 mr-4">
          Login
        </Link>
        <Link to="/signup" className="text-white hover:text-gray-300">
          Sign Up
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
