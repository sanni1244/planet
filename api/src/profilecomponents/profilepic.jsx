import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Spinner from '../components/spinner';

const Profilepic = (props) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const userIdData = localStorage.getItem('user') || sessionStorage.getItem('user');
    const userId1 = userIdData ? JSON.parse(userIdData).username : null;
    const [randomColor, setRandomColor] = useState('');

    useEffect(() => {
        // Random color generation
        const colors = [
            'border-red-400',
            'border-blue-400',
            'border-green-400',
            'border-yellow-400',
            'border-purple-400',
            'border-pink-400',
            'border-orange-400',
        ];
        setRandomColor(colors[Math.floor(Math.random() * colors.length)]);

        // Fetch profile picture
        const fetchProfilePicture = async () => {
            if (props.user || userId1) {
                try {
                    const userId = props.user || userId1;
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`);
                    const profilePicUrl = response.data.profilePicture || null;
                    setProfilePicture(profilePicUrl);
                } catch {
                    setError('Failed to fetch user details.');
                } finally {
                    setLoading(false);
                }
            } else {
                setLoading(false);
            }
        };

        fetchProfilePicture();
    }, [props.user, userId1]);

    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            setLoading(true);
            setError(null);

            const userId = userId1;
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/profile/upload-profile-picture/${userId}`,
                formData
            );

            const updatedProfilePicture = response.data.profilePicture;
            setProfilePicture(updatedProfilePicture);

            Swal.fire({
                title: 'Success!',
                text: 'Profile picture updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch {
            Swal.fire({
                title: 'Error!',
                text: 'Error uploading profile picture. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <div className="relative">
                {profilePicture ? (
                    props.show ? (
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover transition-transform duration-500 transform hover:scale-105"
                            onError={(e) => {
                                e.target.src = 'https://picsum.photos/200';
                            }}
                        />
                    ) : (
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover shadow-xl transition-transform duration-500 transform hover:scale-105"
                            onError={(e) => {
                                e.target.src = 'https://picsum.photos/200';
                            }}
                        />
                    )
                ) : (
                    <img
                        src="https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                        alt="User Avatar"
                        className={`w-10 h-10 rounded-full shadow-lg border-4 ${randomColor}`}
                    />
                )}

                {!props.show && (
                    <label className="absolute bottom-0 right-0 bg-indigo-500 text-white p-2 rounded-full hover:bg-indigo-600 transition cursor-pointer">
                        <input
                            type="file"
                            onChange={handleProfilePictureChange}
                            className="hidden"
                        />
                        <span className="text-sm font-medium">Upload</span>
                    </label>
                )}
            </div>

            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
};

export default Profilepic;
