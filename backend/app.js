const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const asyncHandler = require("express-async-handler");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());
app.use(morgan("dev")); // Log incoming requests for development

// MongoDB connection with retry logic
const URI = process.env.MONGO_URI;
if (!URI) {
  console.error("MongoDB URI is not defined. Please check your .env file.");
  process.exit(1); // Exit if no URI is found
}

const connectWithRetry = () => {
  mongoose
    .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((err) => {
      console.error("Error connecting to database: ", err);
      setTimeout(connectWithRetry, 5000); // Retry after 5 seconds
    });
};

connectWithRetry();

// Import Routes
const adminRoutes = require("./src/routes/admin"); // Import admin routes

// Routes
app.use("/api", asyncHandler(adminRoutes)); // All routes are prefixed with /api

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong", error: err.message });
});

// Handle undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
