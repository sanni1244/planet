import { Link, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();

  // Check if the current route is for Signup, About, or Contact
  const isAlternateNav =
    location.pathname === "/signup" ||
    location.pathname === "/about" ||
    location.pathname === "/contact";

  return (
    <nav
      className={`${
        isAlternateNav
          ? "bg-gradient-to-r from-green-600 to-blue-500"
          : "bg-gradient-to-r from-purple-900 to-indigo-700"
      } shadow-md py-4`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        {/* Brand Logo */}
        <div
          className={`text-white text-2xl font-bold tracking-wide ${
            isAlternateNav ? "text-yellow-300" : "text-white"
          }`}
        >
          {isAlternateNav ? "🌟 Explore Landmarks" : "🌍 GuessLandmarks"}
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link
            to="/"
            className={`${
              isAlternateNav
                ? "text-yellow-200 hover:text-white"
                : "text-white hover:text-yellow-400"
            } text-lg font-medium transition duration-300 transform hover:scale-110`}
          >
            Home
          </Link>
          <Link
            to="/about"
            className={`${
              isAlternateNav
                ? "text-yellow-200 hover:text-white"
                : "text-white hover:text-yellow-400"
            } text-lg font-medium transition duration-300 transform hover:scale-110`}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`${
              isAlternateNav
                ? "text-yellow-200 hover:text-white"
                : "text-white hover:text-yellow-400"
            } text-lg font-medium transition duration-300 transform hover:scale-110`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
