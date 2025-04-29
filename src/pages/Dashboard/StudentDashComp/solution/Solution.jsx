import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Editor from "@monaco-editor/react";

function Solution({ challengeType }) {
  const [html, setHtml] = useState("<h1>Hello, World!</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState("console.log('Hello from JS');");
  const [python, setPython] = useState("print('Hello from Python')");
  const [cpp, setCpp] = useState("#include <iostream>\nusing namespace std;\nint main() {\n  cout << 'Hello, C++!';\n}");
  const [java, setJava] = useState("public class Main { public static void main(String[] args) { System.out.println('Hello, Java!'); } }");

  const [activeEditor, setActiveEditor] = useState(""); // State to track the active editor
  const [terminalOutput, setTerminalOutput] = useState(""); // Terminal output state
  const [isJsVisible, setIsJsVisible] = useState(false); // State to control visibility of JS editor for HTML+CSS+JS

  // Conditional rendering of the active editor based on challenge type
  useEffect(() => {
    if (!challengeType) {
      console.error("No challenge type selected");
      return;
    }

    // Set default editor for each challenge type
    if (challengeType === "Html + Css") {
      setActiveEditor("html"); // Default to HTML editor for Html + Css
      setIsJsVisible(false); // No JavaScript editor for Html + Css
    } else if (challengeType === "Html + Css + JavaScript") {
      setActiveEditor("html"); // Default to HTML editor for Html + Css + JavaScript
      setIsJsVisible(true); // Show JavaScript editor for Html + Css + JavaScript
    } else if (challengeType === "JavaScript") {
      setActiveEditor("js");
    } else if (challengeType === "Python") {
      setActiveEditor("python");
    } else if (challengeType === "C++") {
      setActiveEditor("cpp");
    } else if (challengeType === "Java") {
      setActiveEditor("java");
    }
  }, [challengeType]);

  // Combine HTML, CSS, and JS into a single document for the iframe
  const srcDoc = `
    <html>
      <head><style>${css}</style></head>
      <body>
        ${html}
        <script>${js}</script>
      </body>
    </html>
  `;

  // Handle terminal input (mocking execution)
  const handleRun = () => {
    if (activeEditor === "js") {
      setTerminalOutput("Running JavaScript...\n" + js);
    } else if (activeEditor === "python") {
      setTerminalOutput("Running Python...\n" + python);
    } else if (activeEditor === "cpp") {
      setTerminalOutput("Running C++...\n" + cpp);
    } else if (activeEditor === "java") {
      setTerminalOutput("Running Java...\n" + java);
    }
  };

  // Check if the student has chosen a language
  if (!challengeType) {
    return (
      <div className="text-center text-red-500">
        <h2>Please choose a programming language first.</h2>
      </div>
    );
  }

  return (
    <div className="p-4 m-10 bg-gray-800 text-white rounded-lg shadow-lg">
      {/* Buttons to switch between editors */}
      <div className="flex justify-end gap-2 mb-4">
        {["Html + Css", "Html + Css + JavaScript", "JavaScript", "Python", "C++", "Java"].map((type) => (
          <button
            key={type}
            className={`px-3 py-2 border rounded-t-lg cursor-pointer ${activeEditor === type.toLowerCase().replace(" ", "-") ? "bg-blue-600" : "bg-gray-700"}`}
            onClick={() => setActiveEditor(type.toLowerCase().replace(" ", "-"))}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Toggle between HTML + CSS and HTML + CSS + JavaScript for "Html + Css + JavaScript" */}
      {challengeType === "Html + Css + JavaScript" && (
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setIsJsVisible(!isJsVisible)}
            className="px-3 py-2 bg-blue-600 text-white rounded"
          >
            {isJsVisible ? "Show HTML + CSS" : "Show HTML + CSS + JavaScript"}
          </button>
        </div>
      )}

      {/* Conditional rendering of the active editor */}
      <div>
        {activeEditor === "html" && (
          <Editor
            height="200px"
            language="html"
            value={html}
            onChange={setHtml}
            theme="vs-dark"
          />
        )}
        {activeEditor === "css" && (
          <Editor
            height="200px"
            language="css"
            value={css}
            onChange={setCss}
            theme="vs-dark"
          />
        )}
        {activeEditor === "js" && isJsVisible && (
          <Editor
            height="200px"
            language="javascript"
            value={js}
            onChange={setJs}
            theme="vs-dark"
          />
        )}
        {activeEditor === "python" && (
          <Editor
            height="200px"
            language="python"
            value={python}
            onChange={setPython}
            theme="vs-dark"
          />
        )}
        {activeEditor === "cpp" && (
          <Editor
            height="200px"
            language="cpp"
            value={cpp}
            onChange={setCpp}
            theme="vs-dark"
          />
        )}
        {activeEditor === "java" && (
          <Editor
            height="200px"
            language="java"
            value={java}
            onChange={setJava}
            theme="vs-dark"
          />
        )}
      </div>

      {/* Run Button and Terminal */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={handleRun}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Run Code
        </button>
      </div>

      {/* Terminal Output */}
      <div className="h-40 bg-black p-4 mt-4 overflow-y-auto font-mono text-sm text-green-400">
        <div className="text-green-400">Terminal:</div>
        <pre className="whitespace-pre-wrap">{terminalOutput}</pre>
      </div>

      {/* iframe to display the live result */}
      {(challengeType === "Html + Css" || challengeType === "Html + Css + JavaScript") && (
        <div className="mt-4 border rounded overflow-hidden">
          <iframe
            srcDoc={srcDoc}
            sandbox="allow-scripts"
            width="100%"
            height="300"
            className="bg-white"
          />
        </div>
      )}
    </div>
  );
}

// PropTypes for the component
Solution.propTypes = {
  challengeType: PropTypes.string.isRequired,
};

export default Solution;
