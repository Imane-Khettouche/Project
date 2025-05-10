import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Challenge from "./Challenge.js";

const StudentChallenge = sequelize.define(
  "StudentChallenge",
  {
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true, // Part of the composite primary key
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Part of the composite primary key
      references: {
        model: Challenge,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    status: {
      type: DataTypes.ENUM("completed", "in_progress"),
      allowNull: false,
    },
    score: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: "StudentChallenge",
    timestamps: true,
  }
);


export default StudentChallenge;