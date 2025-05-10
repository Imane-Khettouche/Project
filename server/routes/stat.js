import express from "express";
import {
  getStudentStats,
  getProfessorStats,
  getAdminStats,
} from "../models/statUtils.js"; // Adjust the path as needed
import Solution from "../models/Solution.js";
import StudentTeam from "../models/StudentTeam.js";
import StudentChallenge from "../models/StudentChallenge.js";
import Challenge from "../models/Challenge.js";
import User from "../models/User.js";

const StatRouter = express.Router();

// Route to get student statistics
StatRouter.get("/", async (req, res) => {
  try {
    const studentId = req.query.studentId; // أو من req.user.id حسب نوع المصادقة

    if (!studentId) {
      return res.status(400).json({error: "Missing studentId"});
    }

    // جلب البيانات المرتبطة
    const studentChallenges = await StudentChallenge.findAll();
    const studentTeams = await StudentTeam.findAll();
    const solutions = await Solution.findAll({
      include: [
        { model: Challenge, as: "challenge" }, // تضمين التحدي
        { model: User, as: "student" }, // تضمين الطالب
      ]
    });

    const allStats = await getStudentStats(
      studentId,
      studentChallenges,
      studentTeams,
      solutions
    );

    res.json(allStats);
  } catch (error) {
    console.error("Error fetching all student stats in route:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get professor statistics
StatRouter.get("/professor/:professorId", async (req, res) => {
  try {
    const professorId = req.params.professorId;
    const stats = await getProfessorStats(professorId);
    res.json(stats);
  } catch (error) {
    console.error("Error fetching professor stats in route:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to get admin statistics
StatRouter.get("/admin", async (req, res) => {
  try {
    const stats = await getAdminStats();
    res.json(stats);
  } catch (error) {
    console.error("Error fetching admin stats in route:", error);
    res.status(500).send("Internal Server Error");
  }
});

export default StatRouter;
