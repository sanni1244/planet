const Question = require("../models/question");

const getQuestions = async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 20 } }]); // Randomly selects 20 questions
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ error: "Failed to fetch questions." });
  }
};

module.exports = { getQuestions };
