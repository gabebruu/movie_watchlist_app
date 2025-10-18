"use client";
import { useEffect, useState } from "react";
import { getMoviesByRating } from "../services/api";

export default function MoviesByRating() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMoviesByRating();
  }, []);

  const loadMoviesByRating = async () => {
    try {
      setLoading(true);
      const data = await getMoviesByRating();
      setMovies(data);
    } catch (err) {
      console.error(err);
      setError("Erro ao carregar filmes por classificação 😢");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando filmes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center text-yellow-600">
        ⭐ Filmes por classificação
      </h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum filme encontrado.</p>
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
                  ⭐ <span className="font-semibold">{movie.rating}</span>/10 —{" "}
                  {movie.watched ? (
                    <span className="text-green-600">Visto ✅</span>
                  ) : (
                    <span className="text-orange-500">Por ver ⏳</span>
                  )}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
