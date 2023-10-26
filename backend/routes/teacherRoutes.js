const express = require('express');
const teacherController = require('../controllers/teacherController');

const router = express.Router();

router.get('/:teacherId/name', teacherController.getTeacherName);
router.get('/:teacherId', teacherController.getTeacherProfile);
router.get('/myStudents/:teacherId', teacherController.getMyStudents);
module.exports = router;
