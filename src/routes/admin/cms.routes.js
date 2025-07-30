

const express = require('express');
const { getcmpages, updatecmspage } = require('../../controllers/admin/cms.controller');
const { authenticate } = require('../../middlewares/auth.middleware');
const router  = express.Router();


router.get('/get-cms-pages',authenticate,getcmpages);


router.post('/update-cms-page',authenticate,updatecmspage);



module.exports = router;