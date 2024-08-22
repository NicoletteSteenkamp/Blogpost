import express from "express";
import { getUser, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

// Get user details
router.get("/:id", getUser);

// Update user details
router.put("/:id", updateUser);

// Delete a user
router.delete("/:id", deleteUser);

export default router;
