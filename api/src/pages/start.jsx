import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StartGame = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [score, setScore] = useState(0);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [username, setUsername] = useState("");
  const [highscore, setHighscore] = useState(0);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdownValue, setCountdownValue] = useState(3);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [isPreloading, setIsPreloading] = useState(true);

  const userId1 = JSON.parse(localStorage.getItem("user")) || JSON.parse(sessionStorage.getItem("user"));
  const userId = userId1?.username;

  const navigate = useNavigate();

  const preloadImages = async (questions) => {
    const promises = questions.map((q) =>
      new Promise((resolve, reject) => {
        const img = new Image();
        img.src = q.image;
        img.onload = resolve;
        img.onerror = reject;
      })
    );
    await Promise.all(promises);
  };

  const fetchGameData = async () => {
    try {
      const [questionsResponse, userResponse] = await Promise.all([
        axios.get(`${process.env.REACT_APP_API_URL}/api/questions`),
        axios.get(`${process.env.REACT_APP_API_URL}/api/games/user`, {
          params: { userId },
        }),
      ]);

      const questionsData = questionsResponse.data;
      setQuestions(questionsData);
      setUsername(userResponse.data.username);
      setHighscore(userResponse.data.highscore);

      await preloadImages(questionsData);
      setIsPreloading(false);
      setIsCountdownActive(true); // Start countdown after preloading
    } catch (error) {
      console.error("Failed to load game data:", error);
    }
  };

  useEffect(() => {
    fetchGameData();
  }, []);

  useEffect(() => {
    if (isCountdownActive) {
      const countdownTimer = setInterval(() => {
        setCountdownValue((prev) => {
          if (prev === 1) {
            setIsCountdownActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(countdownTimer);
    }
  }, [isCountdownActive]);

  useEffect(() => {
    if (!isCountdownActive && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [isCountdownActive, timeLeft]);

  useEffect(() => {
    if (questions.length > 0) {
      const currentQuestion = questions[currentQuestionIndex];
      if (currentQuestion) {
        setShuffledOptions([...currentQuestion.options].sort(() => Math.random() - 0.5));
      }
    }
  }, [currentQuestionIndex, questions]);

  const calculateBonusPoints = () => {
    if (timeLeft > 285) return 75;
    if (timeLeft > 250) return 55;
    if (timeLeft > 215) return 48;
    if (timeLeft > 185) return 24;
    if (timeLeft > 135) return 16;
    return 10;
  };

  const handleAnswer = async (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswer === selectedOption;
    const bonusPoints = calculateBonusPoints();
    const questionScore = isCorrect ? 20 + bonusPoints : 0;

    setScore((prev) => prev + questionScore);
    setCorrectAnswersCount((prev) => prev + (isCorrect ? 1 : 0));

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      const finalScore = score + questionScore;
      const totalCorrectAnswers = correctAnswersCount + (isCorrect ? 1 : 0);
      try {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/games/game-stats`, {
          userId,
          score: finalScore,
          timeUsed: 300 - timeLeft,
          correctAnswers: totalCorrectAnswers,
        });
        navigate(`/final?score=${finalScore}`);
      } catch (error) {
        console.error("Failed to send game data:", error);
      }
    }
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (isPreloading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-purple-800 via-indigo-600 to-blue-500 animate-gradient-x">
        <div className="relative w-24 h-24">
          <div className="absolute inset-0 border-4 border-t-transparent border-purple-300 rounded-full animate-spin"></div>
          <div className="absolute inset-1 border-4 border-b-transparent border-indigo-300 rounded-full animate-reverse-spin"></div>
        </div>
        <div className="mt-4 text-sm text-indigo-200 animate-fade-in">
          Loading questions and landmarks 🗺️
        </div>
      </div>
    );
  }

  if (isCountdownActive) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-b from-indigo-900 to-purple-700">
        <div className={`text-6xl font-bold text-white animate-pulse ${countdownValue === 1 ? "text-red-500" : countdownValue === 2 ? "text-yellow-500" : "text-green-500"}`}>
          {countdownValue > 0 ? countdownValue : "Go!"}
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return <div className="text-white text-center text-2xl">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-900 to-purple-700 text-white flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6 text-gray-800 font-tray">
        <div className="flex flex-col sm:flex-row sm:justify-between items-center mb-4">
        <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-0">
            Question: {currentQuestionIndex + 1}/{questions.length}
          </h2>
          <h2 className="text-lg sm:text-2xl font-bold mb-2 sm:mb-0">Time Left: {formatTime(timeLeft)}</h2>
          <h2 className="text-lg sm:text-2xl font-bold">Score: {score}</h2>
        </div>
        <div className="mb-6 img-bpx">
          <img
            src={questions[currentQuestionIndex].image}
            alt="Landmark"
            className="rounded-lg shadow-md w-full h-64 object-cover myimgqq"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {shuffledOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option)}
              className="py-2 px-4 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 transition transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>

  );
};

export default StartGame;
