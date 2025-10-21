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
      setError("Please fill in all required fields!");
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
      setError("Error updating movie😢");
    } finally {
      setLoading(false);
    }
  };

  if (!movie) return null; // Nada pra editar

  const inputStyle =
    "w-full bg-gray-900/80 border-2 border-cyan-700 text-cyan-300 rounded-md p-3 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-200 placeholder-cyan-600/70";
  const checkboxStyle =
    "h-5 w-5 rounded-sm bg-gray-700 border-cyan-600 text-cyan-400 focus:ring-2 focus:ring-offset-gray-900 focus:ring-cyan-500";
  const buttonSubmitStyle = `
    w-full px-6 py-3 uppercase tracking-widest font-bold
    bg-red-700 text-white
    shadow-lg border-2 border-red-500
    hover:bg-red-600 hover:shadow-neon-red-hover
    transition-all duration-200
    disabled:bg-gray-600 disabled:shadow-none
  `;
  const buttonCancelStyle = `
    mt-4 w-full py-2 text-sm uppercase tracking-wider
    text-cyan-400 border border-cyan-700
    hover:bg-gray-800 hover:text-white
    transition-all duration-150
  `;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900/70 border-2 border-red-900 shadow-2xl shadow-red-900/30 rounded-xl p-6 md:p-8 max-w-md w-full mx-4">
        <h2 className="text-2xl md:text-3xl font-black text-center mb-8 uppercase text-neon-red">
          Edit Movie
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title"
            placeholder="Título"
            value={form.title}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="year"
            type="number"
            placeholder="Year"
            value={form.year}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="genre"
            placeholder="Genre"
            value={form.genre}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="rating"
            type="number"
            placeholder="Rating (1–10)"
            min="1"
            max="10"
            value={form.rating}
            onChange={handleChange}
            className={inputStyle}
          />
          <label className="flex items-center space-x-4 text-cyan-300">
            <input
              type="checkbox"
              name="watched"
              checked={form.watched}
              onChange={handleChange}
              className={checkboxStyle}
            />
            <span>Watched Movies</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={buttonSubmitStyle}
          >Confirm
            {loading ? "Atualizando..." : ""}
          </button>
        </form>

        {onClose && (
          <button
            onClick={onClose}
            className={buttonCancelStyle}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
