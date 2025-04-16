import React, { useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import { BsHourglassSplit, BsPlusSquareFill } from "react-icons/bs";
import { t } from "i18next";

interface ButtonAddTabProps {
  handleClick: () => Promise<void>;
  loading: boolean;
}
const ButtonAddTab: React.FC<ButtonAddTabProps> = ({
  handleClick,
  loading,
}) => {
  const { theme } = useContext(themeContext);

  const buttonBaseClasses =
    "px-2 md:ml-1 py-1 rounded flex items-center my-2 hover:shadow-sm text-sm md:text-base";
  const buttonThemeClasses =
    theme === "dark"
      ? "bg-third hover:shadow-gray-700"
      : "bg-light-100 hover:shadow-gray-500";
  const loadingTextClasses = "flex items-center gap-1 cursor-wait";
  const plusIconClasses = "mr-2 w-4 h-4 sm:w-5 sm:h-5";

  return (
    <button
      className={`${buttonBaseClasses} ${buttonThemeClasses}`}
      onClick={handleClick}
    >
      {loading ? (
        <p className={loadingTextClasses}>
          {t("adding")} <BsHourglassSplit />
        </p>
      ) : (
        <>
          <BsPlusSquareFill className={plusIconClasses} />
          <span>{t("class.addGradingPeriod")}</span>
        </>
      )}
    </button>
  );
};

export default ButtonAddTab;
