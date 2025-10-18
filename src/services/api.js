const API_URL = "/api/movies"; // rota relativa, não usa localhost

export const getAllMovies = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Erro ao buscar filmes");
  return res.json();
};

export const getWatchedMovies = async () => {
  const res = await fetch(`${API_URL}?watched=true`);
  if (!res.ok) throw new Error("Erro ao buscar filmes vistos");
  return res.json();
};

export const getNotWatchedMovies = async () => {
  const res = await fetch(`${API_URL}?watched=false`);
  if (!res.ok) throw new Error("Erro ao buscar filmes por ver");
  return res.json();
};

export const getMoviesByRating = async () => {
  const res = await fetch(`${API_URL}?sortBy=rating&order=desc`);
  if (!res.ok) throw new Error("Erro ao ordenar filmes");
  return res.json();
};

export const addMovie = async (movieData) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movieData),
  });
  if (!res.ok) throw new Error("Erro ao adicionar filme");
  return res.json();
};

export const updateMovie = async (id, updatedData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(updatedData),
  });
  if (!res.ok) throw new Error("Erro ao atualizar filme");
  return res.json();
};

export const deleteMovie = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Erro ao apagar filme");
  return res.json();
};
