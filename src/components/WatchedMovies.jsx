"use client";
import { useEffect, useState } from "react";
import { getWatchedMovies } from "../services/api";

export default function WatchedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadWatched();
  }, []);

  const loadWatched = async () => {
    try {
      setLoading(true);
      const data = await getWatchedMovies();
      setMovies(data);
    } catch (err) {
      console.error(err);
      setError("ERROR: Failed to load watched movies💀");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-8 text-cyan-400 font-mono text-xl animate-pulse">LOADING WATCHED MOVIES...</p>;
  if (error) return <p className="text-center text-neon-red font-bold text-2xl mt-8">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {movies.length === 0 ? (
        <p className="text-center text-black-500 font-mono text-lg mt-8">NOT WATCHED MOVIES RECORDED.</p>
      ) : (
        <ul className="space-y-6">
          {movies.map((movie) => (
            <li key={movie._id} className="bg-red-950/70 border-4 border-red-600 shadow-2xl shadow-black/80 rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-center transition-all duration-300 hover:scale-[1.02] hover:shadow-red-800/80">
              <div className="flex-grow mb-4 md:mb-0">
                <h3 className="font-bold text-3xl md:text-4xl uppercase text-red-400 slasher-font mb-1">
                  {movie.title}
                </h3>
                <p className="text-sm text-cyan-500 font-mono">
                  GENRE: {movie.genre} • YEAR: {movie.year}
                </p>
                <p className="text-base mt-2 font-bold tracking-wider">
                  <span className="text-yellow-400 text-shadow-glow">
                    ⭐ RATING: {movie.rating}/10
                  </span>{" "}
                  —{" "}
                  <span className="text-green-400 border border-green-700 px-2 py-0.5 shadow-md shadow-green-900 uppercase">
                    WATCHED
                  </span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
