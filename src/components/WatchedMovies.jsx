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
      setError("Erro ao carregar filmes vistos 😢");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando filmes vistos...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-green-600">
        🎬 Filmes já vistos
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum filme marcado como visto ainda.</p>
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
                  ⭐ {movie.rating}/10 — <span className="text-green-600">Visto ✅</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
