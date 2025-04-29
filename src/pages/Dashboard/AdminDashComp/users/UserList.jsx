import {useEffect, useState} from "react";

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }
    fetchUsers();
  }, []);

  const deleteUser = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (!confirm) return;

    try {
      const response = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
      });
      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        alert(data.message || "Error deleting user");
      }
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to connect to the server");
    }
  };

  return (
    <div className="bg-gray-100 m-4 p-5 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">User Management</h3>

      {users.length > 0 ? (
        <table className="w-full table-auto bg-white rounded-lg shadow">
          <thead>
            <tr className="font-bold">
              <td>ID</td>
              <td>Name</td>
              <td>Email</td>
              <td>Role</td>
              <td>Actions</td>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
                <td>
                  <button
                    className="text-red-600 px-2 mx-5 py-1 rounded-lg cursor-pointer"
                    onClick={() => deleteUser(u.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading users...</p>
      )}
    </div>
  );
}
export default UserList;
