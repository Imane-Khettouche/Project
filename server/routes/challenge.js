import express from "express";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";
const ChallengeRouter = express.Router();

// GET: Get all challenges
ChallengeRouter.get("/", async (req, res) => {
  try {
    const challenges = await Challenge.findAll();
    res.status(200).json(challenges);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    res.status(500).json({message: "Internal server error", error: error.message});
  }
});

// POST: Create a new Challenge
ChallengeRouter.post("/", async (req, res) => {
  try {
    console.log("sending data:", req.body);
    const {
      title,
      description,
      difficulty,
      deadline,
      workType,
      challengeType,
      professorID,
    } = req.body;

    // Check if professor exists
    const professor = await User.findOne({where: {id: professorID}});
    if (!professor) {
      return res.status(400).json({message: "Professor not found"});
    }

    // Check if required fields are missing
    if (
      !title ||
      !description ||
      !difficulty ||
      !deadline ||
      !challengeType ||
      !workType ||
      !professorID
    ) {
      return res.status(400).json({message: "All fields are required!"});
    }

    // Validate difficulty
    const allowedDifficulties = ["easy", "medium", "hard"];
    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({message: "Invalid difficulty level!"});
    }

    // Validate deadline format
    if (!deadline || isNaN(new Date(deadline).getTime())) {
      return res.status(400).json({message: "Invalid date format for deadline!"});
    }

    // Create the Challenge
    const newChallenge = await Challenge.create(req.body);

    // Return success message + created Challenge
    res.status(201).json({
      message: "Challenge created successfully",
      Challenge: newChallenge,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({message: "Validation error", errors});
    } else {
      console.error("Error creating Challenge:", error);
      res.status(400).json({message: "Failed to create Challenge", error: error.message});
    }
  }
});

export default ChallengeRouter;
