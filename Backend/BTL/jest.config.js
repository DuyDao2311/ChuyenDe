module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.spec.js'],
  collectCoverageFrom: ['src/**/*.js', '!src/server.js'],
};

