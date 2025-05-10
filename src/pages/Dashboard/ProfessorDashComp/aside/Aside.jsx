import { useState } from "react";
import PropTypes from "prop-types";
import { Menu } from "lucide-react"; // You can use any icon or emoji

function Aside({ setDisplayedContent, setSelectedChallenge }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = (contentKey, data = {}) => {
    setSelectedChallenge(null);
    setDisplayedContent({ key: contentKey, props: data });
    setIsOpen(false); // Close menu on mobile after selection
  };

  const navItemClass =
    "p-3 font-semibold transition-all mb-4 cursor-pointer text-indigo-800 active:bg-indigo-700 active:text-white active:rounded-l-full hover:rounded-l-full hover:bg-indigo-100";

  return (
    <>
      {/* Hamburger menu for mobile */}
      <div className="lg:hidden flex items-center p-4 bg-white shadow-md">
        <button onClick={() => setIsOpen(!isOpen)} className="text-indigo-800">
          <Menu size={28} />
        </button>
        <h1 className="ml-4 text-xl font-extrabold font-mono">SkillUp</h1>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-white text-indigo-800 shadow-lg fixed top-0 left-0 h-full w-60 z-40 transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        <h1 className="m-12 font-mono text-3xl font-extrabold hidden lg:block">SkillUp</h1>
        <nav>
          <ul className="ml-5 mt-10 text-left text-m font-bold">
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
              <button onClick={() => handleButtonClick("solutionsReview")}>
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

      {/* Overlay for closing sidebar on mobile */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 lg:hidden"
        ></div>
      )}

      {/* Main content area */}
      <div className={`lg:ml-60 p-4 transition-all ${isOpen ? "ml-0" : ""}`}>
        {/* Your main content will go here */}
      </div>
    </>
  );
}

Aside.propTypes = {
  setDisplayedContent: PropTypes.func.isRequired,
  setSelectedChallenge: PropTypes.func.isRequired,
};

export default Aside;
