"use client";
import { useEffect, useState } from "react";
import { getAllMovies, deleteMovie } from "../services/api";

export default function AllMovies({ onEdit }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ... (Funções loadMovies e handleDelete permanecem as mesmas)
  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      setLoading(true);
      const data = await getAllMovies();
      setMovies(data);
    } catch (err) {
      setError("ERRO NO RASTREAMENTO: Falha ao carregar filmes 💀"); // Mensagem de erro mais temática
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Tem certeza que deseja apagar este filme? O CUSTO SERÁ ALTO.")) return; // Texto de confirmação temático
    try {
      await deleteMovie(id);
      loadMovies(); // recarrega após apagar
    } catch (err) {
      console.error(err);
    }
  };

  // Estilização de Carregamento e Erro
  if (loading) return <p className="text-center mt-8 text-cyan-400 font-mono text-xl animate-pulse">O RASTREAMENTO ESTÁ FALHANDO...</p>;
  if (error) return <p className="text-center text-neon-red font-bold text-2xl mt-8">{error}</p>;

  return (
    <div className="p-4 max-w-4xl mx-auto">
      
      {/* Título da Seção (opcional se já tiver o h2 no Home) */}
      {/* <h2 className="text-2xl font-semibold mb-6 text-center text-cyan-400 font-mono uppercase">TODOS OS FILMES</h2> */}

      {movies.length === 0 ? (
        <p className="text-center text-red-500 font-mono text-lg mt-8">NENHUMA VÍTIMA REGISTRADA.</p>
      ) : (
        <ul className="space-y-6">
          {movies.map((movie) => (
            <li key={movie._id} className="bg-red-950/70 border-4 border-red-600 shadow-2xl shadow-black/80 rounded-lg p-4 mb-4 flex flex-col md:flex-row justify-between items-center transition-all duration-300 hover:scale-[1.02] hover:shadow-red-800/80">
              
              {/* Informações do Filme */}
              <div className="flex-grow mb-4 md:mb-0">
                {/* Título: Sangrento e grande */}
                <h3 className="font-bold text-4xl uppercase text-red-400 slasher-font mb-1">
                  {movie.title}
                </h3>
                
                {/* Metadados: Estilo terminal, ciano */}
                <p className="text-sm text-cyan-500 font-mono">
                  GÊNERO: {movie.genre} • ANO: {movie.year}
                </p>
                
                {/* Status: Destaque de Neon */}
                <p className="text-base mt-2 font-bold tracking-wider">
                  <span className="text-yellow-400 text-shadow-glow">
                    ⭐ CLASSIFICAÇÃO: {movie.rating}/10
                  </span>{" "}
                  —{" "}
                  {movie.watched ? (
                    // Status Visto: Verde Neon
                    <span className="text-green-400 border border-green-700 px-2 py-0.5 shadow-md shadow-green-900 uppercase">
                      VISTO
                    </span>
                  ) : (
                    // Status Por Ver: Laranja/Vermelho (Perigo)
                    <span className="bg-red-800 text-white px-2 py-0.5 uppercase animate-pulse border border-red-700 shadow-md shadow-red-900">
                      POR VER
                    </span>
                  )}
                </p>
              </div>

              {/* Botões de Ação */}
              <div className="flex gap-4 w-full md:w-auto">
                <button
                  onClick={(e) => { e.stopPropagation(); onEdit(movie); }} // impede clique no li de ativar a edição
                  // Botão Editar: Verde (espero, ciano) - Estilo LED
                  className="px-5 py-2 font-bold uppercase tracking-wider 
                             bg-cyan-900/50 text-cyan-300 border border-cyan-500 
                             shadow-md shadow-cyan-900 
                             hover:bg-cyan-800 hover:text-white transition-all duration-200"
                >
                  Editar
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(movie._id); }}
                  // Botão Excluir: Vermelho Sangue - Estilo Alerta
                  className="px-5 py-2 font-bold uppercase tracking-wider 
                             bg-red-900 text-white border-2 border-red-500 
                             shadow-lg shadow-red-900 
                             hover:bg-red-600 hover:shadow-neon-red-active transition-all duration-200"
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