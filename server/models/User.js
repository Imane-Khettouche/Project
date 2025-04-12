import {DataTypes} from "sequelize";
import sequelize from "../db.js";

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.STRING, // Or DataTypes.UUID
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {
      type: DataTypes.ENUM("Admin", "Student", "Professor"),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

export default User;
