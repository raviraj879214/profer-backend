
const { PrismaClient } = require('@prisma/client'); 
const prisma = new PrismaClient(); 

async function logActivity(action, userId = null, meta = null) {
  try {
    await prisma.activityLog.create({
      data: {
        userId,
        action,
        meta
      }
    });
  } catch (err) {
    console.error('Error saving activity log:', err);
  }
}

module.exports = logActivity;
