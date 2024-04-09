import { db } from "../db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = (req, res) => {
  const { email, username, password } = req.body;

  // CHECK EXISTING USER
  const checkQuery = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(checkQuery, [email, username], (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Internal Server Error" });
    }
    if (data.length > 0) {
      return res.status(409).json({ error: "User already exists" });
    }

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);

    const insertQuery = "INSERT INTO users(username, email, password) VALUES (?, ?, ?)";
    const values = [username, email, hash];

    db.query(insertQuery, values, (err, data) => {
      if (err) {
        return res.status(500).json({ error: "Internal Server Error" });
      }
      return res.status(200).json({ message: "User has been created" });
    });
  });
};

export const login = (req, res) => {
  const { username, password } = req.body;

  // CHECK USER
  const checkQuery = "SELECT * FROM users WHERE username = ?";

  db.query(checkQuery, [username], (err, data) => {
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

    // Generate JWT token
    const token = jwt.sign({ id: data[0].id }, process.env.JWT_SECRET, {
      expiresIn: "1h" // Token expires in 1 hour
    });
    const { password, ...other } = data[0];

    // Set cookie
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: true, // Set to true if using HTTPS
      sameSite: "strict" // or "lax" depending on your requirements
    }).status(200).json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token").status(200).json({ message: "User has been logged out" });
};
