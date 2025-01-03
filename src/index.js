import React from "react";
import ReactDOM from "react-dom/client"; // Importa correctamente createRoot
import App from "./App";
import "./index.css";

// Usa createRoot para renderizar la aplicación
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
