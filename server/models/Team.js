import { DataTypes } from "sequelize";
import sequelize from "../db.js";
import Challenge from "./Challenge.js";
import User from "./User.js";
const Team = sequelize.define("Team", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  }, code: {
    type: DataTypes.STRING,
    unique: true
  },
  challengeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Challenge,
      key: "id",
    },
  },leaderId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User,
      key: "id",
    },}
,}, {
  timestamps: true,
});Team.belongsTo(Challenge, { foreignKey: "challengeId", as: "challenge" });
Challenge.hasMany(Team, { foreignKey: "challengeId", as: "allTeams" }); // تغيير alias هنا ليكون "allTeams" لتجنب التعارض

Team.belongsTo(User, { foreignKey: "leaderId", as: "leader" }); // العلاقة مع المستخدم (الزعيم)
User.hasMany(Team, { foreignKey: "leaderId", as: "managedTeams" }); // تغيير alias هنا ليكون "managedTeams" لتجنب التعارض

export default Team;
