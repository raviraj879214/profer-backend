

const express = require('express');
const { getlogging } = require('../controllers/logging.controller');
const router = express.Router();
const { authenticate } = require('../middlewares/auth.middleware');


router.get('/get-activity-log',authenticate,getlogging);




module.exports = router;