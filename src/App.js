import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
// import Favorite from "./components/Favorite";
import MovieExplorer from "./components/MovieExplorer";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<MovieExplorer />} />
        {/* <Route path="/Favorite" element={<Favorite />} /> */}
        {/* <Route path="/explore" element={<MovieExplorer />} /> */}
        <Route path="*" element={<div style={{padding: 40, textAlign: "center"}}><h2>404 - Page Not Found</h2></div>} />
      </Routes>
    </Router>
  );
}

export default App;