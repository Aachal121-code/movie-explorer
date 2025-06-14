import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import HorizontalMovieList from "./HorizontalMovieList";

// OMDb API key
const OMDB_API_KEY = "4238d5ea";

// Categories using OMDb search queries
const categories = [
  { key: "hollywood", label: "Hollywood", query: "Marvel" },
  { key: "bollywood", label: "Bollywood", query: "Hindi" },
  { key: "anime", label: "Anime", query: "Anime" },
  { key: "korean", label: "Korean", query: "Korean" },
  { key: "japanese", label: "Japanese", query: "Japanese" },
  { key: "cartoon", label: "Cartoons", query: "Cartoon" },
  { key: "chinese", label: "Chinese", query: "Chinese" }
];

function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [moviesByCategory, setMoviesByCategory] = useState({});

  // Fetch movies for each category from OMDb
  useEffect(() => {
    categories.forEach(async (cat) => {
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(cat.query)}`
        );
        const data = await res.json();
        setMoviesByCategory(prev => ({
          ...prev,
          [cat.key]: (data.Search || []).slice(0, 12).map(m => ({
            id: m.imdbID,
            title: m.Title,
            poster: m.Poster !== "N/A" ? m.Poster : "https://via.placeholder.com/140x210?text=No+Image",
            type: m.Type
          }))
        }));
      } catch (e) {
        // Optionally handle error
      }
    });
  }, []);

  // Fetch full movie info from OMDb when selectedMovie changes
  useEffect(() => {
    if (!selectedMovie) {
      setSelectedMovieDetails(null);
      return;
    }
    async function fetchDetails() {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${selectedMovie.id}&plot=full`
      );
      const data = await res.json();
      setSelectedMovieDetails(data);
    }
    fetchDetails();
  }, [selectedMovie]);

  // Search movies from OMDb
  useEffect(() => {
    if (!query.trim()) setMovies([]);
  }, [query]);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(
        (data.Search || []).map(movie => ({
          id: movie.imdbID,
          title: movie.Title,
          release_date: movie.Year,
          poster_path: movie.Poster !== "N/A" ? movie.Poster : null
        }))
      );
    } catch (err) {
      setMovies([]);
    }
    setLoading(false);
  };

  // Favorites logic
  const addToFavorites = (movie) => {
    if (!favorites.find(fav => fav.id === movie.id)) {
      const updated = [...favorites, movie];
      setFavorites(updated);
      localStorage.setItem('favorites', JSON.stringify(updated));
    }
  };
  const removeFromFavorites = (movie) => {
    const updated = favorites.filter(fav => fav.id !== movie.id);
    setFavorites(updated);
    localStorage.setItem('favorites', JSON.stringify(updated));
  };

  return (
    <div style={{ width: "100%" }}>
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

      {/* Search Results */}
      {movies.length > 0 && (
        <div className="movies-container">
          <h2>Search Results</h2>
          <MovieList
            list={movies}
            onCardClick={setSelectedMovie}
            onLike={addToFavorites}
            onRemove={removeFromFavorites}
            showLike={true}
            showRemove={false}
          />
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="movies-container">
          <h2>Favorites</h2>
          <MovieList
            list={favorites}
            onCardClick={setSelectedMovie}
            onLike={addToFavorites}
            onRemove={removeFromFavorites}
            showLike={false}
            showRemove={true}
          />
        </div>
      )}

      {/* Horizontal Movie Lists for each category */}
      {categories.map(cat => (
        <HorizontalMovieList
          key={cat.key}
          title={cat.label}
          items={moviesByCategory[cat.key] || []}
          onCardClick={setSelectedMovie}
        />
      ))}

      {/* Movie Details Modal */}
      {selectedMovieDetails && (
        <div
          className="modal"
          style={{
            position: "fixed",
            top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000
          }}
          onClick={() => setSelectedMovie(null)}
        >
          <div
            className="modal-content"
            style={{
              background: "#fff",
              borderRadius: 18,
              padding: "32px 32px 24px 32px",
              minWidth: 320,
              maxWidth: 700,
              width: "90vw",
              position: "relative",
              textAlign: "left",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 8px 32px rgba(25, 118, 210, 0.18), 0 2px 8px rgba(0,0,0,0.10)"
            }}
            onClick={e => e.stopPropagation()}
          >
            <button
              className="modal-close-btn"
              onClick={() => setSelectedMovie(null)}
              title="Close"
              style={{
                position: "absolute",
                top: 18,
                right: 22,
                background: "none",
                border: "none",
                fontSize: "2rem",
                color: "#1976d2",
                cursor: "pointer",
                zIndex: 2
              }}
            >&times;</button>
            <div style={{ display: "flex", gap: 24 }}>
              <img
                src={selectedMovieDetails.Poster !== "N/A" ? selectedMovieDetails.Poster : "https://via.placeholder.com/140x210?text=No+Image"}
                alt={selectedMovieDetails.Title}
                style={{ width: 180, borderRadius: 12, marginBottom: 16, flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>{selectedMovieDetails.Title}</h3>
                <p><b>Year:</b> {selectedMovieDetails.Year}</p>
                <p><b>Genre:</b> {selectedMovieDetails.Genre}</p>
                <p><b>Director:</b> {selectedMovieDetails.Director}</p>
                <p><b>Actors:</b> {selectedMovieDetails.Actors}</p>
                <p><b>Plot:</b> {selectedMovieDetails.Plot}</p>
                <p><b>IMDB Rating:</b> {selectedMovieDetails.imdbRating}</p>
                {/* Cast photos row can go here if you fetch cast info */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieExplorer;