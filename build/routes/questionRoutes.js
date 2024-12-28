const express = require("express");
const { getQuestions } = require("../controllers/questionController");
const Question = require("../models/question");

const router = express.Router();

router.get("/", async (req, res) => {
  const { difficulty } = req.query;
  try {
    const query = difficulty ? { difficulty: difficulty.toLowerCase() } : {};
    const questions = await Question.aggregate([
      { $match: query },
      { $sample: { size: 20 } } 
    ]);
    res.status(200).json(questions);
  } catch (error) {
    console.error("Error fetching questions:", error.message);
    res.status(500).json({ error: "Failed to fetch questions." });
  }
});


// Create a question  
router.post("/", async (req, res) => {
  const { questionText, options, correctAnswer, image, difficulty } = req.body;

  // Validate the provided question data
  if (!questionText || !options || options.length < 2 || !correctAnswer) {
    return res.status(400).json({ error: "Invalid question data provided." });
  }

  try {
    const lowerCaseOptions = options.map(option => option.toLowerCase());
    const lowerCaseCorrectAnswer = correctAnswer.toLowerCase();
    const newQuestion = new Question({ 
      questionText, 
      options: lowerCaseOptions, 
      image, 
      correctAnswer: lowerCaseCorrectAnswer,
      difficulty
      
    });

    const savedQuestion = await newQuestion.save();
    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error("Error creating question:", error.message);
    res.status(500).json({ error: "Failed to create question." });
  }
});

// Update a question
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { questionText, options, correctAnswer } = req.body;

  // Validate the provided question data
  if (!questionText || !options || options.length < 2 || !correctAnswer) {
    return res.status(400).json({ error: "Invalid question data provided." });
  }

  try {
    const lowerCaseOptions = options.map(option => option.toLowerCase());
    const lowerCaseCorrectAnswer = correctAnswer.toLowerCase();
    const updatedQuestion = await Question.findByIdAndUpdate(
      id,
      { questionText, options: lowerCaseOptions, correctAnswer: lowerCaseCorrectAnswer },
      { new: true }
    );

    if (!updatedQuestion) {
      return res.status(404).json({ error: "Question not found." });
    }

    res.status(200).json(updatedQuestion);
  } catch (error) {
    console.error("Error updating question:", error.message);
    res.status(500).json({ error: "Failed to update question." });
  }
});

// Delete a question
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ error: "Question not found." });
    }

    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    console.error("Error deleting question:", error.message);
    res.status(500).json({ error: "Failed to delete question." });
  }
});

module.exports = router;
