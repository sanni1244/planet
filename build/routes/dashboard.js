const express = require("express");
const { GameStats } = require("../models/game"); 
const router = express.Router();

router.get("/user-stats", async (req, res) => {
    const { userId } = req.query;
    if (!userId) {
        return res.status(400).json({ message: "User ID is required." });
    }
    try {
        const stats = await GameStats.find({ userId });
        res.status(200).json({ message: "Stats retrieved successfully.", stats: stats || [] });
    } catch (error) {
        console.error("Error fetching user stats:", error.message);
        res.status(500).json({ message: "Internal server error. Failed to fetch stats." });
    }
});

module.exports = router;
