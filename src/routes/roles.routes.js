const express = require('express');
const { getRoles, rolesname, updatepermission } = require('../controllers/roles.controller');


const router = express.Router();




router.get('/get-roles',getRoles);
router.get('/get-roles-name',rolesname)
router.put('/update-permission',updatepermission)


module.exports = router;