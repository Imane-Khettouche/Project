import { DataTypes } from "sequelize";
import sequelize from "../db.js";

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

export default Invitation;
