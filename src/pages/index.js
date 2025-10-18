"use client";
import { useState } from "react";
import AllMovies from "../components/AllMovies";
import WatchedMovies from "../components/WatchedMovies";
import NotWatchedMovies from "../components/NotWatchedMovies";
import MoviesByRating from "../components/MoviesByRating";
import AddMovie from "../components/AddMovie";
import EditMovie from "../components/EditMovie";

export default function Home() {
  const [currentView, setCurrentView] = useState("all"); // all, watched, notWatched, rating
  const [showAddModal, setShowAddModal] = useState(false);
  const [editMovie, setEditMovie] = useState(null);
  const [reloadKey, setReloadKey] = useState(0); // força reload nos componentes

  const handleAdded = () => {
    setShowAddModal(false);
    setReloadKey((prev) => prev + 1);
  };

  const handleUpdated = () => {
    setEditMovie(null);
    setReloadKey((prev) => prev + 1);
  };


  const buttonStyle = (view) =>
    `px-5 py-2 uppercase tracking-wider font-mono
     transition-all duration-150 ease-in-out
     ${currentView === view
        ? "bg-red-800 text-yellow-300 border-2 border-red-500 shadow-neon-red-active" // Estado Ativo: Sangue e Destaque
        : "bg-gray-900/70 text-cyan-400 border border-cyan-700 hover:bg-gray-800 hover-neon-effect" // Estado Padrão: Terminal de Computador
      }
     `;
     
  const addButtonStyle = `
    px-6 py-2 uppercase tracking-widest font-bold
    bg-red-700 text-white
    shadow-lg border-2 border-red-500
    hover:bg-red-600 hover:shadow-neon-red-hover
    transition-all duration-200
    // Adicionar um toque de agressividade, simulando um botão de "REC"
    // ou uma fonte que parece gotejar (se usar uma fonte customizada)
  `;

  return (
    <div className="min-h-screen bg-black text-gray-300 p-8 border-4 border-red-900 shadow-inner shadow-red-900">
      
      {/* Título Principal */}
      <h1 className="text-8xl font-black text-center mb-12 uppercase metal-mania-regular 
                     text-neon-red border-b border-red-900 pb-4" // Use uma classe customizada para o efeito de neon
      >
        Your Movies Watchlist
      </h1>

      {/* Botões de navegação - Estilo Painel de VCR/Terminal */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 p-4 bg-gray-900/50 border border-cyan-800 shadow-xl shadow-cyan-900/20">
        <button
          onClick={() => setCurrentView("all")}
          className={buttonStyle("all")}
        >
          All Movies
        </button>
        <button
          onClick={() => setCurrentView("watched")}
          className={buttonStyle("watched")}
        >
          Watched Movies
        </button>
        <button
          onClick={() => setCurrentView("notWatched")}
          className={buttonStyle("notWatched")}
        >
          Not Watched Movies
        </button>
        <button
          onClick={() => setCurrentView("rating")}
          className={buttonStyle("rating")}
        >
          Rating
        </button>
        <button
          onClick={() => setShowAddModal(true)}
          className={addButtonStyle}
        >
          + Add New Movie
        </button>
      </div>

      {/* 📄 Componentes de Conteúdo (Você precisará estilizar o card de filme aqui dentro!) */}
      <div key={reloadKey} className="mt-8">
        <h2 className="text-3xl text-center mb-6 text-cyan-400 font-mono uppercase tracking-widest">
          {currentView === "all" && "TODOS OS FILMES"}
          {currentView === "watched" && "VISTOS - CLASSIFICADOS"}
          {currentView === "notWatched" && "POR VER - A AGUARDAR"}
          {currentView === "rating" && "TOP RATINGS - A MAIS ASSUSTADORA"}
        </h2>
        
        {/* Renderização Condicional */}
        {currentView === "all" && <AllMovies onEdit={setEditMovie} />}
        {currentView === "watched" && <WatchedMovies key={reloadKey} />}
        {currentView === "notWatched" && <NotWatchedMovies key={reloadKey} />}
        {currentView === "rating" && <MoviesByRating key={reloadKey} />}
      </div>

      {/* Modal Add */}
      {showAddModal && <AddMovie onClose={() => setShowAddModal(false)} onAdded={handleAdded} />}

      {/* Modal Edit */}
      {editMovie && <EditMovie movie={editMovie} onClose={() => setEditMovie(null)} onUpdated={handleUpdated} />}
    </div>
  );
}