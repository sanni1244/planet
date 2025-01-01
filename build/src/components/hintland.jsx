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
  {
    name: 'Statue of Liberty',
    hints: [
      "This landmark was a gift from France to the USA.",
      "It is located in New York Harbor.",
      "It represents freedom and democracy.",
      "It was dedicated in 1886.",
      "It is made of copper and has turned green over time."
    ]
  },
  {
    name: 'Machu Picchu',
    hints: [
      "This landmark is located in the Andes Mountains of Peru.",
      "It is an ancient Incan city.",
      "It was rediscovered in 1911.",
      "It is a UNESCO World Heritage Site.",
      "It features stunning terraces and stone structures."
    ]
  },
  {
    name: 'Christ the Redeemer',
    hints: [
      "This landmark stands atop Mount Corcovado.",
      "It is located in Rio de Janeiro, Brazil.",
      "It was completed in 1931.",
      "It is 30 meters tall, excluding the pedestal.",
      "It symbolizes peace and Christianity."
    ]
  },
  {
    name: 'Taj Mahal',
    hints: [
      "This landmark is located in Agra, India.",
      "It was built by Emperor Shah Jahan.",
      "It is a mausoleum made of white marble.",
      "It was completed in 1648.",
      "It is one of the New Seven Wonders of the World."
    ]
  },
  {
    name: 'Pyramids of Giza',
    hints: [
      "This landmark is over 4,000 years old.",
      "It is located in Egypt.",
      "It was built as a tomb for pharaohs.",
      "It includes the Great Pyramid of Khufu.",
      "It is the only surviving wonder of the ancient world."
    ]
  },
  {
    name: 'Big Ben',
    hints: [
      "This landmark is a clock tower.",
      "It is located in London, England.",
      "Its official name is the Elizabeth Tower.",
      "It was completed in 1859.",
      "It is part of the Palace of Westminster."
    ]
  },
  {
    name: 'Sydney Opera House',
    hints: [
      "This landmark is famous for its unique shell-like design.",
      "It is located in Sydney, Australia.",
      "It was completed in 1973.",
      "It hosts concerts and performances.",
      "It is a UNESCO World Heritage Site."
    ]
  },
  {
    name: 'Mount Everest',
    hints: [
      "This is the tallest mountain in the world.",
      "It is located on the border of Nepal and China.",
      "It stands at 8,848.86 meters above sea level.",
      "It was first summited in 1953.",
      "It is part of the Himalayan mountain range."
    ]
  },
  {
    name: 'Golden Gate Bridge',
    hints: [
      "This landmark spans San Francisco Bay.",
      "It was completed in 1937.",
      "Its iconic color is called International Orange.",
      "It is located in California, USA.",
      "It was the longest suspension bridge in the world when built."
    ]
  },
  {
    name: 'Stonehenge',
    hints: [
      "This landmark is a prehistoric monument.",
      "It is located in Wiltshire, England.",
      "It dates back to 3000 BC.",
      "Its purpose remains a mystery.",
      "It features massive stone structures in a circular layout."
    ]
  },
  {
    name: 'Empire State Building',
    hints: [
      "This landmark was the tallest building in the world for 40 years.",
      "It is located in New York City, USA.",
      "It was completed in 1931.",
      "It has 102 floors.",
      "It lights up in different colors for special occasions."
    ]
  },
  {
    name: 'Burj Khalifa',
    hints: [
      "This is the tallest building in the world.",
      "It is located in Dubai, UAE.",
      "It was completed in 2010.",
      "It stands at 828 meters tall.",
      "It features the highest observation deck in the world."
    ]
  },
  {
    name: 'Niagara Falls',
    hints: [
      "This is a group of three waterfalls.",
      "It is located on the border of the USA and Canada.",
      "It is a popular honeymoon destination.",
      "Its largest waterfall is Horseshoe Falls.",
      "It generates hydroelectric power."
    ]
  },
  {
    name: 'Acropolis of Athens',
    hints: [
      "This landmark features the Parthenon.",
      "It is located in Athens, Greece.",
      "It dates back to the 5th century BC.",
      "It was dedicated to the goddess Athena.",
      "It symbolizes ancient Greek civilization."
    ]
  },
  {
    name: 'Chichen Itza',
    hints: [
      "This landmark is an ancient Mayan city.",
      "It is located in Mexico.",
      "It features the Pyramid of Kukulkan.",
      "It was a major ceremonial center.",
      "It is one of the New Seven Wonders of the World."
    ]
  },
  {
    name: 'Petra',
    hints: [
      "This landmark is carved into rose-red sandstone cliffs.",
      "It is located in Jordan.",
      "It dates back to 300 BC.",
      "It is known as the 'Rose City.'",
      "It was the capital of the Nabatean Kingdom."
    ]
  },
  {
    name: 'Angkor Wat',
    hints: [
      "This landmark is the largest religious monument in the world.",
      "It is located in Cambodia.",
      "It was originally a Hindu temple.",
      "It was built in the 12th century.",
      "It later became a Buddhist temple."
    ]
  },
  {
    name: 'Sagrada Familia',
    hints: [
      "This landmark is a basilica.",
      "It is located in Barcelona, Spain.",
      "It was designed by Antoni Gaudí.",
      "Construction began in 1882 and is ongoing.",
      "It features unique Gothic and Art Nouveau styles."
    ]
  },
  {
    name: 'Table Mountain',
    hints: [
      "This landmark has a flat top.",
      "It is located in Cape Town, South Africa.",
      "It is one of the New Seven Natural Wonders.",
      "It offers panoramic views of the city.",
      "It is a popular hiking destination."
    ]
  },
  {
    name: 'Leaning Tower of Pisa',
    hints: [
      "This landmark is known for its tilt.",
      "It is located in Pisa, Italy.",
      "It is a freestanding bell tower.",
      "It was completed in 1372.",
      "The tilt was caused by unstable soil."
    ]
  },
  {
    name: 'Mount Fuji',
    hints: [
      "This is an iconic volcano in Japan.",
      "It is located near Tokyo.",
      "It stands at 3,776 meters tall.",
      "It is considered a sacred site in Japanese culture.",
      "It is a popular climbing destination."
    ]
  },
  {
    name: 'Hagia Sophia',
    hints: [
      "This landmark is located in Istanbul, Turkey.",
      "It was originally a cathedral.",
      "It later became a mosque.",
      "It is now a museum.",
      "It features stunning Byzantine architecture."
    ]
  }
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
