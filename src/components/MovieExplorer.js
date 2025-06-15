import React, { useState, useEffect } from "react";
import MovieCard from "./MovieCard";
import "./MovieExplorer.css";

const TMDB_API_KEY = "23890236526b9fd2f87bff1d1782f278"; // Replace with your TMDB API key

const categories = [
  { key: "hollywood", label: "Hollywood", language: "en" },
  { key: "bollywood", label: "Bollywood", language: "hi" },
  { key: "anime", label: "Anime", language: "ja", genre: "16" }, // Animation + Japanese
  { key: "korean", label: "Korean", language: "ko" },
  { key: "japanese", label: "Japanese", language: "ja" },
  { key: "cartoon", label: "Cartoons", genre: "16" }, // Animation (any language)
  { key: "chinese", label: "Chinese", language: "zh" }
];


function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites') || "[]")
  );

  // Fetch now playing movies for each category/language
  useEffect(() => {
    categories.forEach(async (cat) => {
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&sort_by=release_date.desc&release_date.lte=${new Date().toISOString().slice(0,10)}&with_release_type=3|2&page=1`;
      if (cat.language) url += `&with_original_language=${cat.language}`;
      if (cat.genre) url += `&with_genres=${cat.genre}`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMoviesByCategory(prev => ({
          ...prev,
          [cat.key]: (data.results || []).slice(0, 16).map(m => ({
            id: m.id,
            title: m.title,
            release_date: m.release_date,
            poster: m.poster_path
              ? `https://image.tmdb.org/t/p/w300${m.poster_path}`
              : "https://via.placeholder.com/140x210?text=No+Image",
            vote_average: m.vote_average,
            overview: m.overview
          }))
        }));
      } catch (e) {}
    });
  }, []);

  // Fetch movie details and cast for modal
  useEffect(() => {
    if (!selectedMovie) {
      setSelectedMovieDetails(null);
      setCast([]);
      return;
    }
    async function fetchDetails() {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const data = await res.json();
      setSelectedMovieDetails(data);

      const castRes = await fetch(
        `https://api.themoviedb.org/3/movie/${selectedMovie.id}/credits?api_key=${TMDB_API_KEY}&language=en-US`
      );
      const castData = await castRes.json();
      setCast((castData.cast || []).slice(0, 12));
    }
    fetchDetails();
  }, [selectedMovie]);

  // Search movies from TMDB
  const searchMovies = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      setSearchResults(
        (data.results || []).map(movie => ({
          id: movie.id,
          title: movie.title,
          release_date: movie.release_date,
          poster: movie.poster_path
            ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
            : "https://via.placeholder.com/140x210?text=No+Image",
          vote_average: movie.vote_average,
          overview: movie.overview
        }))
      );
    } catch (err) {
      setSearchResults([]);
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
                key={movie.id}
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
                key={movie.id}
                movie={movie}
                onInfo={setSelectedMovie}
                onLike={addToFavorites}
                onRemove={removeFromFavorites}
                isFavorite={!!favorites.find(fav => fav.id === movie.id)}
              />
            ))}
          </div>
        </div>
      )}

      {/* Horizontal Movie Lists for each category */}
      {searchResults.length === 0 && categories.map(cat => (
        <div className="horizontal-section" key={cat.key}>
          <h2>{cat.label} - Now Playing</h2>
          <div className="horizontal-list">
            {(moviesByCategory[cat.key] || []).map(movie => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onInfo={setSelectedMovie}
                onLike={addToFavorites}
                onRemove={removeFromFavorites}
                isFavorite={!!favorites.find(fav => fav.id === movie.id)}
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
                {cast.length > 0 && (
                  <div>
                    <h4>Cast</h4>
                    <div className="cast-scroll-row">
                      {cast.map(member => (
                        <div className="cast-card" key={member.cast_id}>
                          <img
                            src={member.profile_path
                              ? `https://image.tmdb.org/t/p/w185${member.profile_path}`
                              : "https://via.placeholder.com/70x70?text=No+Image"}
                            alt={member.name}
                          />
                          <div className="cast-name">{member.name}</div>
                          <div className="cast-role">{member.character}</div>
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