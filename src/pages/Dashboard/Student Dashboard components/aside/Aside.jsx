import PropTypes from "prop-types";
import {
  ChallengeBar,
  Portfolio,
  Invitations,
  MainContent,
  Setting,
} from "../index";

function Aside({setDisplayedContent, setSelectedChallenge}) {
  const handleButtonClick = (Component, withProps = false) => {
    if (withProps) {
      setDisplayedContent(
        <Component setSelectedChallenge={setSelectedChallenge} />
      );
    } else {
      setDisplayedContent(<Component />);
    }
  };

  return (
    <aside className="w-60 bg-indigo-700  h-screen text-white shadow-lg">
      <h1 className="font-extrabold font-mono text-3xl  m-12 ">SkillUp</h1>
      <nav>
        <ul className="mt-25 ml-5 text-m font-bold text-left">
          <li className="p-3 font-semibold transition-all active:bg-white active:text-indigo-800  active:rounded-l-full hover:rounded-l-full hover:bg-indigo-500 hover:text-indigo-50  mb-4 ">
            <button
              onClick={() => handleButtonClick(MainContent)}
              className="cursor-pointer">
              📊 Dashboard
            </button>
          </li>
          <li className="p-3 font-semibold transition-all active:bg-white active:text-indigo-800 active:rounded-l-full hover:rounded-l-full hover:bg-indigo-500 hover:text-indigo-50  mb-4 ">
            <button
              onClick={() => handleButtonClick(ChallengeBar, true)}
              className="cursor-pointer">
              🏆 Challenges
            </button>
          </li>
          <li className="p-3 font-semibold transition-all active:bg-white active:text-indigo-800 active:rounded-l-full hover:rounded-l-full hover:bg-indigo-500 hover:text-indigo-50  mb-4 ">
            <button
              onClick={() => handleButtonClick(Invitations)}
              className="cursor-pointer">
              🔔 Notifications
            </button>
          </li>
          <li className="p-3 font-semibold transition-all active:bg-white active:text-indigo-800 active:rounded-l-full hover:rounded-l-full hover:bg-indigo-500 hover:text-indigo-50  mb-4 ">
            <button
              onClick={() => handleButtonClick(Portfolio)}
              className="cursor-pointer">
              👤 My Portfolio
            </button>
          </li>
          <li className="p-3 font-semibold transition-all active:bg-white active:text-indigo-800 active:rounded-l-full hover:rounded-l-full hover:bg-indigo-500 hover:text-indigo-50  mb-4 ">
            <button
              onClick={() => handleButtonClick(Setting)}
              className="cursor-pointer">
              ⚙ Setting
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
