const { Schema, model } = require('mongoose');

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
    },
    genre: {
      type: String,
      default: 'General',
      trim: true,
    },
    price: {
      type: Number,
      default: 0,
      min: 0,
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    publishedYear: {
      type: Number,
    },
    summary: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

const Book = model('Book', bookSchema);

module.exports = Book;

