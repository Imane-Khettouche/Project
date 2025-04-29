import { useState } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const languageOptions = [
  { id: 71, name: "Python" },
  { id: 54, name: "C++" },
  { id: 62, name: "Java" },
];

const CodeEditor = () => {
  const [code, setCode] = useState("# Écris ton code ici");
  const [languageId, setLanguageId] = useState(71); // Python par défaut
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    try {
      setIsRunning(true);
      setOutput("⏳ Exécution en cours...");

      const response = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: code,
          language_id: languageId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
            "X-RapidAPI-Key": "YOUR_RAPIDAPI_KEY", // Remplace par ta clé API
          },
        }
      );

      const result = response.data;

      if (result.stderr) {
        setOutput("❌ Erreur d'exécution:\n" + result.stderr);
      } else if (result.compile_output) {
        setOutput("❌ Erreur de compilation:\n" + result.compile_output);
      } else if (result.stdout) {
        setOutput("✅ Résultat:\n" + result.stdout);
      } else {
        setOutput("⚠️ Aucun résultat.");
      }
    } catch (error) {
      console.error(error);
      setOutput("❗ Erreur lors de l'exécution.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <div className="flex items-center p-4 bg-gray-800 gap-4">
        <select
          value={languageId}
          onChange={(e) => setLanguageId(Number(e.target.value))}
          className="p-2 rounded bg-gray-700 text-white"
        >
          {languageOptions.map((lang) => (
            <option key={lang.id} value={lang.id}>
              {lang.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleRun}
          disabled={isRunning}
          className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
        >
          {isRunning ? "Exécution..." : "Exécuter"}
        </button>
      </div>

      <div className="flex-1">
        <Editor
          height="calc(100vh - 200px)"
          defaultLanguage="python"
          theme="vs-dark"
          value={code}
          onChange={(value) => setCode(value)}
        />
      </div>

      <div className="h-48 bg-black p-4 overflow-y-auto font-mono text-sm">
        <div className="text-green-400">Terminal :</div>
        <pre className="whitespace-pre-wrap">{output}</pre>
      </div>
    </div>
  );
};

export default CodeEditor;
