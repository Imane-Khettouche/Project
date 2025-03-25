import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js"; // Import User model

const Statistic = sequelize.define("Statistic", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  studentID: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: "id",
    },
    allowNull: false,
  },
  challengesCompleted: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  averageScore: {
    type: DataTypes.FLOAT,
    defaultValue: 0.0,
  },
});

export default Statistic;
