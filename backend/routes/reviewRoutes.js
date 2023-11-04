const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const authMiddleware = require('../middleware/authMiddleware');

router.post('/addReview', authMiddleware.verifyToken, reviewController.addReview);
router.get('/getTeacherReviews/:teacherId', authMiddleware.verifyToken, reviewController.getTeacherReviews);
router.put('/update/:reviewId', authMiddleware.verifyToken, reviewController.updateReview);
router.delete('/delete/:reviewId', authMiddleware.verifyToken, reviewController.deleteReview);

module.exports = router;
