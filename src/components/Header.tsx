import { FunctionComponent, useContext } from "react";
import { useTranslation } from "react-i18next";
import Navbar from "./Navbar";
import { themeContext } from "../context/ThemeContext";
import { BsFillLightbulbFill, BsGearFill } from "react-icons/bs";
import useMobileDetect from "../hooks/useMobileDetected";
import { IMenusContext } from "../context/MenusContext";

interface HeaderProps {
  language: string;
  handleLanguage: () => void;
}

const Header: FunctionComponent<HeaderProps> = ({
  language,
  handleLanguage,
}) => {
  const { t } = useTranslation();
  const { theme, toogleTheme } = useContext(themeContext);
  const isMobile = useMobileDetect();
  const { isConfigOpen, setIsConfigOpen } = useContext(IMenusContext);

  const handleConfig = (): void => {
    setIsConfigOpen(!isConfigOpen);
  };

  const headerBaseClasses =
    "p-2 rounded flex flex-row justify-between items-center relative z-50";
  const headerThemeClasses =
    theme === "dark" ? "bg-dark text-light-200" : "bg-light-200 text-dark";
  const logoContainerClasses = "flex items-center";
  const logoImageClasses = "h-6 ml-2";
  const logoTitleBaseClasses = "inline font-bold text-lg ml-1";
  const logoTitleThemeClasses =
    theme === "dark"
      ? "text-first hover:text-second hover:transition"
      : "text-second hover:brightness-75";
  const configMenuBaseClasses = "flex items-center md:mr-2";
  const configMenuMobileClasses =
    "max-md:absolute max-md:p-2 max-md:border-x border-light-100 top-10 right-0 max-md:w-16 max-md:z-20";

  const configMenuDisplayClasses =
    !isMobile || isConfigOpen ? "flex" : "hidden";
  const configMenuLayoutClasses = "flex-col md:flex-row";
  const configMenuThemeClasses = theme === "dark" ? "bg-dark" : "bg-light-200";
  const themeButtonClasses =
    "flex flex-col items-center justify-center md:mr-6 max-md:mb-2";
  const flagContainerBaseClasses = "p-0.5 h-fit rounded";
  const flagContainerPositionClasses = "max-md:m-auto";
  const flagContainerThemeClasses =
    theme === "dark" ? "bg-third" : "bg-light-100";
  const flagImageClasses = "w-7 cursor-pointer";
  const activeFlagClass = "grayscale-0";
  const inactiveFlagClass = "grayscale";
  const mobileConfigButtonClasses =
    "md:hidden flex items-center justify-center cursor-pointer w-12";
  const mobileConfigIconClasses = "text-lg hover:opacity-80";

  return (
    <header className={`${headerBaseClasses} ${headerThemeClasses}`}>
      <a href="#" className={logoContainerClasses}>
        <img
          src={theme === "dark" ? "/logoDark.svg" : "/logoLight.svg"}
          alt="Logo do site 'Nota Certa'"
          className={logoImageClasses}
        />
        <h1 className={`${logoTitleBaseClasses} ${logoTitleThemeClasses}`}>
          {t("title")}
        </h1>
      </a>
      <Navbar />
      <div className="flex items-center">
        <div
          className={`
            ${configMenuBaseClasses}
            ${configMenuLayoutClasses}
            ${configMenuMobileClasses}
            ${configMenuThemeClasses}
            ${configMenuDisplayClasses}
            `}
        >
          <button onClick={toogleTheme} className={themeButtonClasses}>
            <BsFillLightbulbFill className="rotate-180" />
            <span className="text-xs">{t("header.changeTheme")}</span>
          </button>
          <div
            className={`${flagContainerBaseClasses} ${flagContainerThemeClasses} ${flagContainerPositionClasses}`}
          >
            <img
              src="/brasilFlag.png"
              alt={t("header.flagBrazilText")}
              className={`${flagImageClasses} ${
                language === "pt" ? activeFlagClass : inactiveFlagClass
              }`}
              onClick={handleLanguage}
            />
          </div>
          <div
            className={`${flagContainerBaseClasses} ${flagContainerThemeClasses} ${flagContainerPositionClasses}`}
          >
            <img
              src="/usaFlag.png"
              alt={t("header.flagUsaText")}
              className={`${flagImageClasses} ${
                language === "pt" ? inactiveFlagClass : activeFlagClass
              }`}
              onClick={handleLanguage}
            />
          </div>
        </div>
        <button className={mobileConfigButtonClasses} onClick={handleConfig}>
          <BsGearFill className={mobileConfigIconClasses} />
        </button>
      </div>
    </header>
  );
};
export default Header;
