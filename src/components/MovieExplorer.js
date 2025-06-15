// filepath: [MovieExplorer.js](http://_vscodecontentref_/0)
import React, { useState, useEffect } from "react";
import MovieList from "./MovieList";
import HorizontalMovieList from "./HorizontalMovieList";
import "./MovieExplorer.css";

const TMDB_API_KEY = "YOUR_TMDB_API_KEY";

const categories = [
  { key: "hollywood", label: "Hollywood", language: "en" },
  { key: "bollywood", label: "Bollywood", language: "hi" },
  { key: "anime", label: "Anime", language: "ja" },
  { key: "korean", label: "Korean", language: "ko" },
  { key: "japanese", label: "Japanese", language: "ja" },
  { key: "cartoon", label: "Cartoons", genre: "16" }, // 16 = Animation
  { key: "chinese", label: "Chinese", language: "zh" }
];

function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  const [moviesByCategory, setMoviesByCategory] = useState({});

  // Fetch movies for each category from TMDB
  useEffect(() => {
    categories.forEach(async (cat) => {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=popularity.desc&page=1`;
      if (cat.language) url += `&with_original_language=${cat.language}`;
      if (cat.genre) url += `&with_genres=${cat.genre}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMoviesByCategory(prev => ({
          ...prev,
          [cat.key]: (data.results || []).slice(0, 12).map(m => ({
            id: m.id,
            title: m.title,
            poster: m.poster_path
              ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
              : "https://via.placeholder.com/140x210?text=No+Image",
            type: "Movie"
          }))
        }));
      } catch (e) {
        // Optionally handle error
      }
    });
  }, []);

  // Fetch full movie info and cast from TMDB when selectedMovie changes
  useEffect(() => {
    if (!selectedMovie) {
      setSelectedMovieDetails(null);
      setCast([]);
      return;
    }
    async function fetchDetails() {
      // Movie details
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await res.json();
      setSelectedMovieDetails(data);

      // Movie cast
      const castRes = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const castData = await castRes.json();
      setCast((castData.cast || []).slice(0, 12));
    }
    fetchDetails();
  }, [selectedMovie]);

  // Search movies from TMDB
  useEffect(() => {
    if (!query.trim()) setMovies([]);
  }, [query]);

  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setMovies(
        (data.results || []).map(movie => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/140x210?text=No+Image"
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
              maxWidth: 950,
              width: "96vw",
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
            <div style={{ display: "flex", gap: 32 }}>
              <img
                src={selectedMovieDetails.poster_path
                  ? `https://image.tmdb.org/t/p/w300${selectedMovieDetails.poster_path}`
                  : "https://via.placeholder.com/180x270?text=No+Image"}
                alt={selectedMovieDetails.title}
                style={{ width: 220, borderRadius: 12, marginBottom: 16, flexShrink: 0 }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h3>{selectedMovieDetails.title}</h3>
                <p><b>Year:</b> {selectedMovieDetails.release_date}</p>
                <p><b>Genre:</b> {(selectedMovieDetails.genres || []).map(g => g.name).join(", ")}</p>
                <p><b>Overview:</b> {selectedMovieDetails.overview}</p>
                <p><b>IMDB Rating:</b> {selectedMovieDetails.vote_average}</p>
                {/* Cast photos row */}
                {cast.length > 0 && (
                  <div>
                    <h4>Cast</h4>
                    <div className="cast-scroll-row" style={{ display: "flex", overflowX: "auto", gap: 18, margin: "18px 0 10px 0" }}>
                      {cast.map(member => (
                        <div className="cast-card" key={member.cast_id} style={{ minWidth: 90, maxWidth: 90, textAlign: "center", flexShrink: 0 }}>
                          <img
                            src={member.profile_path
                              ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                              : "https://via.placeholder.com/70x70?text=No+Image"}
                            alt={member.name}
                            style={{
                              width: 70,
                              height: 70,
                              borderRadius: "50%",
                              objectFit: "cover",
                              marginBottom: 6,
                              border: "2px solid #1976d2",
                              background: "#eee"
                            }}
                          />
                          <div className="cast-name" style={{ fontSize: "0.95rem", fontWeight: 600, color: "#1976d2" }}>{member.name}</div>
                          <div className="cast-role" style={{ fontSize: "0.8rem", color: "#888" }}>{member.character}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieExplorer;