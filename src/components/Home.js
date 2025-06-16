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
        <h1>Welcome to <span className="brand">Movie Explorer</span></h1>
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
          <img src="https://cdn-icons-png.flaticon.com/512/709/709496.png" alt="Info" className="info-box-icon" />
          <h3>Movie Details</h3>
          <p>Click the info button to see cast, plot, ratings, and more in a stylish modal. Explore every detail before you watch!</p>
        </div>
        <div className="info-box">
          <img src="https://cdn-icons-png.flaticon.com/512/1828/1828843.png" alt="Remove" className="info-box-icon" />
          <h3>Easy Management</h3>
          <p>Remove movies from your favorites with a single click. Your list stays organized and up to date.</p>
        </div>
      </div>
    </div>
  );
}