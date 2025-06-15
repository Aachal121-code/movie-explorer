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
          <Link
            to="/"
            className={page === "home" ? "active" : ""}
            onClick={() => handleNav("home")}
          >Home</Link>
          <Link
            to="/movies"
            className={page === "movies" ? "active" : ""}
            onClick={() => handleNav("movies")}
          >Movies</Link>
          <Link
            to="/songs"
            className={page === "songs" ? "active" : ""}
            onClick={() => handleNav("songs")}
          >Songs</Link>
          <Link
            href="#"
            className={page === "favorite" ? "active" : ""}
            onClick={() => handleNav("favorite")}
          >Favorite</Link>
          <Link
            href="#"
            className={page === "profile" ? "active" : ""}
            onClick={() => handleNav("profile")}
          >Profile</Link>
        </div>
        <div className="navbar-menu mobile" onClick={() => setOpen(true)}>
          &#9776;
        </div>
      </nav>
      {open && (
        <div className="navbar-drawer">
          <div className="drawer-content">
            <button className="drawer-close" onClick={() => setOpen(false)}>×</button>
            <Link
            to="/"
            className={page === "home" ? "active" : ""}
            onClick={() => handleNav("home")}
          >Home</Link>
          <Link
            to="/movies"
            className={page === "movies" ? "active" : ""}
            onClick={() => handleNav("movies")}
          >Movies</Link>
          <Link
            to="/songs"
            className={page === "songs" ? "active" : ""}
            onClick={() => handleNav("songs")}
          >Songs</Link>
          <Link
            href="#"
            className={page === "favorite" ? "active" : ""}
            onClick={() => handleNav("favorite")}
          >Favorite</Link>
          <Link
            href="#"
            className={page === "profile" ? "active" : ""}
            onClick={() => handleNav("profile")}
          >Profile</Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;