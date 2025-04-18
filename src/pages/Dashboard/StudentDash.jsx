import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import {useUser} from "../UserContext.jsx";

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
    <aside className="w-60 bg-white p-5 shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Menu</h2>
      <nav>
        <ul>
          <li className="mb-4">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600"
              onClick={() => handleButtonClick(null)}>
              Dashboard
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600"
              onClick={() => handleButtonClick(ChallengeBar, true)}>
              🏆 Challenges
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600"
              onClick={() => handleButtonClick(Invitations)}>
              🔔 Notifications
            </a>
          </li>
          <li className="mb-4">
            <a
              href="#"
              className="text-gray-600 hover:text-indigo-600"
              onClick={() => handleButtonClick(StudentInfo)}>
              👤 My Info
            </a>
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



function StudentInfo() {
  const {userData} = useUser();
  if (!userData) {
    return <p className="text-center mt-5 text-red-500">There is no info</p>;
  }

  return (
    <div className="grid justify-center bg-gray-100 p-4 rounded">
      <h1 className="text-gray-600">{userData.email}</h1>
    </div>
  );
}

function QuoteBar() {
  const [quotes, setQuotes] = useState([]);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState("animate__fadeIn");

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/quotes");
        if (response.ok) {
          const data = await response.json();
          setQuotes(data);
        } else {
          console.error("Failed to fetch quotes:", response.status);
        }
      } catch (error) {
        console.error("Error fetching quotes:", error);
      }
    };

    fetchQuotes();
  }, []);

  useEffect(() => {
    if (quotes.length === 0) return;

    const timer = setTimeout(() => {
      setAnimationClass("animate__fadeOutRight");

      setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % quotes.length);
        setAnimationClass("animate__fadeInLeft");
      }, 500);
    }, 8000);

    return () => clearTimeout(timer);
  }, [currentTextIndex, quotes]);

  if (quotes.length === 0) {
    return <div>Loading texts...</div>;
  }

  return (
    <div className="bg-indigo-600  h-35 rounded-2xl ">
      <div
        className={`text-2xl p-6 text-white font-bold animate__animated ${animationClass}`}>
        {quotes[currentTextIndex]?.quoteDes || "No quote available"}
      </div>
    </div>
  );
}

function ChallengeDetails({challenge}) {
  const [showList, setShowList] = useState(false);
  const {userData} = useUser();

  if (!challenge) return null;

  return (
    <div className="flex gap-4 m-4">
      <div className="border p-4 text-xl w-1/2">
        <p className="m-1">
          <strong>Title:</strong> {challenge.title}
        </p>
        <p className="m-1">
          <strong>Description:</strong> {challenge.description}
        </p>
        <p className="m-1">
          <strong>Difficulty:</strong> {challenge.difficulty}
        </p>
        <p className="m-1">
          <strong>Work Type:</strong> {challenge.workType}
        </p>

        {challenge.workType.toLowerCase() === "team" && (
          <button
            className="border mt-2 px-4 py-1 rounded cursor-pointer bg-indigo-100"
            onClick={() => setShowList(!showList)}>
            {showList ? "Hide List" : "Invite"}
          </button>
        )}

        <p className="m-1 mt-2">
          <strong>Deadline:</strong> {challenge.deadline}
        </p>
        <p className="m-1">
          <strong>Type:</strong> {challenge.challengeType}
        </p>
      </div>

      {showList && (
        <div className="w-1/2">
          <ListOfStudent senderId={userData?.id} challengeId={challenge.id} />
        </div>
      )}
    </div>
  );
}

ChallengeDetails.propTypes = {
  challenge: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    difficulty: PropTypes.string.isRequired,
    deadline: PropTypes.string.isRequired,
    challengeType: PropTypes.string.isRequired,
    workType: PropTypes.string.isRequired,
  }),
};
function ChallengeBar() {
  const [challenges, setChallenges] = useState([]);
  const [filteredChallenges, setFilteredChallenges] = useState([]);
  const [challengeTypes, setChallengeTypes] = useState([]);
  const [expandedChallenge, setExpandedChallenge] = useState(null); // Track which challenge is expanded

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch("http://localhost:5000/api/challenges");
        const data = await response.json();
        setChallenges(data);

        // Extract different challenge types
        const types = [...new Set(data.map((c) => c.challengeType))];
        setChallengeTypes(types);
        setFilteredChallenges(data);
      } catch (error) {
        console.error("Error fetching challenges:", error);
      }
    }

    fetchChallenges();
  }, []);

  const filterByType = (type) => {
    if (type === "All") {
      setFilteredChallenges(challenges);
    } else {
      const filtered = challenges.filter(
        (challenge) => challenge.challengeType === type
      );
      setFilteredChallenges(filtered);
    }
  };

  const handleViewMoreClick = (challenge) => {
    if (expandedChallenge?.id === challenge.id) {
      setExpandedChallenge(null); // If the clicked challenge is already expanded, collapse it
    } else {
      setExpandedChallenge(challenge); // Expand the clicked challenge
    }
  };

  return (
    <div className="h-screen p-10">
      {/* Filter Buttons */}
      <div className="flex mb-5 space-x-3">
        <button
          onClick={() => filterByType("All")}
          className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-800 transition duration-200"
        >
          All
        </button>
        {challengeTypes.map((type) => (
          <button
            key={type}
            onClick={() => filterByType(type)}
            className="px-6 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-800 transition duration-200"
          >
            {type}
          </button>
        ))}
      </div>

      {/* Challenges Cards */}
      <div className="flex flex-wrap">
        {filteredChallenges.map((c) => (
          <div
            key={c.id}
            className="bg-white border border-gray-300 rounded-xl shadow-lg p-5 hover:shadow-2xl transition duration-300 cursor-pointer m-2"
          >
            {!expandedChallenge || expandedChallenge.id !== c.id ? (
              <>
                <h1 className="text-xl font-semibold mb-2">
                  <span className="font-bold">Title:</span> {c.title}
                </h1>
                <p className="text-gray-700">
                  <span className="font-bold">Difficulty:</span> {c.difficulty}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Deadline:</span> {c.deadline}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Work Type:</span> {c.workType}
                </p>
                <p className="text-gray-700">
                  <span className="font-bold">Challenge Type:</span>{" "}
                  {c.challengeType}
                </p>
                <button
                  className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-800 transition duration-200"
                  onClick={() => handleViewMoreClick(c)}
                >
                  View More..
                </button>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold mb-4">{c.title}</h1>
                <p>
                  <strong>Difficulty:</strong> {c.difficulty}
                </p>
                <p>
                  <strong>Deadline:</strong> {c.deadline}
                </p>
                <p>
                  <strong>Work Type:</strong> {c.workType}
                </p>
                <p>
                  <strong>Challenge Type:</strong> {c.challengeType}
                </p>
                <p>
                  <strong>Description:</strong> {c.description}
                </p>
                {/* Optional: Add more detailed information */}
                <button
                  className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-800 transition duration-200"
                  onClick={() => handleViewMoreClick(c)}
                >
                  Close Details
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}



ChallengeBar.propTypes = {
  setSelectedChallenge: PropTypes.func.isRequired,
};

ChallengeBar.propTypes = {
  setSelectedChallenge: PropTypes.func.isRequired,
};

function ListOfStudent({senderId, challengeId}) {
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
    console.log("Sending invite with:", {senderId, receiverId, challengeId});

    try {
      const response = await fetch("http://localhost:5000/api/invite", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          senderId,
          receiverId,
          challengeId,
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
              className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600">
              Invite
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListOfStudent.propTypes = {
  senderId: PropTypes.number,
  challengeId: PropTypes.number,
};

function Invitations() {
  const [invitations, setInvitations] = useState([]);
  const {userData} = useUser();

  useEffect(() => {
    async function fetchInvitations() {
      if (userData && userData.id) {
        try {
          const response = await fetch(
            `http://localhost:5000/api/invite/received/${userData.id}`
          );

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Error from server:", errorText);
            return;
          }

          const data = await response.json();
          setInvitations(data); // احتفظنا بكل الدعوات (pending و non-pending)
        } catch (error) {
          console.error("Error fetching invitations:", error);
        }
      }
    }

    fetchInvitations();
  }, [userData]);

  const handleResponse = async (inviteId, response) => {
    try {
      const res = await fetch(`http://localhost:5000/api/invite/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inviteId,
          status: response,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text();
        console.error("Error responding to invitation:", errorText);
        return;
      }

      const updatedInvite = await res.json();

      if (updatedInvite) {
        const notifyRes = await fetch(
          `http://localhost:5000/api/invite/notify-sender`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              senderId: updatedInvite.senderId,
              inviteId,
              status: response,
            }),
          }
        );

        if (!notifyRes.ok) {
          const notifyErrorText = await notifyRes.text();
          console.error("Error notifying sender:", notifyErrorText);
          return;
        }
      }

      setInvitations((prevInvitations) =>
        prevInvitations.map((invite) =>
          invite.id === inviteId ? {...invite, status: response} : invite
        )
      );
    } catch (error) {
      console.error("Error responding to invitation:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-3">📨 Invitations</h2>

      {invitations.length === 0 ? (
        <p>No invitations available.</p>
      ) : (
        <ul className="space-y-2">
          {invitations.map((invite) => (
            <li
              key={invite.id}
              className="p-3 bg-yellow-100 text-yellow-900 rounded shadow-sm">
              <p>📢 Challenge #{invite.challengeId}</p>
              <p>👤 From: {invite.sender?.name || "Unknown user"}</p>
              <p>🕒 Sent on: {new Date(invite.createdAt).toLocaleString()}</p>

              {/* إذا كان المستخدم هو المرسل، عرض الرد */}
              {userData.id === invite.senderId ? (
                <p className="mt-2">
                  ✅ The invitee has{" "}
                  <span
                    className={
                      invite.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }>
                    {invite.status}
                  </span>{" "}
                  your invitation.
                </p>
              ) : invite.status === "pending" ? (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleResponse(invite.id, "accepted")}
                    className="m-10 bg-green-500 text-white rounded hover:bg-green-700">
                    Accept
                  </button>
                  <button
                    onClick={() => handleResponse(invite.id, "declined")}
                    className="m-10 bg-red-500 text-white rounded hover:bg-red-700">
                    Decline
                  </button>
                </div>
              ) : (
                <p className="mt-2 text-gray-600">
                  You responded:{" "}
                  <span
                    className={
                      invite.status === "accepted"
                        ? "text-green-600"
                        : "text-red-600"
                    }>
                    {invite.status}
                  </span>
                </p>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
function MainContent(){return(<><QuoteBar/></>)}
export {StudentInfo, QuoteBar, ChallengeBar, ChallengeDetails, ListOfStudent};

function Dashboard() {
  const [displayedContent, setDisplayedContent] = useState(<MainContent />);
  const [selectedChallenge, setSelectedChallenge] = useState(null);

  return (
    <div className="flex">
      <Aside
        setDisplayedContent={setDisplayedContent}
        setSelectedChallenge={setSelectedChallenge}
      />
      <main className="flex-1 p-6">
        {displayedContent}
        {selectedChallenge && <ChallengeDetails challenge={selectedChallenge} />}
      </main>
      <StudentInfo />
    </div>
  );
}


export default Dashboard;
