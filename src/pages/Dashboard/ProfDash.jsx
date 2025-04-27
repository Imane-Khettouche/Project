import { useEffect, useState } from "react";
import { useUser } from "../UserContext.jsx";

// ProfInfo Component to display user information
function ProfInfo() {
  const { userData } = useUser();
  if (!userData) {
    return <p className="text-center mt-5 text-red-500">There is no info</p>;
  }

  return (
    <div className="grid justify-center bg-gray-100 p-4 rounded">
       <div className="grid justify-center  bg-gray-100 p-5">
      <div className="bg-gray-200 rounded-full w-30 text-5xl flex justify-center place-items-center ">
        {" "}
        <p className="place-items-center p-5">{userData.name[0]}</p>
      </div>
      <h1 className="font-bold text-xl">{userData.name}</h1>
      <p className="">{userData.email}</p>
    </div> </div>
  );
}

// ChallengesAdd Component for adding new challenges
function ChallengesAdd() {
  const { userData } = useUser();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [challengeType, setChallengeType] = useState("");
  const [workType, setWorkType] = useState("");
  const [message, setMessage] = useState("");

  if (!userData) {
    return <p className="text-center text-red-500">User data is unavailable. Please log in again.</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData) {
      console.error("Userdata not found ");
      return;
    }

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
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message);
        setChallengeType("");
        setDescription("");
        setDeadline("");
        setWorkType("");
        setTitle("");
        setDifficulty("");
      } else {
        setMessage(data.message || "Error creating challenge");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server");
    }
  };

  return (
    <>
      <form className="grid m-10 bg-gray-200 p-10 " onSubmit={handleSubmit}>
        <h1 className="items-center">New challenge</h1>
        <input
          type="text"
          placeholder="title"
          className="border border-gray-600 w-full m-5 p-4 "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border border-gray-600 w-full m-5 p-4 "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="border border-gray-600 w-full m-5 p-4 "
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
          className="border border-gray-600 w-full m-5 p-4 "
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <select
          className="border border-gray-600 w-full m-5 p-4 "
          value={workType}
          onChange={(e) => setWorkType(e.target.value)}
        >
          <option value="" hidden>
            Work Type
          </option>
          <option value="individual">Individual</option>
          <option value="team">Team</option>
        </select>

        <input
          type="text"
          placeholder="challengeType"
          className="border border-gray-600 w-full m-5 p-4 "
          value={challengeType}
          onChange={(e) => setChallengeType(e.target.value)}
        />

        <button
          type="submit"
          className="border border-gray-600 w-30 bg-indigo-500 text-white p-3"
        >
          Create Challenge
        </button>
      </form>

      {message && (
        <div className="mt-4 p-4 bg-green-100 text-green-800 border border-green-500 rounded">
          {message}
        </div>
      )}
    </>
  );
}

// ChallengeList Component for displaying challenges
function ChallengeList() {
  const [challenges, setChallenges] = useState([]);
  const [displayedContent, setDisplayedContent] = useState(null);
  const [message, setMessage] = useState(""); // Add message state here
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

  const handleButtonClick = () => {
    if (!displayedContent) {
      setDisplayedContent(<ChallengesAdd />);
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this challenge?");
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/challenges/${id}`, {
        method: "DELETE",
      });

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
        onClick={handleButtonClick}
      >
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
              <td className="border border-gray-300 px-4 py-2">{c.description}</td>
              <td className="border border-gray-300 px-4 py-2">{c.difficulty}</td>
              <td className="border border-gray-300 px-4 py-2">{c.deadline}</td>
              <td className="border border-gray-300 px-4 py-2">{c.challengeType}</td>
              <td className="border border-gray-300 px-4 py-2">{c.professorID}</td>
              <td className="flex p-2">
                <button
                  className="text-red-500 px-2 mx-1 py-1 rounded-lg"
                  onClick={() => handleDelete(c.id)}
                >
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

// ProfDash component as the dashboard for the professor
function ProfDash() {
  return (
    <>
      <ProfInfo />
      <ChallengeList />
    </>
  );
}

export default ProfDash;
