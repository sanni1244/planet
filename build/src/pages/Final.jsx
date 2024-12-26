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
        <section className="final-score py-12 bg-gradient-to-b from-indigo-800 to-purple-900 text-white min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            {/* Confetti Animation */}
            <Confetti width={windowSize.width} height={windowSize.height} />

            {/* User Image */}
            <div className="avatar mb-6">
                <img
                    src="https://picsum.photos/200"
                    alt="User Avatar"
                    className="w-36 h-36 rounded-full shadow-lg border-4 border-yellow-400"
                />
            </div>

            {/* Score Display */}
            <div className="text-center mb-12">
                <h2 className="text-5xl font-extrabold mb-4">
                    🎉 Final Score 🎉
                </h2>
                <p className="text-7xl font-black text-yellow-400">
                    {score}
                </p>
                <p className="text-lg mt-4">{feedback}</p>
            </div>

            {/* Hint Section */}
            <div className="hint-section max-w-xl w-full bg-white bg-opacity-10 rounded-lg shadow-lg p-8 text-center mb-12">
                <h3 className="text-3xl font-bold text-yellow-300 mb-4">Hints</h3>
                <p className="text-lg">{randomHint}</p>
            </div>

            {/* Buttons for Navigation */}
            <div className="flex gap-6 mb-8">  
                <button
                    onClick={() => navigate("/game")}
                    className="bg-yellow-500 text-indigo-900 py-3 px-8 rounded-lg shadow hover:bg-yellow-600 transition transform hover:scale-105"
                >
                    🏠 Back to Dashboard
                </button>
                <button
                    onClick={() => navigate("/startgame")}
                    className="bg-green-500 text-white py-3 px-8 rounded-lg shadow hover:bg-green-600 transition transform hover:scale-105"
                >
                    🔄 Play Again
                </button>
            </div>

            {/* Share Your Score */}
            <div className="share-section text-center">
                <h3 className="text-xl font-bold mb-4">Share Your Score</h3>
                <button
                    onClick={() =>
                        alert(
                            `Shared! Let your friends know you scored ${score} points!`
                        )
                    }
                    className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow hover:bg-blue-600 transition transform hover:scale-105"
                >
                    📢 Share Now
                </button>
            </div>
        </section>
    );
};

export default Final;
