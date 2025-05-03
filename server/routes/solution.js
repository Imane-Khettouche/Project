// routes/SolutionRouter.js
import express from "express";
import Solution from "../models/Solution.js";
import User from "../models/User.js";
import Challenge from "../models/Challenge.js";
import Team from "../models/Team.js"; // نحتاج إلى موديل Team للتحقق من القائد

const SolutionRouter = express.Router();

// الحصول على جميع الحلول لتحدي معين من قبل أستاذ معين
SolutionRouter.get(
  "/challenge/:challengeId/professor/:professorId",
  async (req, res) => {
    const {challengeId, professorId} = req.params;

    try {
      // إيجاد الأستاذ والتحدي
      const professor = await User.findByPk(professorId);
      const challenge = await Challenge.findByPk(challengeId);

      if (!professor || !challenge) {
        return res
          .status(404)
          .json({message: "Professor or Challenge not found"});
      }

      // الحصول على جميع الحلول لهذا التحدي من قبل الأستاذ
      const solutions = await Solution.findAll({
        where: {
          challengeId: challenge.id,
          professorID: professor.id,
        },
        include: [
          {model: User, as: "student", attributes: ["id", "username"]}, // معلومات الطالب
          {model: Challenge, as: "challenge", attributes: ["id", "title"]}, // معلومات التحدي
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

// الحصول على الحل الخاص بالطالب لتحدي معين
SolutionRouter.get(
  "/student/:studentId/challenge/:challengeId",
  async (req, res) => {
    const {studentId, challengeId} = req.params;

    try {
      // إيجاد الحل المقدم من الطالب لهذا التحدي
      const solution = await Solution.findOne({
        where: {
          studentId,
          challengeId,
        },
        include: [
          {model: User, as: "student", attributes: ["id", "username"]}, // معلومات الطالب
          {model: Challenge, as: "challenge", attributes: ["id", "title"]}, // معلومات التحدي
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

// إرسال حل من قائد الفريق
SolutionRouter.post("/submit/leader", async (req, res) => {
  const {studentId, challengeId, teamCode, solutionContent} = req.body;

  try {
    // إيجاد الفريق من خلال الكود
    const team = await Team.findOne({
      where: {code: teamCode},
      include: [{model: User, as: "students"}],
    });

    if (!team) {
      return res.status(404).json({message: "Team not found"});
    }

    // التحقق من أن الطالب هو قائد الفريق
    const teamLeader = team.leaderId;
    if (studentId !== teamLeader) {
      return res.status(403).json({message: "You are not the team leader"});
    }

    // التحقق من وجود التحدي
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge) {
      return res.status(404).json({message: "Challenge not found"});
    }

    // إنشاء الحل الجديد
    const solution = await Solution.create({
      studentId,
      challengeId,
      solutionContent,
      status: "submitted", // تعيين حالة الحل إلى "تم الإرسال"
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

SolutionRouter.post("/submit", async (req, res) => {
  try {
    // Handle the logic of saving the solution
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
// في routes/solutions.js
SolutionRouter.get("/professor/:professorId", async (req, res) => {
  try {
    const solutions = await Solution.findAll({
      where: {professorID: req.params.professorId},
      include: [
        {model: User, as: "student", attributes: ["username"]},
        {model: Challenge, as: "challenge", attributes: ["title"]},
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(solutions);
  }catch (error) {
  console.error(error);
  return res.status(500).json({ message: "Error fetching solutions", error: error.message });
}
});

export default SolutionRouter;
