import React, { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import { BsPlayBtnFill } from "react-icons/bs";
import { motion } from "framer-motion";
import Slider from "./Slider";
import { t } from "i18next";
import { Link } from "react-router-dom";

const TopBanner: React.FC = () => {
  const { theme } = useContext(themeContext);

  const topBannerClassesContainer = "w-full relative";
  const logoImageClasses = "h-6 ml-2";
  const logoContainerClasses =
    "absolute top-4 left-4 flex items-center justify-center w-12 h-12 md:w-16 md:h-16 bg-light-200 rounded-xl p-2 z-10";
  const bannerTitleContainerClasses =
    "absolute top-16 max-md:mt-2 mr-4 left-4 md:top-4 md:left-24 h-12 md:h-16 flex items-center justify-center rounded-xl p-2 px-4 z-10 md:text-base";
  const bannerTitleThemeClasses = `${
    theme === "dark" ? "bg-third" : "bg-light-200"
  }`;
  const logoContainerThemeClasses = `${
    theme === "dark" ? "bg-third" : "bg-light-200"
  }`;
  const beginButtonContainerClasses =
    "absolute bottom-4 right-4 flex items-center justify-center ml-4 text-sm md:text-base h-16 bg-light-200 px-4 md:px-6 rounded-xl p-2 btn-fill-animate ";
  const beginButtonThemeClasses = `${
    theme === "dark" ? "bg-third" : "bg-light-200"
  }`;
  const playContainerClasses = "text-2xl ml-2";
  const playThemeClasses = `${theme === "dark" ? "text-first" : "text-second"}`;

  return (
    <div className={topBannerClassesContainer}>
      <motion.div
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
        className={`${logoContainerClasses} ${logoContainerThemeClasses}`}
      >
        <motion.img
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          src={theme === "dark" ? "/logoDark.svg" : "/logoLight.svg"}
          alt="Logo do site 'Nota Certa'"
          className={logoImageClasses}
        />
      </motion.div>

      <motion.section
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className={`${bannerTitleContainerClasses} ${bannerTitleThemeClasses}`}
      >
        <h2 className="text-sm md:text-base">{t("home.title")}</h2>
      </motion.section>

      <motion.section
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <Slider />
      </motion.section>

      <Link to="/register">
        <motion.button
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.6 }}
          className={`${beginButtonContainerClasses} ${beginButtonThemeClasses}`}
        >
          {t("home.buttonText")}
          <BsPlayBtnFill
            className={`${playContainerClasses} ${playThemeClasses}`}
          />
        </motion.button>
      </Link>
    </div>
  );
};

export default TopBanner;
