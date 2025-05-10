import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const judge0Router = express.Router();

judge0Router.post("/", async (req, res) => {
  const { code, language, input } = req.body;

  const versionMap = {
    python3: 71,
    javascript: 63,
    java: 62,
    cpp: 54,
    c: 50,
  };

  if (!code || !language) {
    return res.status(400).json({
      error: "Missing 'code' or 'language' in request body.",
    });
  }

  if (!versionMap[language]) {
    return res.status(400).json({
      error: "Unsupported language.",
      supportedLanguages: Object.keys(versionMap),
    });
  }

 const submissionData = {
  source_code: code,  // الكود المرسل من الواجهة والذي يتضمن التفاعل مع المستخدم
  language_id: versionMap[language],
  stdin: input || "",
  expected_output: null,
  cpu_time_limit: 5,
  wall_time_limit: 10,
  memory_limit: 128000,
};


  try {
    const response = await fetch(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY,
          "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
        },
        body: JSON.stringify(submissionData),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to get valid response from Judge0.");
    }

    const result = {
      status: data.status?.description || "Unknown",
      output: data.stdout || data.stderr || data.compile_output || "No output",
      time: data.time ? `${data.time}s` : null,
      memory: data.memory ? `${data.memory}KB` : null,
    };

    res.json(result);
  } catch (error) {
    console.error("Judge0 Error:", error.message);
    res.status(500).json({
      error: "Judge0 API error",
      details: error.message,
      solution: "Check your API key, network connection, or try again later.",
    });
  }
});

export default judge0Router;
