import express from "express";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
import postRoutes from "./routes/posts.js";

import cookieParser from "cookie-parser";
import multer from "multer";
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './App';

const app = express();

app.use(express.json());
app.use(cookieParser());
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/upload");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

app.post("/api/upload", upload.single("file"), function (req, res) {
  const file = req.file;
  res.status(200).json(file.filename);
});

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// Serve React application
app.use(express.static("../client/build")); // Assuming your React app is built in this directory

// Serve React application for all other routes
app.get('*', (req, res) => {
  const appHtml = ReactDOMServer.renderToString(<App />);
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>React App</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      <script src="/bundle.js"></script> <!-- Assuming your bundle file is named bundle.js -->
    </body>
    </html>
  `);
});

app.listen(8800, () => {
  console.log("Connected!");
});
