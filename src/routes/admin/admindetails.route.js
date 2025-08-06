
const express = require('express');
const { getuserdetailsbyid, updateuserdetails, updateuserpassword } = require('../../controllers/admin/admindetails.controller');
const router = express.Router();
const { authenticate } = require('../../middlewares/auth.middleware');




router.get('/get-user-details/:id',authenticate,getuserdetailsbyid);

router.post('/update-user-details',authenticate,updateuserdetails);


router.post('/update-user-password',authenticate,updateuserpassword);


module.exports = router;