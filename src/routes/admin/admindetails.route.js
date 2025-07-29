
const express = require('express');
const { getuserdetailsbyid, updateuserdetails, updateuserpassword } = require('../../controllers/admin/admindetails.controller');
const router = express.Router();





router.get('/get-user-details/:id',getuserdetailsbyid);

router.post('/update-user-details',updateuserdetails);


router.post('/update-user-password',updateuserpassword);


module.exports = router;