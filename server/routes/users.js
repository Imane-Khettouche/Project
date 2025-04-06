import express from "express";
import User from "../models/User.js";

const UserRouter = express.Router();

// Get all users
UserRouter.get("/", async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// Delete user by ID
UserRouter.delete("/:id", async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({message: "Invalid user ID"});
  }

  try {
    const deletedUser = await User.destroy({
      where: {id: userId},
    });

    if (deletedUser) {
      res.json({message: "User deleted successfully"});
    } else {
      res.status(404).json({message: "User not found"});
    }
  } catch (error) {
    console.error("❌ Error deleting user:", error);
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
});

export default UserRouter;
