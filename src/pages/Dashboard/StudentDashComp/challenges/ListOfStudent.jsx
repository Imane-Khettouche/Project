import {useEffect, useState} from "react";
import PropTypes from "prop-types";

function ListOfStudent({
  challengeId,
  setDisplayedContent,
  setSelectedChallenge,
}) {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function fetchStudents() {
      try {
        const response = await fetch(
          `http://localhost:5000/api/studentChallenges/`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch student challenge data");
        }
        const studentChallenges = await response.json();

        const studentIds = studentChallenges
          .filter((c) => c.challengeId === challengeId)
          .map((c) => c.studentId);

        const usersResponse = await fetch(`http://localhost:5000/api/users/`);
        if (!usersResponse.ok) {
          throw new Error("Failed to fetch user data");
        }
        const users = await usersResponse.json();

        const studentsInfo = users.filter((user) =>
          studentIds.includes(user.id)
        );

        setStudents(studentsInfo);
      } catch (error) {
        console.error("Error fetching students:", error);
        setStudents([]);
      }
    }

    if (challengeId) {
      fetchStudents();
    }
  }, [challengeId]);

  const handleButtonClick = (contentKey, data = {}) => {
    setSelectedChallenge(null);
    setDisplayedContent({key: contentKey, props: data});
  };

  return (
    <div className="p-2 ">
      <ul className="space-y-4">
        {students.map((student) => (
          <li
            key={student.id}
            className="flex justify-between items-center p-1  transition-all ease-in-out duration-300">
            <div className="flex justify-between">
              <span className="text-xl mr-5 font-semibold text-indigo-700">
                {student.name}
              </span>
              <span className="text-xl text-gray-500">{student.email}</span>
            </div>
            <button
              className="text-indigo-600 cursor-pointer font-medium "
              onClick={() =>
                handleButtonClick("solution", {
                  challengeId,
                  studentId: student.id,
                })
              }>
              Submitted Solution
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ListOfStudent.propTypes = {
  challengeId: PropTypes.number.isRequired,
  setDisplayedContent: PropTypes.func.isRequired,
  setSelectedChallenge: PropTypes.func.isRequired,
};

export default ListOfStudent;
