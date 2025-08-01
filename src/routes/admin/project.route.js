

const express = require("express");
const { getProjectlist, createProject, getcompanyinformation, getbidlist, projectupdatestatus, deleteprojectlist } = require("../../controllers/admin/createproject.controller");
const router = express.Router();

const createMulterUpload = require('../../lib/uploadHelper');
const upload = createMulterUpload('uploads/roofing');

const { authenticate } = require('../../middlewares/auth.middleware');



router.get('/get-project-list',authenticate ,getProjectlist);

router.get('/get-company-list',authenticate,getcompanyinformation);



router.post(
  "/create-project",
  upload.fields([
    { name: "drawings", maxCount: 1 },
    { name: "insurance", maxCount: 1 },
    { name: "projectother", maxCount: 1 },
    { name: "mediaFiles", maxCount: 10 } // multiple files
  ]),authenticate,createProject);


  
  router.post('/get-bid-list',authenticate,getbidlist);

  router.post('/update-project-status',authenticate,projectupdatestatus);

  router.delete('/delete-project-list/:id',authenticate,deleteprojectlist);







module.exports = router;