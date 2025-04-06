import {useEffect, useState} from "react";
function ProfInfo() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="text-xl font-bold mb-4">
      <p>{userData.name}</p>
      <p>{userData.email}</p>
      <p>{userData.id}</p>
    </div>
  );
}
function ChallengesAdd() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [deadline, setDeadline] = useState("");
  const [challengeType, setChallengeType] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [message, setMessage] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  if (!userData) {
    return <div>Loading...</div>;
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
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          title,
          description,
          difficulty,
          deadline,
          challengeType,
          professorID: userData.id,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(data.message); // Success message from the server
        setChallengeType("");
        setDescription("");
        setDeadline("");
        setTitle("");
        setDifficulty("");
      } else {
        setMessage(data.message || "Error creating challenge"); // Error message
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to connect to the server");
    }
  };

  return (
    <>
      <form className="grid   m-10 bg-gray-200 p-10 " onSubmit={handleSubmit}>
        <h1 className="items-center">New challenge</h1>
        <input
          type="text"
          placeholder="title"
          className="border border-gray-600 w-full  m-5 p-4 "
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          className="border border-gray-600 w-full  m-5 p-4 "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="difficulty"
          className="border border-gray-600 w-full  m-5 p-4 "
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        />
        <input
          type="date"
          className="border border-gray-600 w-full  m-5 p-4 "
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <input
          type="text"
          placeholder="challengeType"
          className="border border-gray-600 w-full  m-5 p-4 "
          value={challengeType}
          onChange={(e) => setChallengeType(e.target.value)}
        />

        <button
          type="submit"
          className="border border-gray-600 w-30 bg-indigo-500 text-white p-3  ">
          create
        </button>
      </form>
    </>
  );
}
function ChallengeList() {
  const [challenges, setChallenges] = useState([]);

  // Fetch quotes when the component loads
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
  const [displayedContent, setDisplayedContent] = useState(null);

  const handleButtonClick = (Component) => {
    setDisplayedContent(<Component />);
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
        alert(data.message); // "Challenge deleted successfully"
        // ✅ Remove the deleted challenge from the UI (if you’re using state)
        // For example, if you have a list of challenges in state:
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
    <section id="quotes" className="mt-10">
      <h3 className="text-lg font-bold mb-4">Challenges</h3>
      <button
        className="bg-indigo-600 text-white px-4 py-2 rounded-lg mb-4"
        onClick={() => handleButtonClick(ChallengesAdd)}>
        Add Challenge
      </button>
      {displayedContent}
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
              <td className="flex p-2 ">
                <button
                  className="text-red-500 px-2 mx-0.5 py-1 rounded-lg"
                  onClick={() => handleDelete(c.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
function ProfDash() {
  return (
    <>
      <ProfInfo />
      <ChallengeList />
    </>
  );
}

export default ProfDash;
