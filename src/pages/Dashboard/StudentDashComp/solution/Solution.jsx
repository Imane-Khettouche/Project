import {useState} from "react";
import MonacoEditor from "@monaco-editor/react";
import {useUser} from "../../../UserContext.jsx";
import PropTypes from "prop-types";

const languageMap = {
  "Html + Css": "html",
  "Html + Css + Js": "html",
  Java: "java",
  "C++": "cpp",
  Python: "python",
};

const Solution = ({challenge}) => {
  const {userData} = useUser();
  const [solutionContent, setSolutionContent] = useState("");
  const handleSolutionSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/solutions/submit",
        {
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
        }
      );

      if (!response.ok) {
        // IMPORTANT:  Use response.text() for error messages
        const errorText = await response.text();
        throw new Error(
          `Failed to submit solution: ${response.status} - ${errorText}`
        );
      }

      // IMPORTANT:  Parse JSON *once* if you expect JSON
      const responseData = await response.json();
      console.log("Response Data:", responseData);
      alert("Solution submitted successfully!");
      setSolutionContent("");
    } catch (err) {
      console.error(err);
      alert(`Failed to submit solution: ${err.message}`);
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
      <h1></h1>
      <form onSubmit={handleSolutionSubmit}>
        <h1 className="text-2xl font-bold mb-4">
          Challenge: {challenge.title || "Untitled"}
        </h1>
        <MonacoEditor
          height="300px"
          language={languageMap[challenge.language] || "javascript"}
          value={solutionContent}
          onChange={(value) => setSolutionContent(value || "")}
          theme="vs-dark"
          options={{fontSize: 14}}
        />
        <button
          type="submit"
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
          Submit Solution
        </button>
      </form>
    </div>
  );
};

Solution.propTypes = {
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

export default Solution;
