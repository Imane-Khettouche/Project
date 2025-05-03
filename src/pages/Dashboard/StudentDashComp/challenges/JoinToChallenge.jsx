import {useEffect, useState} from "react";
import {toast} from "react-toastify";
import PropTypes from "prop-types";
import {useUser} from "../../../UserContext";
import ListOfStudent from "./ListOfStudent";
import Solution from "../solution/Solution";

function JoinToChallenge({challenge}) {
  const [isJoined, setIsJoined] = useState(false);
  const {userData} = useUser();
  const [displayedSolution, setDisplayedSolution] = useState(null);

  const handleButtonClick = () => {
    if (!displayedSolution) {
      setDisplayedSolution(<Solution challenge={challenge} />);
    }
  };

  // ✅ Check if student is already joined
  useEffect(() => {
    async function checkJoinStatus() {
      if (!userData?.id || userData.role !== "Student") return;

      try {
        const response = await fetch(
          "http://localhost:5000/api/studentChallenges/"
        );
        const data = await response.json();

        const alreadyJoined = data.some(
          (entry) =>
            entry.studentId === userData.id &&
            entry.challengeId === challenge.id
        );

        setIsJoined(alreadyJoined);
      } catch (error) {
        console.error("Error checking join status:", error);
      }
    }

    checkJoinStatus();
  }, [userData, challenge.id]);

  // ✅ Handle join action
  const handleJoinChallenge = async () => {
    if (!userData?.id) {
      alert("You must be logged in to join a challenge");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/studentChallenges/join",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            studentId: userData.id,
            challengeId: challenge.id,
            status: "in_progress",
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to join challenge");
      }

      if (data.message === "Successfully joined the challenge") {
        setIsJoined(true);
        toast.success("Successfully joined the challenge!");
      } else {
        toast.error(data.message || "Failed to join the challenge.");
      }
    } catch (error) {
      console.error("Error joining challenge:", error);
      toast.error(`Error: ${error.message}`);
    }
  };

  return (
    <div className="m-6 p-4">
      {userData?.role === "Student" ? (
        <>
          {!isJoined ? (
            <button
              onClick={handleJoinChallenge}
              className="mt-4 border bg-indigo-700 text-white rounded-2xl p-3 w-50"
              data-testid="join-challenge-button">
              Join Challenge
            </button>
          ) : (
            <button
              onClick={handleButtonClick}
              className="mt-4 border bg-green-700 text-white rounded-2xl p-3 w-50">
              Submit Solution
            </button>
          )}
          {displayedSolution}
        </>
      ) : userData?.role === "Professor" ? (
        <>
          <h1 className="text-xl font-semibold text-indigo-700">
            List of Students Who Joined:
          </h1>
          <ul>
            <ListOfStudent challengeId={challenge.id} />
          </ul>
        </>
      ) : (
        <p className="mt-4 text-gray-500">Please log in to view challenges.</p>
      )}
    </div>
  );
}

JoinToChallenge.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    workType: PropTypes.string,
  }).isRequired,
};

export default JoinToChallenge;
