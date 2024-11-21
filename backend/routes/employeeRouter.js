const express = require('express');
const { createPersonal, updatePersonal, createEmergency, getEmergency, createJob, getJob } = require('../controllers/employeeContoller');
const router = express.Router();

router.post('/create-personal', createPersonal);
router.put('/update-personal/:_id', updatePersonal);

router.post('/create-emergency', createEmergency);
router.get('/get-emergency', getEmergency);

router.post('/create-job', createJob);
router.get('/get-job', getJob);




module.exports = router;