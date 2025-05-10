import {useState, useEffect} from "react";
import axios from "axios";
import PropTypes from "prop-types";
import {useUser} from "../../../UserContext.jsx";

const Profile = () => {
  const {userData} = useUser();
  const [portfolio, setPortfolio] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [originalPortfolio, setOriginalPortfolio] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/portfolios/${userData.id}`
        );
        setPortfolio(response.data);
        setOriginalPortfolio(response.data); // Store original for cancel
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
      skills: [...(prev.skills || []), ""],
    }));
  };

  const removeSkill = (index) => {
    setPortfolio((prev) => {
      const updated = prev.skills.filter((_, i) => i !== index);
      return {...prev, skills: updated};
    });
  };

  const addSocialLink = () => {
    setPortfolio((prev) => ({
      ...prev,
      socialLinks: [...(prev.socialLinks || []), ""],
    }));
  };

  const removeSocialLink = (index) => {
    setPortfolio((prev) => {
      const updated = prev.socialLinks.filter((_, i) => i !== index);
      return {...prev, socialLinks: updated};
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
      setEditMode(false);
      setOriginalPortfolio(portfolio); // update saved state
    } catch (error) {
      console.error("Error saving portfolio:", error.response?.data || error.message);
      alert(
        `Failed to save portfolio: ${
          error.response?.data?.message || error.message
        }`
      );
    }
  };

  const handleCancel = () => {
    setPortfolio(originalPortfolio);
    setEditMode(false);
  };

  return (
    <div className="p-4 space-y-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-2">Profile Information</h2>

      <button
        onClick={() => setEditMode((prev) => !prev)}
        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
        {editMode ? "Cancel Editing" : "Edit Profile"}
      </button>

      {/* Nickname */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Nickname
        </label>
        {editMode ? (
          <input
            type="text"
            name="nickname"
            value={portfolio?.nickname || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
          />
        ) : (
          <p className="p-2 bg-gray-100 rounded">{portfolio?.nickname}</p>
        )}
      </div>

      {/* Private Section */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Private Section
        </label>
        {editMode ? (
          <textarea
            name="privateSection"
            value={portfolio?.privateSection || ""}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            rows={4}
          />
        ) : (
          <p className="p-2 bg-gray-100 rounded whitespace-pre-line">
            {portfolio?.privateSection}
          </p>
        )}
      </div>

      {/* Skills */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Skills</label>
        {editMode ? (
          <>
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
          </>
        ) : (
          <ul className="list-disc list-inside">
            {portfolio?.skills?.map((skill, idx) => (
              <li key={idx}>{skill}</li>
            ))}
          </ul>
        )}
      </div>

      {/* Social Links */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Social Links</label>
        {editMode ? (
          <>
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
                          const updated = [...portfolio.socialLinks];
                          updated[index] = e.target.value;
                          setPortfolio((prev) => ({
                            ...prev,
                            socialLinks: updated,
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
          </>
        ) : (
          <ul className="list-disc list-inside text-blue-600">
            {portfolio?.socialLinks?.map((link, idx) => (
              <li key={idx}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                  {link}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Action Buttons */}
      {editMode && (
        <div className="flex justify-end space-x-3 pt-4">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
            Cancel
          </button>
          <button
            onClick={handleApply}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
            Apply
          </button>
        </div>
      )}
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
