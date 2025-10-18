"use client";
import { useEffect, useState } from "react";
import { getNotWatchedMovies } from "../services/api";

export default function NotWatchedMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadNotWatched();
  }, []);

  const loadNotWatched = async () => {
    try {
      setLoading(true);
      const data = await getNotWatchedMovies();
      setMovies(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar filmes por ver 😢");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando filmes por ver...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-orange-600">
        🎬 Filmes por ver
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">
          Nenhum filme pendente — bora assistir alguma coisa! 🍿
        </p>
      ) : (
        <ul className="space-y-3">
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="bg-white shadow-md rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <h3 className="font-bold text-lg">{movie.title}</h3>
                <p className="text-sm text-gray-600">
                  {movie.genre} • {movie.year}
                </p>
                <p className="text-sm">
                  ⭐ {movie.rating}/10 —{" "}
                  <span className="text-orange-500">Por ver ⏳</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
