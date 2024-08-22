import { db } from "../db.js";

// Get user details by ID
export const getUser = (req, res) => {
  const userId = req.params.id;

  const q = "SELECT id, username, email FROM users WHERE id = ?";
  
  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.length === 0) return res.status(404).json("User not found!");

    return res.status(200).json(data[0]);
  });
};

// Update user profile
export const updateUser = (req, res) => {
  const userId = req.params.id;
  const { username, email, password } = req.body;

  const q = "UPDATE users SET username = ?, email = ? WHERE id = ?";

  // Hash password if provided
  let values = [username, email, userId];

  if (password) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    values = [username, email, hash, userId];
    q = "UPDATE users SET username = ?, email = ?, password = ? WHERE id = ?";
  }

  db.query(q, values, (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json("User profile updated.");
  });
};

// Delete user by ID
export const deleteUser = (req, res) => {
  const userId = req.params.id;

  const q = "DELETE FROM users WHERE id = ?";

  db.query(q, [userId], (err, data) => {
    if (err) return res.status(500).json(err);
    if (data.affectedRows === 0) return res.status(404).json("User not found!");

    return res.status(200).json("User has been deleted.");
  });
};
