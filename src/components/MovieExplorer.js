import React, { useState } from "react";

// Demo data for "Now Playing" (Hollywood)
const demoNowPlaying = [
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
    release_date: "2009-12-25",
    poster_path: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
  }
];

// Demo data for search results
const demoSearch = [
  {
    id: 9,
    title: "Avengers: Endgame",
    release_date: "2019-04-26",
    poster_path: "https://image.tmdb.org/t/p/w200/ulzhLuWrPK07P1YkdWQLZnQh1JL.jpg"
  },
  {
    id: 10,
    title: "Avatar",
    release_date: "2009-12-18",
    poster_path: "https://image.tmdb.org/t/p/w200/6EiRUJpuoeQPghrs3YNktfnqOVh.jpg"
  },
  {
    id: 11,
    title: "Titanic",
    release_date: "1997-12-19",
    poster_path: "https://image.tmdb.org/t/p/w200/9xjZS2rlVxm8SFx8kPC3aIGCOYQ.jpg"
  },
  {
    id: 12,
    title: "The Matrix",
    release_date: "1999-03-31",
    poster_path: "https://image.tmdb.org/t/p/w200/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
  },
  {
    id: 13,
    title: "The Godfather",
    release_date: "1972-03-24",
    poster_path: "https://image.tmdb.org/t/p/w200/3bhkrj58Vtu7enYsRolD1fZdja1.jpg"
  },
  {
    id: 14,
    title: "Pulp Fiction",
    release_date: "1994-10-14",
    poster_path: "https://image.tmdb.org/t/p/w200/dM2w364MScsjFf8pfMbaWUcWrR.jpg"
  },
  {
    id: 15,
    title: "Gladiator",
    release_date: "2000-05-05",
    poster_path: "https://image.tmdb.org/t/p/w200/pRn3TJHbAqCAO7V1C0g5xw8AU8Y.jpg"
  }
];

// Demo data for Bollywood movies
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
    id: 105,
    title: "Barfi!",
    release_date: "2012-09-14",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/2/2e/Barfi%21_poster.jpg"
  },
  {
    id: 108,
    title: "Dilwale Dulhania Le Jayenge",
    release_date: "1995-10-20",
    poster_path: "https://upload.wikimedia.org/wikipedia/en/8/80/Dilwale_Dulhania_Le_Jayenge_poster.jpg"
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
  }
];

function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [filterYear, setFilterYear] = useState("");

  // Simulate search with static data
  const searchMovies = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      // Simple search: filter demoSearch by title
      const results = demoSearch.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
      setMovies(results);
      setLoading(false);
    }, 600); // Simulate network delay
  };

  const [favorites, setFavorites] = useState(
    JSON.parse(localStorage.getItem('favorites')) || []
  );

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
      <form className="search-form" onSubmit={searchMovies}>
        <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Searching..." : "Search"}
        </button>
      </form>

      {/* Search Results FIRST */}
      {movies.length > 0 && (
        <div className="movies-container">
          <h2>Search Results</h2>
          <div className="movies-list">
            {movies.map(movie => (
              <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}
                style={{ cursor: "pointer" }}>
                {movie.poster_path ? (
                  <img src={movie.poster_path} alt={movie.title} />
                ) : (
                  <div className="movie-placeholder" />
                )}
                <h4>{movie.title}</h4>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="movies-container">
          <h2>Favorites</h2>
          <div className="movies-list">
            {favorites.map(movie => (
              <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}
                style={{ cursor: "pointer" }}>
                {movie.poster_path ? (
                  <img src={movie.poster_path} alt={movie.title} />
                ) : (
                  <div className="movie-placeholder" />
                )}
                <button
                  onClick={() => removeFromFavorites(movie)}
                  style={{ marginBottom: 8 }}
                >
                  ❌ Remove
                </button>
                <h4>{movie.title}</h4>
                <p>{movie.release_date}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Hollywood Movies */}
      <div style={{ margin: "16px 0" }}>
        <label>
          Filter Bollywood by Year:{" "}
          <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">All</option>
            <option value="2009">2009</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2014">2014</option>
            <option value="2016">2016</option>
            <option value="2019">2019</option>
            <option value="1995">1995</option>
            <option value="2007">2007</option>
          </select>
        </label>
      </div>
      <div className="movies-container">
        <h2>Hollywood Movies</h2>
        <div className="movies-list">
          {demoNowPlaying.filter(movie => !filterYear || movie.release_date.startsWith(filterYear))
          .map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}
              style={{ cursor: "pointer" }}>
              {movie.poster_path ? (
                <img src={movie.poster_path} alt={movie.title} />
              ) : (
                <div className="movie-placeholder" />
              )}
              <button onClick={() => addToFavorites(movie)} style={{ marginBottom: 8 }}>❤️</button>
              <h4>{movie.title}</h4>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bollywood Movies */}
      <div style={{ margin: "16px 0" }}>
        <label>
          Filter Bollywood by Year:{" "}
          <select value={filterYear} onChange={e => setFilterYear(e.target.value)}>
            <option value="">All</option>
            <option value="2009">2009</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2014">2014</option>
            <option value="2016">2016</option>
            <option value="2019">2019</option>
            <option value="1995">1995</option>
            <option value="2007">2007</option>
          </select>
        </label>
      </div>
      <div className="movies-container">
        <h2>Bollywood Movies</h2>
        <div className="movies-list">
          {bollywoodMovies.filter(movie => !filterYear || movie.release_date.startsWith(filterYear))
          .map(movie => (
            <div key={movie.id} className="movie-card" onClick={() => setSelectedMovie(movie)}
              style={{ cursor: "pointer" }}>
              {movie.poster_path ? (
                <img src={movie.poster_path} alt={movie.title} />
              ) : (
                <div className="movie-placeholder" />
              )}
              <button onClick={() => addToFavorites(movie)} style={{ marginBottom: 8 }}>❤️</button>
              <h4>{movie.title}</h4>
              <p>{movie.release_date}</p>
            </div>
          ))}
        </div>
      </div>
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