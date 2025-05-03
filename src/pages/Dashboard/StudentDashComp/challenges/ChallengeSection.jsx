import {useState} from "react";
import ChallengesBar from "./ChallengeBar.jsx";
import ChallengeDetails from "./ChallengeDetails.jsx";

export default function ChallengeSection() {
  const [displayedContent, setDisplayedContent] = useState("ChallengeBar");
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  return (
    <>
      {displayedContent === "ChallengeBar" && (
        <ChallengesBar
          setDisplayedContent={setDisplayedContent}
          setSelectedChallenge={setSelectedChallenge}
        />
      )}

      {displayedContent === "ChallengeDetails" && selectedChallenge && (
        <ChallengeDetails
          challenge={selectedChallenge}
          setDisplayedContent={setDisplayedContent}
        />
      )}
    </>
  );
}
