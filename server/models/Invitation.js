import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Challenge from "./Challenge.js";

const Invitation = sequelize.define("invitations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  senderId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  receiverId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("Pending", "Accepted", "Rejected"),
    defaultValue: "Pending",
  },
  challengeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

// Relationships
Invitation.belongsTo(User, { as: "sender", foreignKey: "senderId" });
Invitation.belongsTo(User, { as: "receiver", foreignKey: "receiverId" });
Invitation.belongsTo(Challenge, { as: "challenge", foreignKey: "challengeId" });

export default Invitation;
