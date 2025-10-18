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
    <div className="bg-white shadow-lg rounded-xl p-6 max-w-md mx-auto mt-8">
      <h2 className="text-xl font-semibold text-center mb-4 text-green-600">
        ✏️ Editar Filme
      </h2>

      {error && <p className="text-red-500 text-center mb-3">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="title"
          placeholder="Título"
          value={form.title}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
        <input
          name="year"
          type="number"
          placeholder="Ano"
          value={form.year}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
        <input
          name="genre"
          placeholder="Gênero"
          value={form.genre}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
        <input
          name="rating"
          type="number"
          placeholder="Classificação (1–10)"
          min="1"
          max="10"
          value={form.rating}
          onChange={handleChange}
          className="w-full border rounded-md p-2"
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            name="watched"
            checked={form.watched}
            onChange={handleChange}
          />
          <span>Já assistido?</span>
        </label>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          {loading ? "Atualizando..." : "Atualizar Filme"}
        </button>
      </form>

      {onClose && (
        <button
          onClick={onClose}
          className="mt-4 w-full text-gray-500 hover:text-gray-700 text-sm"
        >
          Cancelar
        </button>
      )}
    </div>
  );
}
