# BTL Backend API

Node/Express + MongoDB skeleton for the library tasks:

- CRUD API for `Book` and `Reader`
- Simple statistics endpoint (total books/readers)
- Ready for Postman testing and future automation

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```
2. **Environment variables**
   - Copy `env.example` to `.env`
   - Update `MONGODB_URI` if needed
3. **Run locally**
   ```bash
   npm run dev
   ```
4. **Tests**
   ```bash
   npm test
   ```

## Project Structure

- `src/app.js`: Express app + middleware
- `src/server.js`: Boots server & DB
- `src/config/database.js`: Mongoose connection helper
- `src/models`: Book & Reader schemas
- `src/controllers`: CRUD + stats logic
- `src/routes`: REST routers mounted under `/api`
- `tests/`: Jest + Supertest examples

Extend controllers/routes with validation, auth, and Postman collections as you build the remaining features.

