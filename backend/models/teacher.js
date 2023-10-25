const mongoose = require('mongoose');

const teacherSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  educationalCredentials: {
    type: String,
    required: true,
  },
  subjectsTaught: [String],
  availableTimeSlots: [String],
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student',
  }],
  sessions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session'
}],
});

module.exports = mongoose.model('Teacher', teacherSchema);
