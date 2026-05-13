const Book = require('../models/book.model');
const asyncHandler = require('../utils/asyncHandler');

const getBooks = asyncHandler(async (req, res) => {
  const books = await Book.find({});
  res.json(books);
});

const getBookById = asyncHandler(async (req, res) => {
  const book = await Book.findById(req.params.id);
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  res.json(book);
});

const createBook = asyncHandler(async (req, res) => {
  const book = await Book.create(req.body);
  res.status(201).json(book);
});

const updateBook = asyncHandler(async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!book) {
    res.status(404);
    throw new Error('Book not found');
  }
  res.json(book);
});

const deleteBook = asyncHandler(async (req, res) => {
  const deleted = await Book.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error('Book not found');
  }
  res.status(204).send();
});

module.exports = {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
};

