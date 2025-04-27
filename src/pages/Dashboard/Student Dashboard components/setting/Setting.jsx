import {useState, useEffect} from "react";
import {useUser} from "../../../UserContext.jsx"; // Import the useUser hook
import PropTypes from "prop-types"; // Import PropTypes
import PortfolioSet from "./PortfolioSet.jsx"; // Assuming this is where the PortfolioSet component is

// Setting Component
function Setting({
  setDisplayedContent,
  setSelectedChallenge,
  displayedContent,
}) {
  const {userData} = useUser(); // Access user data from the context
  const [currentComponent, setCurrentComponent] = useState(null);

  const handleButtonClick = () => {
    // Pass actual user data to PortfolioSet for editing
    setCurrentComponent(
      <PortfolioSet
        setSelectedChallenge={setSelectedChallenge}
        existingData={userData.portfolio} // Pass user's portfolio data
      />
    );
    setDisplayedContent(currentComponent);
  };

  useEffect(() => {
    console.log("Displayed content changed:", displayedContent);
  }, [displayedContent]);

  return (
    <div className="flex">
      <aside className="w-60 bg-white p-5 h-screen shadow-lg">
        <nav>
          <ul>
            <li className="mb-4">
              <button
                className="text-gray-600 hover:text-indigo-600 focus:outline-none"
                onClick={handleButtonClick}
                data-testid="portfolio-set-button">
                Portfolio Setting
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      <div className="flex-1 p-5">
        {currentComponent || <div>No content selected</div>}
      </div>
    </div>
  );
}

// PropTypes for the Setting component
Setting.propTypes = {
  setDisplayedContent: PropTypes.func.isRequired, // Validate that it’s a function
  setSelectedChallenge: PropTypes.func.isRequired, // Validate that it’s a function
  displayedContent: PropTypes.node, // Validate that it’s a React node
};

export default Setting;
