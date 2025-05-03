// routes/TeamRouter.js
import express from "express";
import Team from "../models/Team.js";
import User from "../models/User.js";
import Challenge from "../models/Challenge.js";

const TeamRouter = express.Router();

// Helper function to generate a team code
function generateTeamCode(length = 6) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < length; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// Route to get all teams
TeamRouter.get("/", async (req, res) => {
  try {
    const teams = await Team.findAll({
      include: [
        {
          model: User,
          as: "students",
          attributes: ["id", "name", "email"],
          through: { attributes: [] },
        },
        {
          model: Challenge,
          as: "challenge",
          attributes: ["id", "title", "description"],
        },
        {
          model: User,
          as: "leader",
          attributes: ["id", "name", "email"],
        },
      ],
      attributes: ["id", "name", "code"],
    });

    res.status(200).json(teams);
  } catch (error) {
    console.error("Error fetching teams with students and challenge:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Route to create a team
TeamRouter.post("/", async (req, res) => {
  const { name, challengeId, leaderId } = req.body;

  try {
    const challenge = await Challenge.findByPk(challengeId);
    if (!challenge || challenge.type !== "team") {
      return res.status(400).json({ message: "Invalid or non-team challenge." });
    }

    // Generate a unique team code
    let code;
    let exists = true;
    while (exists) {
      code = generateTeamCode();
      const existingTeam = await Team.findOne({ where: { code } });
      if (!existingTeam) exists = false;
    }

    // Create the new team
    const newTeam = await Team.create({
      name,
      challengeId,
      leaderId,
      code,
    });

    // Associate the leader with the team
    const leader = await User.findByPk(leaderId);
    if (leader) {
      await newTeam.setLeader(leader);
    }

    res.status(201).json({
      message: "Team created successfully.",
      teamCode: newTeam.code,
      teamName: newTeam.name,
      teamLeader: leader ? leader.name : "Unknown",
    });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

// Route for students to join a team using the team code
TeamRouter.post("/join", async (req, res) => {
  const { code, studentId } = req.body;

  try {
    const team = await Team.findOne({
      where: { code },
      include: { model: Challenge, as: "challenge" },
    });

    if (!team || team.challenge.type !== "team") {
      return res.status(404).json({ message: "Team not found or invalid." });
    }

    const student = await User.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Add the student to the team
    await team.addStudent(student);

    res.status(200).json({ message: "Joined team successfully." });
  } catch (error) {
    console.error("Error joining team:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
});

export default TeamRouter;
