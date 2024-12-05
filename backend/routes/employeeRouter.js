const express = require('express');
const { getPersonal, createPersonal, updatePersonal, createEmergency, getEmergency, createJob, getJob, createContact, updateContact, getContact, updateEmergency, deleteEmergency, updateJob, deleteJob } = require('../controllers/myInfoContoller');
const { upload } = require('../controllers/profilePicController');


const router = express.Router();

router.post('/create-personal/:employeeId', createPersonal);
router.put('/update-personal/:employeeId', updatePersonal);
router.get('/get-personal', getPersonal);

router.post('/create-emergency', createEmergency);
router.put('/update-emergency/:_id', updateEmergency)
router.get('/get-emergency', getEmergency);
router.delete('/delete-emergency/:_id', deleteEmergency);

router.post('/create-job', createJob);
router.put('/update-job/:_id', updateJob);
router.get('/get-job', getJob);
router.delete('/delete-job/:_id', deleteJob);

router.post('/create-contact', createContact);
router.put('/update-contact', updateContact);
router.get('/get-contact', getContact);



module.exports = router;