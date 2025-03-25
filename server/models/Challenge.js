const db = require("../db");

// Get all challenges
const getChallenges = (callback) => {
  db.query("SELECT * FROM challenges", callback);
};

// Get challenge by ID
const getChallengeById = (id, callback) => {
  db.query("SELECT * FROM challenges WHERE id = ?", [id], callback);
};

// Create a new challenge
const createChallenge = (title, description, difficulty, status, deadline, challengeType, professorID, callback) => {
  db.query(
    "INSERT INTO challenges (title, description, difficulty, status, deadline, challenge_type, professor_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [title, description, difficulty, status, deadline, challengeType, professorID],
    callback
  );
};

module.exports = { getChallenges, getChallengeById, createChallenge };
