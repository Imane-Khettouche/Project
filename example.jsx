import {useState} from "react";
import axios from "axios";
import PropTypes from "prop-types";

const PortfolioForm = ({existingData}) => {
  const [portfolio, setPortfolio] = useState({
    userId: existingData?.userId || "",
    privateSection: existingData?.privateSection || "",
    nickname: existingData?.nickname || "",
    skills: existingData?.skills || "",
    challenges: existingData?.challenges || "",
    socialLinks: existingData?.socialLinks || "",
  });

  const handleChange = (e) => {
    setPortfolio({...portfolio, [e.target.name]: e.target.value});
  };

  const handleApply = async () => {
    try {
      if (portfolio.idPortfolio) {
        // Update existing portfolio
        await axios.put(`/api/portfolio/${portfolio.idPortfolio}`, portfolio);
        alert("Portfolio updated ✅");
      } else {
        // Create new portfolio
        const res = await axios.post("/api/portfolio", portfolio);
        alert("Portfolio created ✅");
        setPortfolio((prev) => ({
          ...prev,
          idPortfolio: res.data.idPortfolio,
        }));
      }
    } catch (error) {
      console.error("Error saving portfolio:", error);
      alert("Failed to save portfolio ❌");
    }
  };

  return (
    <div className="p-4 space-y-2">

      <textarea
        name="privateSection"
        placeholder="Private Section"
        value={portfolio.privateSection}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="nickname"
        placeholder="Nickname"
        value={portfolio.nickname}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="skills"
        placeholder="Skills"
        value={portfolio.skills}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="challenges"
        placeholder="Challenges"
        value={portfolio.challenges}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <input
        type="text"
        name="socialLinks"
        placeholder="Social Links"
        value={portfolio.socialLinks}
        onChange={handleChange}
        className="border p-2 w-full"
      />
      <button
        onClick={handleApply}
        className="bg-blue-500 text-white px-4 py-2 rounded">
        Apply
      </button>
    </div>
  );
};
PortfolioForm.propTypes = {
  existingData: PropTypes.shape({
    idPortfolio: PropTypes.string,
    userId: PropTypes.string,
    privateSection: PropTypes.string,
    nickname: PropTypes.string,
    skills: PropTypes.string,
    challenges: PropTypes.string,
    socialLinks: PropTypes.string,
  }),
};

export default PortfolioForm;
