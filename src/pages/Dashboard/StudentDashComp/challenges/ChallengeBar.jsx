import {useState, useEffect} from "react";
import {useUser} from "../../../UserContext.jsx";
import ChallengeDetails from "./ChallengeDetails.jsx";

function MyChallenges() {
  const [myChallenges, setMyChallenges] = useState([]);
  const [selectedChallenge, setSelectedChallenge] = useState(null); // Track selected challenge (ID, type, etc.)
  const {userData} = useUser();

  useEffect(() => {
    async function fetchMyChallenges() {
      try {
        if (!userData || !userData.id) {
          return;
        }

        const responseSC = await fetch(
          "http://localhost:5000/api/studentChallenges"
        );
        const responseCh = await fetch("http://localhost:5000/api/challenges");

        const dataSC = await responseSC.json();
        const dataCh = await responseCh.json();

        const myChallengeRelations = dataSC.filter(
          (sc) => sc.studentId === userData.id
        );
        const myChallengeIds = myChallengeRelations.map((sc) => sc.challengeId);
        const myFullChallenges = dataCh.filter((ch) =>
          myChallengeIds.includes(ch.id)
        );

        setMyChallenges(myFullChallenges);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }

    fetchMyChallenges();
  }, [userData]);

  function isDeadlinePassed(deadline) {
    return new Date(deadline) < new Date();
  }

  function formatDate(deadline) {
    const date = new Date(deadline);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  }

  const handleButtonClick = (challenge) => {
    setSelectedChallenge({
      id: challenge.id,
      challengeType: challenge.challengeType, // Pass the challenge type
      language: challenge.language || "default", // Assuming language is a field in your challenge model
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">My Challenges</h1>
      <div className="space-y-4">
        {myChallenges.length > 0 ? (
          myChallenges.map((ch) => {
            const isDeadlinePassedFlag = isDeadlinePassed(ch.deadline); // Store the result for efficiency
            return (
              <div
                key={ch.id}
                className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-300">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {ch.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Deadline: {formatDate(ch.deadline)}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    disabled={isDeadlinePassedFlag}
                    className={`px-4 py-2 rounded-lg text-white font-medium transition duration-300 ${
                      isDeadlinePassedFlag
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}>
                    {isDeadlinePassedFlag
                      ? "Challenge Ended"
                      : "Submit Solution"}
                  </button>
                  <button
                    onClick={() => handleButtonClick(ch)} // Pass the entire challenge object
                    className="px-4 py-2 rounded-lg text-white font-medium bg-green-600 hover:bg-green-700 transition duration-300">
                    View Details
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">
            No challenges available yet.
          </p>
        )}
      </div>

      {/* Conditionally render ChallengeDetails if a challenge is selected */}
      {selectedChallenge && (
        <ChallengeDetails
          challengeId={selectedChallenge.id}
          challengeType={selectedChallenge.challengeType}
          language={selectedChallenge.language}
        />
      )}
    </div>
  );
}

export default MyChallenges;
