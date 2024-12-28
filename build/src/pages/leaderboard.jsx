import React, { useState } from "react";
import LeaderboardFetcher from "../components/leader";
import Flags from "../components/flags";
import countries from "../components/countries";
import Profilepic from "../profilecomponents/profilepic";

const LeaderboardPage = () => {
  const [globalLeaderboard, setGlobalLeaderboard] = useState([]);
  const [countryLeaderboard, setCountryLeaderboard] = useState([]);
  const [myFlag, setFlag] = useState(null);
  const [country, setCountry] = useState("");
  const userIdData = localStorage.getItem("user") || sessionStorage.getItem("user");
  const userId = userIdData ? JSON.parse(userIdData).username : null;

  const handleChange = (e) => {
    setCountry(e.target.value);
  };

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

    return (
      <div className="leaderboard">
  {/* Global Leaderboard */}
  <section className="scoreboard py-5 bg-gradient-to-b from-blue-50 to-blue-100">
    <h2 className="text-4xl font-bold text-blue-800 text-center mb-8 generic-header">
      Leaderboard
    </h2>
    <div className="max-w-4xl mx-auto overflow-x-auto">
      <table className="w-full text-left border-collapse shadow-lg rounded-lg">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2 border">Rank</th>
            <th className="px-4 py-2 border">Player</th>
            <th className="px-4 py-2 border">Score</th>
            <th className="px-4 py-2 border">Time Used</th>
            <th className="px-4 py-2 border">Played</th>
          </tr>
        </thead>
        <tbody>
          {globalLeaderboard.slice(0, 50).map((entry, index) => (
            <tr
              key={index}
              className={`hover:bg-blue-100 transition-transform transform hover:scale-105 duration-300 ${
                index % 2 === 0 ? 'bg-white' : 'bg-blue-50'
              }`}
            >
              <td className="px-4 py-2 border font-semibold">{index + 1}</td>
              <td className="px-4 py-2 border">
                <div className="flex items-center space-x-4">
                  <Profilepic user={entry.username || null} show="false" />
                  <span className="text-gray-800 font-semibold">
                    {entry.username}
                  </span>
                </div>
              </td>
              <td className="px-4 py-2 border font-semibold text-blue-700">
                {entry.score}
              </td>
              <td className="px-4 py-2 border text-gray-600">
                {entry.timeUsed}s
              </td>
              <td className="px-4 py-2 border text-gray-600">
                {timeAgo(entry.createdAt)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    <br />
    <div className="max-w-md mx-auto">
      <select
        id="country"
        name="country"
        value={country}
        onChange={handleChange}
        className="block w-full px-4 py-2 text-gray-800 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      >
        <option value="">Select a country</option>
        {countries.map((c, index) => (
          <option key={index} value={c}>
            {c}
          </option>
        ))}
      </select>
    </div>
  </section>

  {/* Country Leaderboard */}
  {myFlag ? (
    <section className="scoreboard py-12 bg-gradient-to-b from-green-50 to-green-100">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8 force-center generic-header text-4xl font-bold text-blue-800 text-center mb-8 generic-header">
        <Flags flagc={country || myFlag} />
        <>{country || myFlag}</> Leaderboard
      </h2>
      <div className="max-w-4xl mx-auto overflow-x-auto">
        <table className="w-full text-left border-collapse shadow-lg rounded-lg">
          <thead>
            <tr className="bg-green-500 text-white">
              <th className="px-4 py-2 border">Rank</th>
              <th className="px-4 py-2 border">Player</th>
              <th className="px-4 py-2 border">Score</th>
              <th className="px-4 py-2 border">Time Used</th>
              <th className="px-4 py-2 border">Played</th>
            </tr>
          </thead>
          <tbody>
            {countryLeaderboard.slice(0, 30).map((entry, index) => (
              <tr
                key={index}
                className={`hover:bg-green-100 transition-transform transform hover:scale-105 duration-300 ${
                  index % 2 === 0 ? 'bg-white' : 'bg-green-50'
                }`}
              >
                <td className="px-4 py-2 border font-semibold">{index + 1}</td>
                <td className="px-4 py-2 border">
                  <div className="flex items-center space-x-4">
                    <Profilepic user={entry.username || null} show="false" />
                    <span className="text-gray-800 font-semibold">
                      {entry.username}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 border font-semibold text-green-700">
                  {entry.score}
                </td>
                <td className="px-4 py-2 border text-gray-600">
                  {entry.timeUsed}s
                </td>
                <td className="px-4 py-2 border text-gray-600">
                  {timeAgo(entry.createdAt)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  ) : country ? (
    <>
      <div className="p-4 mt-20 mb-20 max-w-lg mx-auto text-center text-white">
        <div className="inline-block p-4 bg-red-100 rounded-full animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11.002 10 8 8 0 0118 10zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 10-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-gray-800 mt-4 text-white">
          No Leaderboard Score
        </h1>
        <p className="text-sm text-gray-600 mt-2 text-white gloes">
          Sorry, there are currently no scores available for {myFlag || country}. Please
          check back later.
        </p>
      </div>
    </>
  ) : (
    <>
      <div className="p-4 mt-20 mb-20 max-w-lg mx-auto text-center text-white">
        <div className="inline-block p-4 bg-red-100 rounded-full animate-pulse">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8 text-red-500"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M18 10A8 8 0 11.002 10 8 8 0 0118 10zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 101.414-1.414L11.414 10l1.293-1.293a1 1 0 10-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <h1 className="text-lg font-semibold text-gray-800 mt-4 text-white">
          No Leaderboard Score
        </h1>
        <p className="text-sm text-gray-600 mt-2 text-white">
          Be the first to score for your country
        </p>
      </div>
    </>
  )}
  <LeaderboardFetcher
    userId={userId}
    country={country}
    setGlobalLeaderboard={setGlobalLeaderboard}
    setCountryLeaderboard={setCountryLeaderboard}
    setFlag={setFlag}
  />
</div>

    );
};

export default LeaderboardPage;