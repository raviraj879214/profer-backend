const express = require('express');
const { createRoofingRequest, getRoofingRequests, deleteRoofingRequest } = require('../controllers/roofingrequest.controller');

const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

const createMulterUpload = require('../lib/uploadHelper');
const upload = createMulterUpload('uploads/roofing');




router.post(
  "/create-roof-request",
  upload.fields([
    { name: "drawings", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "projectother", maxCount: 1 },
    { name: "mediaFiles", maxCount: 10 } // multiple files
  ]),
  createRoofingRequest
);








router.get('/get-roofing-requests',authenticate, getRoofingRequests);
 

router.delete('/delete-roofing-request/:id',authenticate,deleteRoofingRequest);




module.exports = router;
