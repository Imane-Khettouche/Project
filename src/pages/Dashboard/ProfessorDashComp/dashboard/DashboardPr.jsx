import { useState } from "react";
import Aside from "../aside/Aside";
import MainContent from "./MainContent";

function DashboardPr() {
  const [displayedContent, setDisplayedContent] = useState(null);

  return (
    <div className="flex flex-col md:flex-row  bg-gradient-to-r from-indigo-50 to-indigo-200">
      {/* Aside component: Always hidden on small screens, shown on medium and larger screens */}
      <Aside
        setDisplayedContent={setDisplayedContent}
        setSelectedChallenge={() => {}}
        className="hidden md:block md:w-1/4"
      />

      {/* MainContent: Takes full width on small screens, and 3/4 width on larger screens */}
      <MainContent displayedContent={displayedContent} className="flex-1" />
    </div>
  );
}

export default DashboardPr;
