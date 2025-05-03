import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import User from "./User.js";
import Team from "./Team.js";

const StudentTeam = sequelize.define("StudentTeam", {
  studentId: {
    type: DataTypes.STRING,
    primaryKey: true,
    references: {
      model: User,
      key: "id",
    },
  },
  teamId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references: {
      model: Team,
      key: "id",
    },
  },
}, {
  timestamps: false,
});

User.belongsToMany(Team, { through: StudentTeam, foreignKey: "studentId", as: "teams" });
Team.belongsToMany(User, { through: StudentTeam, foreignKey: "teamId", as: "students" });

export default StudentTeam;
