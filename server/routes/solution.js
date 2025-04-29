// routes/SolutionRouter.js
import express from "express";
import Solution from "../models/Solution.js";
import User from "../models/User.js";
import Challenge from "../models/Challenge.js"; // Ensure correct imports
const SolutionRouter = express.Router();

// Get all solutions for a specific challenge published by a specific professor
SolutionRouter.get(
  "/challenge/:challengeId/professor/:professorId",
  async (req, res) => {
    const {challengeId, professorId} = req.params;

    try {
      // Find the professor and challenge
      const professor = await User.findByPk(professorId);
      const challenge = await Challenge.findByPk(challengeId);

      if (!professor || !challenge) {
        return res
          .status(404)
          .json({message: "Professor or Challenge not found"});
      }

      // Get all solutions for this challenge by the professor
      const solutions = await Solution.findAll({
        where: {
          challengeId: challenge.id,
          professorID: professor.id,
        },
        include: [
          {model: User, as: "student", attributes: ["id", "username"]}, // Student information
          {model: Challenge, as: "challenge", attributes: ["id", "title"]}, // Challenge info
        ],
      });

      if (solutions.length === 0) {
        return res
          .status(404)
          .json({message: "No solutions found for this challenge"});
      }

      return res.status(200).json(solutions);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({message: "Error fetching solutions", error: error.message});
    }
  }
);

// Get the solution of a student for a specific challenge
SolutionRouter.get(
  "/student/:studentId/challenge/:challengeId",
  async (req, res) => {
    const {studentId, challengeId} = req.params;

    try {
      // Find the solution submitted by the student for the specific challenge
      const solution = await Solution.findOne({
        where: {
          studentId,
          challengeId,
        },
        include: [
          {model: User, as: "student", attributes: ["id", "username"]}, // Student information
          {model: Challenge, as: "challenge", attributes: ["id", "title"]}, // Challenge info
        ],
      });

      if (!solution) {
        return res.status(404).json({message: "Solution not found"});
      }

      return res.status(200).json(solution);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({message: "Error fetching solution", error: error.message});
    }
  }
);

// Submit a Solution (POST Request)
SolutionRouter.post("/:studentId/:challengeId", async (req, res) => {
  const {studentId, challengeId} = req.params;
  const {solutionContent} = req.body;

  try {
    // Check if the student and challenge exist
    const student = await User.findByPk(studentId);
    const challenge = await Challenge.findByPk(challengeId);

    if (!student || !challenge) {
      return res.status(404).json({message: "Student or Challenge not found"});
    }

    // Create a new solution for the student
    const solution = await Solution.create({
      studentId,
      challengeId,
      solutionContent,
      status: "submitted", // Mark the solution as submitted
    });

    res
      .status(201)
      .json({message: "Solution submitted successfully", solution});
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({message: "Error submitting solution", error: error.message});
  }
});

export default SolutionRouter;
