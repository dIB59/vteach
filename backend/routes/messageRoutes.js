const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.post('/sendMessage', messageController.sendMessage);
router.get('/getMessages/:senderId/:receiverId', messageController.getMessages);

module.exports = router;
