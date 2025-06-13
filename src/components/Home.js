import React from "react";
import "./Home.css";

function Home({ onLoginClick, user }) {
  return (
    <div>
      {/* Hero Section with background image */}
      <div className="home-bg">
        <div className="home-overlay" />
        <div className="home-hero-content">
          <h1 className="home-title">
            Welcome to <span>MoView</span>
          </h1>
          <h3 className="home-title-h3">Explore the world of Entertainment...</h3>
        </div>
      </div>

      {/* Info Section as box container */}
      <div className="home-info-container">
        <div className="home-info-content">
          <h2>About MoView</h2>
          <div className="home-sections">
            <div className="home-card">
              <h3>Movies Section</h3>
              <p>
                Browse Hollywood, Bollywood, and other language movies. Search for your favorite movies, view details, and add them to your favorites.
              </p>
            </div>
            <div className="home-card">
              <h3>Songs Section</h3>
              <p>
                Listen to trending songs and download your favorites for offline enjoyment.
              </p>
            </div>
            <div className="home-card">
              <h3>Favorites</h3>
              <p>
                Save your favorite movies and songs for quick access anytime.
              </p>
            </div>
            <div className="home-card">
              <h3>Profile</h3>
              <p>
                Manage your account and personalize your experience.
              </p>
            </div>
          </div>
          {!user && (
            <div style={{ marginTop: 32 }}>
              <button
                className="home-signin-btn"
                onClick={onLoginClick}
              >
                Sign In
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;