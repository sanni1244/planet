import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const GamePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: "", email: "" });

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user")) ;
    if (savedUser) {
      setUser(savedUser);
    } 
    else {
      navigate("/login");
    }
  }, [navigate]);

  const startGame = () => {
    navigate("/startgame");
  };

  const goToDashboard = () => {
    navigate("/dashboard");
  };
  const goToLeaderboard = () => {
    navigate("/leaderboard");
  };
  const goToExplore = () => {
    navigate("/learn");
  };
  const goToProfile = () => {
    navigate("/profile");
  };

  const logout = () => {
    localStorage.removeItem("user"); 
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white flex flex-col items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-stars-pattern opacity-20 animate-move-stars"></div>
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-5xl font-extrabold animate-fade-in data-represent">
          🌟 Welcome, {user.username || "Explorer"}! 🌟
        </h1>
        <p className="text-lg font-light buttons-vd">
          {user.email
            ? `Your journey starts here, ${user.email}.`
            : "Get ready to dive into a world of wonder and landmarks!"}
        </p>
        <div className="bg-gradient-to-r  from-green-400 to-blue-500 h-1 w-32 mx-auto rounded-lg animate-wiggle"></div>
      </div>
      <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-2 ">🎮 Game Rules</h2>
        <p className="text-sm text-gray-200 buttons-vd">
          Guess the landmark based on the image and clues provided. The faster
          and more accurately you guess, the higher your score!
        </p>
      </div>
      <div className="mt-10 flex flex-wrap gap-4 justify-center buttons-vd">
        <button
          onClick={startGame}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🚀 Start Game
        </button>

        <button
          onClick={goToLeaderboard}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🏆 Leaderboard
        </button>

        <button
          onClick={goToDashboard}
          className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🎖️ Achievements
        </button>

        <button
          onClick={goToExplore}
          className="px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🔍 Explore Landmarks
        </button>

        <button
          onClick={() => {navigate("/wonder2")}}
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          📚 Wonders of the World
        </button>
      </div>
      <div className="absolute bottom-6 right-6 flex gap-4 buttons-vd">
        <button
          onClick={goToProfile}
          className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-500 hover:to-blue-600 text-white font-semibold rounded-full shadow-lg transition transform hover:scale-110"
        >
          🧑‍💼 Profile
        </button>
        <button
          onClick={logout}
          className="px-4 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-orange-500 hover:to-red-600 text-white font-semibold rounded-full shadow-lg transition transform hover:scale-110"
        >
          🔒 Logout
        </button>
      </div>
    </div>
  );
};

export default GamePage;
