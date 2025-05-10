import express from "express";
import Solution from "../models/Solution.js";
import User from "../models/User.js";
import Challenge from "../models/Challenge.js";
import "../models/associations.js";
const SolutionRouter = express.Router();

// Existing submit route
SolutionRouter.post("/submit", async (req, res) => {
  try {
    const solution = await Solution.create(req.body);

    res.status(201).json({
      message: "Solution submitted successfully",
      solution,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Failed to submit solution",
      error: err.message,
    });
  }
});
SolutionRouter.get("/", async (req, res) => {
  try {
    const solutions = await Solution.findAll({
      include: [
        {
          model: Challenge,
          as: "challenge",
          include: [
            {
              model: User,
              as: "creator",
            },
          ],
        },
        {
          model: User,
          as: "student",
        },
      ],
    });

    res.status(200).json(solutions);
  } catch (err) {
    console.error("Error fetching solutions:", err);
    res.status(500).json({
      message: "Internal server error",
      error: err.message,
    });
  }
});

export default SolutionRouter;
