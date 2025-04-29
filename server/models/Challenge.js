import {DataTypes} from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

const Challenge = sequelize.define(
  "Challenge",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    difficulty: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      allowNull: false,
    },
    deadline: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    workType: {
      type: DataTypes.ENUM("Individual", "Team"),
      allowNull: false,
    },
    challengeType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    language: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    professorID: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "Challenge",
    timestamps: true,
  }
);

Challenge.belongsTo(User, {
  foreignKey: "professorID",
  as: "creator",
});
User.hasMany(Challenge, {
  foreignKey: "professorID",
  as: "createdChallenges",
});

export default Challenge;
