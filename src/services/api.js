// aqui ficam as chamadas à API, que é quando o front-end se comunica com o back-end para buscar ou enviar dados.

const API_URL = "/api/movies"; // rota relativa, não usa localhost

export const getAllMovies = async () => { // Busca todos os filmes
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar filmes");
  return res.json();
};

export const getWatchedMovies = async () => { // Busca filmes já assistidos
  const res = await fetch(`${API_URL}?watched=true`);
  if (!res.ok) throw new Error("ERROR: Failed to load watched movies");
  return res.json();
};

export const getNotWatchedMovies = async () => { // Busca filmes não assistidos
  const res = await fetch(`${API_URL}?watched=false`);
  if (!res.ok) throw new Error("ERROR: Failed to load movies to watch");
  return res.json();
};

export const getMoviesByRating = async () => { // Busca filmes ordenados por avaliação
  const res = await fetch(`${API_URL}?sortBy=rating&order=desc`);
  if (!res.ok) throw new Error("Erro ao ordenar filmes");
  return res.json();
};

export const addMovie = async (movieData) => { // Adiciona um novo filme
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Erro ao adicionar filme");
  return res.json();
};

export const updateMovie = async (id, updatedData) => { // Atualiza um filme existente
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Error updating movie");
  return res.json();
};

export const deleteMovie = async (id) => { // Apaga um filme existente
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao apagar filme");
  return res.json();
};
