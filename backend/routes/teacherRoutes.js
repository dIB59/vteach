const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.get('/:teacherId/name', teacherController.getTeacherName);
router.get('/:teacherId', teacherController.getTeacherProfile);
router.get('/myStudents/:teacherId', teacherController.getMyStudents);
router.put('/updateProfile/:teacherId', teacherController.updateProfile);
router.get('/session/:teacherId/:sessionId', teacherController.getSpecificSessionAndStudents);


module.exports = router;
