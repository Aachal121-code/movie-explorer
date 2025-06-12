import React from "react";

function Home({ onLoginClick, user }) {
  return (
    <div style={{ padding: 24, maxWidth: 700, margin: "0 auto" }}>
      <h1>Welcome to Movie Explorer</h1>
      <p>
        <strong>Movie Explorer</strong> is your one-stop platform to discover, explore, and enjoy movies and songs!
      </p>
      <h2>Features</h2>
      <ul>
        <li>
          <strong>Movies Section:</strong> Browse Hollywood, Bollywood, and other language movies. Search for your favorite movies, view details, and add them to your favorites.
        </li>
        <li>
          <strong>Songs Section:</strong> Listen to trending songs and download your favorites for offline enjoyment.
        </li>
        <li>
          <strong>Favorites:</strong> Save your favorite movies and songs for quick access anytime.
        </li>
        <li>
          <strong>Profile:</strong> Manage your account and personalize your experience.
        </li>
      </ul>
      {!user && (
        <div style={{ marginTop: 32 }}>
          <h3>Sign In to Get Started</h3>
          <button
            style={{
              padding: "10px 24px",
              fontSize: "1.1rem",
              background: "#1976d2",
              color: "#fff",
              border: "none",
              borderRadius: 6,
              cursor: "pointer"
            }}
            onClick={onLoginClick}
          >
            Sign In
          </button>
        </div>
      )}
    </div>
  );
}

export default Home;