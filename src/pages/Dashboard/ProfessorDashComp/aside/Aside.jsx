import PropTypes from "prop-types";

function Aside({ setDisplayedContent, setSelectedChallenge }) {
  const handleButtonClick = (contentKey, data = {}) => {
    setSelectedChallenge(null);
    setDisplayedContent({ key: contentKey, props: data }); // Passing content key and dynamic props
  };

  const navItemClass =
    "p-3 font-semibold transition-all mb-4 cursor-pointer text-indigo-800 active:bg-indigo-700 active:text-white active:rounded-l-full hover:rounded-l-full hover:bg-indigo-100";

  return (
    <aside className="w-60 h-screen bg-white text-indigo-800 shadow-lg">
      <h1 className="m-12 font-mono text-3xl font-extrabold">SkillUp</h1>
      <nav>
        <ul className="ml-5 mt-25 text-left text-m font-bold">
          <li className={navItemClass}>
            <button onClick={() => handleButtonClick("dashboard")}>
              📊 Dashboard
            </button>
          </li>
          <li className={navItemClass}>
            <button onClick={() => handleButtonClick("createChallenge")}>
              ✏️ Create Challenge
            </button>
          </li>
          <li className={navItemClass}>
            <button onClick={() => handleButtonClick("ChallengeList")}>
              🏆 Manage Challenges
            </button>
          </li>
          <li className={navItemClass}>
            <button
              onClick={() =>
                handleButtonClick("solutionsReview")
              }
            >
              🧪 Review Solutions
            </button>
          </li>
          <li className={navItemClass}>
            <button onClick={() => handleButtonClick("profile")}>
              👨‍🏫 My Profile
            </button>
          </li>
          <li className={navItemClass}>
            <button onClick={() => handleButtonClick("help")}>
              ⚙ Help / Settings
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}

Aside.propTypes = {
  setDisplayedContent: PropTypes.func.isRequired,
  setSelectedChallenge: PropTypes.func.isRequired,
};

export default Aside;
