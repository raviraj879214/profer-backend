const express = require('express');
const router = express.Router();

const { authenticate } = require('../middlewares/auth.middleware');
const { testProtected } = require('../controllers/user.controller');



router.get('/protected-check',authenticate,testProtected);



module.exports = router;