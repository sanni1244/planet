import React from "react";
import axios from "axios";

const QuestionList = ({ questions, fetchQuestions }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/questions/${id}`);
      fetchQuestions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Question List</h2>
      <ul>
        {questions.map((question) => (
          <li key={question._id} className="border-b py-2">
            <div className="flex justify-between items-center">
              <p>{question.correctAnswer}</p>
              <button
                onClick={() => handleDelete(question._id)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionList;
