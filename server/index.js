// index.js
// Import the Express library
import express from "express";
// Import routes
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/posts.js";

// Create an instance of the Express application
const app = express();

// Use the built-in JSON middleware to parse incoming requests
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);

// Start the server and listen on port 8800
app.listen(8800, () => {
  console.log("Connected...");
});