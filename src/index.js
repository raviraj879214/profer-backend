const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const server = require('./app');  // <-- Now importing server with Express + Socket.IO

const port = process.env.PORT || 8000;

async function startServer() {
  try {
    // Test DB connection first
    await prisma.$connect();
    console.log('✅ Prisma connected to MySQL successfully');

    // Start the HTTP server (with Socket.IO)
    server.listen(port, () => {
      console.log(`🚀 Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('❌ Failed to connect to MySQL via Prisma:', err.message);
    process.exit(1);
  }
}

startServer();
