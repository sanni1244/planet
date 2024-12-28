import { Link } from 'react-router-dom';
import Leaderboard from '../pages/leaderboard';
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import LeaderboardFetcher from './leader';
import { useState } from 'react';
import Profilepic from '../profilecomponents/profilepic';


const LandingPage = () => {
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const userIdData = localStorage.getItem("user") || sessionStorage.getItem("user");
  const userId = userIdData ? JSON.parse(userIdData).username : null;
  const timeAgo = (date) => {
    const diff = Date.now() - new Date(date).getTime();
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days > 0) return `${days} day(s) ago`;
    if (hours > 0) return `${hours} hour(s) ago`;
    if (minutes > 0) return `${minutes} minute(s) ago`;
    return `${seconds} second(s) ago`;
  };
  const navigate = useNavigate();
  sessionStorage.removeItem("user");
  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <section className="relative hero-section bg-gradient-to-tl from-blue-800 via-indigo-900 to-purple-900 text-white overflow-hidden">
        <div className="overlay absolute inset-0 bg-stars bg-no-repeat bg-cover opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-screen text-center px-4 sm:px-8">
          <h1 className="title text-4xl sm:text-6xl font-extrabold tracking-wide text-blue-300 drop-shadow-lg">
            🌍 <span className="animate-text-glow generic-header">PlanetPix</span>
          </h1>
          <p className="description mt-4 text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed max-w-xl">
            Discover the world like never before! Test your knowledge of famous landmarks, uncover hidden gems, and challenge your memory.
          </p>
          <p className="description mt-2 text-sm sm:text-base md:text-lg font-semibold text-blue-100 suck-space">
            Ready to embark on the adventure? Let’s see how many landmarks you can guess! ✨
          </p>
          <div className="button-group mt-8 flex flex-wrap justify-center gap-4 smaller-buttons">
            <Link
              to="/signup"
              className="btn btn-secondary buttons-vd px-6 py-3 text-sm sm:text-base bg-yellow-400 text-black font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-yellow-300 transform hover:scale-105 transition-all duration-300 smaller-buttons1"
            >
              Sign Up
            </Link>
            <Link
              to="/game"
              className="btn btn-tertiary buttons-vd px-6 py-3 text-sm sm:text-base bg-indigo-600 text-white font-medium rounded-full shadow-lg hover:shadow-xl hover:bg-indigo-500 transform hover:scale-105 transition-all duration-300 smaller-buttons1"
            >
              Begin Game
            </Link>
          </div>
          {localStorage.getItem("user") !== null && (
            <button
              onClick={logout}
              className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-orange-500 hover:from-orange-500 hover:to-red-500 text-white font-medium rounded-full shadow-lg transition-transform transform hover:scale-105 focus:ring-2 focus:ring-orange-300"
            >
              <MdLogout size={20} />
              Logout
            </button>
          )}
        </div>
      </section>

      <div className="leaderboard">
        <section className="scoreboard py-5 bg-gray-50">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 generic-header">
            Global Leaderboard
          </h2>
          <div className="max-w-4xl mx-auto atablewithin">
            <table className="scoreboard-table w-full text-left border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100 alegreya-500 tohide">
                  <th className="px-4 py-2 border border-gray-200">Rank</th>
                  <th className="px-4 py-2 border border-gray-200">Player</th>
                  <th className="px-4 py-2 border border-gray-200">Score</th>
                  <th className="px-4 py-2 border border-gray-200">Time</th>
                  <th className="px-4 py-2 border border-gray-200">Played</th>
                </tr>
              </thead>
              <tbody>
                {Array.from(
                  new Set(globalLeaderboard.map((entry) => entry.username))
                )
                  .map((username) =>
                    globalLeaderboard.find((entry) => entry.username === username)
                  )
                  .slice(0, 10)
                  .map((entry, index) => (
                    <tr
                      className="group hover:bg-indigo-50 transition-transform transform hover:scale-[1.01] rounded-lg shadow-sm border border-gray-200"
                      key={entry.username}
                    >
                      <td
                        data-label="Rank"
                        className="py-3 px-4 text-center font-medium text-indigo-600"
                      >
                        {index + 1}
                      </td>
                      <td
                        data-label="Player"
                        className="py-3 px-4 text-gray-700 flex items-center space-x-3"
                      >
                        <Profilepic user={entry.username || null} show={"false"} />
                        <span className="font-semibold">{entry.username}</span>
                      </td>
                      <td
                        data-label="Score"
                        className="py-3 px-4 text-gray-800 font-bold"
                      >
                        {entry.score}
                      </td>
                      <td
                        data-label="Time"
                        className="py-3 px-4 text-gray-500"
                      >
                        {entry.timeUsed}s
                      </td>
                      <td
                        data-label="Played"
                        className="py-3 px-4 text-gray-500 italic"
                      >
                        {timeAgo(entry.createdAt)}
                      </td>
                    </tr>
                  ))}
              </tbody>


            </table>
          </div>
        </section>


        <LeaderboardFetcher
          userId={userId}
          country={""}
          setGlobalLeaderboard={setGlobalLeaderboard}
          setCountryLeaderboard={() => { }}
          setFlag={() => { }}
        />
      </div>


    </>
  );
};

export default LandingPage;
