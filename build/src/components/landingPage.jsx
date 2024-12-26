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
      <section>
        <div className="hero-section">
          <div className="overlay"></div>
          <div className="content">
            <h1 className="title">🌍 <span className='generic-header'>PlanetPix</span></h1>
            <p className="description text-regular">
              Discover the world like never before! Test your knowledge of famous landmarks, uncover hidden gems, and challenge your memory. Whether you're a geography enthusiast or just love a fun challenge, this journey is for you.
            </p><br />
            <p className="description lusitana-bold ">
              Ready to embark on the adventure? <br /> Let’s see how many landmarks you can guess! ✨
            </p>
            <div className="button-group">
              <Link to="/signup" className="btn btn-secondary buttons-vd">
                Sign Up
              </Link>
              <Link to="/game" className="btn btn-tertiary buttons-vd">
                Begin Game
              </Link>
              {localStorage.getItem("user") === null ? "" :
                  <div className="fixed top-4 right-4 z-50">
                    <button
                      onClick={logout}
                      className="flex items-center gap-2 px-5 py-2 bg-gradient-to-r from-red-500 to-orange-600 hover:from-orange-600 hover:to-red-500 text-white font-medium rounded-lg shadow-lg transition-transform transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2">
                      <MdLogout size={20} />
                      <span>Logout</span>
                    </button>
                  </div>}
            </div>
          </div>
        </div>
      </section>
      <div className="leaderboard">
      <section className="scoreboard py-5 bg-gray-50">
  <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 generic-header">
    Global Leaderboard
  </h2>
  <div className="max-w-4xl mx-auto">
    <table className="scoreboard-table w-full text-left border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100 alegreya-500">
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
            <tr className="data-represent" key={entry.username}>
              <td className="px-4 py-2 border border-gray-200">{index + 1}</td>
              <td className="px-4 border border-gray-200 ">
                <div className="flex items-center space-x-4">
                  <Profilepic user={entry.username || null} show={"false"} />
                  <span className="text-gray-800">{entry.username}</span>
                </div>
              </td>
              <td className="px-4 py-2 border border-gray-200">{entry.score}</td>
              <td className="px-4 py-2 border border-gray-200">{entry.timeUsed}s</td>
              <td className="px-4 py-2 border border-gray-200">{timeAgo(entry.createdAt)}</td>
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
