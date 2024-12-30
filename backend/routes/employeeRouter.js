const express = require('express');
const { getPersonal, createPersonal, updatePersonal, createEmergency, getEmergency, createJob, getJob, createContact, updateContact, getContact, updateEmergency, deleteEmergency, updateJob, deleteJob } = require('../controllers/myInfoContoller');
const { upload } = require('../controllers/profilePicController');
const { createWorkExperience, updateWorkExperience, getWorkExperience, deleteWorkExperience, createEduExperience, updateEduExperience, getEduExperience, deleteEduExperience, createLanguage, updateLanguage, getLanguage, deleteLanguage } = require('../controllers/qualificationController');


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

router.post('/create-work', createWorkExperience);
router.put('/update-work/:_id', updateWorkExperience);
router.get('/get-work', getWorkExperience);
router.delete('/delete-work/:_id', deleteWorkExperience);

router.post('/create-edu', createEduExperience);
router.put('/update-edu/:_id', updateEduExperience);
router.get('/get-edu', getEduExperience);
router.delete('/delete-edu/:_id', deleteEduExperience);

router.post('/create-lang', createLanguage);
router.put('/update-lang/:_id', updateLanguage);
router.get('/get-lang', getLanguage);
router.delete('/delete-lang/:_id', deleteLanguage);


module.exports = router;