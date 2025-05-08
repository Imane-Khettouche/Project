import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Code() {
  const [html, setHtml] = useState("<h1>Hello</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState("console.log('Hello from JS');");
  const [activeEditor, setActiveEditor] = useState("html");
  const [logs, setLogs] = useState("");

  const handleRunCode = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: js, // You might want to handle the selected language here (html/css/js)
          language: "javascript", // Adjust according to the selected language
          versionIndex: "0",
        }),
      });

      const result = await response.json();
      setLogs(result.output || "No output");
    } catch (error) {
      console.error(error);
      setLogs("Failed to execute code");
    }
  };

  return (
    <div className="p-4 m-10">
      <div className="flex justify-end space-x-2">
        {["html", "css", "js"].map((type) => (
          <button
            key={type}
            onClick={() => setActiveEditor(type)}
            className={`px-3 border rounded-t-lg ${
              activeEditor === type ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}>
            {type.toUpperCase()}
          </button>
        ))}
      </div>

      {activeEditor === "html" && (
        <Editor height="200px" language="html" value={html} onChange={setHtml} theme="vs-dark" />
      )}
      {activeEditor === "css" && (
        <Editor height="200px" language="css" value={css} onChange={setCss} theme="vs-dark" />
      )}
      {activeEditor === "js" && (
        <Editor height="200px" language="javascript" value={js} onChange={setJs} theme="vs-dark" />
      )}

      <div className="mt-4 flex justify-end">
        <button
          onClick={handleRunCode}
          className="px-4 py-2 bg-green-600 text-white rounded shadow">
          Run JS Code
        </button>
      </div>

      <div className="mt-4 border rounded overflow-hidden">
        <div className="bg-white p-4" title="Output">
          <pre>{logs}</pre>
        </div>
      </div>
    </div>
  );
}
