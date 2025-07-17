const express = require('express');
const app = require('./app'); // your express app
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const port = process.env.PORT || 8000;

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log('✅ Prisma connected to MySQL successfully');

    // Start Express server only if DB is connected
    app.listen(port, () => {
      console.log(`🚀 Server running on ${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MySQL via Prisma:', err.message);
    process.exit(1); // Exit if DB connection fails
  }
}

startServer();
