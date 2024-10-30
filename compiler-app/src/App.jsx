import { useEffect, useState } from 'react';
import './App.css';
import Editor from '@monaco-editor/react';

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("python"); // Default to Python
  const [output, setOutput] = useState(""); // State to store the output from the API

  const submitCode = async () => {
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
        setOutput("Error: Unable to fetch output. Check your code and language selection.");
      }
    } catch (error) {
      console.error("Error submitting code:", error);
      setOutput("Error: Unable to fetch output. Please try again later.");
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
