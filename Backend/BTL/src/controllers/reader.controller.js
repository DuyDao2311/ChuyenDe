const Reader = require('../models/reader.model');
const asyncHandler = require('../utils/asyncHandler');

const getReaders = asyncHandler(async (req, res) => {
  const readers = await Reader.find({});
  res.json(readers);
});

const getReaderById = asyncHandler(async (req, res) => {
  const reader = await Reader.findById(req.params.id);
  if (!reader) {
    res.status(404);
    throw new Error('Reader not found');
  }
  res.json(reader);
});

const createReader = asyncHandler(async (req, res) => {
  const reader = await Reader.create(req.body);
  res.status(201).json(reader);
});

const updateReader = asyncHandler(async (req, res) => {
  const reader = await Reader.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!reader) {
    res.status(404);
    throw new Error('Reader not found');
  }
  res.json(reader);
});

const deleteReader = asyncHandler(async (req, res) => {
  const deleted = await Reader.findByIdAndDelete(req.params.id);
  if (!deleted) {
    res.status(404);
    throw new Error('Reader not found');
  }
  res.status(204).send();
});

module.exports = {
  getReaders,
  getReaderById,
  createReader,
  updateReader,
  deleteReader,
};

