import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { wonders } from "../components/wonder";

const WonderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const wonder = wonders.find((w) => w.id === parseInt(id));

    if (!wonder) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white bg-gray-900">
                <h1>Wonder not found!</h1>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen p-5">
            <div className="flex flex-col md:flex-row items-center md:items-start">
                <span className="flex flex-col gap-4">
                    <img src={wonder.image} alt={wonder.name} className="w-100 h-80 object-cover rounded-lg" />
                    <img src={wonder.image2} alt={wonder.name} className="w-100 h-80 object-cover rounded-lg" />
                    <img src={wonder.image3} alt={wonder.name} className="w-100 h-80 object-cover rounded-lg" />
                </span>
                <div className="md:ml-5 mt-5 md:mt-0">
                    <h1 className="text-3xl font-bold">{wonder.name}</h1>
                    <p className="text-lg text-gray-300 mt-2">{wonder.location}</p>
                    <p className="mt-5">{wonder.description}</p>
                    <ul className="mt-5 p-3">
                        {wonder.facts.map((fact, index) => (
                            <li key={index} className="p-2 text-gray-400">
                                {fact}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default WonderDetails;
