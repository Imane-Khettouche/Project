import { DataTypes } from "sequelize";
import sequelize from "../db.js";

const quote = sequelize.define("quote", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  quoteDes: { type: DataTypes.STRING, allowNull: false },
  owner: { type: DataTypes.STRING, allowNull: false },
}, {
  logging: console.log // Logs SQL queries
});

export default quote;
