import React from "react";
import MovieCard from "./MovieCard";

function MovieList({ list, onInfo, onLike, onRemove, showLike, showRemove }) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: 18 }}>
      {list.map(movie => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onInfo={onInfo}
          onLike={onLike}
          onRemove={onRemove}
          showLike={showLike}
          showRemove={showRemove}
        />
      ))}
    </div>
  );
}

export default MovieList;