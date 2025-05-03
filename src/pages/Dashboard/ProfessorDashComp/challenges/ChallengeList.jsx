import { useState, useEffect } from "react";
import { useUser } from "../../../UserContext.jsx";
import { ChallengeDetails } from "../../StudentDashComp/index.js";

function formatDate(deadline) {
  const date = new Date(deadline);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [displayedContent, setDisplayedContent] = useState(null);
  const [message, setMessage] = useState("");
  const { userData } = useUser();

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://localhost:5000/api/challenges");
        const data = await response.json();
        const profChallenge = data.filter((c) => c.professorID == userData.id);
        setChallenges(profChallenge);
      } catch (error) {
        console.error("Error fetching Challenges:", error);
        setMessage("Failed to fetch challenges");
      }
    }

    if (userData) {
      fetchChallenges();
    }
  }, [userData]);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this challenge?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(
        `http://localhost:5000/api/challenges/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setChallenges((prev) => prev.filter((c) => c.id !== id));
      } else {
        setMessage(data.message || "Error deleting challenge");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to connect to the server");
    }
  };

  const truncateDescription = (desc) => {
    const words = desc.split(" ");
    return words.length > 3 ? words.slice(0, 3).join(" ") + "..." : desc;
  };

  const handleViewDetails = (challenge) => {
    setDisplayedContent(<ChallengeDetails challenge={challenge} />);
  };

  return (
    <section id="challenges" className="mt-10 px-4">
      <h3 className="text-xl font-semibold text-indigo-700 mb-6">Challenges</h3>

      {message && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-500 rounded-lg">
          {message}
        </div>
      )}

      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="w-full table-auto">
          <thead className="bg-indigo-50">
            <tr>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">ID</th>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">Title</th>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">Description</th>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">Difficulty</th>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">Deadline</th>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">Challenge Type</th>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">Actions</th>
              <th className="p-3 text-left text-sm font-medium text-indigo-700">Details</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((c) => (
              <tr key={c.id} className="border-b border-gray-300">
                <td className="p-3 text-sm text-gray-700">{c.id}</td>
                <td className="p-3 text-sm text-gray-700">{c.title}</td>
                <td className="p-3 text-sm text-gray-700">{truncateDescription(c.description)}</td>
                <td className="p-3 text-sm text-gray-700">{c.difficulty}</td>
                <td className="p-3 text-sm text-gray-700">{formatDate(c.deadline)}</td>
                <td className="p-3 text-sm text-gray-700">{c.challengeType}</td>
                <td className="p-3 text-sm text-gray-700">
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
                <td className="p-3 text-sm text-gray-700">
                  <button
                    onClick={() => handleViewDetails(c)}
                    className="text-blue-600 hover:underline"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {displayedContent && (
          <div className="mt-6">
            {displayedContent}
          </div>
        )}
      </div>
    </section>
  );
}

export default ChallengeList;
