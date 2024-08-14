import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./input.css";
import "./lib/i18n";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { MenusProvider } from "./context/MenusContext.tsx";
import { Provider } from "react-redux";
import store from "./redux/store.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider>
      <MenusProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </MenusProvider>
    </ThemeProvider>
  </React.StrictMode>
);
