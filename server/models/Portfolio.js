import {DataTypes, Model} from "sequelize";
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
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    skills: {
      type: DataTypes.JSON, // Change to JSON type
      defaultValue: [], // Default to empty array
    },
    socialLinks: {
      type: DataTypes.JSON, // Change to JSON type
      defaultValue: [], // Default to empty array
    },
  },
  {
    sequelize,
    modelName: "Portfolio",
    timestamps: true,
  }
);

Portfolio.belongsTo(User, {foreignKey: "userId", as: "owner"});
User.hasOne(Portfolio, {foreignKey: "userId", as: "portfolio"});

export default Portfolio;
