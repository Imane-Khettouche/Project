import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

export default function SolutionEvaluation({ initialCode, defaultLanguage }) {
  const [code, setCode] = useState(initialCode || "");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [language, setLanguage] = useState(defaultLanguage);

  useEffect(() => {
    setCode(initialCode || "");
    setLanguage(defaultLanguage);
  }, [initialCode, defaultLanguage]);

  const normalizeLanguage = (lang) => {
    switch (lang.toLowerCase()) {
      case "python":
        return "python3";
      case "java":
        return "java";
      case "c++":
        return "cpp";
      default:
        return lang;
    }
  };

  const handleRun = async () => {
    const normalizedLang = normalizeLanguage(language);
    console.log("Code:", code);
    console.log("Language:", normalizedLang);

    if (!code || !normalizedLang) {
      setOutput("❌ Code ou Langage manquant. Veuillez vérifier votre entrée.");
      return;
    }

    setIsLoading(true);
    setOutput("⏳ Exécution en cours...");

    try {
      const res = await fetch("http://localhost:5000/api/compiler", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code, language: normalizedLang }),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        throw new Error("Erreur lors de l'analyse de la réponse du serveur", jsonError);
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
    <div className=" min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="relative bg-white rounded-xl shadow-xl overflow-hidden md:grid md:grid-cols-1 md:gap-10">
        <div className="p-8 relative">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">
            Évaluation de la Solution
          </h2>

          <Editor
            height="400px"
            theme="vs-dark"
            language={normalizeLanguage(language)}
            value={code}
            onChange={(value) => setCode(value || "")}
            options={{
              minimap: { enabled: false },
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
            }`}
          >
            {isLoading ? "Exécution..." : "Exécuter le code"}
          </button>

          <div className="mt-6 p-4 rounded-lg bg-gray-800 shadow-md">
            <strong className="text-xl mb-2 text-white">Résultat :</strong>
            <pre className="font-mono text-sm text-white whitespace-pre-wrap">
              {output}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ✅ Définition des types de props
SolutionEvaluation.propTypes = {
  initialCode: PropTypes.string.isRequired,
  defaultLanguage: PropTypes.string,
};

// ✅ Valeur par défaut
SolutionEvaluation.defaultProps = {
  defaultLanguage: "python3",
};
