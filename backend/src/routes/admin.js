const express = require("express");
const router = express.Router();

const AdminController = require("../controllers/AdminController");
const PostController = require("../controllers/PostController");
const CommentController = require("../controllers/CommentController");
const { verifyToken, verifyAdmin } = require("../middlewares/auth");

// --- Public APIs ---
router.get("/blogs", PostController.getPosts); // Public: Get all blogs
router.get("/blogs/:id", PostController.getPostById); // Public: Get a single blog by ID with comments
router.post("/blogs/:id/comments", CommentController.addComment); // Public: Add a comment to a blog

// --- Admin Authentication ---
router.post("/admin/login", AdminController.loginAdmin);    // Admin login
router.post("/admin/logout", verifyToken, AdminController.logoutAdmin); // Admin logout

// --- Admin Dashboard ---
router.get("/admin/dashboard", AdminController.getAdminDashboard); // Admin dashboard

// --- Admin Post Management ---
router.post("/admin/posts", verifyToken, verifyAdmin, PostController.createPost);        // Admin: Create post
router.put("/admin/posts/:id", verifyToken, verifyAdmin, PostController.updatePost);     // Admin: Update post
router.delete("/admin/posts/:id", verifyToken, verifyAdmin, PostController.deletePost); // Admin: Delete post

// --- Admin Comment Management ---
router.get("/admin/comments", verifyToken, verifyAdmin, AdminController.getAllComments); // Admin: Get all comments
router.delete("/admin/comments/:id", verifyToken, verifyAdmin, AdminController.deleteComment); // Admin: Delete a comment

module.exports = router;
