
// index.js
import express from "express";

// Create an instance of the Express application
const app = express();

// Use the built-in JSON middleware to parse incoming requests
app.use(express.json());

// Start the server and listen on port 8800
app.listen(8800, () => {
  console.log("Connected...");
});