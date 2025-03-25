import {DataTypes} from "sequelize";
import sequelize from "../db.js";
const User = sequelize.define(
  "User",
  {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false},
    email: {type: DataTypes.STRING, unique: true, allowNull: false},
    password: {type: DataTypes.STRING, allowNull: false},
    role: {
      type: DataTypes.ENUM("Admin", "Student", "Teacher"),
      defaultValue: "Student",
    },
  },
  {
    timestamps: false, // ✅ Disable createdAt and updatedAt
  }
);

export default User; // ✅ Make sure this line exists
