import React, { useEffect, useState } from "react";
import "./Home.css";

const OMDB_API_KEY = "4238d5ea"; // Replace with your OMDb API key

export default function Home() {
  const [posters, setPosters] = useState([]);

  useEffect(() => {
    const fetchPosters = async () => {
      const titles = [
        "Avengers", "Inception", "Dangal", "Naruto", "Parasite",
        "Your Name", "Tom and Jerry", "Crouching Tiger", "Interstellar", "Joker"
      ];
      let all = [];
      for (let title of titles) {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(title)}&type=movie`);
        const data = await res.json();
        if (data.Search) {
          all = all.concat(data.Search.map(m => m.Poster).filter(p => p && p !== "N/A"));
        }
      }
      setPosters(all.slice(0, 18));
    };
    fetchPosters();
  }, []);

  return (
    <div className="home-root">
      {/* Animated floating posters */}
      <div className="animated-bg">
        {posters.map((poster, idx) => (
          <img
            key={idx}
            src={poster}
            alt="Movie Poster"
            className={`floating-poster poster${idx % 6}`}
            style={{
              left: `${(idx % 6) * 16 + 5}%`,
              animationDelay: `${(idx % 6) * 1.2}s`
            }}
          />
        ))}
      </div>

      <div className="home-container">
        <h1>Welcome to <span className="brand">MoView</span></h1>
        <p>
          Discover movies by language, search for your favorites, and explore cast details.<br />
          Use the search bar or browse by category on the Explore page!
        </p>
      </div>


      {/* Second Slide: Animated Info Boxes */}
      <div className="info-slide-boxes">
        <div className="info-box">
          <img src="https://cdn-icons-png.flaticon.com/512/622/622669.png" alt="Search" className="info-box-icon" />
          <h3>Powerful Search</h3>
          <p>Find movies instantly by title, genre, or language using the OMDb API. Results appear in a beautiful horizontal scroll.</p>
        </div>
        <div className="info-box">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828884.png" alt="Like" className="info-box-icon" />
          <h3>Favorites</h3>
          <p>Like any movie to add it to your favorites. Your favorites are saved and always accessible in a dedicated row.</p>
        </div>
        <div className="info-box">
          <img src="https://cdn-icons-png.flaticon.com/512/471/471664.png" alt="Info" className="info-box-icon" />
          <h3>Movie Details</h3>
          <p>Click the info button to see cast, plot, ratings, and more in a stylish modal. Explore every detail before you watch!</p>
        </div>
        <div className="info-box">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="Remove" className="info-box-icon" />
          <h3>Easy Management</h3>
          <p>Remove movies from your favorites with a single click. Your list stays organized and up to date.</p>
        </div>
      </div>

      <div className="home-details-section">
        <h2>Discover More Features</h2>
        <div className="details-boxes">
          <div className="details-box">
            <img src="https://cdn-icons-png.flaticon.com/512/3524/3524388.png" alt="Recommendations" className="details-box-icon" />
            <strong>Movie Recommendations</strong>
            <p>
              Get personalized movie recommendations based on trends and your favorites.<br />
              Discover new films you might love, handpicked just for you.
            </p>
          </div>
          <div className="details-box">
            <img src="https://cdn-icons-png.flaticon.com/512/1380/1380338.png" alt="Comment" className="details-box-icon" />
            <strong>Comment Section</strong>
            <p>
              Join the conversation! Share your thoughts, write reviews, and discuss movies with other users in our interactive comment section.
            </p>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div>
          &copy; {new Date().getFullYear()} Movie Explorer &mdash; Made with <span style={{ color: "#43a047" }}>❤</span> for movie lovers.
        </div>
        <div>
          <a href="https://www.omdbapi.com/" target="_blank" rel="noopener noreferrer" className="footer-link">
            Powered by OMDb API
          </a>
        </div>
      </footer>
    </div>
  );
}