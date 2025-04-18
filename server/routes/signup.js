import express from "express";
import bcrypt from "bcrypt";
import multer from "multer";
import fs from "fs";
import path from "path";
import {fileURLToPath} from "url";
import User from "../models/User.js"; // Adjust the path if needed
import {v4 as uuidv4} from "uuid"; // Import UUID v4 for generating IDs

const signUpRouter = express.Router();

// Fix for ES Modules: Get the current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the 'uploads' folder exists
const uploadDir = path.join(__dirname, "../uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, {recursive: true});
}

// Setup multer storage options
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir); // Save uploaded files to the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // File name will be a timestamp + original name
  },
});

const upload = multer({storage: storage});

signUpRouter.post("/", upload.single("photo"), async (req, res) => {
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

    // Generate a unique ID
    const userId = uuidv4();

    // If there is a photo, save its URL
    let photoUrl = null;
    if (req.file) {
      photoUrl = `/uploads/${req.file.filename}`; // Store the relative path to the photo
    }

    // Create the new user using Sequelize
    const newUser = await User.create({
      id: userId, // Assign the generated ID
      name,
      email,
      password: hashedPassword,
      role,
      photoUrl, // Save the photo URL or null if no photo
    });
    console.log("✅ New user created:", newUser.get());

    // Respond with success and user data (without the password)
    const {
      id,
      name: newUserName,
      email: newUserEmail,
      role: newUserRole,
      photoUrl: newUserPhotoUrl,
    } = newUser.get(); // Use .get() to get the instance values
    res.status(201).json({
      message: "Signup successful",
      user: {
        id,
        name: newUserName,
        email: newUserEmail,
        role: newUserRole,
        photoUrl: newUserPhotoUrl,
      },
    });
  } catch (err) {
    console.error("🔥 Signup error:", err);
    res.status(500).json({message: "Internal server error"});
  }
});

export default signUpRouter;
