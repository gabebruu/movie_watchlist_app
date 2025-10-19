// a pasta models é para definir os esquemas e modelos de dados
// o arquivo Movie.js define o modelo de dados para os filmes

import mongoose from 'mongoose';

const { Schema, model, models } = mongoose; // Desestruturação para facilitar o uso

const movieSchema = new Schema({ // Define o esquema do filme, com campos e tipos, validações
  title: {
    type: String,
    required: true,
},
  year: {
    type: Number,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  watched: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    min: 1,
    max: 10,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default models.Movie || model('Movie', movieSchema);