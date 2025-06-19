import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MovieExplorer from "./components/MovieExplorer";
import Login from "./components/Login";

function App() {
  const [user, setUser] = useState(null);
  const [hideGetStartedButton, setHideGetStartedButton] = useState(false);

  const handleLogin = (username) => {
    setUser(username);
    setHideGetStartedButton(true);
  };

  const handleBack = () => {
    // This can be used to navigate back to home or previous page
    window.history.back();
  };

  return (
    <Router>
      <Navbar user={user} />
      <Routes>
        <Route path="/" element={<Home hideGetStartedButton={hideGetStartedButton} />} />
        <Route path="/explore" element={<MovieExplorer />} />
        <Route path="/login" element={<Login onLogin={handleLogin} onBack={handleBack} />} />
        <Route path="/signup" element={<Login onLogin={handleLogin} onBack={handleBack} />} />
        <Route path="*" element={<div style={{padding: 40, textAlign: "center"}}><h2>404 - Page Not Found</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;
