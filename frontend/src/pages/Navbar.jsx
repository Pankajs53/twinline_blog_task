import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn"); // Remove login flag
    toast.success("Logged out successfully!");
    navigate("/");
    window.location.reload(); // Refresh UI
  };

  return (
    <nav className="w-full bg-red-300 p-4 shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h2 className="text-white text-xl font-bold">Blog App</h2>
        <div className="flex gap-6">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login" className="text-white hover:text-blue-400">Login</NavLink>
              <NavLink to="/signup" className="text-white hover:text-blue-400">Signup</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className="text-white hover:text-blue-400">Dashboard</NavLink>
              <NavLink to="/blog/stats" className="text-white hover:text-blue-400">Blog Stats</NavLink>
              <button onClick={handleLogout} className="text-white hover:text-red-400">
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
