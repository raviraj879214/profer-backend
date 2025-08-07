const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

let ioInstance;

function initializeIO(io) {
  ioInstance = io;
}

async function sendFormSubmissionNotification({ title, message }) {
  const fullMessage = `Title: ${title}, Message: ${message}`;

  // Save to database
  await prisma.notification.create({
    data: {
      title,
      message,
    },
  });

  // Broadcast over WebSocket
  if (ioInstance) {
    ioInstance.emit("newNotification", { message: fullMessage });
  }
}

async function getAllNotifications(req, res) {
  try {
    const notifications = await prisma.notification.findMany({
      orderBy: { createdAt: 'desc' }, // Optional: show latest first
    });
    res.json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).json({ message: "Failed to fetch notifications" });
  }
}

module.exports = {
  initializeIO,
  sendFormSubmissionNotification,
  getAllNotifications,
};
