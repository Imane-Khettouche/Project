import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
//import {Server} from "socket.io";
//import http from "http";
import User from "./models/User.js";
import sequelize from "./db.js";
import QuoteRouter from "./routes/quotes.js";
import UserRouter from "./routes/users.js";
import ChallengeRouter from "./routes/challenge.js";

const app = express(); //create an express app
app.use(cors()); // Allows requests from other websites (important for frontend)
app.use(express.json()); // Converts incoming requests to JSON

// ✅ Debug Middleware: Log incoming requests
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} request to ${req.url}`);
  console.log("📦 Request Body:", req.body);
  next();
});

// Signup Route
app.post("/signup", async (req, res) => {
  const {name, email, password, role} = req.body;

  try {
    console.log("✅ Received signup request:", {name, email, role});

    // Check if the user already exists
    const existingUser = await User.findOne({where: {email}});
    if (existingUser) {
      console.log("⚠️ Email already registered!");
      return res.status(400).json({message: "Email already registered"});
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user in database

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    console.log("✅ User created successfully:", newUser);
    res.status(201).json({message: "User created successfully", user: newUser});
  } catch (err) {
    console.error("❌ Error in signup:", err);
    res.status(500).json({message: "Server error", error: err.message});
  }
});
//Login
app.post("/api/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await User.findOne({where: {email}});

    if (!user) {
      return res.status(401).json({message: "User not found"});
    }

    // ✅ Correct way to check hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({message: "Invalid password"});
    }

    res.json({message: "Login successful", user});
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({message: "Internal server error"});
  }
});

//Quote
app.use("/api/quotes", QuoteRouter);

//User
app.use("/api/users", UserRouter);

//Challenge
app.use("/api/challenges", ChallengeRouter);

// Start Server
const PORT = process.env.PORT || 5000;
sequelize.sync({alter: true}).then(() => {
  console.log("✅ MySQL Database Synced");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
