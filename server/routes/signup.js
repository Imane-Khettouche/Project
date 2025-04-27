import express from "express";
import bcrypt from "bcrypt";
import User from "../models/User.js"; // Import from index.js
import Portfolio from "../models/Portfolio.js"; // Import from index.js
import sequelize from "../db.js";

const signUpRouter = express.Router();

const generateRoleBasedId = (role) => {
  const prefixes = {
    Admin: "adm",
    Student: "stud",
    Professor: "prof",
  };
  const prefix = prefixes[role] || "user";
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomNum}`;
};

signUpRouter.post("/", async (req, res) => {
  try {
    const {name, email, password, role} = req.body;
    console.log("📨 Signup attempt:", {email});

    // Check if the user already exists
    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
      console.log("❌ Email already exists");
      return res.status(400).json({message: "Email is already taken"});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("🔑 Password hashed");

    // Start a transaction
    const transaction = await sequelize.transaction();
    try {
      // Generate the user ID *before* creating the user
      const userId = generateRoleBasedId(role);

      // Create the new user using Sequelize
      const newUser = await User.create(
        {
          id: userId, // Use the generated userId
          name,
          email,
          password: hashedPassword,
          role,
        },
        {transaction}
      );
      console.log("✅ New user created:", newUser.get());

      // Create a new portfolio for the user
      const newPortfolio = await Portfolio.create(
        {
          idPortfolio: `port-${userId}`, // Generate a portfolio ID, ensure uniqueness
          userId: userId, // Use the generated userId
          privateSection: "", // Provide default values
          nickname: "",
          skills: "",
          challenges: "",
          socialLinks: "",
        },
        {transaction}
      );
      console.log("💰 New portfolio created:", newPortfolio.get());

      // Commit the transaction
      await transaction.commit();

      // Respond with success
      res.status(201).json({message: "Signup successful"}); // Simplified response
    } catch (error) {
      // Rollback the transaction
      await transaction.rollback();
      throw error; // Re-throw the error
    }
  } catch (err) {
    console.error("🔥 Signup error:", err);
    res.status(500).json({message: "Internal server error"});
  }
});

export default signUpRouter;
