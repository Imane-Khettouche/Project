import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const jdoodleRouter = express.Router();
const JDoodleAPI = "https://api.jdoodle.com/v1/execute";

jdoodleRouter.post("/run", async (req, res) => {
  const { code, language = "javascript", versionIndex = "0" } = req.body;

  try {
    const response = await fetch(JDoodleAPI, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        script: code,
        language,
        versionIndex,
        clientId: process.env.JDOODLE_CLIENT_ID, // Ensure this is in your .env
        clientSecret: process.env.JDOODLE_CLIENT_SECRET, // Ensure this is in your .env
      }),
    });

    const result = await response.json();
    res.json(result);
  } catch (err) {
    console.error("JDoodle error:", err);
    res.status(500).json({ error: "Code execution failed" });
  }
});

export default jdoodleRouter; // Use ES6 export
