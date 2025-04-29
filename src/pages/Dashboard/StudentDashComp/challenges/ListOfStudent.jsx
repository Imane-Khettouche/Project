import { useEffect, useState } from "react";
import PropTypes from "prop-types";

function ListOfStudent({ senderId, challengeId }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        const studentUsers = data.filter((u) => u.role === "Student");
        setUsers(studentUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const handleSendInvite = async (receiverId) => {
    try {
      const response = await fetch("http://localhost:5000/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          challengeId, // String not number, so we pass as it is
        }),
      });

      const result = await response.json();
      if (response.ok) {
        alert("✅ Invitation sent to student!");
      } else {
        alert("❌ Error: " + result.message);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      alert("❌ Network error occurred");
    }
  };

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Invite a student</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id} className="flex justify-between items-center mb-2">
            <span>{user.name}</span>
            <button
              onClick={() => handleSendInvite(user.id)}
              className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
            >
              Invite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListOfStudent.propTypes = {
  senderId: PropTypes.string.isRequired,
  challengeId: PropTypes.string.isRequired, // <-- هنا صححته لأنه String مش Number
};

export default ListOfStudent;
