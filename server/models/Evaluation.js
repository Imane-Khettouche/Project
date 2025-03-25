import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js"; // Import User model

const Evaluation = sequelize.define("Evaluation", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  solutionID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  score: {
    type: DataTypes.INTEGER,
    validate: { min: 0, max: 100 },
  },
  comments: {
    type: DataTypes.TEXT,
  },
  professorID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

export default Evaluation;
