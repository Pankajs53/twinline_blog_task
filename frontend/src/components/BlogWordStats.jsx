import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TopWordsDashboard = () => {
  const [topWords, setTopWords] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Top Words from API
  const fetchTopWords = async () => {
    try {
      const BASE_URL = process.env.REACT_APP_BASE_URL;
      const response = await axios.get(`${BASE_URL}/blog/top-words`, { withCredentials: true });
      setTopWords(response.data.topWords);
      setLoading(false);
    } catch (error) {
      toast.error("Failed to fetch top words!");
      console.error("Error fetching top words:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTopWords();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 flex flex-col items-center justify-center text-white">
      <h2 className="text-4xl font-extrabold mb-6 drop-shadow-lg">Top Words in Blogs</h2>
      {loading ? (
        <div className="text-lg animate-pulse">Loading...</div>
      ) : topWords.length === 0 ? (
        <p className="text-lg bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md">No words found!</p>
      ) : (
        <div className="bg-white text-gray-800 shadow-xl p-6 rounded-lg w-96">
          <ul className="space-y-3">
            {topWords.map((wordObj, index) => {
              const [word, count] = Object.entries(wordObj)[0];
              return (
                <li key={index} className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow-md">
                  <span className="text-xl font-semibold text-indigo-600">{word || "(Empty)"}</span>
                  <span className="text-lg font-medium text-gray-700">{count} times</span>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TopWordsDashboard;
