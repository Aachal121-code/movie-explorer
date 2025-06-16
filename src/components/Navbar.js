import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-logo">🎬 Movie Explorer</div>
      <ul className="navbar-links">
        <li>
          <NavLink to="/" end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore">
            Explore
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore">
            Favorites
          </NavLink>
        </li>
        <li>
          <NavLink to="/explore">
            Profile
          </NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;