// src/routes/comments.js
const express = require("express");
const router = express.Router();

const CommentController = require("../controllers/CommentController");

router.post("/:postId", CommentController.addComment); // Add comment
router.get("/:postId", CommentController.getComments); // Get all comments for a post

module.exports = router;
