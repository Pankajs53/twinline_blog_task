import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-indigo-800 flex flex-col justify-center items-center px-6">
      {/* Content Section */}
      <div className="text-center max-w-2xl">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Welcome to Our Blog
        </h1>
        <p className="text-lg text-gray-200 mb-6">
          Discover amazing articles, insights, and stories from talented writers.
          Stay inspired, informed, and engaged.
        </p>

        {/* Button Section */}
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-full shadow-md hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="px-6 py-3 bg-yellow-400 text-white font-semibold rounded-full shadow-md hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105"
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
