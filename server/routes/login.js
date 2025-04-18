import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Adjust the path if needed

const loginRouter = express.Router();

loginRouter.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("📨 Login attempt:", { email });

    // Replace `prisma.user.findUnique` with Sequelize's `findOne`
    const user = await User.findOne({ where: { email } });

    if (!user) {
      console.log("❌ User not found");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔑 Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // ✅ Successful login
    const { id, name, email: userEmail, role } = user.get(); // Use .get() to access dataValues in Sequelize
    res.status(200).json({
      message: "Login successful",
      user: { id, name, email: userEmail, role },
    });
  } catch (err) {
    console.error("🔥 Login error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
});
export default loginRouter;
