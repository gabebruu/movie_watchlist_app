"use client";
import { useEffect, useState } from "react";
import { getAllMovies, deleteMovie } from "../services/api";

export default function AllMovies({ onEdit }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      setError("ERRO NO RASTREAMENTO: Falha ao carregar filmes 💀"); 
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja apagar este filme? O CUSTO SERÁ ALTO.")) return; 
    try {
      await deleteMovie(id);
      loadMovies(); // recarrega após apagar
    } catch (err) {
      console.error(err);
    }
  };

  const handleShare = async (movie) => {
    const shareText = `Confira este filme da minha lista: "${movie.title}" (${movie.year}), com nota ${movie.rating}/10.`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `Da minha lista de filmes`,
          text: shareText,
          url: window.location.href,
        });
        console.log("Filme compartilhado com sucesso");
      } catch (err) {
        console.error("Erro ao compartilhar o filme:", err);
      }
    } else if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(shareText);
        alert("Link para compartilhar não disponível. Informações do filme copiadas para a área de transferência!");
      } catch (err) {
        console.error("Falha ao copiar:", err);
        alert("Não foi possível compartilhar ou copiar as informações do filme.");
      }
    } else {
      alert("Compartilhamento não é suportado neste navegador.");
    }
  };

  if (loading) return <p className="text-center mt-8 text-cyan-400 font-mono text-xl animate-pulse">O RASTREAMENTO ESTÁ FALHANDO...</p>;
  if (error) return <p className="text-center text-neon-red font-bold text-2xl mt-8">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {movies.length === 0 ? (
        <p className="text-center text-red-500 font-mono text-lg mt-8">NENHUMA FILME REGISTRADO.</p>
      ) : (
        <ul className="space-y-6">
          {movies.map((movie) => (
            <li key={movie._id} className="bg-red-950/70 border-4 border-red-600 shadow-2xl shadow-black/80 rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-center transition-all duration-300 hover:scale-[1.02] hover:shadow-red-800/80">
              
              <div className="flex-grow mb-4 md:mb-0">
                <h3 className="font-bold text-3xl md:text-4xl uppercase text-red-400 slasher-font mb-1">
                  {movie.title}
                </h3>
                
                <p className="text-sm text-cyan-500 font-mono">
                  GÊNERO: {movie.genre} • ANO: {movie.year}
                </p>
                
                <p className="text-base mt-2 font-bold tracking-wider">
                  <span className="text-yellow-400 text-shadow-glow">
                    ⭐ CLASSIFICAÇÃO: {movie.rating}/10
                  </span>{" "}
                  —{" "}
                  {movie.watched ? (
                    <span className="text-green-400 border border-green-700 px-2 py-0.5 shadow-md shadow-green-900 uppercase">
                      VISTO
                    </span>
                  ) : (
                    <span className="bg-red-800 text-white px-2 py-0.5 uppercase animate-pulse border border-red-700 shadow-md shadow-red-900">
                      POR VER
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                <button
                  onClick={() => handleShare(movie)}
                  title="Compartilhar filme"
                  className="p-3 font-bold uppercase tracking-wider bg-purple-900/50 text-purple-300 border border-purple-500 shadow-md shadow-purple-900 hover:bg-purple-800 hover:text-white transition-all duration-200"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3"></circle>
                    <circle cx="6" cy="12" r="3"></circle>
                    <circle cx="18" cy="19" r="3"></circle>
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                  </svg>
                </button>
                <button
                  onClick={() => onEdit(movie)}
                  className="px-5 py-2 font-bold uppercase tracking-wider bg-cyan-900/50 text-cyan-300 border border-cyan-500 shadow-md shadow-cyan-900 hover:bg-cyan-800 hover:text-white transition-all duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="px-5 py-2 font-bold uppercase tracking-wider bg-red-900 text-white border-2 border-red-500 shadow-lg shadow-red-900 hover:bg-red-600 hover:shadow-neon-red-active transition-all duration-200"
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
