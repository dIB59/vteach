const express = require('express');
const teacherController = require('../controllers/teacherController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/:teacherId/name', teacherController.getTeacherName);
router.get('/:teacherId', teacherController.getTeacherProfile);
router.get('/myStudents/:teacherId', authMiddleware.verifyToken, teacherController.getMyStudents);
router.put('/updateProfile/:teacherId', authMiddleware.verifyToken, teacherController.updateProfile);
router.get('/session/:teacherId/:sessionId', authMiddleware.verifyToken, teacherController.getSpecificSessionAndStudents);


module.exports = router;
