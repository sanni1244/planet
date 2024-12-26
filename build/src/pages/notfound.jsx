// src/pages/PageNotFound.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageNotFound = () => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
      <p className="text-gray-600 mb-6 text-center max-w-md">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={handleRedirect}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-lg hover:bg-blue-600 transition duration-300"
      >
        Go to Home
      </button>
    </div>
  );
};

export default PageNotFound;
