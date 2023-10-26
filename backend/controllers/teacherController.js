const Session = require('../models/session');
const Teacher = require('../models/teacher');
const User = require('../models/user');
const Student = require('../models/student');

const getTeacherName = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await Teacher.findOne({ user: teacherId }).populate('user');
        console.log(teacherId)
        console.log( teacher)
        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        const { firstName, lastName } = teacher.user;
        const fullName = `${firstName} ${lastName}`;

        res.json({ fullName });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
const getTeacherProfile = async (req, res) => {
    try {
        const teacherId = req.params.teacherId;
        const teacher = await Teacher.find({ user: teacherId }).populate('user');

        if (!teacher) {
            return res.status(404).json({ message: 'Teacher not found' });
        }

        res.json(teacher);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

const getMyStudents = async (req, res) => {
    try {
      const { teacherId } = req.params;
  
      // Find the teacher
      const teacher = await Teacher.findById(teacherId);
  
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // Find sessions for the teacher
      const sessions = await Session.find({ teacher: teacherId });
  
      const studentsData = [];
  
      // Loop through sessions
      for (const session of sessions) {
        const sessionData = {
          subject: session.subject,
          startTime: session.startTime,
          endTime: session.endTime,
          students: [],
        };
  
        // Loop through students of the session
        for (const studentId of session.students) {
          const student = await Student.findById(studentId).populate('user', ['firstName', 'lastName', 'email', 'profilePicture', 'contactInformation']);
  
          if (student) {
            sessionData.students.push({
              firstName: student.user.firstName,
              lastName: student.user.lastName,
              email: student.user.email,
              profilePicture: student.user.profilePicture,
              contactInformation: student.user.contactInformation,
            });
          }
        }
  
        studentsData.push(sessionData);
      }
  
      res.status(200).json({ studentsData });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  
module.exports = {
    getTeacherName,
    getTeacherProfile,
    getMyStudents,
};
