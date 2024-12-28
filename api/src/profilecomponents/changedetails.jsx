import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import countries from "../components/countries";

const Changedetails = ({ userId, usedName, usedEmail, usedCountry }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");

  useEffect(() => {
    setUsername(usedName || "");
    setEmail(usedEmail || "");
    setCountry(usedCountry || "");
  }, [usedName, usedEmail, usedCountry]);

  const validateUsername = (username) => /^[a-zA-Z0-9_-]{5,12}$/.test(username);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password) => password.length >= 8;

  const sanitizeInput = (input) => input.replace(/[^a-zA-Z0-9@._-]/g, "");

  const showAlert = (icon, title, text) => {
    Swal.fire({
      icon,
      title,
      text,
      confirmButtonColor: "#4f46e5", // Indigo color
    });
  };

  const handleUsernameChange = async () => {
    const sanitizedUsername = sanitizeInput(username);
    if (!validateUsername(sanitizedUsername)) {
      showAlert("error", "Invalid Username", "Username must be 5-12 characters long and contain only letters, numbers, underscores, or hyphens.");
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`, { username: sanitizedUsername.toLowerCase() });
      showAlert("success", "Success", "Username updated successfully!");
      localStorage.setItem("user", JSON.stringify({ username: sanitizedUsername.toLowerCase() }));
    } catch (err) {
      if (err.response?.status === 409) {
        showAlert("error", "Conflict", "This username is already in use.");
      } else {
        showAlert("error", "Error", "Failed to update username.");
      }
    }
  };

  const handleEmailChange = async () => {
    const sanitizedEmail = sanitizeInput(email);
    if (!validateEmail(sanitizedEmail)) {
      showAlert("error", "Invalid Email", "Please enter a valid email address.");
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/profile/update-email/${userId}`, { email: sanitizedEmail });
      showAlert("success", "Success", "Email updated successfully!");
    } catch (err) {
      if (err.response?.status === 409) {
        showAlert("error", "Conflict", "This email is already in use.");
      } else {
        showAlert("error", "Error", "Failed to update email.");
      }
    }
  };

  const handlePasswordChange = async () => {
    if (!validatePassword(password)) {
      showAlert("error", "Weak Password", "Password must be at least 8 characters long.");
      return;
    }
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/profile/update-password/${userId}`, { password });
      showAlert("success", "Success", "Password updated successfully!");
    } catch (err) {
      showAlert("error", "Error", "Failed to update password.");
    }
  };

  const handleCountryChange = async (e) => {
    const selectedCountry = e.target.value;
    setCountry(selectedCountry);
    try {
      await axios.put(`${process.env.REACT_APP_API_URL}/api/profile/country/${userId}`, { country: selectedCountry });
      showAlert("success", "Success", "Country updated successfully!");
    } catch (err) {
      showAlert("error", "Error", "Failed to update country.");
    }
  };

  return (
    <div className="userdetails">
      {/* Change Username */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Change Username</h3>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder={usedName}
          className="p-3 w-full border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          maxLength="12"
        />
        <button
          onClick={handleUsernameChange}
          className="bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition w-full mt-4"
        >
          Update Username
        </button>
      </div>

      {/* Update Email */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
        <h3 className="text-xl font-semibold text-green-600 mb-4">Update Email</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={usedEmail}
          className="p-3 w-full border border-green-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 transition"
        />
        <button
          onClick={handleEmailChange}
          className="bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition w-full mt-4"
        >
          Update Email
        </button>
      </div>

      {/* Update Password */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
        <h3 className="text-xl font-semibold text-yellow-600 mb-4">Update Password</h3>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter new password"
          className="p-3 w-full border border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 transition"
        />
        <button
          onClick={handlePasswordChange}
          className="bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600 transition w-full mt-4"
        >
          Update Password
        </button>
      </div>

      {/* Update Country */}
      <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mt-6">
        <h3 className="text-xl font-semibold text-indigo-600 mb-4">Update Country</h3>
        <select
          value={country}
          onChange={handleCountryChange}
          className="w-full p-3 border border-indigo-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        >
          <option value="">Select a country</option>
          {countries.map((c, index) => (
            <option key={index} value={c}>{c}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Changedetails;
