const express = require('express');
const userController = require('../controllers/userController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

router.put('/updateCredentials/:userId', userController.updateCredentials);

module.exports = router;
