import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const StudentStatsCard = ({ studentId }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await axios.get(
          `/api/studentChallenges/${studentId}/stats`
        );
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    };
    fetchStats();
  }, [studentId]);

  if (!stats) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-gray-500 animate-pulse">
          Loading statistics...
        </span>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl shadow-md overflow-hidden p-6">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">
        Your Challenge Statistics
      </h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
          <span className="text-gray-700">Completed Challenges:</span>
          <span className="font-bold text-blue-700">
            {stats.completedChallenges}
          </span>
        </div>

        <div className="flex justify-between items-center bg-green-50 p-3 rounded-lg">
          <span className="text-gray-700">Average Score:</span>
          <span className="font-bold text-green-700">
            {stats.averageScore}%
          </span>
        </div>

        <div className="flex justify-between items-center bg-yellow-50 p-3 rounded-lg">
          <span className="text-gray-700">Active Challenges:</span>
          <span className="font-bold text-yellow-700">
            {stats.activeChallenges}
          </span>
        </div>
      </div>
    </div>
  );
};

StudentStatsCard.propTypes = {
  studentId: PropTypes.string.isRequired,
};

export default StudentStatsCard;
