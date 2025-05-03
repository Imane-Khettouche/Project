import { useEffect, useState } from "react";
import { useUser } from "../../../UserContext.jsx";
import { ListOfStudent } from "../../StudentDashComp/index.js";

function SolutionReview() {
  const [challenges, setChallenges] = useState([]);
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
      }
    }

    if (userData) {
      fetchChallenges();
    }
  }, [userData]);

  return (
    <main className="p-6 min-h-screen">
      <div className="max-w-7xl mx-auto bg-white p-6 shadow-lg">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-6">Solution Review</h1>
        <table className="min-w-full table-auto">
          <thead>
            <tr className=" text-gray-500">
              <th className="py-4 px-6 text-left">Challenge Title</th>
              <th className="py-4 px-6 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {challenges.map((c) => (
              <tr key={c.id} className="border-b border-gray-300">
                <td className="py-4 px-6">
                  <details className="group">
                    <summary className="text-black font-semibold cursor-pointer transition-all ease-in-out duration-300">
                      {c.title}
                    </summary>
                    <p className="pl-4 pt-2 text-gray-600">
                      <ListOfStudent challengeId={c.id} />
                    </p>
                  </details>
                </td>
                <td className="py-4 px-6">
                  {/* Add action buttons here if needed */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default SolutionReview;
