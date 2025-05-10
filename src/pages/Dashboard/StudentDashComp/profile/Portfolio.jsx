import { useEffect, useState } from "react";
import { useUser } from "../../../UserContext.jsx";
import ph from "../img/29dddbb74db0c68adc5358271281e03a.jpg";
import {
  BriefcaseIcon,
  EnvelopeIcon,
  LinkIcon,
  UserIcon,
  CalendarIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline"; // Importing more icons

function Portfolio() {
  const { userData } = useUser();
  const [joinedChallenges, setJoinedChallenges] = useState([]);

  useEffect(() => {
    async function fetchChallenges() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/studentChallenges"
        );
        const studentChallenges = await response.json();
        const studentJoined = studentChallenges.filter(
          (c) => c.studentId === userData.id
        );

        const allChallengesResponse = await fetch(
          "http://localhost:5000/api/challenges"
        );
        const allChallenges = await allChallengesResponse.json();

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
    <div className="relative p-6 md:p-12 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex items-center justify-center">
      {/* Subtle Background Pattern */}
      <div
        className="absolute inset-0 -z-10 bg-pattern bg-repeat opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h20v20H0V0zm20 20h20v20H20V20z' fill='%23e0e0e0' fill-opacity='0.4'/%3E%3C/svg%3E")`,
        }}></div>
      {/* Background Bubbles (more refined) */}
      <div className="absolute top-1/4 left-1/4 w-40 h-40 bg-indigo-100 rounded-full -z-10 blur-xl opacity-30 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-100 rounded-full -z-10 blur-xl opacity-30 translate-x-1/2 translate-y-1/2"></div>

      <div className="bg-white rounded-xl shadow-xl p-8 md:p-12 w-full max-w-4xl space-y-8">
        <div className="text-center">
          <img
            src={ph}
            alt="Profile picture"
            className="mx-auto rounded-full w-32 h-32 object-cover shadow-md border-4 border-indigo-300 transform transition-all duration-300 ease-in-out hover:scale-105"
          />
          <h1 className="text-3xl font-bold text-indigo-700 mt-4">
            {userData.nickname || "My Portfolio"}
          </h1>
          {userData.privateSection && (
            <p className="text-gray-600 mt-2">{userData.privateSection}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column - Contact & Skills */}
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold text-indigo-600 mb-3 flex items-center space-x-2">
                <UserIcon className="w-5 h-5 text-indigo-500" />
                <span>Contact</span>
              </h2>
              <ul className="text-gray-700 space-y-3">
                <li className="flex items-center space-x-3">
                  <EnvelopeIcon className="w-5 h-5 text-indigo-500" />
                  <span>{userData.email}</span>
                </li>
                {userData.socialLinks && (
                  <li className="space-y-1">
                    <div className="flex items-center space-x-3">
                      <LinkIcon className="w-5 h-5 text-indigo-500" />
                      <strong>Links:</strong>
                    </div>
                    <div className="mt-1 space-x-2">
                      {userData.socialLinks.split(",").map((link, index) => (
                        <a
                          key={index}
                          href={link.trim()}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-500 hover:underline text-sm">
                          {/* You could add icons here based on the platform */}
                          {link.trim()}
                        </a>
                      ))}
                    </div>
                  </li>
                )}
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-indigo-600 mb-3 flex items-center space-x-2">
                <CodeBracketIcon className="w-5 h-5 text-indigo-500" />
                <span>Skills</span>
              </h2>
              <p className="text-gray-700">{userData.skills}</p>
            </section>
          </div>

          {/* Right Column - Joined Challenges */}
          <div>
            <h2 className="text-xl font-semibold text-indigo-600 mb-4 flex items-center space-x-2">
              <BriefcaseIcon className="w-5 h-5 text-indigo-500" />
              <span>Joined Challenges</span>
            </h2>
            {joinedChallenges.length === 0 ? (
              <p className="text-gray-600 italic">
                You haven&apos;t joined any challenges yet.
              </p>
            ) : (
              <ul className="space-y-4">
                {joinedChallenges.map((challenge) => (
                  <li
                    key={challenge.id}
                    className="bg-indigo-50 hover:bg-indigo-100 transition-all rounded-md border border-indigo-200 p-5 shadow-sm transform transition duration-300 ease-in-out hover:scale-105">
                    <h3 className="text-lg font-semibold text-indigo-700">
                      {challenge.title}
                    </h3>
                    <p className="text-gray-700 mt-2 line-clamp-2">
                      {challenge.description}
                    </p>
                    {challenge.startDate && (
                      <div className="flex items-center space-x-2 mt-2 text-sm text-gray-500">
                        <CalendarIcon className="w-4 h-4" />
                        <span>Start Date: {challenge.startDate}</span>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Portfolio;
