const express = require('express');
const { authenticate } = require('../middlewares/auth.middleware');
const router = express.Router();

const createMulterUpload = require('../lib/uploadHelper');
const { createprosBusinessRequest, getProsBusinessRequest } = require('../controllers/pro.business.controller');
const upload = createMulterUpload('uploads/prosbusiness');

// POST: Create/Update business details
router.post(
  '/create-pros-business-request',
  upload.fields([
    { name: "companyLogo", maxCount: 1 },
    { name: "ownerLicense", maxCount: 1 }
  ]),
  // authenticate,  // uncomment if auth required
  createprosBusinessRequest
);

// GET: Fetch business details by userId
router.get('/create-pros-business-request/:userId', getProsBusinessRequest);









module.exports = router;
