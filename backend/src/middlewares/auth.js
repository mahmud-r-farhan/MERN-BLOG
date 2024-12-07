// src/middleware/auth.js

const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization")?.split(" ")[1]; // Token passed in the Authorization header
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

const verifyAdmin = async (req, res, next) => {
  try {
    const admin = await Admin.findById(req.userId);
    if (!admin) return res.status(403).json({ message: "Access denied: Admins only" });
    next();
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = { verifyToken, verifyAdmin };
