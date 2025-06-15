import React from "react";

function MovieList({ list, onCardClick, onLike, onRemove, showLike, showRemove }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
      {list.map(movie => (
        <div
          key={movie.id}
          className="movie-card"
          style={{ minWidth: 140, maxWidth: 140, cursor: "pointer" }}
          onClick={() => onCardClick && onCardClick(movie)}
        >
          <img src={movie.poster} alt={movie.title} style={{ width: "100%", borderRadius: 8 }} />
          <div className="movie-title">{movie.title}</div>
          {showLike && <button onClick={e => { e.stopPropagation(); onLike(movie); }}>Like</button>}
          {showRemove && <button onClick={e => { e.stopPropagation(); onRemove(movie); }}>Remove</button>}
        </div>
      ))}
    </div>
  );
}

export default MovieList;