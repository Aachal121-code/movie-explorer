import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ setPage }) {
  const [open, setOpen] = useState(false);

  const handleNav = (page) => {
    setPage(page);
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">Movie Explorer</div>
        <div className="navbar-links desktop">
          <a href="#" onClick={() => handleNav("home")}>Home</a>
          <a href="#" onClick={() => handleNav("movies")}>Movies</a>
          <a href="#">Songs</a>
          <a href="#">Favorite</a>
          <a href="#">Profile</a>
        </div>
        <div className="navbar-menu mobile" onClick={() => setOpen(true)}>
          &#9776;
        </div>
      </nav>
      {open && (
        <div className="navbar-drawer">
          <div className="drawer-content">
            <button className="drawer-close" onClick={() => setOpen(false)}>×</button>
            <a href="#" onClick={() => handleNav("home")}>Home</a>
            <a href="#" onClick={() => handleNav("movies")}>Movies</a>
            <a href="#">Songs</a>
            <a href="#">Favorite</a>
            <a href="#">Profile</a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;