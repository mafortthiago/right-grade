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
  return (
    <button
      className={`ml-1 px-2 py-1 rounded flex items-center my-2 hover:shadow-sm ${
        theme == "dark"
          ? "bg-third hover:shadow-gray-700"
          : "bg-light-100 hover:shadow-gray-500"
      }`}
      onClick={handleClick}
    >
      {loading ? (
        <p className="flex items-center gap-1 cursor-wait">
          Adicionando <BsHourglassSplit />
        </p>
      ) : (
        <>
          <BsPlusSquareFill className=" mr-2 w-5 h-5" />
          <span>{t("class.addGradingPeriod")}</span>
        </>
      )}
    </button>
  );
};

export default ButtonAddTab;
