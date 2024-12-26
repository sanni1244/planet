import React, { useState } from "react";
import axios from "axios";

const QuestionForm = ({ fetchQuestions }) => {
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [image, setImage] = useState("");


  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/questions`, {
        questionText,
        options,
        image,
        correctAnswer,
      });
      setQuestionText("");
      setOptions(["", "", "", ""]);
      setCorrectAnswer("");
      setImage("")
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-5">
      <div className="mb-4">
        <label className="block text-gray-700">Question</label>
        <input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Options</label>
        {options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            className="w-full border rounded p-2 mb-2"
            required
          />
        ))}
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Image Url</label>
        <input
          type="text"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Correct Answer</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="w-full border rounded p-2"
          required
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Question
      </button>
    </form>
  );
};

export default QuestionForm;
