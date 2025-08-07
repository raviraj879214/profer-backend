const express = require("express");
const router = express.Router();
const notificationController = require("../../controllers/notificationController");;

// Existing (if any)
router.get("/all", notificationController.getAllNotifications); // New route

module.exports = router;
