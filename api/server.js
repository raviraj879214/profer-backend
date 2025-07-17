const serverless = require('serverless-http');
const app = require('../src/app'); // ✅ path to your app.js



module.exports = serverless(app);
