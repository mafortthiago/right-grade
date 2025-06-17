import { FunctionComponent, useContext, useEffect } from "react";
import { themeContext } from "../context/ThemeContext";
import confetti from "canvas-confetti";
import { Link } from "react-router-dom";
import { t } from "i18next";
import { BsCheckCircleFill } from "react-icons/bs";
import { motion } from "framer-motion";

const ConfirmAccount: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  const mainContainerClasses =
  "w-full min-h-screen flex flex-col items-center px-4 mt-2 pt-8 pb-4 rounded";

  const mainThemeClasses =
    theme === "dark"
      ? "bg-gradient-to-t from-third to-dark text-light-100"
      : "bg-gradient-to-t from-light-100 to-light-200 text-dark";

  const cardContainerClasses =
    "w-full max-w-md rounded-xl p-6 border shadow-lg";

  const cardThemeClasses =
    theme === "dark"
      ? "bg-gradient-to-t from-third to-dark border-fourth"
      : "bg-gradient-to-t from-light-100 to-light-200 border-light-300";

  const alertClasses =
    "flex flex-col sm:flex-row items-center gap-3 bg-green-100 border border-green-300 p-4 rounded-xl text-green-700 shadow-md";

  const titleClasses = "font-bold text-center text-xl";

  const descriptionClasses = "text-center";

  const linkContainerClasses =
    "block px-4 py-2 rounded font-semibold hover:bg-opacity-80 transition duration-300 mt-2 text-center w-full";

  const linkThemeClasses =
    theme === "dark" ? "bg-first text-dark" : "bg-second text-light-100";
  useEffect(() => {
    confetti({
      particleCount: 300,
      spread: 360,
      origin: { y: 0.6 },
      colors: ["#CCE8CC", "#3B7080", "#141b1f", "#8a8a8a", "#E3E3E3"],
      shapes: ["square", "circle"],
    });
  }, []);

  return (
    <main className={`${mainContainerClasses} ${mainThemeClasses}`}>
      <div className={`${cardContainerClasses} ${cardThemeClasses} mb-6`}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className={alertClasses}
        >
          <BsCheckCircleFill className="w-6 h-6" />
          <span className="text-sm md:text-base font-medium text-center">
            {t("authentication.register.confirmAccount.title")}
          </span>
        </motion.div>
      </div>

      <div className={`${cardContainerClasses} ${cardThemeClasses}`}>
        <h2 className={titleClasses}>
          {t("authentication.register.confirmAccount.title")}
        </h2>
        <p className={descriptionClasses}>
          {t("authentication.register.confirmAccount.description")}
        </p>
        <Link
          to="/login"
          className={`${linkContainerClasses} ${linkThemeClasses}`}
        >
          {t("authentication.login.title")}
        </Link>
      </div>
    </main>
  );
};

export default ConfirmAccount;
