const express = require('express');
const studentController = require('../controllers/studentController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();



router.get('/getMySessions/:studentId', authMiddleware.verifyToken, studentController.getMySessions);

router.get('/getSpecificStudent/:studentId', authMiddleware.verifyToken, studentController.getSpecificStudent);

router.get('/getAllStudents', authMiddleware.verifyToken, studentController.getAllStudents);

router.put('/updateProfile/:studentId', authMiddleware.verifyToken, studentController.updateProfile);

router.get('/getMyTeachers/:studentId', authMiddleware.verifyToken, studentController.getMyTeachers);

router.get('/getAllTeachers', authMiddleware.verifyToken, studentController.getAllTeachers);
module.exports = router;