import { useSearchParams, useNavigate } from "react-router-dom";
import Confetti from "react-confetti"; 
import { useState, useEffect } from "react";

const Final = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const score = Number(searchParams.get("score"));
    const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

    useEffect(() => {
        // Update window size for Confetti
        setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        const handleResize = () =>
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        window.addEventListener("resize", handleResize);

        // Block going back in browser history
        window.history.pushState(null, null, window.location.href); // Push current state to history
        const handlePopState = () => {
            window.history.pushState(null, null, window.location.href); // Prevent going back
        };
        window.addEventListener("popstate", handlePopState);

        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("popstate", handlePopState);
        };
    }, []);

    const hints = [
        "Focus on unique features of landmarks to guess faster.",
        "Brush up on famous landmarks from Asia for better scores.",
        "Pay attention to cultural elements in the images!",
        "Practice identifying landmarks with historical significance.",
        "Study modern landmarks; they're often easier to identify.",
        "Explore famous UNESCO World Heritage Sites for better guesses.",
        "Learn about iconic landmarks from Europe to improve accuracy.",
        "Familiarize yourself with famous city skylines!",
        "Landmarks often have distinct shapes—pay attention to them.",
        "Practice identifying natural landmarks, such as mountains or rivers.",
        "Watch travel documentaries to learn about unique landmarks.",
        "Focus on architectural styles to determine the region.",
        "Memorize key landmarks from popular tourist destinations.",
        "Think about the climate in the image to narrow your options.",
        "Look for flags or symbols in the images—they often give clues!",
        "Brush up on South American landmarks for variety.",
        "Focus on iconic bridges—they’re frequently featured.",
        "Zoom in on smaller details in the image for better guesses.",
        "Familiarize yourself with major landmarks from Africa.",
        "Learn about the tallest buildings globally to spot them faster.",
        "Focus on landmarks that are part of cultural festivals.",
        "Try guessing based on the type of vegetation in the image.",
        "Identify iconic towers—they’re usually recognizable worldwide.",
        "Look for famous statues in the images—they're common landmarks.",
        "Think about how geography affects the location of landmarks.",
        "Familiarize yourself with landmarks from islands and coastal regions.",
        "Learn about religious landmarks and their global significance.",
        "Pay attention to the materials used in the buildings.",
        "Brush up on famous landmarks featured in movies.",
        "Focus on landmarks with unique lighting or night-time views.",
        "Recognize iconic stadiums—they're often easily identifiable.",
        "Look at the colors in the image; they might hint at a location.",
        "Research famous castles and fortresses from history.",
        "Think about famous monuments and their historical context.",
        "Focus on distinguishing natural vs. man-made landmarks.",
        "Learn about iconic temples and their regions.",
        "Understand the significance of famous parks and gardens.",
        "Memorize famous national landmarks of different countries.",
        "Practice recognizing landmarks from various continents.",
        "Look for clues in the image’s background, like mountains or water.",
        "Identify ruins and ancient landmarks—they’re often unique.",
        "Think about landmarks with cultural festivals or events.",
        "Notice shapes and patterns in the architecture.",
        "Learn about newer landmarks that are gaining global recognition.",
        "Focus on famous markets or squares—they often appear."
    ];

    const randomHint = hints[Math.floor(Math.random() * hints.length)];

    // Personalized feedback
    const feedback =
        score >= 1000
            ? "You're a pro at this! Keep up the amazing work! 🏆"
            : score >= 500
                ? "Great effort! You're getting better with every game! 🚀"
                : "Keep practicing, and you'll master this in no time! 💪";

    return (
        <section className="final-score min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-900 to-purple-800 text-white relative overflow-hidden py-8 px-4">
    {/* Confetti Animation */}
    <Confetti width={windowSize.width} height={windowSize.height} />

    {/* Subtle Background Glow */}
    <div className="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-3xl opacity-30 w-96 h-96 animate-pulse"></div>

    {/* Avatar Section */}
    <div className="avatar mb-8">
        <img
            src="https://picsum.photos/200"
            alt="User Avatar"
            className="w-24 h-24 md:w-32 md:h-32 rounded-full shadow-md border-4 border-blue-400 hover:scale-105 transform transition duration-300 ease-in-out"
        />
    </div>

    {/* Score Display */}
    <div className="text-center mb-8">
        <h2 className="text-4xl font-bold mb-3 text-blue-200 animate-fade-in">
            🌟 Your Final Score 🌟
        </h2>
        <p className="text-6xl md:text-7xl font-black text-pink-400 animate-bounce">{score}</p>
        <p className="text-base md:text-lg mt-3 text-gray-300">{feedback}</p>
    </div>

    {/* Hint Section */}
    <div className="hint-section max-w-md w-full bg-white bg-opacity-10 rounded-lg shadow-lg p-6 md:p-8 text-center mb-10">
        <h3 className="text-2xl font-bold text-blue-300 mb-3">Did You Know?</h3>
        <p className="text-sm md:text-base text-gray-200 animate-fade-in">
            {randomHint}
        </p>
    </div>

    {/* Buttons for Navigation */}
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <button
            onClick={() => navigate("/game")}
            className="py-3 px-6 rounded-full bg-gradient-to-r from-blue-500 to-teal-400 text-sm md:text-base font-semibold text-indigo-900 shadow-lg hover:from-blue-600 hover:to-teal-500 transition-transform transform hover:scale-110"
        >
            🏠 Dashboard
        </button>
        <button
            onClick={() => navigate("/startgame")}
            className="py-3 px-6 rounded-full bg-gradient-to-r from-green-500 to-lime-400 text-sm md:text-base font-semibold text-white shadow-lg hover:from-green-600 hover:to-lime-500 transition-transform transform hover:scale-110"
        >
            🔄 Try Again
        </button>
    </div>

    {/* Share Section */}
    <div className="text-center">
        <h3 className="text-lg font-bold text-blue-200 mb-4 animate-fade-in">
            Share Your Achievement
        </h3>
        <button
  onClick={() => {
    const scoreMessage = `🚀 I scored ${score} points! 🎉\n\nCheck out my awesome journey and play now: https://planetpix.vercel.app\n\n#GamingFun #ScoreChallenge`;
    const imageUrl = 'https://picsum.photos/200'; // Replace with your actual image URL or favicon URL
    const whatsappLink = `https://wa.me/?text=${encodeURIComponent(scoreMessage)}%0A%0A%3Cimg%20src%3D%22${encodeURIComponent(imageUrl)}%22%20alt%3D%22%22%3E`;

    window.open(whatsappLink, '_blank');
  }}
  className="py-2 px-8 rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-sm md:text-base font-semibold text-white shadow-lg hover:from-pink-600 hover:to-red-500 transition-transform transform hover:scale-110"
>
  🚀 Share Now
</button>

    </div>
</section>
    
    );
};

export default Final;
