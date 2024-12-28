import React from "react";
import { wonders } from "../components/wonder";
import { useNavigate } from "react-router-dom";

const WondersPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-blue-800 to-indigo-900 min-h-screen text-white">
      <header className="text-center py-5">
        <h1 className="text-4xl font-bold">7 Wonders of the World</h1>
        <p className="mt-2">Explore the wonders and their fascinating stories.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-5">
        {wonders.map((wonder) => (
          <div
            key={wonder.id}
            className="bg-white text-black rounded-lg shadow-lg overflow-hidden cursor-pointer"
            onClick={() => navigate(`/wonder/${wonder.id}`)}
          >
            <img src={wonder.image} alt={wonder.name} className="h-48 w-full object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-bold">{wonder.name}</h2>
              <p className="text-gray-700">{wonder.location}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WondersPage;
