import {useState, useEffect} from "react";
import Editor from "@monaco-editor/react";

export default function Code() {
  const [html, setHtml] = useState("<h1>Hello</h1>");
  const [css, setCss] = useState("h1 { color: red; }");
  const [js, setJs] = useState("console.log('Hello from JS');");
  const [activeEditor, setActiveEditor] = useState("html");
  const [logs, setLogs] = useState([]);

  const JDoodleAPI = "https://api.jdoodle.com/v1/execute"; // URL للـ JDoodle API
 const clientId = process.env.REACT_APP_JDOODLE_CLIENT_ID;
const clientSecret = process.env.REACT_APP_JDOODLE_CLIENT_SECRET;

  // إعداد البيانات لإرسالها إلى JDoodle
  const executeCode = async () => {
    const code = js; // على سبيل المثال، يمكن اختيار لغة JavaScript
    const data = {
      script: code,
      language: "javascript", // اختر اللغة المناسبة (مثلاً JavaScript)
      versionIndex: "0", // 0 يعني النسخة الافتراضية للغة
      clientId: clientId, // معرّف العميل
      clientSecret: clientSecret, // السر الخاص بالعميل
    };

    try {
      const response = await fetch(JDoodleAPI, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      setLogs(result.output || "No output");
    } catch (error) {
      console.error("Error executing code:", error);
      setLogs("Error executing code");
    }
  };

  useEffect(() => {
    // يمكن إضافة trigger لتشغيل الكود بعد تغيير الـ js
    executeCode();
  }, [js]);

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

      {/* عرض النتائج من JDoodle */}
      <div className="mt-4 border rounded overflow-hidden">
        <div className="bg-white p-4" title="Live Output">
          {logs && <pre>{logs}</pre>}
        </div>
      </div>
    </div>
  );
}
