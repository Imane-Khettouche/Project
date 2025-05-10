export const getStudentStats = async (
  studentId,
  studentChallenges,
  studentTeams,
  solutions
) => {
  try {
    if (!studentChallenges || !Array.isArray(studentChallenges)) {
      throw new Error("studentChallenges is undefined or not an array");
    }
    if (!studentTeams || !Array.isArray(studentTeams)) {
      throw new Error("studentTeams is undefined or not an array");
    }
    if (!solutions || !Array.isArray(solutions)) {
      throw new Error("solutions is undefined or not an array");
    }

    const completedChallenges = studentChallenges.filter(
      (sc) => sc.studentId === studentId && sc.status === "completed"
    ).length;
    const activeChallenges = studentChallenges.filter(
      (sc) => sc.studentId === studentId && sc.status === "in_progress"
    ).length;

    const studentSpecificChallenges = studentChallenges.filter(
      (sc) => sc.studentId === studentId
    );
    const totalChallengesAttempted = studentSpecificChallenges.length;
    const totalScores = studentSpecificChallenges.reduce(
      (sum, sc) => sum + (sc.score || 0),
      0
    );
    const averageScore =
      totalChallengesAttempted > 0
        ? (totalScores / totalChallengesAttempted).toFixed(2)
        : "0.00";
    const highestScore = studentSpecificChallenges.reduce(
      (max, sc) => Math.max(max, sc.score || 0),
      0
    );

    const teamParticipations = studentTeams.filter(
      (st) => st.studentId === studentId
    ).length;

    const recentSolutions = solutions
      .filter((s) => s.studentId === studentId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 3)
      .map((s) => ({
        challengeTitle: s.challenge ? s.challenge.title : "Unknown Challenge", // Assuming 'challenge' is a related object
        status: s.status,
        grade: s.grade ?? "Pending",
      }));

    return {
      completedChallenges,
      activeChallenges,
      averageScore,
      highestScore,
      totalChallengesAttempted,
      teamParticipations,
      recentSolutions,
    };
  } catch (error) {
    console.error("Error calculating student stats:", error);
    throw error;
  }
};

export const getProfessorStats = async (
  professorId,
  challenges,
  studentChallenges,
  solutions
) => {
  try {
    const createdChallenges = challenges.filter(
      (c) => c.professorId === professorId
    );
    const totalChallengesCreated = createdChallenges.length;
    const lastCreatedChallenge = createdChallenges.reduce(
      (latest, c) =>
        !latest || new Date(c.createdAt) > new Date(latest.createdAt)
          ? c
          : latest,
      null
    );

    const challengeParticipation = createdChallenges.map((challenge) => {
      const participants = studentChallenges.filter(
        (sc) => sc.challengeId === challenge.id
      ).length;
      return {
        challengeTitle: challenge.title,
        participants,
      };
    });

    const professorSolutions = solutions.filter(
      (s) => s.professorId === professorId
    );
    const totalSubmissionsGraded = professorSolutions.length;
    const totalGrades = professorSolutions.reduce(
      (sum, s) => sum + (s.grade || 0),
      0
    );
    const averageGradeGiven =
      totalSubmissionsGraded > 0
        ? (totalGrades / totalSubmissionsGraded).toFixed(2)
        : "0.00";
    const uniqueGradedStudents = [
      ...new Set(professorSolutions.map((s) => s.studentId)),
    ].length;

    return {
      totalChallengesCreated,
      lastChallengeCreated: lastCreatedChallenge
        ? lastCreatedChallenge.createdAt
        : null,
      challengeParticipation,
      gradingStatistics: {
        totalSubmissions: totalSubmissionsGraded,
        averageGrade: averageGradeGiven,
        uniqueStudents: uniqueGradedStudents,
      },
    };
  } catch (error) {
    console.error("Error calculating professor stats:", error);
    throw error;
  }
};

export const getAdminStats = async (
  users,
  challenges,
  studentChallenges,
  solutions
) => {
  try {
    const totalUsers = users.length;
    const totalRoles = [...new Set(users.map((user) => user.role))].length;
    const totalChallenges = challenges.length;
    const totalSolutions = solutions.length;
    const totalChallengeAttempts = studentChallenges.length;
    const platformTotalScore = studentChallenges.reduce(
      (sum, sc) => sum + (sc.score || 0),
      0
    );
    const platformAvgScore =
      totalChallengeAttempts > 0
        ? (platformTotalScore / totalChallengeAttempts).toFixed(2)
        : "0.00";

    const recentActivity = solutions
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5)
      .map((s) => ({
        studentName: s.student ? s.student.name : "Unknown Student", // Assuming 'student' is a related object
        challengeTitle: s.challenge ? s.challenge.title : "Unknown Challenge", // Assuming 'challenge' is a related object
        status: s.status,
        submittedAt: s.createdAt,
      }));

    return {
      userStatistics: {
        totalUsers,
        totalRoles,
      },
      contentStatistics: {
        totalChallenges,
        totalSolutions,
      },
      performanceMetrics: {
        averagePlatformScore: platformAvgScore,
        totalChallengeAttempts,
      },
      recentActivity,
    };
  } catch (error) {
    console.error("Error calculating admin stats:", error);
    throw error;
  }
};
