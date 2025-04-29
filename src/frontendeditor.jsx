import { useState } from "react";
import Editor from "@monaco-editor/react";

export default function Code() {
  const [html, setHtml] = useState("<h1>Hello</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState("console.log('Hello')");
  const [activeEditor, setActiveEditor] = useState("html"); // State to track the active editor

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

  return (
    <div className="p-4 m-10">
      {/* Buttons to switch between editors */}
      <div className="flex justify-end">
        <button className=" px-3 border rounded-t-lg cursor-pointer bg-gray-200 " onClick={() => setActiveEditor("html")}>HTML</button>
        <button className=" px-3 border rounded-t-lg cursor-pointer bg-gray-200 " onClick={() => setActiveEditor("css")}>CSS</button>
        <button className=" px-3 border rounded-t-lg cursor-pointer bg-gray-200 " onClick={() => setActiveEditor("js")}>JS</button>
      </div>

      {/* Conditional rendering of the active editor */}
      <div >
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

        {activeEditor === "js" && (
          <Editor
            height="200px"
            language="javascript"
            value={js}
            onChange={setJs}
            theme="vs-dark"
          />
        )}
      </div>

      {/* iframe to display the live result */}
      <div className="mt-4 border rounded overflow-hidden">
        <iframe
          srcDoc={srcDoc}
          sandbox="allow-scripts"
          width="100%"
          height="300"
          className="bg-white"
        />
      </div>
    </div>
  );
}
