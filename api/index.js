import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";
import cookieParser from "cookie-parser";
import multer from "multer";

const app = express(); // Ensure app is initialized first

// Set up middleware
app.use(express.json());
app.use(cookieParser());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination folder where the uploaded file should be stored
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    // Set the filename of the uploaded file
    cb(null, Date.now() + file.originalname);
  },
});

// Set up multer middleware with the defined storage configuration
const upload = multer({ storage });

// Set up a POST endpoint for handling file uploads
app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

// Define API routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Start the server
app.listen(3306, () => {
  console.log("Connected on port 3306!");
});
