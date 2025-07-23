const express = require('express');
const { createRoofingRequest, getRoofingRequests } = require('../controllers/roofingrequest.controller');
const createMulterUpload = require('../lib/uploadHelper');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

const upload = createMulterUpload('uploads/roofing');

// Handle form + photo uploads
router.post('/create-roof-request', upload.array("photos", 5), createRoofingRequest);


router.get('/get-roofing-requests',authenticate, getRoofingRequests);
 





module.exports = router;
