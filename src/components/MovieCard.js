import React from "react";
import "./MovieCard.css";

function MovieCard({ movie, onInfo, onLike, onRemove, isFavorite }) {
  return (
    <div className="movie-card">
      <img src={movie.poster} alt={movie.title} />
      <div className="movie-title">{movie.title}</div>
      <div className="movie-meta">
        <span title="Release Year">📅 {movie.release_date?.slice(0, 4) || "N/A"}</span>
        <span title="Rating">⭐ {movie.vote_average || "N/A"}</span>
      </div>
      <div className="movie-card-btns">
        <button className="icon-btn info-btn" title="Info" onClick={e => { e.stopPropagation(); onInfo(movie); }}>
          ℹ️
        </button>
        {!isFavorite && (
          <button className="icon-btn like-btn" title="Like" onClick={e => { e.stopPropagation(); onLike(movie); }}>
            ❤️
          </button>
        )}
        {isFavorite && (
          <button className="icon-btn remove-btn" title="Remove" onClick={e => { e.stopPropagation(); onRemove(movie); }}>
            ❌
          </button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;