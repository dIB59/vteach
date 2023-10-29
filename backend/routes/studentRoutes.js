const express = require('express');
const studentController = require('../controllers/studentController');

const router = express.Router();



router.get('/getMySessions/:studentId', studentController.getMySessions);

router.get('/getSpecificStudent/:studentId', studentController.getSpecificStudent);

router.get('/getAllStudents', studentController.getAllStudents);

router.put('/updateProfile/:studentId', studentController.updateProfile);

router.get('/getMyTeachers/:studentId', studentController.getMyTeachers);

router.get('/getAllTeachers', studentController.getAllTeachers);
module.exports = router;