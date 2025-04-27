import express from "express";
import StudentChallenge from "../models/StudentChallenge.js";
import User from "../models/User.js";
import Challenge from "../models/Challenge.js";
import { Sequelize } from "sequelize"; // Import Sequelize for aggregate functions

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


// NEW: Student Statistics Endpoint
StudentChallengeRouter.get("/student/:studentId/stats", async (req, res) => {
  try {
    const { studentId } = req.params;

    // 1. Basic counts
    const [completed, active] = await Promise.all([
      StudentChallenge.count({ where: { studentId, status: 'completed' }}),
      StudentChallenge.count({ where: { studentId, status: 'in_progress' }}),
    ]);

    // 2. Average score
    const avgScoreResult = await StudentChallenge.findOne({
      attributes: [[Sequelize.fn('AVG', Sequelize.col('score')), 'avgScore']],
      where: { studentId }
    });
    const avgScore = avgScoreResult.dataValues.avgScore || 0;

    // 3. Recent activity
    const recentChallenges = await StudentChallenge.findAll({
      where: { studentId },
      order: [['createdAt', 'DESC']],
      limit: 5,
      include: [Challenge]
    });

    res.json({
      completedChallenges: completed,
      activeChallenges: active,
      averageScore: parseFloat(avgScore.toFixed(2)), // Round to 2 decimal places
      recentChallenges: recentChallenges.map(c => ({
        id: c.challenge.id,
        title: c.challenge.title,
        joinedAt: c.createdAt
      }))
    });

  } catch (error) {
    console.error("Error fetching student stats:", error);
    res.status(500).json({
      message: "Failed to fetch statistics",
      error: error.message
    });
  }
});

// NEW: Challenge Statistics Endpoint (for professors)
StudentChallengeRouter.get("/challenge/:challengeId/stats", async (req, res) => {
  try {
    const { challengeId } = req.params;

    // 1. Basic participation stats
    const [totalParticipants, avgScoreResult] = await Promise.all([
      StudentChallenge.count({ where: { challengeId } }),
      StudentChallenge.findOne({
        attributes: [[Sequelize.fn('AVG', Sequelize.col('score')), 'avgScore']],
        where: { challengeId }
      })
    ]);

    // 2. Score distribution
    const scoreDistribution = await StudentChallenge.findAll({
      attributes: [
        [Sequelize.fn('FLOOR', Sequelize.col('score')/10)*10, 'scoreRange'],
        [Sequelize.fn('COUNT', Sequelize.col('id')), 'count']
      ],
      where: { challengeId },
      group: ['scoreRange'],
      order: [['scoreRange', 'ASC']]
    });

    res.json({
      totalParticipants,
      averageScore: avgScoreResult.dataValues.avgScore || 0,
      scoreDistribution: scoreDistribution.map(d => ({
        range: `${d.dataValues.scoreRange}-${d.dataValues.scoreRange+9}`,
        count: d.dataValues.count
      }))
    });

  } catch (error) {
    console.error("Error fetching challenge stats:", error);
    res.status(500).json({
      message: "Failed to fetch challenge statistics",
      error: error.message
    });
  }
});

export default StudentChallengeRouter;