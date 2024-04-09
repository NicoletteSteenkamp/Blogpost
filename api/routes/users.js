import express from "express";
import { register, login, getUserProfile } from "../controllers/user.js";

const router = express.Router();

// Routes for user registration and login
router.post("/register", register);
router.post("/login", login);

// Route for getting user profile (requires authentication)
router.get("/profile", authenticateToken, getUserProfile);

// Example middleware function for authenticating JWT tokens
function authenticateToken(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Forbidden" });
    }
    req.user = user;
    next();
  });
}

export default router;
