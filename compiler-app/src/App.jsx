import { useEffect, useState } from 'react'
import './App.css'
import Editor from '@monaco-editor/react';

function App() {
  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("");
  // useEffect(()=>{
  //   console.log(code)
  // },[code])
  const submitCode = ()=>{
    console.log(code);
  }

  return (
    <>
      <button style={{ background: language == "Python" ? "black" : "white", color: language == "Python" ? "white" : "black" }} onClick={() => {
        setLanguage("Python")
      }}>Python
      </button>
      <button style={{ background: language == "CPP" ? "black" : "white", color: language == "CPP" ? "white" : "black" }} onClick={() => {
        setLanguage("CPP")
      }}>
        CPP
      </button>
      <button style={{ background: language == "Java" ? "black" : "white", color: language == "Java" ? "white" : "black" }} onClick={() => {
        setLanguage("Java")
      }}>
        Java
      </button>
      <Editor
        value={code}
        onChange={(e) => {
          setCode(e)
        }}
        theme='vs-dark'
        height="90vh"
        defaultLanguage="python"
        defaultValue="// some comment" />
        <button onClick={()=>{
          submitCode()
        }}>SUBMIT</button>
    </>
  )
}

export default App
