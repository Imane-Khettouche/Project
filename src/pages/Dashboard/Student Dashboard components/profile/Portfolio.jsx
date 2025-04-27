import {useEffect, useState} from "react";
import {useUser} from "../../../UserContext.jsx";
function Portfolio() {
  const {userData} = useUser();
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        // جلب كل سجلات انضمام الطالب للتحديات
        const response = await fetch(
          "http://localhost:5000/api/studentChallenges"
        );
        const studentChallenges = await response.json();
        const studentJoined = studentChallenges.filter(
          (c) => c.studentId === userData.id
        );

        // جلب كل التحديات
        const allChallengesResponse = await fetch(
          "http://localhost:5000/api/challenges"
        );
        const allChallenges = await allChallengesResponse.json();

        // ربط كل challengeId بتفاصيل التحدي
        const fullChallengeDetails = studentJoined.map((joined) =>
          allChallenges.find((challenge) => challenge.id === joined.challengeId)
        );

        setJoinedChallenges(fullChallengeDetails);
      } catch (error) {
        console.error("Error fetching joined challenges:", error);
      }
    }

    fetchChallenges();
  }, []);

  return (
    <div className="profile-container p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-2">My Portfolio</h1>
      <h2 className="text-lg mb-4">
        Hello, {userData.name}! (ID: {userData.id})
      </h2>

      <div className="joined-challenges">
        <h3 className="text-xl font-semibold mb-2">Your Joined Challenges</h3>
        <ul>
          {joinedChallenges.map((challenge) => (
            <li
              key={challenge.id}
              className="mb-2 border p-2 rounded bg-white shadow">
              <h4 className="font-bold text-indigo-600">{challenge.title}</h4>
              <p>{challenge.description}</p>
              <p className="text-sm text-gray-500">
                Start: {challenge.startDate}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Portfolio;
