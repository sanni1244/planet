import React, { useState } from "react";
import axios from "axios";
import countries from "../components/countries";
import { useNavigate } from "react-router-dom";

const Modal = ({ message, type, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
    <div className={`p-6 rounded-lg shadow-lg bg-white w-3/4 md:w-1/3`}>
      <h2 className={`text-lg font-bold text-${type === "success" ? "green" : "red"}-600`}>
        {type === "success" ? "Success" : "Error"}
      </h2>
      <p className="mt-4 text-gray-700">{message}</p>
      <button
        onClick={onClose}
        className="mt-6 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
      >
        Understood
      </button>
    </div>
  </div>
);

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    country: "",
  });
  const [modal, setModal] = useState({ isOpen: false, message: "", type: "" });

  const { email, username, password, confirmPassword, country } = formData;

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict username to alphanumeric characters only (no spaces or special characters)
    if (name === "username" && /[^a-zA-Z0-9]/.test(value)) {
      setModal({
        isOpen: true,
        message: "Username can only contain letters and numbers (no spaces or special characters).",
        type: "error",
      });
      return;
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert email and username to lowercase
    const sanitizedEmail = email.toLowerCase();
    const sanitizedUsername = username.toLowerCase();

    // Validate username to prevent spaces and special characters
    const usernameRegex = /^[a-z0-9]+$/i;
    if (!usernameRegex.test(sanitizedUsername)) {
      setModal({
        isOpen: true,
        message: "Username can only contain letters and numbers and cannot be blank.",
        type: "error",
      });
      return;
    }

    if (password.length < 8) {
      setModal({
        isOpen: true,
        message: "Password must be at least 8 characters long.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setModal({
        isOpen: true,
        message: "Passwords do not match.",
        type: "error",
      });
      return;
    }

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, {
        email: sanitizedEmail,
        username: sanitizedUsername,
        password,
        country,
      });

      setModal({
        isOpen: true,
        message: res.data.message,
        type: "success",
      });

      setTimeout(() => {
        navigate("/login", { state: { username: sanitizedUsername } });
      }, 2000);
    } catch (err) {
      if (err.response.status === 409) {
        setModal({
          isOpen: true,
          message: "This username or email is already taken.",
          type: "error",
        });
      } else if (err.response.data && err.response.data.errors) {
        const backendError = err.response.data.errors[0].msg;
        setModal({ isOpen: true, message: backendError, type: "error" });
      } else {
        setModal({ isOpen: true, message: "Something went wrong.", type: "error" });
      }
    }
  };

  return (
    <div className="signup-place min-h-screen bg-gradient-to-b from-green-600 to-blue-500 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-4 generic-header2">
          🌍 Sign Up
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Choose a username"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-700">
              Country
            </label>
            <select
              id="country"
              name="country"
              value={country}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-green-500 focus:border-green-500"
            >
              <option value="">Select your country</option>
              {countries.map((c, index) => (
                <option key={index} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Create a password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              placeholder="Confirm your password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-green-500 focus:border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-700 transition buttons-vd"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-6 text-sm text-gray-600 text-regular-nojustify text-center">
          Already have an account?{" "}
          <a href="/login" className="text-green-600 hover:underline">
            Log in here!
          </a>
        </p>
      </div>

      {modal.isOpen && (
        <Modal
          message={modal.message}
          type={modal.type}
          onClose={() => setModal({ ...modal, isOpen: false })}
        />
      )}
    </div>
  );
};

export default SignupPage;
