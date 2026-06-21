const express = require('express');
const router = express.Router();
const queueController = require('../controllers/queueController');

router.post('/add', queueController.addPatient);
router.post('/next', queueController.callNextPatient);
router.get('/state/:clinicId', queueController.getQueueState);

// ADD THIS:
router.get('/verify/:code', queueController.verifyAccessCode);

module.exports = router;