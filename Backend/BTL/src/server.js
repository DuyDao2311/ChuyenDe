require('dotenv').config();

const app = require('./app');
const { connectDB } = require('./config/database');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || '';

const startServer = async () => {
  try {
    await connectDB(MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`Server ready on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Database connection failed', error);
    process.exit(1);
  }
};

startServer();

module.exports = { startServer };

