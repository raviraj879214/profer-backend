
const express = require("express");
const { getproprofiledetails, updateprosprofile, getprosbusinesssocialmedia, updatesocialmedialinks } = require("../../controllers/pros/profile.controller");
const {authenticate} = require("../../middlewares/auth.middleware");
const router = express.Router();




router.get('/pros-get-details/:userid',authenticate,getproprofiledetails);

router.post('/pros-update-profile',authenticate,updateprosprofile);

router.get('/get-social-links-business/:userid',authenticate,getprosbusinesssocialmedia);

router.post('/update-social-media-links',authenticate,updatesocialmedialinks);

module.exports = router;