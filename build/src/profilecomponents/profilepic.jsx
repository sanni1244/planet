import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert2

const Profilepic = (props) => {
    const [profilePicture, setProfilePicture] = useState(null);
    const [error, setError] = useState(null);
    const [displayName, setDisplayName] = useState("Guest User");
    const [displayEmail, setDisplayEmail] = useState("user@example.com");
    const userIdData = localStorage.getItem('user') || sessionStorage.getItem('user');
    const userId1 = userIdData ? JSON.parse(userIdData).username : null;
    const [randomColor, setR] = useState("border-red-400");

    useEffect(() => {
        const colors = [
            'border-red-400',
            'border-blue-400',
            'border-green-400',
            'border-yellow-400',
            'border-purple-400',
            'border-pink-400',
            'border-orange-400',
        ];
        setR(colors[Math.floor(Math.random() * colors.length)]);

        if (props.user || userId1) {
            let userId = props.user || userId1;
            axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`)
                .then((response) => {
                    setDisplayName(response.data.name || "Guest User");
                    setDisplayEmail(response.data.email || "guest@example.com");

                    // Form the correct image URL
                    const profilePicUrl = response.data.profilePicture
                        ? `${process.env.REACT_APP_API_URL}${response.data.profilePicture}`
                        : null;
                    setProfilePicture(profilePicUrl);
                })
                .catch(() => {
                    setError("Failed to fetch user details.");
                });
        }
    }, [userId1]);

    // Handle profile picture change
    const handleProfilePictureChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('profilePicture', file);

        try {
            let userId = userId1;
            // Send the image file to the backend for upload
            const response = await axios.post(
                `${process.env.REACT_APP_API_URL}/api/profile/upload-profile-picture/${userId}`,
                formData
            );

            // Update the profile picture state with the path returned from the backend
            const updatedProfilePicture = `${process.env.REACT_APP_API_URL}${response.data.profilePicture}`;
            setProfilePicture(updatedProfilePicture);

            // Beautiful alert with SweetAlert2
            Swal.fire({
                title: 'Success!',
                text: 'Profile picture updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK',
            });
        } catch (err) {
            Swal.fire({
                title: 'Error!',
                text: 'Error uploading profile picture. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
        }
    };

    return (
        <div className="">
            <div className="relative">
                {profilePicture ? (
                    props.show ?
                        <img
                            src={profilePicture}
                            //for leaderboard with image
                            alt="Profile"
                            className="w-10 h-10 rounded-full object-cover transition-transform duration-500 transform hover:scale-105"
                            onError={(e) => { e.target.src = "https://picsum.photos/200"; }}
                        />
                        :
                        <img
                            // for profile with image
                            src={profilePicture}
                            alt="Profile"
                            className="w-40 h-40 rounded-full object-cover shadow-xl transition-transform duration-500 transform hover:scale-105"
                            onError={(e) => { e.target.src = "https://picsum.photos/200"; }}
                        />
                ) : (
                    props.show ?
                        <img
                            src="https://static.vecteezy.com/system/resources/previews/018/765/757/non_2x/user-profile-icon-in-flat-style-member-avatar-illustration-on-isolated-background-human-permission-sign-business-concept-vector.jpg"
                            alt="User Avatar"
                            className={`w-10 h-10 rounded-full shadow-lg border-4 ${randomColor}`}
                        />
                        :
                        <img
                            // for profile without image
                            src="https://picsum.photos/200"
                            alt="User Avatar"
                            className="w-25 h-25 rounded-full shadow-lg border-4 border-red-400"
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

            {/* Display error message */}
            {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>
    );
};

export default Profilepic;
