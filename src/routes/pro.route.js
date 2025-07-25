const express = require('express');
const { createuserandsendotp, createcheckout, getprosuserdetails, updateprospaymentdetails, transfertempusertousertable, proslogin } = require('../controllers/pro.auth.controller');
const router = express.Router();




router.post('/create-user-and-send-otp',createuserandsendotp);

router.post('/create-checkout',createcheckout);

router.get('/get-pros-details/:emailaddress', getprosuserdetails);


router.post('/update-pros-payment-details',updateprospaymentdetails);

router.post('/activate-user-tempuser', transfertempusertousertable);


router.post('/pro-login',proslogin);



module.exports = router;
