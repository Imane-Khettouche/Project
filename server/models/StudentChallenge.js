import {DataTypes} from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Challenge from "./Challenge.js";
const StudentChallenge = sequelize.define(
  "StudentChallenge",
  {
    studentId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
      onDelete: "CASCADE",
    },
    challengeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.FLOAT, // نضيف score هنا
      defaultValue: 0, // يكون مبدئيا 0
    },
  },
  {
    sequelize,
    modelName: "StudentChallenge",
    timestamps: true,
  }
);

// 👇 العلاقات (Many-to-Many بين الطلاب والتحديات)
User.belongsToMany(Challenge, {
  through: StudentChallenge,
  as: "joinedChallenges",
  foreignKey: "studentId",
});

Challenge.belongsToMany(User, {
  through: StudentChallenge,
  as: "students",
  foreignKey: "challengeId",
});

export default StudentChallenge;
