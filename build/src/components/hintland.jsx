import React, { useState, useEffect } from 'react';

const landmarks = [
  {
    name: 'Eiffel Tower',
    hints: [
      "This landmark is 324 meters tall.",
      "It was built in 1889.",
      "It’s located in Paris, France.",
      "It was originally criticized for its design.",
      "It is one of the most visited paid monuments in the world."
    ]
  },
  {
    name: 'Great Wall of China',
    hints: [
      "This landmark stretches over 21,000 kilometers.",
      "It was primarily built to protect against invasions.",
      "It is visible from space.",
      "Construction started in the 7th century BC.",
      "It was constructed using stone, brick, and wood."
    ]
  },
  {
    name: 'Colosseum',
    hints: [
      "This landmark was used for gladiator contests.",
      "It was completed in 80 AD.",
      "It is located in Rome, Italy.",
      "It could hold up to 50,000 spectators.",
      "It is one of the most iconic ancient Roman structures."
    ]
  },
  // Add more landmarks if needed
];

const HeroSection = () => {
  const [currentLandmark, setCurrentLandmark] = useState({});
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  // Randomly select a landmark on initial render
  useEffect(() => {
    const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)];
    setCurrentLandmark(randomLandmark);
    setIsCorrect(null); // Reset the previous guess status
  }, []);

  // Update the clue every 5 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentHintIndex((prevIndex) => (prevIndex + 1) % currentLandmark.hints?.length);
    }, 5000);

    return () => clearInterval(intervalId);
  }, [currentLandmark]);

  // Handle the user's guess
  const handleGuess = () => {
    if (userGuess.toLowerCase() === currentLandmark.name.toLowerCase()) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const playAgain = () => {
    const randomLandmark = landmarks[Math.floor(Math.random() * landmarks.length)];
    setCurrentLandmark(randomLandmark);
    setUserGuess('');
    setIsCorrect(null);
    setCurrentHintIndex(0); // Reset the hint index so it starts from the first hint
  };

  return (
    <div className="hintland bg-gray-800 min-h-screen flex justify-center items-center text-white relative">
      <div className="hero-content text-center p-6 rounded-lg shadow-xl bg-gray-900 bg-opacity-80">
        <h1 className="text-3xl font-bold mb-4 text-teal-400">Can you guess the landmark based on clues?</h1>
        <p className="clue text-xl font-semibold mb-6">{currentLandmark.hints?.[currentHintIndex]}</p>

        <div className="guess-section mb-6">
          <input
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Enter your guess"
            className="w-full p-3 text-xl rounded-md border-2 border-teal-400 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-teal-400 mb-4"
          />
          <button
            onClick={handleGuess}
            className="w-full p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Submit Answer
          </button>
        </div>

        {isCorrect !== null && (
          <div className={`mt-4 ${isCorrect ? 'text-teal-400' : 'text-red-500'} text-2xl font-bold animate__animated animate__fadeIn`}>
            {isCorrect ? 'Correct! 🎉' : 'Oops, try again! 😢'}
          </div>
        )}

        {isCorrect !== null && (
          <button
            onClick={playAgain}
            className="mt-6 p-3 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition duration-300"
          >
            Play Again
          </button>
        )}
      </div>

      <div className="glowing-shapes absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center pointer-events-none">
        <div className="circle animate-spin-slow"></div>
        <div className="arrow animate-bounce"></div>
      </div>
    </div>
  );
};

export default HeroSection;
