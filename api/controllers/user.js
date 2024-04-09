import { db } from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Function to generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1h" // Token expires in 1 hour
  });
};

// Controller functions for user operations
export const register = (req, res) => {
  const { username, email, password } = req.body;

  // Hash the password
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  // Construct the SQL query to insert a new user into the database
  const q = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
  const values = [username, email, hash];

  // Execute the SQL query
  db.query(q, values, (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    const token = generateToken(data.insertId); // Generate JWT token for the newly registered user
    return res.status(200).json({ token }); // Return the token in the response
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  // Construct the SQL query to fetch user data by username
  const q = "SELECT * FROM users WHERE username = ?";
  
  // Execute the SQL query
  db.query(q, [username], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check password
    const isPasswordCorrect = bcrypt.compareSync(password, data[0].password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Wrong username or password" });
    }

    const token = generateToken(data[0].id); // Generate JWT token for the logged-in user
    return res.status(200).json({ token }); // Return the token in the response
  });
};

export const getUserProfile = (req, res) => {
  // Retrieve user data based on the user ID stored in the JWT token
  const userId = req.user.id; // Assuming you have middleware to extract user ID from JWT
  const q = "SELECT id, username, email FROM users WHERE id = ?";
  
  // Execute the SQL query
  db.query(q, [userId], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(data[0]); // Return user profile data in the response
  });
};

// Add other user-related controller functions as needed
