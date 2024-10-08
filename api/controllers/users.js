import bcrypt from 'bcryptjs';
import { db } from "../db.js";

// Update user profile
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;

  // Initial query and values setup
  let q = "UPDATE users SET username = ?, email = ? WHERE id = ?";
  let values = [username, email, userId];

  // If password is provided, hash it and update query
  if (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    q = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
    values = [username, email, hash, userId];
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("User profile updated.");
  });
};

// Delete a user
export const deleteUser = (req, res) => {
  const userId = req.params.id;

  const query = "DELETE FROM users WHERE id = ?";

  db.query(query, [userId], (err, data) => {
    if (err) {
      console.error(err); // Log error for debugging
      return res.status(500).json({ message: "Database error occurred." });
    }

    if (data.affectedRows === 0) {
      return res.status(404).json({ message: "User not found." });
    }

    return res.status(200).json({ message: "User deleted successfully." });
  });
};
