import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { AuthProvider } from "./context/authContext"; // ✅ Import this

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      {" "}
      {/* ✅ Wrap App with this */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
