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
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-800 to-indigo-900 text-white flex flex-col items-center justify-center relative overflow-hidden px-4 sm:px-8">
  <div className="absolute inset-0 bg-stars-pattern opacity-20 animate-move-stars"></div>

  <div className="text-center space-y-6 sm:space-y-8 mb-8 sm:mb-12">
    <h1 className="text-3xl sm:text-5xl font-bold leading-tight animate-fade-in data-represent">
      🌟 Welcome, {user.username || "Explorer"}! 🌟
    </h1>
    <p className="text-base sm:text-lg font-light opacity-90">
      {user.email
        ? `Your journey starts here, ${user.email}.`
        : "Get ready to dive into a world of wonder and landmarks!"}
    </p>
    <div className="bg-gradient-to-r from-green-400 to-blue-500 h-1 w-24 sm:w-32 mx-auto rounded-lg animate-wiggle"></div>
  </div>

  <div className="bg-white bg-opacity-20 p-6 rounded-lg shadow-lg backdrop-blur-md max-w-xl sm:max-w-2xl text-center space-y-6 sm:space-y-8">
    <h2 className="text-2xl sm:text-3xl font-bold mb-4">🎮 Game Rules</h2>
    <p className="text-sm sm:text-base text-gray-200">
      Guess the landmark based on the image and clues provided. The faster and more accurately you guess, the higher your score!
    </p>
  </div>

  <div className="mt-8 sm:mt-12 flex flex-wrap gap-6 justify-center">
    <button
          onClick={startGame}
          className="btn bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🚀 Start Game
        </button>

        <button
          onClick={goToLeaderboard}
          className="btn bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🏆 Leaderboard
        </button>
    <button
          onClick={goToDashboard}
          className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🎖️ Achievements
        </button>
    <button
          onClick={goToExplore}
          className="btn bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          🔍 Explore Landmarks
        </button>
    <button
          onClick={() => {navigate("/wonder2")}}
          className="btn bg-pink-600 hover:bg-pink-700 text-white px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow-lg transition transform hover:scale-105"
        >
          📚 Wonders of the World
        </button>
      </div>
      <div className="absolute bottom-6 right-6 flex gap-4 buttons-vd">
  </div>

  <div className="absolute bottom-6 sm:bottom-8 right-6 sm:right-8 flex gap-6 sm:gap-8 lgg-btt">
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
