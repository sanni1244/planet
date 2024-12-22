const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  username: { type: String, required: true },
  highscore: { type: Number, default: 0 },
});

const gameStatsSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  score: { type: Number, required: true },
  timeUsed: { type: Number, required: true },
  correctAnswers: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const UserGame = mongoose.model("UserGame", gameSchema);
const GameStats = mongoose.model("GameStats", gameStatsSchema);

module.exports = { UserGame, GameStats };
