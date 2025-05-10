import User from "./User.js";
import Challenge from "./Challenge.js";
import StudentChallenge from "./StudentChallenge.js";
import Solution from "./Solution.js";

// 1. علاقة الأستاذ الذي أنشأ التحدي
Challenge.belongsTo(User, { foreignKey: "professorID", as: "creator" });
User.hasMany(Challenge, { foreignKey: "professorID", as: "createdChallenges" });

// 2. علاقة الطالب بالتحدي (كثير إلى كثير)
Challenge.belongsToMany(User, {
  through: StudentChallenge,
  as: "studentsInChallenge",  // تعديل الاسم ليكون فريدًا
  foreignKey: "challengeId",
});
User.belongsToMany(Challenge, {
  through: StudentChallenge,
  as: "joinedChallenges",  // تعديل الاسم ليكون فريدًا
  foreignKey: "studentId",
});

// 3. العلاقة بين Solution و Challenge
Solution.belongsTo(Challenge, { foreignKey: "challengeId", as: "challenge" });
Challenge.hasMany(Solution, { foreignKey: "challengeId", as: "solutions" });

// 4. العلاقة بين Solution و User (الطالب)
Solution.belongsTo(User, { foreignKey: "studentId", as: "student" });
User.hasMany(Solution, { foreignKey: "studentId", as: "solutions" });

// 5. العلاقة بين StudentChallenge و Challenge و User (لتحديث status)
StudentChallenge.belongsTo(Challenge, { foreignKey: "challengeId", as: "challenge" });
StudentChallenge.belongsTo(User, { foreignKey: "studentId", as: "student" });

export { User, Challenge, StudentChallenge, Solution };
