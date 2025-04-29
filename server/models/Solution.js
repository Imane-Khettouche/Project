// models/Solution.js
import { DataTypes } from "sequelize";
import sequelize from "../db.js"; // Ensure the correct path to db.js
import User from "./User.js"; // Ensure you import the User model correctly
import Challenge from "./Challenge.js"; // Ensure you import the Challenge model

const Solution = sequelize.define(
  "Solution",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    }, studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Challenge,
        key: "id",
      },
      onDelete: "CASCADE",
    }, professorID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    solutionContent: {
      type: DataTypes.TEXT, // The solution submitted (could be code or description)
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("in progress", "submitted", "graded"),
      defaultValue: "in progress", // Initial state is "in progress"
    },
    grade: {
      type: DataTypes.INTEGER, // Grade given by the professor (could be null initially)
      allowNull: true,
    },
    feedback: {
      type: DataTypes.TEXT, // Professor's feedback
      allowNull: true,
    },
  },
  {
    timestamps: true, // Store createdAt and updatedAt timestamps
  }
);

// Relationships
Solution.belongsTo(User, { foreignKey: "studentId", as: "student" });
Solution.belongsTo(Challenge, { foreignKey: "challengeId", as: "challenge" });

export default Solution;
