import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const Challenge = sequelize.define("challenge", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT, allowNull: false },  // Use TEXT for longer descriptions
  difficulty: {
    type: DataTypes.ENUM("easy", "medium", "hard"),  // Use ENUM for predefined values
    allowNull: false,
  },
  deadline: { type: DataTypes.DATE, allowNull: false },
  challengeType: { type: DataTypes.STRING, allowNull: false },
  professorID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
}, {
  timestamps: false,  // Move timestamps here
});

export default Challenge;
