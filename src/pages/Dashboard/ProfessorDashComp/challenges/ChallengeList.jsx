import {useState, useEffect} from "react";
import {useUser} from "../../../UserContext.jsx";
import ChallengesAdd from "./ChallengesAdd.jsx";
function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [displayedContent, setDisplayedContent] = useState(null);
  const [message, setMessage] = useState(""); // Add message state here
  const {userData} = useUser();

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

  const handleButtonClick = () => {
    if (!displayedContent) {
      setDisplayedContent(<ChallengesAdd />);
    }
  };

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
        setMessage(data.message); // Set message after deleting
        setChallenges((prev) => prev.filter((c) => c.id !== id));
      } else {
        setMessage(data.message || "Error deleting challenge");
      }
    } catch (error) {
      console.error("Delete error:", error);
      setMessage("Failed to connect to the server");
    }
  };

  return (
    <section id="quotes" className="mt-10">
      <h3 className="text-lg font-bold mb-4">Challenges</h3>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={handleButtonClick}>
        Add Challenge
      </button>
      {displayedContent}
      {message && (
        <div className="mt-4 p-4 bg-red-100 text-red-800 border border-red-500 rounded">
          {message}
        </div>
      )}
      <table className="w-full table-auto bg-white rounded-lg shadow">
        <thead>
          <tr>
            <td className="p-2">ID</td>
            <td className="p-2">Title</td>
            <td className="p-2">Description</td>
            <td className="p-2">Difficulty</td>
            <td className="p-2">Deadline</td>
            <td className="p-2">Challenge Type</td>
            <td className="p-2">Professor ID</td>
          </tr>
        </thead>
        <tbody>
          {challenges.map((c) => (
            <tr key={c.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{c.id}</td>
              <td className="border border-gray-300 px-4 py-2">{c.title}</td>
              <td className="border border-gray-300 px-4 py-2">
                {c.description}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {c.difficulty}
              </td>
              <td className="border border-gray-300 px-4 py-2">{c.deadline}</td>
              <td className="border border-gray-300 px-4 py-2">
                {c.challengeType}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {c.professorID}
              </td>
              <td className="flex p-2">
                <button
                  className="text-red-500 px-2 mx-1 py-1 rounded-lg"
                  onClick={() => handleDelete(c.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
export default ChallengeList;
