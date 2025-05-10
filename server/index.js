import express from "express";
import cors from "cors";
import path from "path";
import {fileURLToPath} from "url";
import sequelize from "./db.js";
import signUpRouter from "./routes/signup.js";
import loginRouter from "./routes/login.js";
import QuoteRouter from "./routes/quotes.js";
import UserRouter from "./routes/users.js";
import ChallengeRouter from "./routes/challenge.js";
import InviteRouter from "./routes/invitation.js";
import StudentChallengeRouter from "./routes/StudentChallenge.js";
import SolutionRouter from "./routes/solution.js";
import judge0Router from "./routes/judge0.js";
import TeamRouter from "./routes/team.js";
import StatRouter from "./routes/stat.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); // Create an express app
app.use(cors()); // Allows requests from other websites (important for frontend)
app.use(express.json()); // Converts incoming requests to JSON

// ✅ Debug Middleware: Log incoming requests
app.use((req, res, next) => {
  console.log(`🔍 ${req.method} request to ${req.url}`);
  console.log("📦 Request Body:", req.body);
  next();
});

// Signup Route
app.use("/api/login", loginRouter); // Route to handle login
app.use("/api/signUp", signUpRouter);
// Uploaded files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Quote
app.use("/api/quotes", QuoteRouter);

// User
app.use("/api/users", UserRouter);

// Challenge
app.use("/api/challenges", ChallengeRouter);

// Invitation
app.use("/api/invite", InviteRouter);

// Add the student challenge routes
app.use("/api/studentChallenges", StudentChallengeRouter);

// Use the SolutionRouter
app.use("/api/solutions", SolutionRouter);
//team
app.use("/api/team", TeamRouter);

// Use the JDoodle router
app.use("/api/compiler", judge0Router);
//stat
app.use("/api/stats", StatRouter);
// Synchronize the database
async function syncDatabase() {
  try {
    // Use alter: true to modify the tables to match the models without deleting the data
    await sequelize.sync({alter: true}); // Make sure the tables are updated
    console.log("✅ All models were synchronized successfully.");
  } catch (error) {
    console.error("An error occurred while synchronizing the database:", error);
  }
}

syncDatabase();

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
