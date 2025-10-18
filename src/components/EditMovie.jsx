"use client";
import { useState, useEffect } from "react";
import { updateMovie } from "../services/api";

export default function EditMovie({ movie, onClose, onUpdated }) {
  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    watched: false,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Preenche o form com os dados do filme passado
  useEffect(() => {
    if (movie) {
      setForm({
        title: movie.title || "",
        year: movie.year || "",
        genre: movie.genre || "",
        rating: movie.rating || "",
        watched: movie.watched || false,
      });
    }
  }, [movie]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.year || !form.genre || !form.rating) {
      setError("Preencha todos os campos obrigatórios!");
      return;
    }
    setError("");
    setLoading(true);

    try {
      await updateMovie(movie._id, form);
      if (onUpdated) onUpdated(); // Atualiza lista
      if (onClose) onClose();     // Fecha modal
    } catch (err) {
      console.error(err);
      setError("Erro ao atualizar filme 😢");
    } finally {
      setLoading(false);
    }
  };

  if (!movie) return null; // Nada pra editar

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-gray-800 shadow-lg rounded-xl p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl font-semibold text-center mb-6 text-white">
          Editar Filme
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="year"
            type="number"
            placeholder="Ano"
            value={form.year}
            onChange={handleChange}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="genre"
            placeholder="Gênero"
            value={form.genre}
            onChange={handleChange}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"
          />
          <input
            name="rating"
            type="number"
            placeholder="Classificação (1–10)"
            min="1"
            max="10"
            value={form.rating}
            onChange={handleChange}
            className="w-full bg-gray-700 border-gray-600 text-white rounded-md p-3 focus:ring-2 focus:ring-blue-500 transition"
          />
          <label className="flex items-center space-x-3 text-white">
            <input
              type="checkbox"
              name="watched"
              checked={form.watched}
              onChange={handleChange}
              className="h-5 w-5 rounded-sm bg-gray-600 border-gray-500 focus:ring-blue-500"
            />
            <span>Já assistido?</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition-transform duration-200 transform hover:scale-105"
          >
            {loading ? "Atualizando..." : "Atualizar Filme"}
          </button>
        </form>

        {onClose && (
          <button
            onClick={onClose}
            className="mt-5 w-full text-gray-400 hover:text-white text-sm transition"
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
