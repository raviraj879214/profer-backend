
const express = require('express');
const {authenticate} = require("../../middlewares/auth.middleware");
const { getbusinessdetails } = require('../../controllers/pros/business.controller');
const router = express.Router();




router.get('/get-business-details/:UserID',authenticate,getbusinessdetails);





module.exports = router;

