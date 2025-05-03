import { useState } from "react";
import { toast } from "react-toastify";

export default function TeamOptions() {
  const [teamCode, setTeamCode] = useState("");

  const handleCreateTeam = () => {
    toast.success("Creating your team!");
  };

  const handleEnterTeamCode = () => {
    toast.success(`Joined the team with code: ${teamCode}`);
  };

  return (
    <div className="border border-indigo-100 shadow-lg rounded-2xl p-6 bg-white mt-6">
      <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Team Options</h3>
      <div className="flex flex-col gap-4">
        <button
          onClick={handleCreateTeam}
          className="border bg-indigo-700 text-white rounded-2xl p-3 w-full hover:bg-indigo-800"
        >
          Create a New Team
        </button>
        <div className="w-full">
          <label className="block text-indigo-700 font-medium mb-2">Enter Team Code</label>
          <input
            type="text"
            value={teamCode}
            onChange={(e) => setTeamCode(e.target.value)}
            className="mt-2 border p-3 rounded-xl w-full"
            placeholder="Enter team code"
          />
          <button
            onClick={handleEnterTeamCode}
            className="mt-4 border bg-indigo-700 text-white rounded-2xl p-3 w-full hover:bg-indigo-800"
          >
            Join Team
          </button>
        </div>
      </div>
    </div>
  );
}
