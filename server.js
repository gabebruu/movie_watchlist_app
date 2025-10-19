import express from "express";
import next from "next";
import Movie from "./models/Movie.js";
import connectDB from "./lib/mongodb.js";


const dev = process.env.NODE_ENV !== "production"; // Verifica se está em modo de desenvolvimento, ou seja, não produção
const app = next({ dev }); // Inicializa o Next.js
const handle = app.getRequestHandler(); // Manipulador de requisições do Next.js
const PORT = process.env.PORT || 3001; // Porta do servidor

app.prepare().then(() => {
  const server = express();
  server.use(express.json());

  // Conecta ao MongoDB
  connectDB();

  // =======================
  //  API ROUTES
  // =======================

  // GET /api/movies - edpoint para buscar filmes
  server.get("/api/movies", async (req, res) => {
    try {
      const { watched, sortBy, order } = req.query;
      const filter = {};

      if (watched === "true") filter.watched = true;
      if (watched === "false") filter.watched = false;

      let sort = {};
      if (sortBy) {
        const direction = order === "desc" ? -1 : 1;
        sort[sortBy] = direction;
      }

      const movies = await Movie.find(filter).sort(sort);
      res.status(200).json(movies);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao buscar filmes", error: err.message });
    }
  });

  // POST /api/movies - edpoint para adicionar um novo filme
  server.post("/api/movies", async (req, res) => {
    try {
      const { title, year, genre, watched, rating } = req.body;

      const newMovie = new Movie({
        title,
        year,
        genre,
        watched,
        rating,
        createdAt: new Date(),
      });

      const saved = await newMovie.save();
      res.status(201).json(saved);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Erro ao adicionar filme", error: err.message });
    }
  });

  // PUT /api/movies/:id - edpoint para atualizar um filme existente
  server.put("/api/movies/:id", async (req, res) => {
    try {
      const updated = await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!updated) return res.status(404).json({ message: "Filme não encontrado" });
      res.status(200).json(updated);
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: "Erro ao atualizar filme", error: err.message });
    }
  });

  // DELETE /api/movies/:id - edpoint para apagar um filme existente
  server.delete("/api/movies/:id", async (req, res) => {
    try {
      const deleted = await Movie.findByIdAndDelete(req.params.id);
      if (!deleted) return res.status(404).json({ message: "Filme não encontrado" });
      res.status(200).json({ message: "Filme removido com sucesso" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Erro ao apagar filme", error: err.message });
    }
  });

  // =======================
  // NEXT HANDLER
  // =======================
  server.all(/(.*)/, (req, res) => handle(req, res)); // Lida com todas as outras rotas com Next.js

  // Inicia o servidor

  server.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
  });
});
