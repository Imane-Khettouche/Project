import { DataTypes, Model } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";

class Portfolio extends Model {}

Portfolio.init(
  {
    idPortfolio: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    privateSection: {
      type: DataTypes.TEXT,
      allowNull: false,
      defaultValue: "This is my portfolio. More details coming soon.", // Default placeholder text
    },
    nickname: {
      type: DataTypes.STRING(255),
      allowNull: false,
      defaultValue: "Student", // Default nickname for students
    },
    skills: {
      type: DataTypes.JSON,
      defaultValue: [
        "JavaScript",
        "React",
        "HTML",
        "CSS",
        "Node.js",
        "Git",
      ], // Default skills
    },
    socialLinks: {
      type: DataTypes.JSON,
      defaultValue: [], // Default to empty array
    },
  },
  {
    sequelize,
    modelName: "Portfolio",
    timestamps: true,
  }
);

export default Portfolio;
