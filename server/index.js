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
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/login", loginRouter); // Route to handle login
app.use("/api/signUp", signUpRouter);
//uploaded
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

//Quote
app.use("/api/quotes", QuoteRouter);

//User
app.use("/api/users", UserRouter);

//Challenge
app.use("/api/challenges", ChallengeRouter);

//invitation
app.use("/api/invite", InviteRouter);

// Start Server
const PORT = process.env.PORT || 5000;
sequelize.sync({alter: true}).then(() => {
  console.log("✅ MySQL Database Synced");
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});
