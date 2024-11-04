import { useEffect, useState } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const defaultCode = {
    python: "# Write your Python code here\nprint(\"Hello, Python!\")",
    cpp: "// Write your C++ code here\n#include <iostream>\nint main() {\n  std::cout << \"Hello, C++!\" << std::endl;\n  return 0;\n}",
    java: "// Write your Java code here\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Hello, Java!\");\n  }\n}",
  };
  useEffect(() => {
    setCode(defaultCode[language]);
  }, [language]);

  const submitCode = async () => {
    try {
      const response = await fetch(
        "https://3t3vy3oy01.execute-api.us-west-2.amazonaws.com/danish",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ code: code, language: language }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        setOutput(data.body);
      } else {
        console.log("API Response not OK:", response); // Log response if not OK
        setOutput("Error: Unable to fetch output. Check your code and language selection.");
      }
    } catch (error) {
      setOutput(
        "Error: Unable to fetch output. Please try again later." + error.message
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', height: '90vh' }}>
        <div style={{ flex: 1, padding: '10px' }}>
          <button 
            style={{ background: language === "python" ? "black" : "white", color: language === "python" ? "white" : "black" }} 
            onClick={() => setLanguage("python")}
          >
            Python
          </button>
          <button 
            style={{ background: language === "cpp" ? "black" : "white", color: language === "cpp" ? "white" : "black" }} 
            onClick={() => setLanguage("cpp")}
          >
            CPP
          </button>
          <button 
            style={{ background: language === "java" ? "black" : "white", color: language === "java" ? "white" : "black" }} 
            onClick={() => setLanguage("java")}
          >
            Java
          </button>
          <Editor
            value={code}
            onChange={(e) => setCode(e)}
            theme='vs-dark'
            height="85vh" // Adjust the height for the editor
            defaultLanguage={language} // Use the current language
            defaultValue="// Write your code here"
          />
          <button onClick={submitCode} style={{ marginTop: '10px' }}>SUBMIT</button>
        </div>

        <div style={{ flex: 1, padding: '10px', background: '#333', color: '#fff', overflowY: 'auto' }}>
          <h3>Submitted Code:</h3>
          <pre>{code}</pre>

          <h3>Output:</h3>
          <pre>{output}</pre>
        </div>
      </div>
    </>
  );
}

export default App;