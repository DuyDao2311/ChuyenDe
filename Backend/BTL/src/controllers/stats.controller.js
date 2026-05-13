const Book = require('../models/book.model');
const Reader = require('../models/reader.model');
const asyncHandler = require('../utils/asyncHandler');

const getStats = asyncHandler(async (req, res) => {
  const [bookCount, readerCount] = await Promise.all([
    Book.countDocuments({}),
    Reader.countDocuments({}),
  ]);

  res.json({
    books: bookCount,
    readers: readerCount,
  });
});

module.exports = { getStats };

