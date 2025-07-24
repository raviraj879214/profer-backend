const express = require('express');
const { createRoofingRequest, getRoofingRequests, deleteRoofingRequest } = require('../controllers/roofingrequest.controller');
const createMulterUpload = require('../lib/uploadHelper');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

const upload = createMulterUpload('uploads/roofing');

// Handle form + photo uploads
router.post('/create-roof-request', upload.array("photos", 5), createRoofingRequest);


router.get('/get-roofing-requests',authenticate, getRoofingRequests);
 

router.delete('/delete-roofing-request/:id',authenticate,deleteRoofingRequest);




module.exports = router;
