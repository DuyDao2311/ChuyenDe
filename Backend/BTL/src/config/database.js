const mongoose = require('mongoose');

const connectDB = async (mongoUri) => {
  if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined');
  }

  mongoose.set('strictQuery', true);

  await mongoose.connect(mongoUri);
};

module.exports = { connectDB };

