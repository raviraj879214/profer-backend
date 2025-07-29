const express = require('express');
const router = express.Router();
const { register, login, adminforgotpassword, resetpasswordconfirmation, resetpassword } = require('../controllers/auth.controller');
const { checkPermission } = require('../lib/prisma');





router.post('/register', register);
router.post('/login', login);

router.post('/admin-forgot-password',adminforgotpassword);

router.post('/reset-confirmation',resetpasswordconfirmation);

router.post('/reset-password',resetpassword);



module.exports = router;


