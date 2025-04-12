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
  const { name, email, password, role } = req.body;

  try {
    console.log("✅ Received signup request:", { name, email, role });

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      console.log("⚠️ Email already registered!");
      return res.status(400).json({ message: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // *** Transaction to ensure atomicity ***
    const transaction = await sequelize.transaction();

    try {
      // Determine ID prefix
      let idPrefix = "";
      if (role === "Student") {
        idPrefix = "stud";
      } else if (role === "Professor") {
        idPrefix = "prof";
      } else if (role === "Admin") {
        idPrefix = "admin";
      }

      // *** Database-safe way to get the next ID ***
      const result = await sequelize.query(
        `SELECT LPAD(COALESCE(MAX(CAST(SUBSTRING(id, 5) AS UNSIGNED)), 0) + 1, 2, '0') as nextId FROM users WHERE id LIKE '${idPrefix}%'`,
        { type: sequelize.QueryTypes.SELECT, transaction: transaction }
      );
      const nextId = result[0].nextId;

      const id = `${idPrefix}${nextId}`;

      // Create user in database (within the transaction)
      const newUser = await User.create(
        { id, name, email, password: hashedPassword, role },
        { transaction: transaction }
      );

      await transaction.commit(); // Commit the transaction
      console.log("✅ User created successfully:", newUser);
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (dbError) {
      await transaction.rollback(); // Rollback the transaction on error
      console.error("❌ Database error during signup:", dbError);
      return res.status(500).json({ message: "Database error", error: dbError.message });
    }
  } catch (hashError) {
    console.error("❌ Error hashing password:", hashError);
    return res.status(500).json({ message: "Error hashing password", error: hashError.message });
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
