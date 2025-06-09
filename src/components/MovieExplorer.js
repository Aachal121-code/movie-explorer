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
    poster_path: "https://m.media-amazon.com/images/I/81p+xe8cbnL._AC_SY679_.jpg"
  },
  {
    id: 102,
    title: "Dangal",
    release_date: "2016-12-23",
    poster_path: "https://m.media-amazon.com/images/I/81A-mvlo+QL._AC_SY679_.jpg"
  },
  {
    id: 103,
    title: "Zindagi Na Milegi Dobara",
    release_date: "2011-07-15",
    poster_path: "https://m.media-amazon.com/images/I/71Q1Iu4suSL._AC_SY679_.jpg"
  },
  {
    id: 104,
    title: "Queen",
    release_date: "2014-03-07",
    poster_path: "https://m.media-amazon.com/images/I/81l3rZK4lnL._AC_SY679_.jpg"
  },
  {
    id: 105,
    title: "Barfi!",
    release_date: "2012-09-14",
    poster_path: "https://m.media-amazon.com/images/I/81eA5VnXNlL._AC_SY679_.jpg"
  },
  {
    id: 106,
    title: "Gully Boy",
    release_date: "2019-02-14",
    poster_path: "https://m.media-amazon.com/images/I/81pZ9h6r5lL._AC_SY679_.jpg"
  },
  {
    id: 107,
    title: "Taare Zameen Par",
    release_date: "2007-12-21",
    poster_path: "https://m.media-amazon.com/images/I/71Q0A6lK4lL._AC_SY679_.jpg"
  },
  {
    id: 108,
    title: "Dilwale Dulhania Le Jayenge",
    release_date: "1995-10-20",
    poster_path: "https://m.media-amazon.com/images/I/81Vw5Zl8J-L._AC_SY679_.jpg"
  }
];

function MovieExplorer() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

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
              <div key={movie.id} className="movie-card">
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

      {/* Hollywood Movies */}
      <div className="movies-container">
        <h2>Hollywood Movies</h2>
        <div className="movies-list">
          {demoNowPlaying.map(movie => (
            <div key={movie.id} className="movie-card">
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

      {/* Bollywood Movies */}
      <div className="movies-container">
        <h2>Bollywood Movies</h2>
        <div className="movies-list">
          {bollywoodMovies.map(movie => (
            <div key={movie.id} className="movie-card">
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
    </div>
  );
}

export default MovieExplorer;