import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar({ page, setPage }) {
  const [open, setOpen] = useState(false);

  const handleNav = (navPage) => {
    setPage(navPage);
    setOpen(false);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-title">Mo<span>View</span></div>
        <div className="navbar-links desktop">
          <a
            href="#"
            className={page === "home" ? "active" : ""}
            onClick={() => handleNav("home")}
          >Home</a>
          <a
            href="#"
            className={page === "movies" ? "active" : ""}
            onClick={() => handleNav("movies")}
          >Movies</a>
          <a
            href="#"
            className={page === "songs" ? "active" : ""}
            onClick={() => handleNav("songs")}
          >Songs</a>
          <a
            href="#"
            className={page === "favorite" ? "active" : ""}
            onClick={() => handleNav("favorite")}
          >Favorite</a>
          <a
            href="#"
            className={page === "profile" ? "active" : ""}
            onClick={() => handleNav("profile")}
          >Profile</a>
        </div>
        <div className="navbar-menu mobile" onClick={() => setOpen(true)}>
          &#9776;
        </div>
      </nav>
      {open && (
        <div className="navbar-drawer">
          <div className="drawer-content">
            <button className="drawer-close" onClick={() => setOpen(false)}>×</button>
            <a
              href="#"
              className={page === "home" ? "active" : ""}
              onClick={() => handleNav("home")}
            >Home</a>
            <a
              href="#"
              className={page === "movies" ? "active" : ""}
              onClick={() => handleNav("movies")}
            >Movies</a>
            <a
              href="#"
              className={page === "songs" ? "active" : ""}
              onClick={() => handleNav("songs")}
            >Songs</a>
            <a
              href="#"
              className={page === "favorite" ? "active" : ""}
              onClick={() => handleNav("favorite")}
            >Favorite</a>
            <a
              href="#"
              className={page === "profile" ? "active" : ""}
              onClick={() => handleNav("profile")}
            >Profile</a>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;