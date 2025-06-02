import { useContext, useEffect, useState } from "react";
import "./App.css";
import { useTranslation } from "react-i18next";
import Header from "./components/Header";
import { themeContext } from "./context/ThemeContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PublicRoute from "./components/protected/PublicRoute";
import ProtectedRoute from "./components/protected/ProtectedRoute";
import GroupPage from "./pages/GroupPage";
import Profile from "./pages/Profile";
import { useAuthStore } from "./store/authentication/auth";
import ConfirmAccount from "./pages/ConfirmAccount";
import Footer from "./components/footer/Footer";

const App: React.FC = () => {
  const {
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
        (theme === "dark"
          ? "dark bg-third text-white"
          : "bg-light-100 text-dark")
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
            path="/confirm-success"
            element={
              <PublicRoute>
                <ConfirmAccount />
              </PublicRoute>
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
          <Route
            path="/group/:id"
            element={
              <ProtectedRoute>
                <GroupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
