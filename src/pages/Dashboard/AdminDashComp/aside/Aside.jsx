import  { useState } from 'react';
import  DashboardAd from"../dashboard/DashboardAd";
import ChallengeList from "../challenges/ChallengesList";
import  UserList from "../users/UserList";
import QuotesList  from "../quote/QuoteList"; // Make sure the path is correct

function Aside() {
  const [displayedContent, setDisplayedContent] = useState(null);

  const handleButtonClick = (Component) => {
    setDisplayedContent(<Component />);
  };

  return (
    <>
      <aside className="w-1/5 bg-white p-5 shadow-lg">
        <h2 className="text-2xl font-bold mb-6">
          {/* Corrected img tag.  Make sure the path is correct. */}
          <img src="/path/to/your/logo.png" alt="Logo" width="250px" />
        </h2>
        <nav>
          <ul>
            <li className="mb-4">
              <a
                href="#"
                className="flex text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(DashboardAd)}
              >
                {/* Corrected img tag. Make sure the path is correct. */}
                <img src="/path/to/dashboard_icon.png" alt="DashboardAd Icon" className="w-5 mr-2" />
                Dashboard
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(ChallengeList)}
              >
                🏆 Challenges
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(UserList)}
              >
                👤 User Management
              </a>
            </li>
            <li className="mb-4">
              <a
                href="#quotes"
                className="text-gray-600 hover:text-indigo-600"
                onClick={() => handleButtonClick(QuotesList)}
              >
                💬 Quote Management
              </a>
            </li>
          </ul>
        </nav>
      </aside>
      {displayedContent}
    </>
  );
}

export default Aside;
