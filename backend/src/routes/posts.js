// src/routes/posts.js
const express = require("express");
const router = express.Router();

const PostController = require("../controllers/PostController");

router.get("/", PostController.getPosts); // Get all posts
router.get("/:id", PostController.getPostById); // Get a post by ID

module.exports = router;
