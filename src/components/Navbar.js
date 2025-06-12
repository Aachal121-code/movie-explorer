import React, { useState } from "react";
import "./Navbar.css"; // Create this file for styles or put styles in App.css

function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">Movie Explorer</div>
        <div className="navbar-links desktop">
          <a href="#">Home</a>
          <a href="#">Movies</a>
          <a href="#">Songs</a>
          <a href="#">Favorite</a>
          <a href="#">Profile</a>
        </div>
        <div className="navbar-menu mobile" onClick={() => setOpen(true)}>
          &#9776;
        </div>
      </nav>
      {/* Mobile Drawer */}
      {open && (
        <div className="navbar-drawer">
          <div className="drawer-content">
            <button className="drawer-close" onClick={() => setOpen(false)}>×</button>
            <a href="#" onClick={() => setOpen(false)}>Home</a>
            <a href="#" onClick={() => setOpen(false)}>Movies</a>
            <a href="#" onClick={() => setOpen(false)}>Songs</a>
            <a href="#" onClick={() => setOpen(false)}>Favorite</a>
            <a href="#" onClick={() => setOpen(false)}>Profile</a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;