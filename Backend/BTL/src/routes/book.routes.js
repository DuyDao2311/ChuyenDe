const { Router } = require('express');
const {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/book.controller');

const router = Router();

router.route('/').get(getBooks).post(createBook);
router.route('/:id').get(getBookById).put(updateBook).delete(deleteBook);

module.exports = router;

