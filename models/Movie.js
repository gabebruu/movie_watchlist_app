// a pasta models é para definir os esquemas e modelos de dados
// o arquivo Movie.js define o modelo de dados para os filmes
// o schema define a estrutura dos documentos na coleção de filmes no MongoDB, por exemplo, os campos e seus tipos de dados

import mongoose from 'mongoose'; // import obrigatório para usar o mongoose

const { Schema, model, models } = mongoose; 

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

export default models.Movie || model('Movie', movieSchema); // Exporta o modelo Movie, reutilizando se já estiver definido para evitar redefinições

// Aqui nesse arquivo define o modelo Movie para o MongoDB usando o Mongoose.
// O schema especifica os campos que cada documento de filme terá, incluindo título, ano, gênero, status de assistido, avaliação e data de criação.
// O modelo é então exportado para ser usado em outras partes da aplicação para interagir com a coleção de filmes no banco de dados.
// Ele facilita a criação, leitura, atualização e exclusão de documentos de filmes no MongoDB.