import {useEffect, useState} from "react";
import PropTypes from "prop-types";
import StudentSolution from "./solutionEvaluation"; // import the StudentSolution component

function ListOfStudent({challengeId}) {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStudentId, setSelectedStudentId] = useState(null); // Track selected student

  useEffect(() => {
    async function fetchStudents() {
      setLoading(true);
      setError(null);
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
        setLoading(false);
      } catch (err) {
        console.error("Error fetching students:", err);
        setError(err.message);
        setLoading(false);
        setStudents([]);
      }
    }

    if (challengeId) fetchStudents();
  }, [challengeId]);

  const handleButtonClick = (studentId) => {
    setSelectedStudentId(studentId); // Set selected student ID
  };

  const handleBackClick = () => {
    setSelectedStudentId(null); // Clear selected student and return to list
  };

  if (loading) {
    return (
      <div className="p-2 flex justify-center items-center opacity-70">
        <span className="ml-2 text-gray-500 text-sm italic">
          Fetching students...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-2 text-red-400 bg-red-50 rounded-md border border-red-200 opacity-80">
        <span className="text-sm">Failed to load students: {error}</span>
      </div>
    );
  }

  if (selectedStudentId) {
    return (
      <StudentSolution
        studentId={selectedStudentId}
        challengeId={challengeId}
        handleBackClick={handleBackClick} // Pass handleBackClick to go back
      />
    );
  }

  return (
    <div className=" bg-white  border-b border-gray-100">
      <ul className="space-y-2">
        {students.map((student) => (
          <li
            key={student.id}
            className="bg-gray-50 flex justify-between items-center p-2 transition-shadow duration-200 ease-in-out hover:shadow-md">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full border border-indigo-50 flex items-center justify-center font-semibold text-sm mr-3 opacity-80">
                {student.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <span className="block font-medium text-indigo-700 text-sm">
                  {student.name}
                </span>
                <span className="block text-xs text-gray-400">
                  {student.email}
                </span>
              </div>
            </div>
            <button
              className="bg-indigo-400 hover:bg-indigo-500 text-white font-medium py-1 px-3 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-indigo-300 transition-colors duration-200 ease-in-out"
              onClick={() => handleButtonClick(student.id)}>
              View Solution
            </button>
          </li>
        ))}
        {students.length === 0 && (
          <li className="text-gray-400 text-sm italic">
            No students enrolled yet.
          </li>
        )}
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
