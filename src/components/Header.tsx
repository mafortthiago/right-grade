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
  return (
    <header
      className={
        "p-2 rounded flex flex-row justify-between items-center relative z-10 " +
        (theme === "dark" ? "bg-dark text-light-200" : "bg-light-200 text-dark")
      }
    >
      <a href="#" className="flex items-center">
        <h1
          className={
            "inline font-bold text-lg pl-3 " +
            (theme === "dark"
              ? "text-first hover:text-second hover:transition"
              : "text-second hover:brightness-75")
          }
        >
          {t("title")}
        </h1>
      </a>
      <Navbar />
      <div
        className={
          "flex-col md:flex-row max-md:absolute max-md:p-2 max-md:border-x border-light-100 top-10 right-3 max-md:w-16 mr-2 items-center " +
          (theme === "dark" ? "bg-dark " : "bg-light-200 ") +
          (!isMobile || isConfigOpen ? "flex" : "hidden")
        }
      >
        <button
          onClick={toogleTheme}
          className="flex flex-col items-center justify-center md:mr-6 max-md:mb-2"
        >
          <BsFillLightbulbFill className="rotate-180 " />
          <span className="text-xs">{t("header.changeTheme")}</span>
        </button>
        <div
          className={
            "p-0.5 h-fit rounded md:mr-0.5 max-md:m-auto " +
            (theme === "dark" ? " bg-third " : " bg-light-100")
          }
        >
          <img
            src="/brasilFlag.png"
            alt={t("header.flagBrazilText")}
            className={
              "w-7 cursor-pointer " +
              (language === "pt" ? "grayscale-0" : "grayscale")
            }
            onClick={handleLanguage}
          />
        </div>
        <div
          className={
            "p-0.5 h-fit rounded m-auto " +
            (theme === "dark" ? " bg-third " : " bg-light-100")
          }
        >
          <img
            src="/usaFlag.png"
            alt={t("header.flagUsaText")}
            className={
              "w-7 cursor-pointer " +
              (language === "pt" ? "grayscale" : "grayscale-0")
            }
            onClick={handleLanguage}
          />
        </div>
      </div>
      <div className="md:hidden max-md:pr-9 cursor-pointer">
        <BsGearFill onClick={handleConfig} />
      </div>
    </header>
  );
};
export default Header;
