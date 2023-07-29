// Create web server

// Import express
const express = require('express');
const router = express.Router();

// Import model
const Comment = require('../models/comment');

// Import controller
const commentController = require('../controllers/commentController');

// Import middleware
const auth = require('../middleware/auth');

// Import validator
const { body } = require('express-validator');

// @route   GET /comment
// @desc    Get all comments
// @access  Public
router.get('/', commentController.getComments);

// @route   GET /comment/:id
// @desc    Get a comment by ID
// @access  Public
router.get('/:id', commentController.getCommentById);

// @route   POST /comment
// @desc    Create a comment
// @access  Private
router.post(
  '/',
  auth,
  [
    body('content', 'Please enter a comment')
      .not()
      .isEmpty(),
    body('postId', 'Please enter a post ID')
      .not()
      .isEmpty(),
  ],
  commentController.createComment
);

// @route   PUT /comment/:id
// @desc    Update a comment
// @access  Private
router.put(
  '/:id',
  auth,
  [
    body('content', 'Please enter a comment')
      .not()
      .isEmpty(),
  ],
  commentController.updateComment
);

// @route   DELETE /comment/:id
// @desc    Delete a comment
// @access  Private
router.delete('/:id', auth, commentController.deleteComment);

// Export router
module.exports = router;