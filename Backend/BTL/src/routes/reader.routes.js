const { Router } = require('express');
const {
  getReaders,
  getReaderById,
  createReader,
  updateReader,
  deleteReader,
} = require('../controllers/reader.controller');

const router = Router();

router.route('/').get(getReaders).post(createReader);
router.route('/:id').get(getReaderById).put(updateReader).delete(deleteReader);

module.exports = router;

