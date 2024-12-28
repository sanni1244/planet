import React, { useState, useEffect } from "react";
import axios from "axios";
import QuestionForm from "./admin2";
import QuestionList from "./admin3";

const Admin = () => {
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/questions`);
      setQuestions(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-5">
      <h1 className="text-3xl font-bold text-center mb-5">Admin Panel</h1>
      <div className="max-w-4xl mx-auto bg-white shadow rounded p-5">
        <QuestionForm fetchQuestions={fetchQuestions} />
        <QuestionList questions={questions} fetchQuestions={fetchQuestions} />
      </div>
    </div>
  );
};

export default Admin;
