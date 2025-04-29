import { useState, useEffect } from "react";
import Aside from "../aside";
import StudentInfo from "../profile/StudentInfo";
import MainContent from "./MainContent";
import ChallengeDetails from "../challenges/ChallengeDetails";

function Dashboard() {
  const [displayedContent, setDisplayedContent] = useState(<MainContent />);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    if (selectedChallenge) {
      setDisplayedContent(<ChallengeDetails challenge={selectedChallenge} />);
    } else {
      setDisplayedContent(<MainContent />);
    }
  }, [selectedChallenge]);

  return (
    <div className="flex justify-between">
      <Aside
        setDisplayedContent={setDisplayedContent}
        setSelectedChallenge={setSelectedChallenge}
        displayedContent={displayedContent}  // Pass displayedContent here
      />
      <main className="flex-1 p-6">{displayedContent}</main>
      <StudentInfo />
    </div>
  );
}

export default Dashboard;
