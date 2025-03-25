const db = require("../db");

// Get all solutions
const getSolutions = (callback) => {
  db.query("SELECT * FROM solutions", callback);
};

// Get solutions for a specific challenge
const getSolutionsByChallenge = (challengeID, callback) => {
  db.query("SELECT * FROM solutions WHERE challenge_id = ?", [challengeID], callback);
};

// Submit a solution
const submitSolution = (studentID, challengeID, codeFilePath, status, callback) => {
  db.query(
    "INSERT INTO solutions (student_id, challenge_id, code_file_path, status) VALUES (?, ?, ?, ?)",
    [studentID, challengeID, codeFilePath, status],
    callback
  );
};

module.exports = { getSolutions, getSolutionsByChallenge, submitSolution };
