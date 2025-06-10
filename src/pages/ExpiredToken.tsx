import { FunctionComponent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { themeContext } from "../context/ThemeContext";
import { motion } from "framer-motion";
import { BsExclamationTriangleFill } from "react-icons/bs";
import { t } from "i18next";

const ExpiredToken: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const navigate = useNavigate();

  const totalSeconds = 10;
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);

  useEffect(() => {
    if (secondsLeft === 0) {
      navigate("/login");
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((sec) => sec - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft, navigate]);

  const mainContainerClasses =
    "flex flex-col items-center px-4 pt-12 pb-4 min-h-[calc(100vh-4rem-4rem)] mt-2 rounded"; 

  const mainThemeClasses =
    theme === "dark"
      ? "bg-gradient-to-t from-third to-dark text-light-100"
      : "bg-gradient-to-t from-light-100 to-light-200 text-dark";

  const cardContainerClasses =
    "max-w-md w-full rounded-xl p-6 border shadow-lg";

  const cardThemeClasses =
    theme === "dark"
      ? "bg-gradient-to-t from-third to-dark border-fourth"
      : "bg-gradient-to-t from-light-100 to-light-200 border-light-300";

  const progressPercent = (secondsLeft / totalSeconds) * 100;

  return (
    <main className={`${mainContainerClasses} ${mainThemeClasses}`}>
      <div
        className={`${cardContainerClasses} ${cardThemeClasses} flex flex-col gap-6`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 bg-red-100 border border-red-300 p-4 rounded-xl text-red-700 shadow-md"
        >
          <BsExclamationTriangleFill className="w-6 h-6" />
          <span className="text-center text-sm md:text-base">
            {t("expiredToken.text")}
          </span>
        </motion.div>

        <div className="flex items-center gap-4">
          <div className="flex-1 h-3 bg-red-300 rounded overflow-hidden">
            <div
              className="h-3 bg-red-600 rounded transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <span className="w-8 text-right font-mono text-red-700">
            {secondsLeft}s
          </span>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-red-600 hover:bg-red-700 transition text-white rounded-md py-2 font-semibold"
        >
          {t("expiredToken.button")}
        </button>
      </div>
    </main>
  );
};

export default ExpiredToken;
