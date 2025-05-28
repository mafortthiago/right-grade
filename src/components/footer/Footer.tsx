import React, { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuthStore } from "../../store/authentication/auth";
import { t } from "i18next";

const Footer: React.FC = () => {
  const { theme } = useContext(themeContext);
  const { isAuthenticated } = useAuthStore();
  const publicLinks = [
    { to: "/", label: "footer.link.home" },
    { to: "/login", label: "footer.link.login" },
    { to: "/register", label: "footer.link.register" },
  ];

  const privateLinks = [
    { to: "/dashboard", label: "footer.link.dashboard" },
    { to: "/profile", label: "footer.link.profile" },
  ];

  const footerClasses =
    "flex items-center flex-col justify-center text-sm md:text-base px-4 md:px-6 rounded-xl p-2 py-6 mx-5 ";
  const footerThemeClasses = `${theme === "dark" ? "bg-dark" : "bg-light-200"}`;
  const logoImageClasses = "h-6 ml-2";
  const logoContainerClasses =
    "md:ml-8 flex items-center md:items-start flex-col";
  const footerTitleClasses = `ml-1.5 font-bold ${
    theme === "dark" ? "text-first" : "text-second"
  }`;
  const linksContainerClasses =
    "md:mr-8 md:flex mt-4 ml-2 md:ml-0 md:mt-0 text-start text-sm";
  const footerLinkContainerClasses = `w-24 text-center py-1 rounded mt-1 ${
    theme === "dark"
      ? "bg-third hover:bg-fourth"
      : "bg-light-100 hover:bg-opacity-50"
  }`;
  return (
    <footer className={`${footerClasses} ${footerThemeClasses}`}>
      <div className="flex flex-col md:flex-row items-center justify-between w-full mb-6">
        <div className={`${logoContainerClasses}`}>
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex"
          >
            <motion.img
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              src={theme === "dark" ? "/logoDark.svg" : "/logoLight.svg"}
              alt="Logo do site 'Nota Certa'"
              className={logoImageClasses}
            />
            <h2 className={`${footerTitleClasses}`}>{t("title")}</h2>
          </motion.div>

          <p className="ml-2 text-sm mt-2">{t("footer.message")}</p>
        </div>
        <div className={`${linksContainerClasses}`}>
          <nav>
            <ul>
              {(isAuthenticated ? privateLinks : publicLinks).map((link) => (
                <Link to={link.to}>
                  <li key={link.to} className={footerLinkContainerClasses}>
                    {t(link.label)}
                  </li>
                </Link>
              ))}
            </ul>
          </nav>
        </div>
      </div>
      <span>
        © {new Date().getFullYear()} {t("footer.license")}
      </span>
      <hr className={"border w-[97%] my-4 " + `${theme == "dark" ? "border-first": "border-second"}`}/>
      <p>{t("footer.madeBy")} <span><a href="https://mafortthiago.github.io/" className={`font-bold ${theme == "dark" ? "text-first": "text-second"}`}>{t("footer.name")}</a></span></p>
    </footer>
  );
};

export default Footer;
