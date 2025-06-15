import React from "react";
import "./HorizontalMovieList.css";

function HorizontalMovieList({ title, items, onCardClick }) {
  if (!items.length) return null;
  return (
    <div className="horizontal-section">
      <h2>{title}</h2>
      <div className="horizontal-list">
        {items.map(item => (
          <div
            className="movie-card"
            key={item.id}
            onClick={() => onCardClick && onCardClick(item)}
          >
            <img src={item.poster} alt={item.title} />
            <div className="movie-title">{item.title}</div>
            {item.type && <div className="movie-type">{item.type}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default HorizontalMovieList;