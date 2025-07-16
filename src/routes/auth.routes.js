const express = require('express');
const router = express.Router();
const { register, login, adminforgotpassword, resetpasswordconfirmation } = require('../controllers/auth.controller');
const { checkPermission } = require('../lib/prisma');





router.post('/register', register);
router.post('/login', login);

router.post('/admin-forgot-password',adminforgotpassword);

router.post('/reset-confirmation',resetpasswordconfirmation);



module.exports = router;


