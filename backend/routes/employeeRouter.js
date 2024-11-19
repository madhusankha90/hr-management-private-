const express = require('express');
const { createPersonal, updatePersonal, createEmergency, getEmergency } = require('../controllers/employeeContoller');
const router = express.Router();

router.post('/create-personal', createPersonal);
router.put('/update-personal/:_id', updatePersonal);

router.post('/create-emergency', createEmergency);
router.get('/get-emergency', getEmergency);




module.exports = router;