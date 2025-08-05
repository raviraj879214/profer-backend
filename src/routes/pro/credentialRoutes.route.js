const express = require("express");
const router = express.Router();


const createMulterUpload = require("../../lib/uploadHelper");

const { createCredentials, getCredentials, deleteCredential } = require("../../controllers/pros/credential.controller");

const {authenticate} = require("../../middlewares/auth.middleware");


// Upload folder (separate for credentials)
const upload = createMulterUpload("uploads/credentials");

// Route to create credentials (multiple docs)
router.post(
  "/create-credentials",
 authenticate,
  upload.array("documents", 10), // "documents" field name
  createCredentials
);

router.get("/get-credentials", authenticate, getCredentials);
router.delete('/delete-credential/:id', authenticate, deleteCredential);

module.exports = router;
