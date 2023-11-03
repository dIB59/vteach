const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/addReview', reviewController.addReview);
router.get('/getTeacherReviews/:teacherId', reviewController.getTeacherReviews);
router.put('/update/:reviewId', reviewController.updateReview);
router.delete('/delete/:reviewId', reviewController.deleteReview);

module.exports = router;
