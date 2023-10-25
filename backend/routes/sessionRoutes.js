const express = require('express');
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware.verifyToken, sessionController.createSession);

router.get('/availableSessions', sessionController.getAvailableSessions);

router.post('/joinSession/:sessionId', sessionController.joinSession);

module.exports = router;
