import { useState, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { useUser } from "../../../UserContext.jsx";
import PropTypes from "prop-types";

const languageMap = {
  "Html + Css": "html",
  "Html + Css + Js": "html",
  Java: "java",
  "C++": "cpp",
  Python: "python",
};

const SolutionEvaluation = ({ challenge }) => {
  const { userData } = useUser();
  const [solutionContent, setSolutionContent] = useState("");
  const [terminalOutput, setTerminalOutput] = useState(""); // New state for terminal
  const [isSubmitting, setIsSubmitting] = useState(false); // To handle the submit button's state

  useEffect(() => {
    // Optionally, fetch the existing solution if it exists
    const fetchSolution = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/solutions/student/${userData.id}/challenge/${challenge.id}`
        );
        if (response.ok) {
          const solutionData = await response.json();
          setSolutionContent(solutionData.solutionContent);
        }
      } catch (error) {
        console.error("Failed to fetch existing solution:", error);
      }
    };

    fetchSolution();
  }, [userData.id, challenge.id]);

  const handleSolutionSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // Set submitting to true

    try {
      const response = await fetch("http://localhost:5000/api/solutions/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          studentId: userData.id,
          challengeId: challenge.id,
          professorID: challenge.professorID,
          solutionContent,
          status: "submitted",
          grade: null,
          feedback: "",
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit solution: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log("Response Data:", responseData);
      alert("Solution submitted successfully!");
      setSolutionContent(""); // Clear editor content after submission
      setTerminalOutput("Solution submitted successfully!"); // Terminal output
    } catch (err) {
      console.error(err);
      alert(`Failed to submit solution: ${err.message}`);
      setTerminalOutput(`Error: ${err.message}`); // Terminal output for error
    } finally {
      setIsSubmitting(false); // Reset the submitting state
    }
  };

  if (!challenge) {
    return (
      <p className="text-center mt-10 text-lg text-gray-600">
        Challenge not found.
      </p>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Challenge: {challenge.title || "Untitled"}</h1>
      <form onSubmit={handleSolutionSubmit}>
        <MonacoEditor
          height="300px"
          language={languageMap[challenge.language] || "javascript"}
          value={solutionContent}
          onChange={(value) => setSolutionContent(value || "")}
          theme="vs-light"
          options={{ fontSize: 14 }}
        />
        <div className="mt-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Solution"}
          </button>
        </div>
      </form>

      {/* Terminal Output */}
      <div className="mt-4 p-4 bg-gray-100 border rounded">
        <h3 className="font-semibold">Terminal Output:</h3>
        <pre>{terminalOutput}</pre>
      </div>
    </div>
  );
};

SolutionEvaluation.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    challengeType: PropTypes.string,
    workType: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
    professorID: PropTypes.string.isRequired,
  }).isRequired,
};

export default SolutionEvaluation;
