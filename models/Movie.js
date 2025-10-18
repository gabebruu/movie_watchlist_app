import mongoose from 'mongoose';

const { Schema, model, models } = mongoose;

const movieSchema = new Schema({
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