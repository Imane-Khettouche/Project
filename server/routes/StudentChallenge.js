import express from "express";
import StudentChallenge from "../models/StudentChallenge.js";
import User from "../models/User.js";
import Challenge from "../models/Challenge.js";

const StudentChallengeRouter = express.Router();

// Existing GET all endpoint
StudentChallengeRouter.get("/", async (req, res) => {
  try {
    const joinedChallenges = await StudentChallenge.findAll();
    res.status(200).json(joinedChallenges);
  } catch (error) {
    console.error("Error fetching joined Challenges:", error);
    res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

 // Existing join endpoint
 StudentChallengeRouter.post("/join", async (req, res) => {
   try {
     const { studentId, challengeId, status } = req.body;

     const [student, challenge] = await Promise.all([
       User.findByPk(studentId),
       Challenge.findByPk(challengeId),
     ]);

     if (!student) {
       return res.status(404).json({ message: "Student not found" });
     }
     if (!challenge) {
       return res.status(404).json({ message: "Challenge not found" });
     }

     const existing = await StudentChallenge.findOne({
       where: { studentId, challengeId },
     });

     if (existing) {
       return res.status(400).json({
         message: "Student has already joined this challenge",
       });
     }

     await StudentChallenge.create({ studentId, challengeId, status });

     return res.status(200).json({
       message: "Successfully joined the challenge",
       success: true,
     });

   } catch (error) {
     console.error("Error joining challenge:", error);
     return res.status(500).json({
       message: "Internal server error",
       error: error.message,
     });
   }
 });


export default StudentChallengeRouter;