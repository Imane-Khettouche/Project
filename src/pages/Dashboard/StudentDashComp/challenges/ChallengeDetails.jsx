import PropTypes from "prop-types";
import JoinToChallenge from "./JoinToChallenge";
import {useUser} from "../../../UserContext";

// Helper function to format date
function formatDate(deadline) {
  const date = new Date(deadline);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

// Details component for rendering challenge information
function Details({challenge}) {
  return (
    <div className="grid gap-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-semibold text-indigo-700">
          {challenge.title}
        </h1>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-red-100 text-red-800">
          Deadline: {formatDate(challenge.deadline)}
        </span>
      </div>
      <p className="text-gray-700 leading-relaxed">{challenge.description}</p>
      <div className="flex flex-wrap gap-2 text-sm font-medium text-gray-600">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
          Difficulty: {challenge.difficulty}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-green-100 text-green-800">
          Language: {challenge.language}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-800">
          Type: {challenge.challengeType}
        </span>
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full bg-yellow-100 text-yellow-800">
          Work Type: {challenge.workType}
        </span>
      </div>
    </div>
  );
}

// Main ChallengeDetails component
function ChallengeDetails({challenge}) {
  // Use the user data from the context
  const {userData} = useUser();

  return (
   <>
        <div className="m-6 mb-6 p-6 h-full bg-white rounded-lg shadow-md border border-gray-200">
          <Details challenge={challenge} />
         
            <JoinToChallenge challenge={challenge} studentId={userData?.id} />

        </div>
      </>
  );
}

// PropTypes for ChallengeDetails component
ChallengeDetails.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    challengeType: PropTypes.string, // Optional
    workType: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  }).isRequired,
};

// PropTypes for Details component
Details.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    challengeType: PropTypes.string, // Optional
    workType: PropTypes.string.isRequired,
    language: PropTypes.string.isRequired,
  }).isRequired,
};

export default ChallengeDetails;
