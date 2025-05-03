import { useState } from "react";
import Aside from "../aside/Aside";
import MainContent from "./MainContent";

function DashboardPr() {
  const [displayedContent, setDisplayedContent] = useState(null);

  return (
    <div className="flex">
      <Aside
        setDisplayedContent={setDisplayedContent}
        setSelectedChallenge={() => {}}
      />
      <MainContent displayedContent={displayedContent} />
    </div>
  );
}

export default DashboardPr;
