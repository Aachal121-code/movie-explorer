import React, { useState } from 'react';
import Login from './components/Login';
import MovieExplorer from './components/MovieExplorer';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="main-container">
      <Navbar page={page} setPage={setPage} />
      {page === "home" && <Home />}
      {page === "movies" && <MovieExplorer />}
      {/* Add more pages as needed */}
    </div>
  );
}
export default App;