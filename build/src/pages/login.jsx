import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { IoEyeOffOutline } from "react-icons/io5";
import { GoEye } from "react-icons/go";

const LoginPage = () => {
  const location = useLocation();
  const { username: username101 } = location.state || {};

  useEffect(() => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
  }, []);

  const [formData, setFormData] = useState({
    usernameOrEmail: username101 || "",
    password: "",
  });
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false); // state to toggle password visibility
  const [showPopup, setShowPopup] = useState(false); // state for showing popup
  const [popupContent, setPopupContent] = useState({ title: "", message: "", type: "" }); // popup content
  const navigate = useNavigate();

  const { usernameOrEmail, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        usernameOrEmail,
        password,
      });

      const userData = { username: res.data.user.username.toLowerCase(), token: res.data.token };
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(userData));
      } else {
        sessionStorage.setItem("user", JSON.stringify(userData));
      }

      setPopupContent({
        title: "Success!",
        message: "Login successful! Redirecting...",
        type: "success",
      });
      setShowPopup(true);

      setTimeout(() => {
        navigate("/game", { state: { username: res.data.username } });
      }, 2000);

      setFormData({
        usernameOrEmail: "",
        password: "",
      });
    } catch (err) {
      setPopupContent({
        title: "Error",
        message: err.response?.data?.error || "Invalid username or password.",
        type: "error",
      });
      setShowPopup(true);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible((prevState) => !prevState);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="sigup-place min-h-screen bg-gradient-to-br from-purple-900 to-indigo-700 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-400 opacity-20 rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-400 opacity-20 rounded-full"></div>
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-4 generic-header2 ">
          🌍 Welcome Explorer!
        </h1>
        <p className="text-center text-gray-600 mb-6 ">
          Log in to continue your journey
        </p>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <br />
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              value={usernameOrEmail}
              onChange={handleChange}
              placeholder="Enter your username or email"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-purple-500 focus:border-purple-500"
              
            />
          </div>
          <div className="mb-4 ">
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md text-gray-800 focus:ring-purple-500 focus:border-purple-500"
                
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600 focus:outline-none"
              >
                {passwordVisible ? <IoEyeOffOutline /> : <GoEye />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                checked={rememberMe}
                onChange={handleRememberMe}
              />
              <span className="ml-2 text-sm text-gray-600">Remember Me</span>
            </label>
            <a href="#" className="text-sm text-purple-600 hover:underline">
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition transform hover:scale-105 buttons-vd"
          >
            Log In
          </button>
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 text-regular-nojustify">
          Don't have an account?{" "}
          <a href="/signup" className="text-purple-600 hover:underline">
            Sign up here!
          </a>
        </p>
      </div>

      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2
              className={`text-2xl font-semibold mb-4 ${
                popupContent.type === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {popupContent.title}
            </h2>
            <p className="text-gray-700 mb-6">{popupContent.message}</p>
            <button
              onClick={closePopup}
              className="w-full bg-purple-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-purple-700 transition transform hover:scale-105"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
