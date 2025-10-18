"use client";
import { useEffect, useState } from "react";
import { getAllMovies, deleteMovie } from "../services/api";

export default function AllMovies({ onEdit }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Carrega filmes ao montar
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      setError("Erro ao carregar filmes 😢");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que quer apagar este filme?")) return;
    try {
      await deleteMovie(id);
      loadMovies(); // recarrega após apagar
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-4">Carregando filmes...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center">🎬 Todos os Filmes</h2>

      {movies.length === 0 ? (
        <p className="text-center text-gray-500">Nenhum filme adicionado ainda.</p>
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
                  {movie.watched ? (
                    <span className="text-green-600">Visto ✅</span>
                  ) : (
                    <span className="text-orange-500">Por ver ⏳</span>
                  )}
                </p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => onEdit(movie)} // abre modal de edição
                  className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600"
                >
                  Excluir
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
