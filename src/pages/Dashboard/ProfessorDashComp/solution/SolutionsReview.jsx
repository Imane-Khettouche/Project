import {useEffect, useState} from "react";
import {useUser} from "../../../UserContext.jsx";
import SolutionEvaluation from "./solutionEvaluation.jsx";

export default function SolutionReview() {
  const [solutions, setSolutions] = useState([]);
  const [selectedSolution, setSelectedSolution] = useState(null);
  const {userData} = useUser();

  useEffect(() => {
    async function fetchSolutions() {
      try {
        const response = await fetch("http://localhost:5000/api/solutions/");
        if (!response.ok) {
          console.log("No solutions");
          return;
        }
        const data = await response.json();
        const filteredSolutions = data.filter(
          (s) => s.challenge?.creator?.id === userData.id
        );
        setSolutions(filteredSolutions);
      } catch (err) {
        console.error("Error fetching Solutions:", err);
        setSolutions([]);
      }
    }

    if (userData?.id) {
      fetchSolutions();
    }
  }, [userData]);

  const handleSolutionClick = (solution) => {
    setSelectedSolution(solution);
  };

  return (
    <main className="h-screen ">
      <div className="mx-auto max-w-6xl rounded-lg shadow-md p-6 border border-gray-200 bg-white">
        <h1 className="text-3xl font-semibold text-indigo-700 mb-8 tracking-wide text-center">
          Review Student Solutions
        </h1>

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto rounded-lg shadow-sm">
            <thead className="">
              <tr className="text-left">
                <th className="py-3 px-4 font-bold text-indigo-700">
                  Challenge Title
                </th>
                <th className="py-3 px-4 font-bold text-indigo-700">
                  Student Name
                </th>
                <th className="py-3 px-4 font-bold text-indigo-700">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {solutions.length > 0 ? (
                solutions.map((s) => (
                  <tr key={s.id} className="border-b border-gray-200">
                    <td className="py-4 px-4 text-gray-700">
                      {s.challenge?.title || "Untitled"}
                    </td>
                    <td className="py-4 px-4 text-gray-700">
                      {s.student?.name || "Unknown Student"}
                    </td>
                    <td className="py-4 px-4">
                      <button
                        onClick={() => handleSolutionClick(s)}
                        className="px-4 py-2 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200 ease-in-out transform hover:scale-105">
                        View Solution
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="py-4 px-4 text-center text-gray-500">
                    No solutions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {selectedSolution && (
          <div className="mt-10">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-indigo-700">
                Solution by {selectedSolution.student?.name || "Student"}
              </h2>
              <button
                onClick={() => setSelectedSolution(null)}
                className="text-sm text-red-600 hover:underline cursor-pointer">
                ✖ Close Solution
              </button>
              {selectedSolution.challenge?.language}
            </div>
            <SolutionEvaluation
              initialCode={selectedSolution.solutionContent}
              defaultLanguage={selectedSolution.challenge?.language}
            />
          </div>
        )}
      </div>
    </main>
  );
}
