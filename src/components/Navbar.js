import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggle = () => setMenuOpen(open => !open);
  const handleClose = () => setMenuOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-logo">🎬 MoView</div>
      <button
        className="navbar-toggle"
        aria-label="Toggle menu"
        onClick={handleToggle}
      >
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
        <span className="navbar-toggle-bar"></span>
      </button>
      <ul className={`navbar-links${menuOpen ? " open" : ""}`}>
        <li className="navbar-close-btn-li">
          <button className="navbar-close-btn" onClick={handleClose} aria-label="Close menu">
            &times;
          </button>
        </li>
        <li>
          <NavLink to="/" end onClick={handleClose}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore" onClick={handleClose}>
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" onClick={handleClose}>
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup" onClick={handleClose}>
            Sign Up
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;