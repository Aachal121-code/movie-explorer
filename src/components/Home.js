import React, { useEffect, useState } from "react";
import "./Home.css";

const OMDB_API_KEY = "YOUR_OMDB_API_KEY"; // Replace with your OMDb API key

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
      setPosters(all.slice(0, 30));
    };
    fetchPosters();
  }, []);

  return (
    <div className="home-root">
      <div className="poster-grid-bg">
        {posters.map((poster, idx) => (
          <div className="poster-cell" key={idx}>
            <img src={poster} alt="Movie Poster" />
          </div>
        ))}
      </div>
      <div className="home-container">
        <h1>Welcome to <span className="brand">Movie Explorer</span></h1>
        <p>
          Discover movies by language, search for your favorites, and explore cast details.<br />
          Use the search bar or browse by category on the Explore page!
        </p>
      </div>
    </div>
  );
}