import React from "react";

function MovieList({ list, onCardClick, onLike, onRemove, showLike = true, showRemove = false }) {
  return (
    <div className="movies-list">
      {list.map(movie => (
        <div key={movie.id} className="movie-card" onClick={() => onCardClick(movie)} style={{ cursor: "pointer" }}>
          {movie.poster_path ? (
            <img src={movie.poster_path} alt={movie.title} />
          ) : (
            <div className="movie-placeholder" />
          )}
          {showLike && (
            <button onClick={e => { e.stopPropagation(); onLike(movie); }} style={{ marginBottom: 8 }}>
              ❤️
            </button>
          )}
          {showRemove && (
            <button onClick={e => { e.stopPropagation(); onRemove(movie); }} style={{ marginBottom: 8 }}>
              ❌ Remove
            </button>
          )}
          <h4>{movie.title}</h4>
          <p>{movie.release_date}</p>
        </div>
      ))}
    </div>
  );
}

export default MovieList;