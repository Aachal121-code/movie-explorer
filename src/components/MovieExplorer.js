import React, { useState, useEffect } from "react";

// 10 Hollywood movies (static)
const hollywoodMovies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    release_date: "2019-04-26",
    poster_path: "https://image.tmdb.org/t/p/w200/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
  },
  {
    id: 2,
    title: "Avatar",
    release_date: "2009-12-18",
    poster_path: "https://image.tmdb.org/t/p/w200/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg"
  },
  {
    id: 3,
    title: "The Dark Knight",
    release_date: "2008-07-18",
    poster_path: "https://image.tmdb.org/t/p/w200/qJ2tW6WMUDux911r6m7haRef0WH.jpg"
  },
  {
    id: 4,
    title: "La La Land",
    release_date: "2016-12-09",
    poster_path: "https://image.tmdb.org/t/p/w200/uDO8zWDhfWwoFdKS4fzkUJt0Rf0.jpg"
  },
  {
    id: 5,
    title: "Joker",
    release_date: "2019-10-04",
    poster_path: "https://image.tmdb.org/t/p/w200/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg"
  },
  {
    id: 6,
    title: "Parasite",
    release_date: "2019-05-30",
    poster_path: "https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
  },
  {
    id: 7,
    title: "Ford v Ferrari",
    release_date: "2019-11-15",
    poster_path: "https://image.tmdb.org/t/p/w200/6ApDtO7xaWAfPqfi2IARXIzj8QS.jpg"
  },
  {
    id: 8,
    title: "1917",
    release_date: "2019-12-25",
    poster_path: "https://image.tmdb.org/t/p/w200/iZf0KyrE25z1sage4SYFLCCrMi9.jpg"
  },
  {
    id: 9,
    title: "Forrest Gump",
    release_date: "1994-07-06",
    poster_path: "https://image.tmdb.org/t/p/w200/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
  },
  {
    id: 10,
    title: "Inception",
    release_date: "2010-07-16",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg"
  }
];

// 10 Bollywood movies (static)
const bollywoodMovies = [
  {
    id: 101,
    title: "3 Idiots",
    release_date: "2009-12-25",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/d/df/3_idiots_poster.jpg"
  },
  {
    id: 102,
    title: "Dangal",
    release_date: "2016-12-23",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg"
  },
  {
    id: 103,
    title: "Zindagi Na Milegi Dobara",
    release_date: "2011-07-15",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/3/3c/Zindaginamilegidobara.jpg"
  },
  {
    id: 104,
    title: "Queen",
    release_date: "2014-03-07",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/2/22/QueenMoviePoster7thMarch.jpg"
  },
  {
    id: 105,
    title: "Barfi!",
    release_date: "2012-09-14",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/2/2e/Barfi%21_poster.jpg"
  },
  {
    id: 106,
    title: "Gully Boy",
    release_date: "2019-02-14",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/9/90/Gully_Boy_poster.jpg"
  },
  {
    id: 107,
    title: "Taare Zameen Par",
    release_date: "2007-12-21",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/8/8c/Taare_Zameen_Par.jpg"
  },
  {
    id: 108,
    title: "Dilwale Dulhania Le Jayenge",
    release_date: "1995-10-20",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/8/80/Dilwale_Dulhania_Le_Jayenge_poster.jpg"
  },
  {
    id: 109,
    title: "Andhadhun",
    release_date: "2018-10-05",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/6/6d/Andhadhun_poster.jpg"
  },
  {
    id: 110,
    title: "Piku",
    release_date: "2015-05-08",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/8/8c/Piku_poster.jpg"
  }
];

// 10 Other Language movies (static, e.g. Korean, French, Japanese, etc.)
const otherMovies = [
  {
    id: 201,
    title: "Your Name",
    release_date: "2016-08-26",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/0/0b/Your_Name_poster.png"
  },
  {
    id: 202,
    title: "Spirited Away",
    release_date: "2001-07-20",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/3/30/Spirited_Away_poster.JPG"
  },
  {
    id: 203,
    title: "Parasite",
    release_date: "2019-05-30",
    poster_path: "https://image.tmdb.org/t/p/w200/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg"
  },
  {
    id: 204,
    title: "Amélie",
    release_date: "2001-04-25",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/5/53/Amelie_poster.jpg"
  },
  {
    id: 205,
    title: "Pan's Labyrinth",
    release_date: "2006-10-11",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/6/67/Pan%27s_Labyrinth.jpg"
  },
  {
    id: 206,
    title: "Crouching Tiger, Hidden Dragon",
    release_date: "2000-07-06",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/9/9e/Crouching_tiger_hidden_dragon_poster.jpg"
  },
  {
    id: 207,
    title: "Roma",
    release_date: "2018-08-30",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/b/b7/Roma_%282018_film%29.png"
  },
  {
    id: 208,
    title: "The Intouchables",
    release_date: "2011-11-02",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/6/65/The_Intouchables.jpg"
  },
  {
    id: 209,
    title: "Oldboy",
    release_date: "2003-11-21",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/6/67/Oldboy2013Poster.jpg"
  },
  {
    id: 210,
    title: "Shoplifters",
    release_date: "2018-06-08",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/4/4b/Shoplifters_%282018_film%29.png"
  }
];

function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [hollywoodYear, setHollywoodYear] = useState("");
  const [bollywoodYear, setBollywoodYear] = useState("");
  const [otherYear, setOtherYear] = useState("");
  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );
  useEffect(() => {
    if (!query.trim()) setMovies([]);
  }, [query]);

  const TMDB_API_KEY = "4238d5ea"; // Replace with your own TMDb API key

  // Search movies from TMDb
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
        poster_path: movie.poster_path
          ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
          : null
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

  // Helper for horizontal scrollable lists
  const renderMovieList = (list, showLike = true, showRemove = false) => (
    <div className="movies-list">
      {list.map(movie => (
        <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}
          style={{ cursor: "pointer" }}>
          {movie.poster_path ? (
            <img src={movie.poster_path} alt={movie.title} />
          ) : (
            <div className="movie-placeholder" />
          )}
          {showLike && (
            <button
              onClick={e => { e.stopPropagation(); addToFavorites(movie); }}
              style={{ marginBottom: 8 }}
            >
              ❤️
            </button>
          )}
          {showRemove && (
            <button
              onClick={e => { e.stopPropagation(); removeFromFavorites(movie); }}
              style={{ marginBottom: 8 }}
            >
              ❌ Remove
            </button>
          )}
          <h4>{movie.title}</h4>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div style={{ width: "100%" }}>
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
          {renderMovieList(movies)}
        </div>
      )}

      {/* Favorites */}
      {favorites.length > 0 && (
        <div className="movies-container">
          <h2>Favorites</h2>
          {renderMovieList(favorites, false, true)}
        </div>
      )}

      {/* Hollywood Movies */}
      <div className="movies-container">
        <h2>Hollywood Movies</h2>
        <div style={{ margin: "16px 0" }}>
          <label>
            Filter by Year:{" "}
            <select value={hollywoodYear} onChange={e => setHollywoodYear(e.target.value)}>
              <option value="">All</option>
              {[...new Set(hollywoodMovies.map(m => m.release_date.slice(0, 4)))].map(year =>
                <option key={year} value={year}>{year}</option>
              )}
            </select>
          </label>
        </div>
        {renderMovieList(
          hollywoodMovies.filter(m => !hollywoodYear || m.release_date.startsWith(hollywoodYear))
        )}
      </div>

      {/* Bollywood Movies */}
      <div className="movies-container">
        <h2>Bollywood Movies</h2>
        <div style={{ margin: "16px 0" }}>
          <label>
            Filter by Year:{" "}
            <select value={bollywoodYear} onChange={e => setBollywoodYear(e.target.value)}>
              <option value="">All</option>
              {[...new Set(bollywoodMovies.map(m => m.release_date.slice(0, 4)))].map(year =>
                <option key={year} value={year}>{year}</option>
              )}
            </select>
          </label>
        </div>
        {renderMovieList(
          bollywoodMovies.filter(m => !bollywoodYear || m.release_date.startsWith(bollywoodYear))
        )}
      </div>

      {/* Other Language Movies */}
      <div className="movies-container">
        <h2>Other</h2>
        <div style={{ margin: "16px 0" }}>
          <label>
            Filter by Year:{" "}
            <select value={otherYear} onChange={e => setOtherYear(e.target.value)}>
              <option value="">All</option>
              {[...new Set(otherMovies.map(m => m.release_date.slice(0, 4)))].map(year =>
                <option key={year} value={year}>{year}</option>
              )}
            </select>
          </label>
        </div>
        {renderMovieList(
          otherMovies.filter(m => !otherYear || m.release_date.startsWith(otherYear))
        )}
      </div>

      {/* Movie Details Modal */}
      {selectedMovie && (
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
              borderRadius: 12,
              padding: 24,
              minWidth: 280,
              maxWidth: 350,
              boxShadow: "0 4px 24px rgba(0,0,0,0.18)",
              textAlign: "center"
            }}
            onClick={e => e.stopPropagation()}
          >
            <img
              src={selectedMovie.poster_path}
              alt={selectedMovie.title}
              style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
            />
            <h3>{selectedMovie.title}</h3>
            <p>Release Date: {selectedMovie.release_date}</p>
            <button onClick={() => setSelectedMovie(null)} style={{ marginTop: 12 }}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MovieExplorer;