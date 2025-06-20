import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import './FavoritesPage.css';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites") || "[]");
    setFavorites(storedFavorites);
  }, []);

  const removeFromFavorites = (movie) => {
    const updated = favorites.filter(fav => fav.imdbID !== movie.imdbID);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div className="favorite-root">
      <h2 style={{ marginBottom: "1rem" }}>Your Favorite Movies</h2>
      {favorites.length > 0 ? (
        <div className="favorite-list">
          {favorites.map(movie => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              onRemove={removeFromFavorites}
              isFavorite={true}
            />
          ))}
        </div>
      ) : (
        <p>You haven't added any favorite movies yet.</p>
      )}
    </div>
  );
}

export default FavoritesPage;
