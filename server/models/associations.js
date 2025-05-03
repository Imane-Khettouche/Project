// associations.js
import User from './User.js';
import Challenge from './Challenge.js';
import StudentChallenge from './StudentChallenge.js';
import Solution from "./Solution.js"
Challenge.belongsTo(User, { foreignKey: "professorID", as: "creator" });
User.hasMany(Challenge, { foreignKey: "professorID", as: "createdChallenges" });

Challenge.belongsToMany(User, {
  through: StudentChallenge,
  as: "students",
  foreignKey: "challengeId",
});
User.belongsToMany(Challenge, {
  through: StudentChallenge,
  as: "joinedChallenges",
  foreignKey: "studentId",
});
User.hasMany(Challenge, {foreignKey: "professorID", as: "createdChallenges"});
Challenge.belongsTo(User, {foreignKey: "professorID", as: "creator"});

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

User.hasMany(Solution, {foreignKey: "studentId"});
Solution.belongsTo(User, {foreignKey: "studentId", as: "student"});


Solution.belongsTo(User, { foreignKey: 'studentId', as: 'student' });
User.hasMany(Solution, { foreignKey: 'studentId' });

Solution.belongsTo(Challenge, { foreignKey: 'challengeId', as: 'challenge' });
Challenge.hasMany(Solution, { foreignKey: 'challengeId' });

export { User, Challenge, StudentChallenge };