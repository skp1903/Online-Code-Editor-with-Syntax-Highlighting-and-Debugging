import { useEffect, useState } from "react";
import "./App.css";
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python"); // Default to Python
  const [output, setOutput] = useState(""); // State to store the output from the API
  const [submittedCode, setSubmittedCode] = useState(""); // State to store the submitted code

  const submitCode = async () => {
    setSubmittedCode(code); // Update submittedCode only on submit

    try {
      const response = await fetch(
        "https://3t3vy3oy01.execute-api.us-west-2.amazonaws.com/danish",
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            code: code,
            language: language,
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("API Response:", data); // Log the response data
        setOutput(data.body); // Assuming 'output' is the key in the API response containing the result
      } else {
        console.log("API Response not OK:", response); // Log response if not OK
        setOutput(
          "Error: Unable to fetch output. Check your code and language selection."
        );
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput("Error: Unable to fetch output. Please try again later.");
    }
  };

  return (
    <div className="container">
      <div className="editor-container">
        <div className="editor-buttons">
          <button
            className={language === "python" ? "selected" : ""}
            onClick={() => setLanguage("python")}
          >
            Python
          </button>
          <button
            className={language === "cpp" ? "selected" : ""}
            onClick={() => setLanguage("cpp")}
          >
            C++
          </button>
          <button
            className={language === "java" ? "selected" : ""}
            onClick={() => setLanguage("java")}
          >
            Java
          </button>
        </div>
        <Editor
          value={code}
          onChange={(e) => setCode(e)}
          theme="vs-lightbox"
          height="70vh"
          defaultLanguage={language}
          defaultValue="// Write your code here"
        />
        <button className="submit-btn" onClick={submitCode}>
          SUBMIT
        </button>
      </div>

      <div className="output-container">
        <h3>Submitted Code:</h3>
        <pre>{submittedCode}</pre> {/* Display submitted code here */}
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default App;
