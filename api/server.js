try {
  const serverless = require('serverless-http');
  const app = require('../src/app');

  module.exports = serverless(app);
} catch (err) {
  console.error("Startup error:", err);
  throw err;
}
