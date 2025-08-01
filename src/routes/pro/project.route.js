
const  express = require("express");
const { getprojectdetailsbyprosid, makebidbypro } = require("../../controllers/pros/project.controller");
const router = express.Router();
const {authenticate} = require("../../middlewares/auth.middleware");




router.get('/get-project-details/:id',authenticate,getprojectdetailsbyprosid);


router.post('/create-bid',authenticate,makebidbypro);





module.exports = router;