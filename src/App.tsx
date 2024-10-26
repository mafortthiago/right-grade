import { useContext, useEffect, useState } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import { themeContext } from "./context/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Class from "./pages/Class";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/protected/PublicRoute";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import { useAuthStore } from "./store/auth";

const App: React.FC = () => {
  const {
    t,
    i18n: { changeLanguage, language },
  } = useTranslation();
  const { theme } = useContext(themeContext);
  const [currentLanguage, setCurrentLanguage] = useState(language);
  const handleLanguage = (): void => {
    const newLanguage = currentLanguage === "en" ? "pt" : "en";
    changeLanguage(newLanguage);
    setCurrentLanguage(newLanguage);
  };
  const { checkAuth } = useAuthStore();
  useEffect(() => {
    checkAuth();
  }, []);
  return (
    <div
      className={
        "p-3 font-rubik " +
        (theme === "dark" ? "bg-third text-white" : "bg-light-100 text-dark")
      }
    >
      <BrowserRouter>
        <Header language={language} handleLanguage={handleLanguage} />
        <Routes>
          <Route
            path="/"
            element={
              <PublicRoute>
                <Home />
              </PublicRoute>
            }
          />
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            path="/table"
            element={
              <ProtectedRoute>
                <Class />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
