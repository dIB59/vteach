const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/sendMessage', authMiddleware.verifyToken, messageController.sendMessage);
router.get('/getMessages/:senderId/:receiverId', authMiddleware.verifyToken, messageController.getMessages);
router.get('/checkForNewMessages', authMiddleware.verifyToken, messageController.checkForNewMessages);

module.exports = router;
