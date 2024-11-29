const express = require('express');
const { createPersonal, updatePersonal, createEmergency, getEmergency, createJob, getJob, getPersonal, createContact, updateContact, getContact } = require('../controllers/employeeContoller');
const router = express.Router();

router.get('/get-personal', getPersonal);
router.post('/create-personal/:employeeId', createPersonal);
router.put('/update-personal/:employeeId', updatePersonal);

router.post('/create-emergency', createEmergency);
router.get('/get-emergency', getEmergency);

router.post('/create-job', createJob);
router.get('/get-job', getJob);

router.post('/create-contact', createContact);
router.put('/update-contact', updateContact);
router.get('/get-contact', getContact);



module.exports = router;