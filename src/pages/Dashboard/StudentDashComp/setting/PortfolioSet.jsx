import {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {useUser} from "../../../UserContext.jsx";
const Profile = () => {
  const {userData} = useUser();
  const [portfolio, setPortfolio] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch portfolio data for the user
        const response = await axios.get(
          `http://localhost:5000/api/portfolios/${userData.id}`
        );
        setPortfolio(response.data);
      } catch (error) {
        console.error("Error fetching portfolio:", error);
      }
    }

    fetchData();
  }, [userData.id]);

  const handleChange = (e) => {
    const {name, value} = e.target;
    setPortfolio((prev) => ({...prev, [name]: value}));
  };

  const addSkill = () => {
    setPortfolio((prev) => ({
      ...prev,
      skills: [...prev.skills, ""], // Adds an empty skill
    }));
  };

  const addSocialLink = () => {
    setPortfolio((prev) => ({
      ...prev,
      socialLinks: [...prev.socialLinks, ""], // Adds an empty social link
    }));
  };

  const removeSkill = (index) => {
    setPortfolio((prev) => {
      const updatedSkills = prev.skills.filter((_, i) => i !== index);
      return {...prev, skills: updatedSkills};
    });
  };

  const removeSocialLink = (index) => {
    setPortfolio((prev) => {
      const updatedLinks = prev.socialLinks.filter((_, i) => i !== index);
      return {...prev, socialLinks: updatedLinks};
    });
  };

  const handleApply = async () => {
    try {
      if (portfolio.idPortfolio) {
        await axios.put(`/api/portfolio/${portfolio.idPortfolio}`, portfolio);
        alert("Portfolio updated successfully ✅");
      } else {
        const {data} = await axios.post("/api/portfolio", portfolio);
        alert("Portfolio created successfully ✅");
        setPortfolio((prev) => ({...prev, idPortfolio: data.idPortfolio}));
      }
    } catch (error) {
      console.error(
        "Error saving portfolio:",
        error.response?.data || error.message
      );
      alert(
        `Failed to save portfolio: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Profile Information</h2>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Nickname
        </label>
        <input
          type="text"
          name="nickname"
          value={portfolio?.nickname || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          placeholder="Enter your nickname"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Private Section
        </label>
        <textarea
          name="privateSection"
          value={portfolio?.privateSection || ""}
          onChange={handleChange}
          className="border p-2 w-full rounded"
          rows={4}
          placeholder="Enter private information"
        />
      </div>

      {/* Skills Table */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Skills
        </label>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Skill</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolio?.skills?.map((skill, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <input
                    type="text"
                    value={skill}
                    onChange={(e) => {
                      const updatedSkills = [...portfolio.skills];
                      updatedSkills[index] = e.target.value;
                      setPortfolio((prev) => ({
                        ...prev,
                        skills: updatedSkills,
                      }));
                    }}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => removeSkill(index)}
                    className="text-red-600 hover:underline">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addSkill}
          className="px-4 py-2 mt-2 bg-green-600 text-white rounded hover:bg-green-700">
          Add Skill
        </button>
      </div>

      {/* Social Links Table */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          Social Links
        </label>
        <table className="min-w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Link</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {portfolio?.socialLinks?.map((link, index) => (
              <tr key={index}>
                <td className="border p-2">
                  <input
                    type="text"
                    value={link}
                    onChange={(e) => {
                      const updatedLinks = [...portfolio.socialLinks];
                      updatedLinks[index] = e.target.value;
                      setPortfolio((prev) => ({
                        ...prev,
                        socialLinks: updatedLinks,
                      }));
                    }}
                    className="border p-1 w-full"
                  />
                </td>
                <td className="border p-2">
                  <button
                    onClick={() => removeSocialLink(index)}
                    className="text-red-600 hover:underline">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          onClick={addSocialLink}
          className="px-4 py-2 mt-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Add Social Link
        </button>
      </div>

      {/* Apply Button */}
      <div className="flex justify-end space-x-3 pt-4">
        <button
          onClick={handleApply}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          Apply
        </button>
      </div>
    </div>
  );
};

Profile.propTypes = {
  userData: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }),
};

export default Profile;
