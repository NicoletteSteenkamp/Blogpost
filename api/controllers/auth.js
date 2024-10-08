import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
export const register = (req, res) => {
  // Check for existing user
  const query = "SELECT * FROM users WHERE email = ? OR username = ?";
  
  db.query(query, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    // Insert new user
    const insertQuery = "INSERT INTO users (`username`, `email`, `password`) VALUES (?, ?, ?)";
    const values = [req.body.username, req.body.email, hash];

    db.query(insertQuery, values, (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

// User login
export const login = (req, res) => {
  // Check user
  const query = "SELECT * FROM users WHERE username = ?";

  db.query(query, [req.body.username], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    // Verify password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if (!isPasswordCorrect) return res.status(400).json("Wrong username or password!");

    // Generate JWT
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send token as HTTP-only cookie
    const { password, ...other } = data[0];
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true,    // Only if you're using HTTPS
      sameSite: 'None' // Required for cross-site cookies
    }).status(200).json(other);
  });
};

// User logout
export const logout = (req, res) => {
  res.clearCookie("access_token", {
    sameSite: 'None', // Required for cross-site cookies
    secure: true      // Only if you're using HTTPS
  }).status(200).json("User has been logged out.");
};
