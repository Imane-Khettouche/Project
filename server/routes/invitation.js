import express from "express";
import Invite from "../models/Invitation.js";
import User from "../models/User.js";
import Challenge from "../models/Challenge.js";

const InviteRouter = express.Router();

// Create new invitation
InviteRouter.post("/", async (req, res) => {
  const {senderId, receiverId, challengeId} = req.body;
  if (!senderId || !receiverId || !challengeId) {
    return res.status(400).json({message: "All fields are required."});
  }
  try {
    const [sender, receiver, challenge] = await Promise.all([
      User.findByPk(senderId),
      User.findByPk(receiverId),
      Challenge.findByPk(challengeId),
    ]);

    if (!sender || !receiver || !challenge) {
      return res
        .status(404)
        .json({message: "Sender, receiver, or challenge not found."});
    }

    const existingInvite = await Invite.findOne({
      where: {senderId, receiverId, challengeId},
    });

    if (existingInvite) {
      return res.status(409).json({
        message: "Invite already exists.",
        invite: existingInvite,
      });
    }

    const newInvite = await Invite.create({senderId, receiverId, challengeId});
    res
      .status(201)
      .json({message: "Invitation sent successfully!", invite: newInvite});
  } catch (error) {
    console.error("Error creating invite:", error);
    res.status(500).json({message: "Server error", error: error.message});
  }
});

// Get pending invitations received by user
InviteRouter.get("/received/:userId", async (req, res) => {
  try {
    const receivedInvitations = await Invite.findAll({
      where: {receiverId: req.params.userId, status: "Pending"},
      include: [
        {
          model: User,
          as: "sender", // Alias for the sender
          attributes: ["id", "name", "email"],
        },
        {
          model: Challenge,
          as: "challenge", // Alias for the challenge
          attributes: ["id", "title", "description"],
        },
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(receivedInvitations);
  } catch (error) {
    console.error("Error fetching received invitations:", error);
    res.status(500).json({message: "Error fetching received invitations"});
  }
});

// Get invitations sent by user
InviteRouter.get("/sent/:userId", async (req, res) => {
  try {
    const sentInvitations = await Invite.findAll({
      where: {senderId: req.params.userId},
      include: [
        {model: User, as: "receiver", attributes: ["id", "name", "email"]},
        {model: Challenge, attributes: ["id", "title"]},
      ],
      order: [["createdAt", "DESC"]],
    });
    res.json(sentInvitations);
  } catch (error) {
    console.error("Error fetching sent invitations:", error);
    res.status(500).json({message: "Error fetching sent invitations"});
  }
});

// Respond to invitation
// Respond to invitation
InviteRouter.patch("/:invitationId", async (req, res) => {
  const { status } = req.body;
  const validStatuses = ["pending", "accepted", "declined"];  // Ensure lowercase statuses

  if (!validStatuses.includes(status)) {
    return res.status(400).json({ message: "Invalid status value. Valid values are: pending, accepted, declined." });
  }

  try {
    const invitation = await Invite.findByPk(req.params.invitationId, {
      include: [
        { model: User, as: "sender", attributes: ["id", "name"] },
        { model: Challenge, attributes: ["id", "title"] },
      ],
    });

    if (!invitation) {
      return res.status(404).json({ message: "Invitation not found" });
    }

    invitation.status = status; // Update status to the new one
    await invitation.save();
    res.json({ message: `Invitation ${status} successfully`, invite: invitation });
  } catch (error) {
    console.error("Error updating invitation:", error);
    res.status(500).json({ message: "Error updating invitation" });
  }
});


// Delete invitation
InviteRouter.delete("/:invitationId", async (req, res) => {
  try {
    const invitation = await Invite.findByPk(req.params.invitationId);
    if (!invitation) {
      return res.status(404).json({message: "Invitation not found"});
    }
    await invitation.destroy();
    res.json({message: "Invitation removed successfully"});
  } catch (error) {
    console.error("Error deleting invitation:", error);
    res.status(500).json({message: "Error deleting invitation"});
  }
});

export default InviteRouter;
