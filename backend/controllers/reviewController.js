const Review = require('../models/review');
const Teacher = require('../models/teacher');

const addReview = async (req, res) => {
  try {
    const { studentId, teacherId, rating, comment } = req.body;

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacherId);
    console.log(teacher)
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }

    // Create a new review
    const review = new Review({
      student: studentId,
      teacher: teacherId,
      rating: rating,
      comment: comment,
    });

    await review.save();

    res.status(200).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getTeacherReviews = async (req, res) => {
    try {
      const { teacherId } = req.params;
  
      const reviews = await Review.find({ teacher: teacherId });
  
      res.status(200).json({ reviews });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  };
  
  module.exports = {
    addReview,
    getTeacherReviews,
  };
