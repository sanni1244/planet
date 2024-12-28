import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Accountmod from '../profilecomponents/accountmod';
import Changedetails from '../profilecomponents/changedetails';
import Profilepic from '../profilecomponents/profilepic';

const ProfilePage = () => {
    const [userData, setUserData] = useState({
        username: '',
        displayName: '',
        email: '',
        country: '',
        profilePicture: null,
        notificationsEnabled: false,
    });
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [error, setError] = useState('');
    const userIdData = localStorage.getItem('user') || sessionStorage.getItem('user');
    const userId = userIdData ? JSON.parse(userIdData).username : null;
    const navigate = useNavigate();

    useEffect(() => {
        if (userId) {
            axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`)
                .then(response => setUserData(response.data))
                .catch(err => {
                    console.error('Error fetching user data', err);
                    setError('Unable to load profile data');
                });
        }
    }, [userId]);

    if (!userId) {
        navigate('/login');
        return null;
    }

    return (
        <div
            className={`min-h-screen ${theme === 'light' ? 'bg-gradient-to-r from-cyan-400 to-teal-500 text-gray-800' : 'bg-gray-900 text-white'} transition-all duration-300`}>
            <div className="container mx-auto">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8 extra-cut">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-4xl font-bold text-center alegreya-500 generic-header">Profile Settings</h1>
                    </div>
                    <div className="space-y-12">
                        <div className="flex justify-center items-center space-x-6 mb-10 flex-wrong">
                            <Profilepic profilePicture={userData.profilePicture} />
                            <div>
                                <h2 className="text-2xl font-semibold text-regular ">{userData.username ? userData.username[0].toUpperCase() + userData.username.slice(1) : 'Username'}</h2>
                                <p className="text-sm text-gray-500 text-regular">{userData.email || 'Email Address'}</p>
                            </div>
                        </div>
                        <Changedetails userId={userId} usedName = {userData.username} usedEmail = {userData.email} usedCountry = {userData.country} />
                        <Accountmod userId={userId} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
