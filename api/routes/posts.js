import jwt from 'jsonwebtoken';
import { db } from "../db.js";
import bcrypt from 'bcrypt'; // For password hashing

// Login route to generate a token
export const loginUser = (req, res) => {
  const { username, password } = req.body;

  const q = "SELECT * FROM users WHERE username = ?";
  db.query(q, [username], (err, data) => {
    if (err) return res.status(500).json(err.message);

    if (data.length === 0) return res.status(400).json("User not found!");

    const user = data[0];
    bcrypt.compare(password, user.password, (err, result) => {
      if (err) return res.status(500).json(err.message);

      if (!result) return res.status(400).json("Invalid password!");

      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      res.cookie("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      }).status(200).json("Logged in successfully");
    });
  });
};
import jwt from 'jsonwebtoken';
import { db } from "../db.js";
import dotenv from "dotenv";

dotenv.config();

const jwtSecret = process.env.JWT_SECRET; // Use environment variable for JWT secret

export const addPost = (req, res) => {
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, jwtSecret, (err, userInfo) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.cat,
      req.body.date,
      userInfo.id,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err.message);
      return res.json("Post has been created.");
    });
  });
};
