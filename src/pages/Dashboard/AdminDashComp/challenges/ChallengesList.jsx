import {useEffect, useState} from "react";

function ChallengeList() {
  const [challenges, setChallenges] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://localhost:5000/api/Challenges");
        const data = await response.json();
        setChallenges(data);
      } catch (error) {
        console.error("Error fetching Challenges:", error);
      }
    }

    fetchChallenges();
  }, []);

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
        alert(data.message);
        setChallenges((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert(data.message || "Error deleting challenge");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <section id="challenges" className="mt-10">
      <h3 className="text-lg font-bold mb-4">Challenge Management</h3>

      <table className="w-full table-auto bg-white rounded-lg shadow overflow-hidden">
        <thead>
          <tr>
            <td className="p-2">ID</td>
            <td className="p-2">Title</td>
            <td className="p-2">Description</td>
            <td className="p-2">Difficulty</td>
            <td className="p-2">Deadline</td>
            <td className="p-2">Type</td>
            <td className="p-2">Professor</td>
            <td className="p-2">Actions</td>
          </tr>
        </thead>
        <tbody>
          {challenges.map((c) => (
            <tr key={c.id} className="border border-gray-300">
              <td className="border border-gray-300 px-4 py-2">{c.id}</td>
              <td className="border border-gray-300 px-4 py-2">{c.title}</td>
              <td className="border border-gray-300 px-4 py-2 overflow-x-hidden">
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
              <td className="flex p-2 ">
                <button
                  className="text-red-500 px-2 mx-0.5 py-1 rounded-lg"
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
