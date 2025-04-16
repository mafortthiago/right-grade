import { t } from "i18next";
import { FormEvent, FunctionComponent, useContext } from "react";
import { BsSearch } from "react-icons/bs";
import { themeContext } from "../context/ThemeContext";

interface InputSearchProps {
  handleClick: (e: FormEvent) => void;
  searchValue: string;
  setSearchValue: (value: string) => void;
}

const InputSearch: FunctionComponent<InputSearchProps> = ({
  handleClick,
  searchValue,
  setSearchValue,
}) => {
  const { theme } = useContext(themeContext);

  const formClasses = "flex max-w-sm-3/4 mt-1 md:mt-0";
  const searchIconContainerBaseClasses =
    "flex items-center h-8 px-2 py-1 md:p-2 rounded -mr-[6px] z-10";
  const searchIconContainerThemeClasses =
    theme === "dark" ? "bg-first text-dark" : "bg-second text-white";
  const inputBaseClasses =
    "pl-3 w-36 sm:w-full sm:pl-5 sm:py-0.5 rounded max-md:text-sm focus:outline-none";
  const inputThemeClasses =
    theme === "dark" ? "bg-third border-y border-first" : "bg-light-100";
  const buttonBaseClasses = "px-1 sm:px-2 -ml-[6px] rounded max-sm:text-sm";
  const buttonThemeClasses =
    theme === "dark" ? "bg-first text-dark" : "bg-second text-white";

  return (
    <form className={formClasses}>
      <label
        htmlFor="search"
        className={`${searchIconContainerBaseClasses} ${searchIconContainerThemeClasses}`}
      >
        <BsSearch />
      </label>
      <input
        type="text"
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={t("dashboard.class.name")}
        className={`${inputBaseClasses} ${inputThemeClasses}`}
      />
      <button
        className={`${buttonBaseClasses} ${buttonThemeClasses}`}
        onClick={handleClick}
      >
        {t("dashboard.class.search")}
      </button>
    </form>
  );
};

export default InputSearch;
