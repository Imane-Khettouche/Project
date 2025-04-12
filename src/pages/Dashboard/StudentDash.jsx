import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useUser} from "../UserContext.jsx";

function StudentInfo() {
  const {userData} = useUser();
  if (!userData) {
    return <p className="text-center mt-5 text-red-500">there is no info</p>;
  }

  return (
    <>
      <div className="grid justify-center bg-gray-100">
        <img />
        <h1>{userData.name}</h1>
        <h1>{userData.email}</h1>
      </div>
    </>
  );
} /*
function Notification() {
  return;
}*/
function QuoteBar() {
  const [quotes, setQuotes] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");

  // Fetch quotes on mount
  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quotes");
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        } else {
          console.error("Failed to fetch quotes:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  // Animate text transitions
  useEffect(() => {
    if (quotes.length === 0) return;

    const timer = setTimeout(() => {
      setAnimationClass("animate__fadeOutRight");

      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % quotes.length);
        setAnimationClass("animate__fadeInLeft");
      }, 500); // Match fadeOut duration
    }, 8000); // Total display time per quote

    return () => clearTimeout(timer);
  }, [currentTextIndex, quotes]);

  if (quotes.length === 0) {
    return <div>Loading texts...</div>;
  }

  return (
    <div className="bg-indigo-600 m-10 h-35 rounded-2xl">
      <div
        className={` text-2xl p-6 text-white font-bold animate__animated ${animationClass}`}>
        {quotes[currentTextIndex]?.quoteDes || "No quote available"}
      </div>
    </div>
  );
}
function ChallengeDetails({challenge}) {
  const [showList, setShowList] = useState(false);

  if (!challenge) return null;

  return (
    <div className="flex gap-4 m-4">
      {/* تفاصيل التحدي */}
      <div className="border p-4 text-xl w-1/2">
        <p className="m-1">
          <strong>Title:</strong> {challenge.title}
        </p>
        <p className="m-1">
          <strong>Description:</strong> {challenge.description}
        </p>
        <p className="m-1">
          <strong>Difficulty:</strong> {challenge.difficulty}
        </p>
        <p className="m-1">
          <strong>Work Type:</strong> {challenge.workType}
        </p>

        {challenge.workType.toLowerCase() === "team" && (
          <button
            className="border mt-2 px-4 py-1 rounded cursor-pointer bg-indigo-100"
            onClick={() => setShowList(!showList)}>
            {showList ? "Hide List" : "Invite"}
          </button>
        )}

        <p className="m-1 mt-2">
          <strong>Deadline:</strong> {challenge.deadline}
        </p>
        <p className="m-1">
          <strong>Type:</strong> {challenge.challengeType}
        </p>
      </div>

      {/* لائحة الطلاب */}
      {showList && (
        <div className="w-1/2">
          <ListOfStudent />
        </div>
      )}
    </div>
  );
}

ChallengeDetails.propTypes = {
  challenge: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    challengeType: PropTypes.string.isRequired,
    workType: PropTypes.string.isRequired,
  }),
  setSelectedChallenge: PropTypes.func.isRequired,
};
function ChallengeBar({setSelectedChallenge}) {
  const [challenges, setChallenges] = useState([]);
  const [professors, setProfessors] = useState({});

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://localhost:5000/api/challenges");
        const data = await response.json();
        setChallenges(data);

        const professorsData = {};
        for (let challenge of data) {
          const professorResponse = await fetch(
            `http://localhost:5000/api/users/${challenge.professorID}`
          );
          const professorData = await professorResponse.json();
          professorsData[challenge.professorID] = professorData.name;
        }
        setProfessors(professorsData);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }
    fetchChallenges();
  }, []);

  return (
    <>
      <div className="w-screen h-screen flex flex-wrap items-center justify-center p-10">
        {challenges.map((c) => (
          <div
            key={c.id}
            className=" grid items-center bg-gray-100 h-80 w-100 border border-gray-400 rounded-2xl shadow-2xl p-5 m-6 text-xl  cursor-pointer  ">
            <h1>
              <span className=" font-bold">Title:</span>
              {c.title}
            </h1>
            <h3>
              <span className=" font-bold">difficulty:</span> {c.difficulty}
            </h3>
            <h3>
              <span className=" font-bold"> deadline:</span>
              {c.deadline}
            </h3>{" "}
            <h3>
              <span className=" font-bold"> Work Type:</span>
              {c.workType}
            </h3>
            <h3>
              <span className=" font-bold">challengeType:</span>{" "}
              {c.challengeType}
            </h3>
            <h3>
              <span className=" font-bold">professor:</span>
              {professors[c.professorID]}
            </h3>
            <button
              className="bg-indigo-500 rounded-2xl p-1 w-30 cursor-pointer"
              onClick={() =>
                setSelectedChallenge({
                  ...c,
                  professorName: professors[c.professorID],
                })
              }>
              view more..
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
ChallengeBar.propTypes = {
  setSelectedChallenge: PropTypes.func.isRequired,
};
function ListOfStudent() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();

        // Filter the data directly here instead of in the render
        const studentUsers = data.filter((u) => u.role === "Student");
        setUsers(studentUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  return (
    <>
      <div className="p-4 bg-gray-100 h-50">
        <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <table className="w-full table-auto bg-white rounded-lg shadow">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Email</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="4" className="text-center py-4">
                    No students found or still loading...
                  </td>
                </tr>
              ) : (
                users.map((u) => (
                  <tr key={u.id}>
                    <td></td>
                    <td>{u.name}</td>
                    <td>{u.email}</td>
                    <td>
                      <button className="bg-indigo-300 px-2 mx-2 py-1 rounded-lg cursor-pointer">
                        Invite
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
function Dashboard() {
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  return (
    <>
      <StudentInfo />
      <QuoteBar />;
      <ChallengeBar setSelectedChallenge={setSelectedChallenge} />
      {selectedChallenge && <ChallengeDetails challenge={selectedChallenge} />}
    </>
  );
}

export default Dashboard;
