import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useNotification } from "./hooks/useNotification";

function App() {
  const { showNotification } = useNotification();
  const handleShowNotification = (type, position) => {
    let title, message;
    switch (type) {
      case "success": {
        title = "Success!";
        message = "Guy is proud!";
        break;
      }
      case "error": {
        title = "Error!";
        message = "Know pain";
        break;
      }
      case "info": {
        title = "Info:";
        message = "It's a 106cm";
        break;
      }
      case "warning": {
        title = "Warning";
        message = "Orochimaru is here";
        break;
      }
      default: {
        title = "Success!";
        message = "Your data is saved!";
        break;
      }
    }
    showNotification({
      type,
      title,
      message,
      position,
      duration: 1500,
    });
  };
  return (
    <div className="App">
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Building a Shadow Clone Notification system for your react app</h1>
      <div className="card">
        <button
          onClick={() => {
            handleShowNotification("success", "top-right");
          }}
        >
          top-right
        </button>
        <button
          onClick={() => {
            handleShowNotification("warning", "top-left");
          }}
        >
          top-left
        </button>
        <button
          onClick={() => {
            handleShowNotification("error", "bottom-left");
          }}
        >
          bottom-left
        </button>
        <button
          onClick={() => {
            handleShowNotification("info", "bottom-right");
          }}
        >
          bottom-right
        </button>
      </div>
      <div className="card">
        <button
          onClick={() => {
            handleShowNotification("info", "center");
          }}
        >
          center
        </button>
        <button
          onClick={() => {
            handleShowNotification("success", "right");
          }}
        >
          right
        </button>
        <button
          onClick={() => {
            handleShowNotification("error", "bottom");
          }}
        >
          bottom
        </button>
        <button
          onClick={() => {
            handleShowNotification("warning", "top");
          }}
        >
          top
        </button>
        <button
          onClick={() => {
            handleShowNotification("info", "left");
          }}
        >
          left
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </div>
  );
}

export default App;
