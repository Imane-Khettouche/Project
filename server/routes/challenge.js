import express from "express";
import challenge from "../models/Challenge.js";

const ChallengeRouter = express.Router();
//GET
ChallengeRouter.get("/", async (req, res) => {
  try {
    const challenges = await challenge.findAll();
    res.status(200).json(challenges);
  } catch (error) {
    console.error("Error fetching challenges :", error);
    res
      .status(500)
      .json({message: "Internal server error", error: error.message});
  }
});

// Create a new challenge
ChallengeRouter.post("/", async (req, res) => {
  try {
    console.log("sending data:", req.body);
    const {
      title,
      description,
      difficulty,
      deadline,
      challengeType,
      professorID,
    } = req.body;

    // Check if required fields are missing
    if (
      !title ||
      !description ||
      !difficulty ||
      !deadline ||
      !challengeType ||
      !professorID
    ) {
      return res.status(400).json({message: "All fields are required!"});
    }

    // ✅ Check difficulty is one of the allowed values
    const allowedDifficulties = ["easy", "medium", "hard"];
    if (!allowedDifficulties.includes(difficulty)) {
      return res.status(400).json({message: "Invalid difficulty level!"});
    }

    // ✅ Validate deadline format
    if (!deadline || isNaN(new Date(deadline).getTime())) {
      return res
        .status(400)
        .json({message: "Invalid date format for deadline!"});
    }

    // Create the challenge
    const newChallenge = await challenge.create(req.body);

    // ✅ Return success message + created challenge
    res
      .status(201)
      .json({
        message: "Challenge created successfully",
        challenge: newChallenge,
      });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      res.status(400).json({message: "Validation error", errors});
    } else {
      console.error("Error creating challenge:", error);
      res
        .status(400)
        .json({message: "Failed to create challenge", error: error.message});
    }
  }
});

//delete challenges
ChallengeRouter.delete("/:id", async (req, res) => {
  const ChallengeId = parseInt(req.params.id, 10);

  if (isNaN(ChallengeId)) {
    return res.status(400).json({ message: "Invalid challenge ID" });
  }

  try {
    const deletedChallenge = await challenge.destroy({
      where: { id: ChallengeId },
    });

    if (deletedChallenge) {
      res.json({ message: "Challenge deleted successfully" });
    } else {
      res.status(404).json({ message: "Challenge not found" });
    }
  } catch (error) {
    console.error("❌ Error deleting challenge:", error);
    res.status(500).json({
      message: "Error deleting challenge",
      error: error.message,
    });
  }
});

export default ChallengeRouter;