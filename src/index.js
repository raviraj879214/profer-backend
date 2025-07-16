const express = require('express');
const app = require('./app'); // app already includes middleware + routes
const PORT = 8000;

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
