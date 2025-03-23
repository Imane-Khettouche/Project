import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import UserModel from "./modules/User.js";
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/Projet")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Connection failed", err));
app.post("/Signup", (req, res) => {
  console.log("Signup endpoint hit");
  const { name, email, password } = req.body;
  console.log("Received data:", { name, email, password });

  UserModel.create({ name, email, password })
    .then((user) => {
      console.log("User created:", user);
      res.json({ message: "User created", user });
    })
    .catch((err) => {
      console.error("Error creating user:", err);
      res.status(500).json({ error: err.message });
    });
});

app.listen(3001, () => {
  console.log("server is running");
});
