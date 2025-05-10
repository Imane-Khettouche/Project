import {useState} from "react";
import Editor from "@monaco-editor/react";

export default function CodeCompiler() {
  const [code, setCode] = useState("print('Bonjour le monde')");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState("python3");

  const handleRun = async () => {
    setIsLoading(true);
    setOutput("⏳ Exécution en cours...");

    try {
      const res = await fetch("http://localhost:5000/api/compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({code: code || "", language}),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        throw new Error(
          "Erreur lors de l'analyse de la réponse du serveur",
          jsonError
        );
      }

      if (!res.ok) {
        throw new Error(data.error || data.details || "La requête a échoué");
      }

      let resultMessage = `✅ Statut : ${data.status}\n\n`;
      resultMessage += `📤 Sortie :\n${data.output || "Aucune sortie"}\n\n`;
      if (data.time) resultMessage += `⏱️ Temps : ${data.time}\n`;
      if (data.memory) resultMessage += `💾 Mémoire : ${data.memory}`;

      setOutput(resultMessage);
    } catch (err) {
      setOutput(
        `❌ Une erreur est survenue : ${err.message}\n\n🔌 Vérifiez votre connexion réseau ou le serveur.`
      );
      console.error("Erreur d'exécution :", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gradient-to-r from-indigo-700 via-indigo-400 to-indigo-100 rounded-lg text-white shadow-lg">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-white mb-2">
          Choisissez un langage :
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="block w-full p-3 rounded-lg bg-gray-800 text-white border border-gray-600 shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option value="python3">Python</option>
          <option value="javascript">JavaScript</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
          <option value="c">C</option>
        </select>
      </div>

      <Editor
        height="400px"
        theme="vs-dark"
        language={language === "cpp" ? "cpp" : language}
        value={code}
        onChange={(value) => setCode(value || "")}
        options={{
          minimap: {enabled: false},
          fontSize: 16,
          automaticLayout: true,
          lineNumbers: "on",
          scrollBeyondLastLine: false,
        }}
      />

      <button
        onClick={handleRun}
        disabled={isLoading}
        className={`mt-6 w-full p-4 text-white rounded-lg ${
          isLoading
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
        }`}>
        {isLoading ? "Exécution..." : "Exécuter le code"}
      </button>

      <div className="mt-6 p-4 rounded-lg bg-gray-800 shadow-md">
        <strong className="text-xl mb-2">Résultat :</strong>
        <pre className="font-mono text-sm text-white whitespace-pre-wrap">
          {output}
        </pre>
      </div>
    </div>
  );
}
