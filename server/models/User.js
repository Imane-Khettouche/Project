import {DataTypes} from "sequelize";
import sequelize from "../db.js";

const generateRoleBasedId = (role) => {
  const prefixes = {
    Admin: "adm",
    Student: "stud",
    Professor: "prof",
  };

  const prefix = prefixes[role] || "user";
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}${randomNum}`;
};

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("Admin", "Student", "Professor"),
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    timestamps: true,
    hooks: {
      beforeValidate: (user) => {
        if (!user.id) {
          user.id = generateRoleBasedId(user.role);
        }
      },
    },
  }
);

export default User;
