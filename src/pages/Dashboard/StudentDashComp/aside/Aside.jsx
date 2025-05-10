import PropTypes from "prop-types";
import {
  FaTachometerAlt,
  FaTrophy,
  FaBell,
  FaUser,
  FaCog,
  FaFlagCheckered,
} from "react-icons/fa";
import {
  MyChallenges,
  ChallengeSection,
  Portfolio,
  Invitations,
  MainContent,
  Setting,
} from "../index";

function Aside({setDisplayedContent, setSelectedChallenge}) {
  const handleButtonClick = (Component) => {
    setSelectedChallenge(null);
    setDisplayedContent(<Component />);
  };
  const itemsStyle =
    "p-3 m-2 font-semibold transition-all  hover:bg-indigo-100 hover:text-indigo-700 mb-4 flex items-center group";
  return (
    <aside className="w-60  h-screen text-gray-600 shadow-lg">
      <h1 className="font-extrabold  text-indigo-600 text-3xl  m-12 ">SkillUp</h1>

      <nav>
        <ul className="mt-25 ml-5 text-m font-bold text-left">
          <li className={itemsStyle}>
            <FaTachometerAlt className="mr-2 transform transition-all duration-300 group-hover:scale-130 group-hover:rotate-12 hover:text-indigo-700" />
            <button
              onClick={() => handleButtonClick(MainContent)}
              className="cursor-pointer">
              Dashboard
            </button>
          </li>
          <li className={itemsStyle}>
            <FaTrophy className="mr-2 transform transition-all duration-300 group-hover:scale-130 group-hover:rotate-12 hover:text-indigo-700" />
            <button
              onClick={() => handleButtonClick(ChallengeSection)}
              className="cursor-pointer hover:text-indigo-700">
              Challenges
            </button>
          </li>
          <li className={itemsStyle}>
            <FaBell className="mr-2 transform transition-all duration-300 group-hover:scale-130 group-hover:rotate-12 hover:text-indigo-700" />
            <button
              onClick={() => handleButtonClick(Invitations)}
              className="cursor-pointer hover:text-indigo-700">
              Notifications
            </button>
          </li>
          <li className={itemsStyle}>
            <FaUser className="mr-2 transform transition-all duration-300 group-hover:scale-130 group-hover:rotate-12 hover:text-indigo-700" />
            <button
              onClick={() => handleButtonClick(Portfolio)}
              className="cursor-pointer hover:text-indigo-700">
              My Portfolio
            </button>
          </li>
          <li className={itemsStyle}>
            <FaCog className="mr-2 transform transition-all duration-300 group-hover:scale-130 group-hover:rotate-12 hover:text-indigo-700" />
            <button
              onClick={() => handleButtonClick(Setting)}
              className="cursor-pointer hover:text-indigo-700">
              Setting
            </button>
          </li>
          <li className={itemsStyle}>
            <FaFlagCheckered className="mr-2 transform transition-all duration-300 group-hover:scale-130 group-hover:rotate-12 hover:text-indigo-700" />
            <button
              onClick={() => handleButtonClick(MyChallenges)}
              className="cursor-pointer hover:text-indigo-700">
              My Challenges
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
