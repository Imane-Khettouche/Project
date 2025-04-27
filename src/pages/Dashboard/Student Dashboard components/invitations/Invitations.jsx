import {useEffect, useState} from "react";
import {useUser} from "../../../UserContext.jsx";

function Invitations() {
  const [notifications, setNotifications] = useState([]);
  const {userData} = useUser();

  useEffect(() => {
    async function fetchNotifications() {
      if (userData && userData.id) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/invite/received/${userData.id}`
          );
          const data = await response.json();

          // Check if data is an array before calling filter
          if (Array.isArray(data)) {
            setNotifications(
              data.filter((invite) => invite.status === "pending")
            );
          } else {
            console.error("Expected an array but got:", data);
          }
        } catch (error) {
          console.error("Error fetching notifications:", error);
        }
      }
    }

    fetchNotifications();
  }, [userData]);

  const handleResponse = async (notificationId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/invite/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({status}), // Update to "Accepted" or "Rejected"
        }
      );
      const data = await response.json();

      if (response.ok) {
        setNotifications((prev) =>
          prev.filter((notification) => notification.id !== notificationId)
        );
        alert(`Invitation ${status}`);
      } else {
        alert(`Error: ${data.message || "Failed to update invitation"}`);
      }
    } catch (error) {
      console.error("Error responding to invitation:", error);
      alert("Error responding to invitation");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invitation Responses</h2>
      {notifications.length === 0 ? (
        <p className="text-gray-500">No pending invitations</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`p-5 rounded-lg shadow-md border ${
                notification.status === "accepted"
                  ? "bg-green-50 border-green-200"
                  : "bg-red-50 border-red-200"
              }`}>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">
                    {notification.sender?.name || "Sender"}
                  </h3>
                  <p className="text-gray-600">
                    You have been invited to{" "}
                    <span className="font-medium">
                      {notification.challenge?.title}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleResponse(notification.id, "Accepted")}
                    className="px-3 py-1 bg-green-200 text-green-700 rounded hover:bg-green-300">
                    Accept
                  </button>
                  <button
                    onClick={() => handleResponse(notification.id, "Rejected")}
                    className="px-3 py-1 bg-red-200 text-red-700 rounded hover:bg-red-300">
                    Reject
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Invitations;
