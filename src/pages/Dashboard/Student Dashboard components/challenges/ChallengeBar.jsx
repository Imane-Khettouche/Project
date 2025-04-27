import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function ChallengeBar({ setSelectedChallenge }) {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [challengeTypes, setChallengeTypes] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://localhost:5000/api/challenges");
        const data = await response.json();
        setChallenges(data);
        setChallengeTypes([...new Set(data.map((c) => c.challengeType))]);
        setFilteredChallenges(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }
    fetchChallenges();
  }, []);

  const filterByType = (type) => {
    setFilteredChallenges(type === "All" ? challenges : challenges.filter(c => c.challengeType === type));
  };

  return (
    <div className="h-screen p-10">
      <div className="flex mb-5 space-x-3">
        <button
          onClick={() => filterByType("All")}
          className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-800 transition duration-200"
        >
          All
        </button>
        {challengeTypes.map((type) => (
          <button
            key={type}
            onClick={() => filterByType(type)}
            className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-800 transition duration-200"
          >
            {type}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap">
        {filteredChallenges.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-gray-300 rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300 cursor-pointer m-2"
          >
            <h1 className="text-xl font-semibold mb-2">
              <span className="font-bold">Title:</span> {c.title}
            </h1>
            <p className="text-gray-700">
              <span className="font-bold">Difficulty:</span> {c.difficulty}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Deadline:</span> {new Date(c.deadline).toLocaleString()}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Work Type:</span> {c.workType}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">Challenge Type:</span> {c.challengeType}
            </p>
            <button
              className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-800 transition duration-200"
              onClick={() => setSelectedChallenge(c)}
            >
              View More..
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

ChallengeBar.propTypes = {
  setSelectedChallenge: PropTypes.func.isRequired,
};

export default ChallengeBar;