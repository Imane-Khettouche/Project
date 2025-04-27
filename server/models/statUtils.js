// models/statUtils.js
import StudentChallenge from "./StudentChallenge.js";
import sequelize from "../db.js";

export const getStudentStats = async (studentId) => {
  return {
    completed: await StudentChallenge.count({
      where: { studentId, status: 'completed' }
    }),
    activeChallenges: await StudentChallenge.count({
      where: { studentId, status: 'in_progress' }
    }),
    avgScore: await getAverageScore(studentId),
    // Add more metrics...
  };
};

const getAverageScore = async (studentId) => {
  const result = await StudentChallenge.findOne({
    attributes: [[sequelize.fn('AVG', sequelize.col('score')), 'avg']],
    where: { studentId }
  });
  return result.dataValues.avg || 0;
};
