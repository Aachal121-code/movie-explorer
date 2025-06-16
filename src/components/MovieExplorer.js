import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieExplorer.css";

const OMDB_API_KEY = "4238d5ea"; // Replace with your OMDb API key

const categories = [
  { key: "hollywood", label: "Hollywood", search: "Avengers" },
  { key: "bollywood", label: "Bollywood", search: "hindi" },
  { key: "anime", label: "Anime", search: "Naruto" },
  { key: "korean", label: "Korean", search: "Parasite" },
  { key: "japanese", label: "Japanese", search: "Your Name" },
  { key: "cartoon", label: "Cartoon", search: "Tom and Jerry" },
  { key: "chinese", label: "Chinese", search: "Crouching Tiger" }
];

function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || "[]")
  );

  // Fetch movies for each category from OMDb
  useEffect(() => {
    categories.forEach(async (cat) => {
      try {
        const res = await fetch(`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(cat.search)}&type=movie`);
        const data = await res.json();
        setMoviesByCategory(prev => ({
          ...prev,
          [cat.key]: (data.Search || []).slice(0, 16)
        }));
      } catch (e) {}
    });
  }, []);

  // Fetch movie details for modal
  useEffect(() => {
    if (!selectedMovie) {
      setSelectedMovieDetails(null);
      return;
    }
    async function fetchDetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedMovie.imdbID}&plot=full`
      );
      const data = await res.json();
      setSelectedMovieDetails(data);
    }
    fetchDetails();
  }, [selectedMovie]);

  // Search movies from OMDb
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}&type=movie`
      );
      const data = await res.json();
      setSearchResults(data.Search || []);
    } catch (err) {
      setSearchResults([]);
    }
    setLoading(false);
  };

  // Favorites logic
  const addToFavorites = (movie) => {
    if (!favorites.find(fav => fav.imdbID === movie.imdbID)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };
  const removeFromFavorites = (movie) => {
    const updated = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div className="explorer-root">
      {/* Search Bar */}
      <form className="search-form" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="horizontal-section">
          <h2>Favorites</h2>
          <div className="horizontal-list">
            {favorites.map(movie => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onInfo={setSelectedMovie}
                onLike={addToFavorites}
                onRemove={removeFromFavorites}
                isFavorite={true}
              />
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="horizontal-section">
          <h2>Search Results</h2>
          <div className="horizontal-list">
            {searchResults.map(movie => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onInfo={setSelectedMovie}
                onLike={addToFavorites}
                onRemove={removeFromFavorites}
                isFavorite={!!favorites.find(fav => fav.imdbID === movie.imdbID)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Always show all horizontal lists */}
      {categories.map(cat => (
        <div className="horizontal-section" key={cat.key}>
          <h2>{cat.label}</h2>
          <div className="horizontal-list">
            {(moviesByCategory[cat.key] || []).map(movie => (
              <MovieCard
                key={movie.imdbID}
                movie={movie}
                onInfo={setSelectedMovie}
                onLike={addToFavorites}
                onRemove={removeFromFavorites}
                isFavorite={!!favorites.find(fav => fav.imdbID === movie.imdbID)}
              />
            ))}
          </div>
        </div>
      ))}

      {/* Movie Details Modal */}
      {selectedMovieDetails && (
        <div className="modal" onClick={() => setSelectedMovie(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMovie(null)} title="Close">&times;</button>
            <div style={{ display: "flex", gap: 32 }}>
              <img
                src={selectedMovieDetails.Poster !== "N/A"
                  ? selectedMovieDetails.Poster
                  : "https://via.placeholder.com/180x270?text=No+Image"}
                alt={selectedMovieDetails.Title}
                style={{ width: 220, borderRadius: 12, marginBottom: 16, flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>{selectedMovieDetails.Title}</h3>
                <p><b>Year:</b> {selectedMovieDetails.Year}</p>
                <p><b>Genre:</b> {selectedMovieDetails.Genre}</p>
                <p><b>Plot:</b> {selectedMovieDetails.Plot}</p>
                <p><b>IMDB Rating:</b> {selectedMovieDetails.imdbRating}</p>
                <p><b>Director:</b> {selectedMovieDetails.Director}</p>
                <p><b>Actors:</b> {selectedMovieDetails.Actors}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieExplorer;