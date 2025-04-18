import {DataTypes} from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const invite = sequelize.define(
  "invitations",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      unique: true,
    },
    senderId: {type: DataTypes.STRING, allowNull: false},
    receiverId: {type: DataTypes.STRING, allowNull: false},
    challengeId: {type: DataTypes.INTEGER, allowNull: false},
    status: {
      type: DataTypes.ENUM("pending", "accepted", "declined"),
      defaultValue: "pending",
      allowNull: false,
    },
  },
  {
    logging: console.log, // Logs SQL queries
  }
);

invite.belongsTo(User, {
  foreignKey: "senderId",
  as: "sender",
});
User.hasMany(invite, { foreignKey: "senderId" });

export default invite;
