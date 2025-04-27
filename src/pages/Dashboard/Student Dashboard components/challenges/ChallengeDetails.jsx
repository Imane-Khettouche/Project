import { useState } from "react";
import { useUser } from "../../../UserContext.jsx";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import ListOfStudent from "./ListOfStudent.jsx";

export default function ChallengeDetails({ challenge }) {
  const { userData } = useUser();
  const [showList, setShowList] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  if (!challenge) return null;

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
            challengeId: challenge.id, // هنا عادي نخليه رقم لأنه studentChallenges يستخدم id كرقم
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

  const { title, description, difficulty, workType, deadline, challengeType } =
    challenge;

  return (
    <div className="gap-4 m-4">
      <div className="grid border border-indigo-100 shadow-2xl shadow-indigo-300 rounded-2xl p-4 text-xl">
        <ChallengeInfo label="Title" value={title} />
        <ChallengeInfo label="Description" value={description} />
        <ChallengeInfo label="Difficulty" value={difficulty} />

        <div className="flex items-center">
          <ChallengeInfo label="Work Type" value={workType} />
          {workType.toLowerCase() === "team" && (
            <button
              className="ml-6 border text-indigo-700 cursor-pointer hover:bg-indigo-900 hover:text-white rounded-2xl h-12 px-6"
              onClick={() => setShowList((prev) => !prev)}
            >
              {showList ? "Hide List" : "Invite"}
            </button>
          )}
        </div>

        <ChallengeInfo label="Deadline" value={deadline} />
        <ChallengeInfo label="Type" value={challengeType} />

        {!isJoined ? (
          <button
            onClick={handleJoinChallenge}
            className="mt-4 border bg-indigo-700 text-white rounded-2xl p-3 w-50"
          >
            Join Challenge
          </button>
        ) : (
          <p className="mt-4 text-green-500 font-semibold">
            You have successfully joined this challenge!
          </p>
        )}
      </div>

      {showList && (
        <div className="border border-indigo-100 shadow-2xl shadow-indigo-300 rounded-2xl p-4 mt-4">
          <ListOfStudent senderId={userData.id} challengeId={String(challenge.id)} />
          {/* هنا حولت challenge.id إلى String */}
        </div>
      )}
    </div>
  );
}

function ChallengeInfo({ label, value }) {
  return (
    <p className="m-3">
      <strong className="text-indigo-700">{label}:</strong>
      <br /> {value}
    </p>
  );
}

ChallengeDetails.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    challengeType: PropTypes.string.isRequired,
    workType: PropTypes.string.isRequired,
  }),
};

ChallengeInfo.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};
