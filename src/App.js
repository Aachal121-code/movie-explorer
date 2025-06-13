import React, { useState } from 'react';
import Login from './components/Login';
import MovieExplorer from './components/MovieExplorer';
import Home from './components/Home';
import Navbar from "./components/Navbar";
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("home");
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div className="main-container">
      {!showLogin && <Navbar page={page} setPage={setPage} />}
      {showLogin && (
        <Login
          onLogin={(userObj) => {
            setUser(userObj);
            setShowLogin(false);
          }}
          onBack={() => setShowLogin(false)}
        />
      )}
      {!user && !showLogin && page === "home" && (
        <Home
          onLoginClick={() => setShowLogin(true)}
          user={user}
        />
      )}
      {user && page === "home" && <Home user={user} />}
      {page === "movies" && <MovieExplorer />}
      {/* Add other pages as needed */}
    </div>
  );
}

export default App;