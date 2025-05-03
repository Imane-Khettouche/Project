import {useState, useEffect} from "react";
import Aside from "../aside/Aside";
import MainContent from "./MainContent";
import ChallengeDetails from "../challenges/ChallengeDetails";

function Dashboard() {
  const [displayedContent, setDisplayedContent] = useState(<MainContent />);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  useEffect(() => {
    if (selectedChallenge) {
      setDisplayedContent(
        <ChallengeDetails
          challenge={selectedChallenge}
          setDisplayedContent={setDisplayedContent}
        />
      );
    } else {
      setDisplayedContent(<MainContent />);
    }
  }, [selectedChallenge]);

  return (
    <div className="flex justify-between">
      <Aside
        setDisplayedContent={setDisplayedContent}
        setSelectedChallenge={setSelectedChallenge}
        displayedContent={displayedContent}
      />
      <main className="flex-1 p-6">{displayedContent}</main>
    </div>
  );
}

export default Dashboard;
