const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionText: { type: String, required: true },
  options: [String],
  image: [String],
  correctAnswer: { type: String, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
