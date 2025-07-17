const express = require('express');
const app = require('./app'); // app already includes middleware + routes


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
