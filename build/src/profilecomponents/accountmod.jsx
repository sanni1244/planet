import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

const Accountmod = ({ userId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [actionType, setActionType] = useState('');
    
    const showModal = (message, action = '') => {
        setModalMessage(message);
        setActionType(action);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setActionType('');
    };

    const executeAction = async () => {
        setIsModalOpen(false); 
        try {
            if (actionType === 'resetScore') {
                await handleAction(
                    `${process.env.REACT_APP_API_URL}/api/profile/reset-score/${userId}`,
                    'Score reset successfully!',
                    'No scores to reset'
                );
            } else if (actionType === 'deleteAccount') {
                await handleAction(
                    `${process.env.REACT_APP_API_URL}/api/profile/delete/${userId}`,
                    'Account deleted successfully!',
                    'Error deleting account'
                );
                localStorage.removeItem("user");
                window.location.href = '/';
            } else if (actionType === 'deleteZeroScoreGames') {
                await handleAction(
                    `${process.env.REACT_APP_API_URL}/api/profile/delete-zero-scores/${userId}`,
                    'Zero-score games deleted successfully!',
                    'No Zero Games found'
                );
            }
        } catch (err) {
            console.error("Error executing action", err);
            showModal('There was an error executing the action.', '');
        }
    };

    const handleAction = async (url, successMessage, errorMessage) => {
        try {
            await axios.delete(url);
            showModal(successMessage);
        } catch (err) {
            console.error(errorMessage, err);
            showModal(errorMessage);
        }
    };

    const deleteZeroScoreGames = () => showModal('Are you sure you want to delete all zero-score games?', 'deleteZeroScoreGames');
    const deleteAccount = () => showModal('Are you sure you want to delete your account? This action is irreversible.', 'deleteAccount');
    const resetScore = () => showModal('Are you sure you want to reset your score?', 'resetScore');

    return (
        <div className="space-y-6 data-represent">
            <button
                onClick={resetScore}
                className="text-lg font-medium text-purple-600 hover:text-purple-800 cursor-pointer"
            >
                <span className="mr-2">🔄</span> Reset Score
            </button> <br />
            <button
                onClick={deleteZeroScoreGames}
                className="text-lg font-medium text-red-600 hover:text-red-800 cursor-pointer"
            >
                <span className="mr-2">🗑️</span> Delete Zero-Score Games
            </button> <br />
            <button
                onClick={deleteAccount}
                className="text-lg font-medium text-red-800 hover:text-red-900 cursor-pointer"
            >
                <span className="mr-2">🚫</span> Delete Account
            </button>

            {/* Modal for confirmation */}
            {isModalOpen && actionType && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <p className="text-center text-lg font-medium mb-4">{modalMessage}</p>
                        <div className="flex justify-center gap-4">
                            <button
                                onClick={executeAction}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Yes
                            </button>
                            <button
                                onClick={closeModal}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal for success/error message */}
            {isModalOpen && !actionType && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <p className="text-center text-lg font-medium">{modalMessage}</p>
                        <div className="mt-4 text-center">
                            <button
                                onClick={closeModal}
                                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                            >
                                Okay
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

Accountmod.propTypes = {
    userId: PropTypes.string.isRequired,
};

export default Accountmod;
