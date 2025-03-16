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
  const {name, email, password} = req.body;
  UserModel.create({name, email, password})
    .then((user) => res.json(user))
    .catch((err) => res.json(err));
});

app.listen(3001, () => {
  console.log("server is running");
});
