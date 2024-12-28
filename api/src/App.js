import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import About from "./pages/about";
import Contact from "./pages/contact";
import Login from "./pages/login";
import Game from "./pages/game";
import Signup from "./pages/signup";
import Home from "./pages/home";
import GamePage from "./pages/start";
import Dashboard from "./pages/dashboard";
import Final from "./pages/Final";
import Leaderboard from "./pages/leaderboard";
import Admin from "./pages/admin";
import Admin1 from "./pages/admin1";
import Admin2 from "./pages/admin2";
import Admin3 from "./pages/admin3";
import Profile from "./pages/profile";
import Chatbot from "./pages/learn";
import PageNotFound from "./pages/notfound";
import "./style/fonts.css";
import "./style/home.css";
import "./style/responsive.css";
import WonderDetails from "./pages/getwonder";
import WondersPage from "./pages/wonders";

// Helper to check user authentication and token validity
const isAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem("user") || sessionStorage.getItem("user"));
  const token = user?.token;

  if (!token) return false;

  try {
    const { exp } = jwtDecode(token);
    const currentTime = Date.now() / 1000; // Current time in seconds
    if (exp < currentTime) {
      // Token has expired
      localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      return false;
    }
    return true;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

function App() {
  const goBack = () => {
    window.history.back();
  };
  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/about"
          element={
            <>
              <span className="backButton" onClick={goBack}>
                <MdArrowBack className="icon-small" />
              </span>
              <About />
            </>
          }
        />
        <Route
          path="/contact"
          element={
            <>
              <span className="backButton" onClick={goBack}>
                <MdArrowBack className="icon-small" />
              </span>
              <Contact />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <span className="backButton" onClick={goHome}>
                <MdArrowBack className="icon-small" />
              </span>
              <Login />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <span className="backButton" onClick={goHome}>
                <MdArrowBack className="icon-small" />
              </span>
              <Signup />
            </>
          }
        />

        {/* Protected Routes */}
        <Route path="/final" element={<ProtectedRoute element={<Final />} />} />
        <Route
          path="/game"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goHome}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Game />
                </>
              }
            />
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Profile />
                </>
              }
            />
          }
        />
        <Route
          path="/leaderboard"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Leaderboard />
                </>
              }
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Dashboard />
                </>
              }
            />
          }
        />
        <Route
          path="/startgame"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <GamePage />
                </>
              }
            />
          }
        />
        <Route
          path="/wonder/:id"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <WonderDetails />
                </>
              }
            />
          }
        />
        <Route
          path="/wonder2"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <WondersPage />
                </>
              }
            />
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Admin />
                </>
              }
            />
          }
        />
        <Route
          path="/admin1"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Admin1 />
                </>
              }
            />
          }
        />
        <Route
          path="/admin2"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Admin2 />
                </>
              }
            />
          }
        />
        <Route
          path="/admin3"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Admin3 />
                </>
              }
            />
          }
        />
        <Route
          path="/learn"
          element={
            <ProtectedRoute
              element={
                <>
                  <span className="backButton" onClick={goBack}>
                    <MdArrowBack className="icon-small" />
                  </span>
                  <Chatbot />
                </>
              }
            />
          }
        />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
