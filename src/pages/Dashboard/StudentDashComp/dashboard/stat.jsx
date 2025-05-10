import { useState, useEffect } from "react";
import axios from 'axios';
import { useUser } from "../../../UserContext";

function StudentStatsCard() {
  const { userData } = useUser();
  const [studentStats, setStudentStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (!userData?.id) {
          setError("User data not available.");
          setLoading(false);
          return;
        }

        console.log("Fetching stats for user ID:", userData.id);

        const response = await axios.get(`http://localhost:5000/api/stats/?studentId=${userData.id}`);

        console.log("Response data:", response.data); // Log the data structure for debugging

        const allStudentStats = response.data;

        if (Array.isArray(allStudentStats)) {
          const userStats = allStudentStats.find(stat => stat.studentId === userData.id);
          if (!userStats) {
            setError("No Stats Found for this User");
            setLoading(false);
            return;
          }
          setStudentStats(userStats);
        } else if (typeof allStudentStats === "object" && allStudentStats !== null) {
          setStudentStats(allStudentStats);
        } else {
          setError("Unexpected data format from the server.");
        }
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchStats();
  }, [userData?.id]);

  if (loading) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-auto mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Student Statistics</h3>
        <p className="text-gray-600 mt-2">Loading stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-xl mx-auto mt-8">
        <h3 className="text-xl font-semibold text-gray-800">Student Statistics</h3>
        <p className="text-red-500 mt-2">Error loading stats: {error}</p>
      </div>
    );
  }

  if (studentStats) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl mx-auto mt-8">
        {/* Completed Challenges Card */}
        <div className="bg-blue-100 p-6 rounded-lg shadow-lg text-center w-full">
          <h4 className="text-xl font-semibold text-gray-800">Completed Challenges</h4>
          <p className="text-3xl font-bold text-gray-900">{studentStats.completedChallenges}</p>
        </div>

        {/* Active Challenges Card */}
        <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center w-full">
          <h4 className="text-xl font-semibold text-gray-800">Active Challenges</h4>
          <p className="text-3xl font-bold text-gray-900">{studentStats.activeChallenges}</p>
        </div>

        {/* Average Score Card */}
        <div className="bg-yellow-100 p-6 rounded-lg shadow-lg text-center w-full">
          <h4 className="text-xl font-semibold text-gray-800">Average Score</h4>
          <p className="text-3xl font-bold text-gray-900">{studentStats.averageScore}</p>
        </div>

        {/* Highest Score Card */}
        <div className="bg-pink-100 p-6 rounded-lg shadow-lg text-center w-full">
          <h4 className="text-xl font-semibold text-gray-800">Highest Score</h4>
          <p className="text-3xl font-bold text-gray-900">{studentStats.highestScore}</p>
        </div>

        {/* Total Challenges Attempted Card */}
        <div className="bg-purple-100 p-6 rounded-lg shadow-lg text-center w-full">
          <h4 className="text-xl font-semibold text-gray-800">Total Challenges Attempted</h4>
          <p className="text-3xl font-bold text-gray-900">{studentStats.totalChallengesAttempted}</p>
        </div>

        {/* Team Participations Card */}
        <div className="bg-indigo-100 p-6 rounded-lg shadow-lg text-center w-full">
          <h4 className="text-xl font-semibold text-gray-800">Team Participations</h4>
          <p className="text-3xl font-bold text-gray-900">{studentStats.teamParticipations}</p>
        </div>

        {/* Recent Solutions */}
        {studentStats.recentSolutions && studentStats.recentSolutions.length > 0 && (
          <div className="col-span-2 mt-8 bg-gray-100 p-6 rounded-lg shadow-lg w-full">
            <h4 className="text-xl font-semibold text-gray-800">Recent Solutions</h4>
            <ul className="space-y-3 mt-4">
              {studentStats.recentSolutions.map((solution, index) => (
                <li key={index} className="p-4 border rounded-lg shadow-sm hover:bg-gray-200">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{solution.challengeTitle}:</span>
                    <span className="font-semibold text-gray-800">{solution.status}</span>
                  </div>
                  <div className="flex justify-between mt-2">
                    <span className="text-gray-600">Grade:</span>
                    <span className="font-semibold text-gray-800">{solution.grade}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default StudentStatsCard;
