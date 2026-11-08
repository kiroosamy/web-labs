import React, { useState } from "react";
import "./App.css";

export default function App() {
  // State for the list of movies and the form inputs
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(1);

  // Requirement 1, 2, 3: Add movies, comments, and star ratings
  const handleAddMovie = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newMovie = {
      id: Date.now(),
      title: title,
      comment: comment,
      rating: Number(rating),
    };

    setMovies([...movies, newMovie]);
    
    // Reset form fields
    setTitle("");
    setComment("");
    setRating(1);
  };

  // Requirement 1: Remove movies from the list[cite: 39]
  const handleRemoveMovie = (id) => {
    setMovies(movies.filter((movie) => movie.id !== id));
  };

  return (
    <div className="app-container">
      <h1>My Movie Watch List</h1>

      <form onSubmit={handleAddMovie} className="movie-form">
        <input
          type="text"
          placeholder="Movie Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <textarea
          placeholder="Write a comment review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="3"
        />

        <div className="rating-container">
          <label htmlFor="rating">Rating: </label>
          <select 
            id="rating" 
            value={rating} 
            onChange={(e) => setRating(e.target.value)}
          >
            <option value="1">1 Star</option>
            <option value="2">2 Stars</option>
            <option value="3">3 Stars</option>
            <option value="4">4 Stars</option>
            <option value="5">5 Stars</option>
          </select>
        </div>

        <button type="submit" className="add-btn">Add Movie</button>
      </form>

      <div className="movie-list">
        {movies.length === 0 ? (
          <p className="empty-state">No movies added yet. Add one above!</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <div className="movie-header">
                <h2>{movie.title}</h2>
                <button 
                  onClick={() => handleRemoveMovie(movie.id)} 
                  className="delete-btn"
                  title="Remove Movie"
                >
                  ✕
                </button>
              </div>
              
              {/* Requirement 4: Show how many stars using emojis[cite: 39] */}
              <div className="stars">
                {"⭐".repeat(movie.rating)}
              </div>
              
              {movie.comment && (
                <p className="movie-comment">"{movie.comment}"</p>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}