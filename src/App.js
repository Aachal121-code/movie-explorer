import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MovieExplorer from "./components/MovieExplorer";
import Login from "./components/Login";
import FavoritesPage from "./components/FavoritesPage";
import CommentsPage from "./components/CommentsPage";

function AppWrapper() {
  const [user, setUser] = useState(null);
  const [hideGetStartedButton, setHideGetStartedButton] = useState(false);
  const location = useLocation();

  const handleLogin = (username) => {
    setUser(username);
    setHideGetStartedButton(true);
  };

  const handleBack = () => {
    window.history.back();
  };

  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ["/login", "/signup"];
  const hideNavbar = hideNavbarRoutes.includes(location.pathname.toLowerCase());

  return (
    <>
      {!hideNavbar && <Navbar user={user} />}
      <Routes>
        <Route path="/" element={<Home hideGetStartedButton={hideGetStartedButton} />} />
        <Route path="/explore" element={<MovieExplorer />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onBack={handleBack} />} />
        <Route path="/comments" element={<CommentsPage />} />
        <Route path="/signup" element={<Login onLogin={handleLogin} onBack={handleBack} />} />
        <Route path="/favorites" element={<FavoritesPage/>} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}
