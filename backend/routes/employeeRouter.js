const express = require('express');
const { createPersonal, updatePersonal } = require('../controllers/employeeContoller');
const router = express.Router();

router.post('/create-personal', createPersonal);
router.put('/update-personal/:_id', updatePersonal);




module.exports = router;