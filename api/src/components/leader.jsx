import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaderboardFetcher = ({ userId, country, setGlobalLeaderboard, setCountryLeaderboard, setFlag }) => {
  useEffect(() => {const fetchLeaderboard = async () => {
      try {
        const params = { userId };
        if (country) params.country = country;
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/leaderboard`, { params });
        setGlobalLeaderboard(res.data.globalLeaderboard);
        if (res.data.countryLeaderboard && res.data.countryLeaderboard.length > 0) {
          setCountryLeaderboard(res.data.countryLeaderboard);
          setFlag(res.data.countryLeaderboard[0].country);
        } else {
          setCountryLeaderboard([]);
          setFlag(null);
        }
      } catch (err) {
        console.error("Error fetching leaderboard:", err);
      }
    };

    fetchLeaderboard();
  }, [userId, country, setGlobalLeaderboard, setCountryLeaderboard, setFlag]);

  return null; 
};

export default LeaderboardFetcher;
