import PropTypes from "prop-types";

// Import your components
import DashboardPr from "./DashboardPr";
import AddChallenge from "../challenges/ChallengesAdd";
import ChallengesList from "../challenges/ChallengeList";
import SolutionEvaluation from "../solution/SolutionEvaluation";
import SolutionReview from "../solution/SolutionsReview";
import Profile from "../profile/Profile";
function MainContent({displayedContent}) {
  const renderContent = () => {
    switch (displayedContent?.key) {
      case "dashboard":
        return <DashboardPr />;
      case "createChallenge":
        return <AddChallenge />;
      case "ChallengeList":
        return <ChallengesList />;
      case "solution":
        return (
          <SolutionEvaluation
          />
        );
      case "solutionsReview":
        return <SolutionReview />;
      case "profile":
        return <Profile />;
      case "help":
        return <p>Help Section</p>;
      default:
        return <p data-testid="fallback-message">Select an option from the menu</p>;
    }
  };

  return (
    <main className="flex-1 p-6 bg-gray-50" data-testid="main-content">
      {renderContent()}
    </main>
  );
}

MainContent.propTypes = {
  displayedContent: PropTypes.shape({
    key: PropTypes.string,
    props: PropTypes.object,
  }),
};

export default MainContent;
