

const express = require('express');
const router = express.Router();

const { testPublic, testProtected, sendWelcomeEmail } = require('../controllers/user.controller');
const { authenticate } = require('../middlewares/auth.middleware');
const { checkPermission } = require('../lib/prisma');


router.get('/public',authenticate,checkPermission('Orders','Read'),testPublic);



router.get('/protected',authenticate,testProtected);



router.post("/send-welcome", sendWelcomeEmail);



module.exports = router;
