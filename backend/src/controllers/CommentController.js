// src/controllers/CommentController.js
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { text, author } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const newComment = new Comment({ text, author, post: post._id });
    await newComment.save();

    // Add the comment to the post
    post.comments.push(newComment._id);
    await post.save();

    res.status(201).json({ message: 'Comment added successfully', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error adding comment', error });
  }
};
