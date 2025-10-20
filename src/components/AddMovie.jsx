//aqui nesse arquivo comnponentes, serve para adicionar novos filmes à lista

"use client"; // indica que este componente é renderizado no cliente
import { useState } from "react"; // hook para gerenciar estado
import { addMovie } from "../services/api"; // função para chamar a API e adicionar filme

export default function AddMovie({ onClose, onAdded }) { // componente funcional que recebe props onClose e onAdded, ou seja, funções para fechar o modal e atualizar a lista
  const [form, setForm] = useState({
    title: "",
    year: "",
    genre: "",
    rating: "",
    watched: false,
  });
  const [loading, setLoading] = useState(false); // estado para indicar se está carregando
  const [error, setError] = useState(""); // a string vazia é pq não há erro inicialmente

  const handleChange = (e) => { //aqui handleChange lida com mudanças nos inputs do formulário, e o (e) é o evento do input.
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value, // se for checkbox, usa checked, senão value
    });
  };

  const handleSubmit = async (e) => { //async pq lida com operação assíncrona de adicionar filme, ou seja, espera a resposta da API
    e.preventDefault();
    if (!form.title || !form.year || !form.genre || !form.rating) {
      setError("Preencha todos os campos obrigatórios!");
      return;
    }
    setError("");
    setLoading(true);

    try { //o try catch é para capturar erros na operação assíncrona, ou seja, se a API falhar ao adicionar o filme 
      // Converte year e rating para Number antes de enviar
      await addMovie({
        ...form,
        year: Number(form.year),
        rating: Number(form.rating),
      });

      if (onAdded) onAdded(); // Atualiza lista
      if (onClose) onClose(); // Fecha modal
    } catch (err) {
      console.error(err);
      setError("Erro ao adicionar filme 😢");
    } finally {
      setLoading(false);
    }
  };
  // Estilos//
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
          Add New Movie
        </h2>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            name="title" // nome do campo
            placeholder="Título" // o placeholder é o texto que aparece dentro do input
            value={form.title} // o value é o valor atual do input, vindo do estado form
            onChange={handleChange} // o onChange chama a função handleChange quando o valor do input muda
            className={inputStyle} // estilo do input
          />
          <input
            name="year"
            type="number"
            placeholder="Ano"
            value={form.year}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="genre"
            placeholder="Gênero"
            value={form.genre}
            onChange={handleChange}
            className={inputStyle}
          />
          <input
            name="rating"
            type="number"
            placeholder="Classificação (1–10)"
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
              checked={form.watched} // Controle do estado
              onChange={handleChange} // Atualiza o estado
              className={checkboxStyle} //  Estilo do checkbox 
            />
            <span>Já assistido?</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className={buttonSubmitStyle}
          >
            {loading ? "Adicionando..." : "Adicionar Filme"}
          </button>
        </form>

        {onClose && (
          <button
            onClick={onClose}
            className={buttonCancelStyle}
          >
            Cancelar
          </button>
        )}
      </div>
    </div>
  );
}
