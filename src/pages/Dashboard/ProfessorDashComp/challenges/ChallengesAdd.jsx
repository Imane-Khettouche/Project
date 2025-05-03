import { useState } from "react";
import {useUser} from "../../../UserContext";
const AddChallenge = () => {
  const {userData} = useUser();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [language, setLanguage] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [workType, setWorkType] = useState("");
  const [challengeType, setChallengeType] = useState("");

  const availableLanguages = ["Html + Css", "Html + Css + Js", "Java", "C++", "Python"];
  const difficulties = ["easy", "medium", "hard"];
  const workTypes = ["Individual", "Team"];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/api/challenges", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          language,
          difficulty,
          deadline,
          workType,
          challengeType,
          professorID:userData.id,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create challenge");
      }

      alert("Challenge created!");
      // Reset form
      setTitle("");
      setDescription("");
      setLanguage("");
      setDifficulty("");
      setDeadline("");
      setWorkType("");
      setChallengeType("");
    } catch (err) {
      console.error(err);
      alert("Failed to create challenge.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 p-8 bg-white shadow-lg rounded-lg">
  <h2 className="text-2xl font-semibold text-gray-800 text-center">Create a New Challenge</h2>

  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
      <input
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
      <textarea
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        required
      >
        <option value="" hidden>Choose a language</option>
        {availableLanguages.map((lang) => (
          <option key={lang} value={lang}>{lang}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        required
      >
        <option value="" hidden>Choose difficulty</option>
        {difficulties.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
      <input
        type="datetime-local"
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        required
      />
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Work Type</label>
      <select
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
        value={workType}
        onChange={(e) => setWorkType(e.target.value)}
        required
      >
        <option value="" hidden>Choose work type</option>
        {workTypes.map((type) => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">Challenge Type</label>
      <input
        className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition duration-300"
        value={challengeType}
        onChange={(e) => setChallengeType(e.target.value)}
        required
      />
    </div>
  </div>

  <div className="flex justify-center">
    <button
      type="submit"
      className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300 transition duration-300"
    >
      Create Challenge
    </button>
  </div>
</form>

  );
};

export default AddChallenge;
