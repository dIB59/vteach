const Session = require('../models/session');
const Teacher = require('../models/teacher');
const User = require('../models/user');
const Student = require('../models/student');

const createSession = async (req, res) => {
  try {
    const { teacherId, startTime, endTime, status, paymentStatus, subject, sessionPrice } = req.body;

    // Find the teacher
    const teacher = await Teacher.findById(teacherId);
    
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Find the user associated with the teacher
    const user = await User.findById(teacher.user);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Create session with teacherName extracted from user info
    const session = await Session.create({
      teacher: teacherId,
      teacherName: `${user.firstName} ${user.lastName}`,
      students: [],
      startTime,
      endTime,
      status,
      paymentStatus,
      subject,
      sessionPrice,
    });

    // Add session to teacher's sessions array
    teacher.sessions.push(session._id);
    
    // Check if subject already exists in subjectsTaught
    if (!teacher.subjectsTaught.includes(subject)) {
        teacher.subjectsTaught.push(subject);
      }
  
      // Check if time slot already exists in availableTimeSlots
      const timeSlot = `${startTime}-${endTime}`;
      if (!teacher.availableTimeSlots.includes(timeSlot)) {
        teacher.availableTimeSlots.push(timeSlot);
      }

      await teacher.save();
    return res.status(201).json({ message: 'Session created successfully', session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAvailableSessions = async (req, res) => {
  try {
    // Find sessions that are not already booked
    const availableSessions = await Session.find({ status: 'scheduled' });

    res.status(200).json({ sessions: availableSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const joinSession = async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { studentId } = req.body;
  
      // Find the session
      const session = await Session.findById(sessionId);
  
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
      
      if (session.status !== 'scheduled') {
        return res.status(400).json({ message: 'Cannot join a completed or canceled session' });
      }

      // Find the student
      const student = await Student.findById(studentId);
  
      if (!student) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Check if the session is already booked
      if (session.students.includes(studentId)) {
        return res.status(400).json({ message: 'Student is already booked for this session' });
      }
  
      // Find the teacher associated with the session
      const teacher = await Teacher.findById(session.teacher);
  
      // Add student to the session's students array
      session.students.push(studentId);
  
      // Add teacherId to student
      student.teachers.push(teacher._id);
  
      // Add session to student's sessions array
      student.sessions.push(sessionId);
  
      // Add studentId to teacher
      teacher.students.push(studentId);
  
      // Save changes
      await session.save();
      await student.save();
      await teacher.save();
  
      res.status(200).json({ message: 'Student joined session successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  

  const updateSession = async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { teacherId, startTime, endTime, status, paymentStatus, subject, sessionPrice } = req.body;
  
      // Find the session
      const session = await Session.findById(sessionId);
  
      if (!session) {
        return res.status(404).json({ message: 'Session not found' });
      }
  
      // Check if the teacher is the creator of the session
      if (session.teacher.toString() !== teacherId) {
        return res.status(403).json({ message: 'You are not authorized to update this session' });
      }
  
      // Update session details
      session.startTime = startTime || session.startTime;
      session.endTime = endTime || session.endTime;
      session.status = status || session.status;
      session.paymentStatus = paymentStatus || session.paymentStatus;
      session.subject = subject || session.subject;
      session.sessionPrice = sessionPrice || session.sessionPrice;
  
      await session.save();
  
      res.status(200).json({ message: 'Session updated successfully', session });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
module.exports = {
    createSession,
    getAvailableSessions,
    joinSession,
    updateSession,
};
