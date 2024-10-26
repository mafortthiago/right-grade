import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import "./lib/i18n";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { MenusProvider } from "./context/MenusContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <MenusProvider>
        <App />
      </MenusProvider>
    </ThemeProvider>
  </React.StrictMode>
);
