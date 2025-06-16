import React from "react";
import "./MovieCard.css";

function MovieCard({ movie, onInfo, onLike, onRemove, isFavorite }) {
  return (
    <div className="movie-card">
      <img src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/140x210?text=No+Image"} alt={movie.Title} />
      <div className="movie-title">{movie.Title}</div>
      <div className="movie-meta">
        <span>📅 {movie.Year}</span>
        <span>🎬 {movie.Type}</span>
      </div>
      <div className="movie-card-btns">
        <button className="icon-btn info-btn" title="Info" onClick={e => { e.stopPropagation(); onInfo(movie); }}>ℹ️</button>
        {!isFavorite && (
          <button className="icon-btn like-btn" title="Like" onClick={e => { e.stopPropagation(); onLike(movie); }}>❤️</button>
        )}
        {isFavorite && (
          <button className="icon-btn remove-btn" title="Remove" onClick={e => { e.stopPropagation(); onRemove(movie); }}>❌</button>
        )}
      </div>
    </div>
  );
}

export default MovieCard;