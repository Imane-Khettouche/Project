import { useEffect, useState } from "react";

function Invitations() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/invite");
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching invitations:", error);
    }
  };

  const handleResponse = async (notificationId, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/invite/${notificationId}`,
        {
          method: "PATCH", // يجب أن يكون PATCH
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status }), // تأكد أن status عبارة عن accepted أو declined فقط
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update invitation status");
      }

      // بعد التحديث نعيد تحميل الإشعارات
      fetchNotifications();
    } catch (error) {
      console.error("Error updating invitation status:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Invitations</h2>
      {notifications.length === 0 ? (
        <p>No invitations available.</p>
      ) : (
        notifications.map((notification) => (
          <div
            key={notification.id}
            className="border p-4 mb-4 rounded-md shadow-md"
          >
            <p className="mb-2">{notification.message}</p>
            <div className="flex gap-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                onClick={() => handleResponse(notification.id, "accepted")}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                onClick={() => handleResponse(notification.id, "declined")}
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Invitations;
