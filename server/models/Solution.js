import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Challenge from "./Challenge.js";
import Team from "./Team.js";

const Solution = sequelize.define("Solution", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: {
      model: User,
      key: "id",
    },
  },
  teamId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: Team,
      key: "id",
    },
  },
  challengeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Challenge,
      key: "id",
    },
  },
  professorID: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },
  },
  solutionContent: {
    type: DataTypes.TEXT,
  },
  status: {
    type: DataTypes.ENUM("in progress", "submitted", "graded"),
    defaultValue: "in progress",
  },
  grade: {
    type: DataTypes.INTEGER,
  },
  feedback: {
    type: DataTypes.TEXT,
  },
}, {
  timestamps: true,
});
export default Solution;
