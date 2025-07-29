const express = require('express');
const { authenticate } = require('../../middlewares/auth.middleware');
const { getcompaniesregistrationbystatus, approvecompanies, blockcompanies, unblockcompanies } = require('../../controllers/admin/comapnies.controller');
const router = express.Router();



router.get('/get-companies-list/:status',authenticate,getcompaniesregistrationbystatus);



router.post('/approve-companies/:id',authenticate,approvecompanies);


router.post('/block-companies/:id',authenticate,blockcompanies);


router.post('/un-block-companies/:id',authenticate,unblockcompanies);






module.exports = router;

