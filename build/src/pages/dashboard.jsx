import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaGamepad, FaTrophy, FaClock, FaChartLine, FaQuestionCircle, FaChartPie } from "react-icons/fa";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { formatDistanceToNow } from 'date-fns';


ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

const Dashboard = () => {
    const navigate = useNavigate();

  const [userStats, setUserStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const userId1 = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
  const userId = userId1?.username || "Rachel";

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user/user-stats`, {
          params: { userId },
        });
        setUserStats(response.data.stats);
      } catch (error) {
        setError("Failed to fetch user stats.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserStats();
  }, [userId]);

  if (isLoading) {
    return <div className="text-center py-12 text-xl text-gray-700">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-12 text-xl text-red-500">{error}</div>;
  }

  if (userStats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
        <div className="flex flex-col items-center">
          {/* Animated Icon */}
          <div className="mb-6 animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12h6m2 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
  
          {/* Message */}
          <h1 className="text-3xl font-bold text-gray-200 mb-4">
            No Stats Found
          </h1>
          <p className="text-gray-400 text-lg text-center max-w-lg">
            We couldn’t find any statistics for this user. Go play some games, beat the high score and come back later!
          </p>
  
          {/* Button */}
          <button
            onClick={() => navigate("/game")}
            className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );  
  }

  // Calculations
  const totalGames = userStats.length;
  const highestScore = Math.max(...userStats.map((stat) => stat.score));
  const totalCorrectAnswers = userStats.reduce((acc, stat) => acc + stat.correctAnswers, 0);
  const totalIncorrectAnswers = totalGames * 20 - totalCorrectAnswers;
  const totalTimeUsed = userStats.reduce((acc, stat) => acc + stat.timeUsed, 0);
  const averageScore = (userStats.reduce((acc, stat) => acc + stat.score, 0) / totalGames).toFixed(1);
  const averageTimePerQuestion = (totalTimeUsed / (totalGames * 20)).toFixed(2) + " seconds";
  const totalQuestionsAnswered = totalGames * 20;
  const averageCorrectAnswers = (totalCorrectAnswers / totalGames).toFixed(1);
  const accuracy = ((totalCorrectAnswers / totalQuestionsAnswered) * 100).toFixed(1) + "%";
  const perfectGames = userStats.filter((stat) => stat.correctAnswers === 20).length;
  const fastestGuessTime = `${Math.min(...userStats.map((stat) => stat.timeUsed))} seconds`;
  const lastGame = userStats[userStats.length - 1];

  // Chart Data
  const barChartData = {
    labels: userStats.map((stat, index) => `Game ${index + 1}`),
    datasets: [
      {
        label: "Scores",
        data: userStats.map((stat) => stat.score),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const pieChartData = {
    labels: ["Correct Answers", "Incorrect Answers"],
    datasets: [
      {
        data: [totalCorrectAnswers, totalIncorrectAnswers],
        backgroundColor: ["#4caf50", "#f44336"],
      },
    ],
  };
  const formattedTime = formatDistanceToNow(new Date(lastGame.createdAt), { addSuffix: true });

  return (
    <section className="dashboard py-12 bg-gradient-to-b from-gray-100 to-gray-50 min-h-screen ">
      {/* Greeting Section */}
      <div className="text-center mb-12 ">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-2 rokkitt">Performance Tracker <br /> {userId[0].toUpperCase() + userId.slice(1)}!</h2>
        <p className="text-gray-600 chart2">Your journey around the world continues. Ready to explore more?</p>
      </div>

      {/* Stats Section */}
      <div className="lusitana-bold dashboard-stats max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12 ">
        {[
          { title: "Total Games Played", value: totalGames, icon: <FaGamepad /> },
          { title: "Highest Score", value: highestScore, icon: <FaTrophy /> },
          { title: "Average Score", value: averageScore, icon: <FaChartLine /> },
          { title: "Accuracy", value: accuracy, icon: <FaQuestionCircle /> },
          { title: "Quickest Game", value: fastestGuessTime, icon: <FaClock /> },
          { title: "Perfect Games", value: perfectGames, icon: <FaTrophy /> },
          { title: "Avg Correct Answers", value: averageCorrectAnswers, icon: <FaChartPie /> },
          { title: "Avg Time/Question", value: averageTimePerQuestion, icon: <FaClock /> },
          { title: "Total Questions", value: totalQuestionsAnswered, icon: <FaGamepad /> },
        ].map((stat, index) => (
          <div
            key={index}
            className="p-4 text-center hover:shadow-lg transition-all bg-gray-900 stat-card"
          >
            <div className="text-3xl text-indigo-500 mb-2">{stat.icon}</div>
            <h3 className="text-sm font-medium text-gray-600">{stat.title}</h3>
            <p className="text-2xl font-bold text-indigo-600">{stat.value}</p>
          </div>
        ))}
      </div>
      <div className="bg-white p-10 rounded-lg shadow-xl space-y-10 flex flex-col items-center">
        <h3 className="text-3xl font-bold text-center animate__animated animate__fadeIn generic-header">
          Last Game Summary
        </h3>

        <div className="space-y-8 w-full max-w-3xl">
          <div className="flex justify-between items-center bg-indigo-100 p-4 rounded-lg hover:bg-indigo-200 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <h4 className="text-xl font-semibold text-indigo-900 generic-header">Score</h4>
            <p className="data-represent text-yellow-600">{lastGame.score}</p>
          </div>

          <div className="flex justify-between items-center bg-indigo-100 p-4 rounded-lg hover:bg-indigo-200 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <h4 className="text-xl font-semibold text-indigo-900 generic-header">Correct Answers</h4>
            <p className="data-represent text-green-500">{lastGame.correctAnswers}</p>
          </div>

          <div className="flex justify-between items-center bg-indigo-100 p-4 rounded-lg hover:bg-indigo-200 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <h4 className="text-xl font-semibold text-indigo-900 generic-header">Time Used</h4>
            <p className="data-represent text-pink-500">{lastGame.timeUsed} seconds</p>
          </div>

          <div className="flex justify-between items-center bg-indigo-100 p-4 rounded-lg hover:bg-indigo-200 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <h4 className="text-xl font-semibold text-indigo-900 generic-header">Time Played</h4>
            <p className="data-represent text-purple-500">{formattedTime}</p>
          </div>

          <div className="flex justify-between items-center bg-indigo-100 p-4 rounded-lg hover:bg-indigo-200 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <h4 className="text-xl font-semibold text-indigo-900 generic-header">Accuracy</h4>
            <p className="data-represent text-teal-500">{(lastGame.correctAnswers / 20 * 100).toFixed(2)}%</p>
          </div>

          <div className="flex justify-between items-center bg-indigo-100 p-4 rounded-lg hover:bg-indigo-200 transition-transform duration-300 ease-in-out transform hover:scale-105">
            <h4 className="text-xl font-semibold text-indigo-900 generic-header">Avg. Response Time</h4>
            <p className="data-represent text-orange-500">{lastGame.timeUsed / 20} seconds</p>
          </div>
        </div>
      </div>

      <br />

      {/* Visualization Section */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-12 generic-header2">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h3 className="text-md font-semibold mb-4">Scores Trend</h3>
          <Bar
            data={barChartData}
            options={{ responsive: true, maintainAspectRatio: true, aspectRatio: 1.5 }}
          />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 flex justify-center items-center">
          <div className="w-2/3">
            <h3 className="text-md font-semibold mb-4 text-center">Answer Distribution</h3>
            <Pie
              data={pieChartData}
              options={{ responsive: true, maintainAspectRatio: true, aspectRatio: 1.5 }}
            />
          </div>
        </div>
      </div>



    </section>
  );
};

export default Dashboard;
