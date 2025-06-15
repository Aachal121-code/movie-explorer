import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import MovieExplorer from "./components/MovieExplorer";

function App() {
  return (
    <Router>
      <Navbar /> {/* Your existing Navbar, unchanged */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Movies" element={<MovieExplorer />} />
      </Routes>
    </Router>
  );
}

export default App;