const express = require("express");
const { UserGame, GameStats } = require("../models/game");
const User = require("../models/user");
const router = express.Router();

router.get("/user", async (req, res) => {
    const { userId } = req.query;

    if (!userId) {
        return res.status(400).json({ message: "userId is required" });
    }

    try {
        let user = await UserGame.findOne({ userId });

        if (!user) {
            user = new UserGame({ userId, username: userId, highscore: 0 });
            await user.save();
        }

        res.json(user);
    } catch (error) {
        console.error("Error fetching or creating user:", error);
        res.status(500).json({ message: "Server error" });
    }
});

// Update high score
router.post("/user/highscore", async (req, res) => {
    const { username, highscore } = req.body;

    if (!username || highscore === undefined) {
        return res.status(400).json({ message: "Missing username or highscore" });
    }

    try {
        const user = await User.findOneAndUpdate({ username }, { highscore }, { new: true });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json(user);
    } catch (error) {
        console.error("Error updating high score:", error);
        res.status(500).json({ message: "Error updating high score" });
    }
});

router.post("/game-stats", async (req, res) => {
    const { userId, score, timeUsed, correctAnswers } = req.body;

    if (!userId || score === undefined || timeUsed === undefined || correctAnswers === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        const gameStat = new GameStats({ userId, score, timeUsed, correctAnswers });
        await gameStat.save();
        res.json(gameStat);
    } catch (error) {
        console.error("Error saving game stats:", error);
        res.status(500).json({ message: "Error saving game stats" });
    }
});

router.get("/leaderboard", async (req, res) => {
    const { userId, country } = req.query;

    try {
        let userCountry = "Unknown";
        if (userId) {
            if (country) {
                userCountry = country
            }
            else {
                const user = await User.findOne({ username: userId });
                if (user) {
                    if (user.country) {
                        userCountry = user.country;
                    } 
                }
            }
        }

        const globalLeaderboard = await GameStats.aggregate([
            {
                $lookup: {
                    from: "usergames",
                    localField: "userId",
                    foreignField: "userId",
                    as: "userDetails",
                },
            },
            { $unwind: "$userDetails" },
            {
                $project: {
                    username: "$userDetails.username",
                    score: 1,
                    timeUsed: 1,
                    createdAt: 1,
                },
            },
            { $sort: { score: -1, createdAt: -1 } },
        ]);

        // Fetch country leaderboard
        const countryLeaderboard = await User.aggregate([
            {
                $match: {
                    country: userCountry,
                },
            },
            {
                $lookup: {
                    from: "usergames",
                    localField: "username",
                    foreignField: "username",
                    as: "userGameDetails",
                },
            },
            { $unwind: "$userGameDetails" },
            {
                $lookup: {
                    from: "gamestats",
                    localField: "userGameDetails.userId",
                    foreignField: "userId",
                    as: "gameStats",
                },
            },
            { $unwind: "$gameStats" },
            {
                $project: {
                    username: "$userGameDetails.username",
                    country: userCountry,
                    score: "$gameStats.score",
                    timeUsed: "$gameStats.timeUsed",
                    createdAt: "$gameStats.createdAt",
                },
            },
            { $sort: { score: -1, createdAt: -1 } },
        ]);

        res.json({ globalLeaderboard, countryLeaderboard });
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        res.status(500).json({ message: "Error fetching leaderboard data", error: error.message });
    }
});

module.exports = router;
