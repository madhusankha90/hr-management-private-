const express = require('express');
const { punchOut } = require('../controllers/dashboardController');
const router = express.Router();

router.post('/punch-out', punchOut);

module.exports = router;