import express from "express";
import Invite from "../models/Invitation.js";
import User from "../models/User.js";

const InviteRouter = express.Router();

// POST /api/invite
InviteRouter.post("/", async (req, res) => {
  const { senderId, receiverId, challengeId } = req.body;
  console.log("📥 Incoming Invite Data:", req.body);

  if (!senderId || !receiverId || !challengeId) {
    return res.status(400).json({
      message: "senderId, receiverId, and challengeId are required.",
    });
  }

  try {
    const existingInvite = await Invite.findOne({
      where: { senderId, receiverId, challengeId },
    });

    if (existingInvite) {
      return res.status(409).json({ message: "Invite already exists." });
    }

    const newInvite = await Invite.create({
      senderId,
      receiverId,
      challengeId,
      status: "pending",
    });

    return res.status(201).json({
      message: "Invitation sent successfully!",
      invite: newInvite,
    });
  } catch (error) {
    console.error("❌ Error creating invite:", error.message);
    return res.status(500).json({
      message: "Internal server error",
      error: error.message,
    });
  }
});

// GET /api/invite/received/:userId
// Fetching received invitations for a user
InviteRouter.get("/received/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const receivedInvitations = await Invite.findAll({
      where: { receiverId: userId, status: "pending" },
      include: [
        {
          model: User,
          as: "sender", // Correct alias
          attributes: ["id", "name"], // Use name instead of username
        },
      ],
    });

    res.json(receivedInvitations);
  } catch (error) {
    console.error("Error fetching received invitations:", error);
    res.status(500).send("Error fetching received invitations.");
  }
});

// GET /api/invite/sent/:userId
// GET /api/invite/received/:userId
InviteRouter.get("/received/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const receivedInvitations = await Invite.findAll({
      where: { receiverId: userId, status: "pending" },
      include: [
        {
          model: User,
          as: "sender", // Correct alias
          attributes: ["id", "name"], // Use "name" instead of "username"
        },
      ],
    });

    res.json(receivedInvitations);
  } catch (error) {
    console.error("Error fetching received invitations:", error);
    res.status(500).send("Error fetching received invitations.");
  }
});


// PUT /api/invite/:invitationId — accept or decline
InviteRouter.put("/:invitationId", async (req, res) => {
  const { invitationId } = req.params;
  const { status } = req.body;

  if (!["accepted", "declined"].includes(status)) {
    return res.status(400).json({ message: "Invalid status value." });
  }

  try {
    const invitation = await Invite.findByPk(invitationId);

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found." });
    }

    invitation.status = status;
    await invitation.save();

    return res.status(200).json({
      message: `Invitation ${status} successfully.`,
      invite: invitation,
    });
  } catch (error) {
    console.error("❌ Error updating invitation:", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default InviteRouter;
