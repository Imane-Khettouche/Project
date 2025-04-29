import {  useState } from "react";
import { useUser } from "../../../UserContext.jsx";

function ChallengesAdd() {
  const { userData } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [workType, setWorkType] = useState("");
  const [languages, setLanguages] = useState([]);
  const [message, setMessage] = useState("");

  const challengeTypes = [
    "Algorithm",
    "Data Structure",
    "Frontend",
    "Backend",
    "Fullstack",
    "Database",
    "Debugging",
    "Optimization",
  ];

  const availableLanguages = [
    "JavaScript",
    "Python",
    "Java",
    "C++",
    "Html + Css",
    "Html + Css + JavaScript",
  ];

  const handleLanguageSelect = (e) => {
    const value = e.target.value;
    if (value && !languages.includes(value)) {
      setLanguages((prev) => [...prev, value]);
    }
  };

  const handleLanguageRemove = (lang) => {
    setLanguages((prev) => prev.filter((l) => l !== lang));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData) return console.error("User data not found");

    try {
      const response = await fetch("http://localhost:5000/api/challenges", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
          difficulty,
          deadline,
          workType,
          challengeType,
          professorID: userData.id,
          languages,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "Challenge created successfully!");
        setTitle("");
        setDescription("");
        setDifficulty("");
        setDeadline("");
        setWorkType("");
        setChallengeType("");
        setLanguages([]); // Reset languages to an empty array, not string
      } else {
        setMessage(data.message || "Error creating challenge");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server");
    }
  };

  if (!userData) {
    return (
      <p className="text-center text-red-500">
        User data is unavailable. Please log in again.
      </p>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-6 text-center text-indigo-800">
        Create a New Challenge
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          placeholder="Title"
          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="" hidden>
            Difficulty
          </option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <input
          type="date"
          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select
          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
        >
          <option value="" hidden>
            Work Type
          </option>
          <option value="individual">Individual</option>
          <option value="team">Team</option>
        </select>

        <select
          className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
          value={challengeType}
          onChange={(e) => setChallengeType(e.target.value)}
        >
          <option value="" hidden>
            Challenge Type
          </option>
          {challengeTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Select Languages:
          </label>
          <select
            className="w-full p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            onChange={handleLanguageSelect}
            value=""
          >
            <option value="" hidden>
              Choose a language
            </option>
            {availableLanguages.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          <div className="flex flex-wrap mt-2 gap-2">
            {languages.map((lang) => (
              <span
                key={lang}
                className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm flex items-center gap-1"
              >
                {lang}
                <button
                  type="button"
                  className="text-red-500 hover:text-red-700"
                  onClick={() => handleLanguageRemove(lang)}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        {message && (
          <p className="text-center text-sm text-green-600 font-medium">
            {message}
          </p>
        )}

        <button
          type="submit"
          className="w-full py-3 bg-indigo-600 text-white font-bold rounded-md hover:bg-indigo-700"
        >
          Submit Challenge
        </button>
      </form>
    </div>
  );
}
export default ChallengesAdd;