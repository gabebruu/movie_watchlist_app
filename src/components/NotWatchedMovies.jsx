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
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center text-white">Filmes por ver</h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-400">
          Nenhum filme pendente — bora assistir alguma coisa! 🍿
        </p>
      ) : (
        <ul className="space-y-4">
          {movies.map((movie) => (
            <li
              key={movie._id}
              className="bg-gray-800 bg-opacity-50 backdrop-blur-sm shadow-lg rounded-lg p-4 flex justify-between items-center transition-all duration-300 hover:bg-gray-700"
            >
              <div className="flex-grow">
                <h3 className="font-bold text-xl text-white">{movie.title}</h3>
                <p className="text-sm text-gray-400">
                  {movie.genre} • {movie.year}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-semibold text-yellow-400">⭐ {movie.rating}</span>/10 —{" "}
                  <span className="text-orange-400">Por ver</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
