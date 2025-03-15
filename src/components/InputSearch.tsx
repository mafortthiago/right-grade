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
  return (
    <form className="flex max-w-sm-3/4 mt-1 md:mt-0">
      <label
        htmlFor="search"
        className={`flex items-center px-2 py-1 md:p-2 rounded -mr-[6px] z-10 
          ${theme == "dark" ? "bg-first text-dark" : "bg-second text-white"}`}
      >
        <BsSearch className="" />
      </label>
      <input
        type="text"
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={t("dashboard.class.searchPlaceholder")}
        className={`pl-3 max-md:max-w-40 sm:pl-5 sm:py-0.5 rounded max-md:text-sm ${
          theme == "dark" ? "bg-third border-y border-first" : "bg-light-100"
        } focus:outline-none`}
      />
      <button
        className={`px-1 sm:px-2 -ml-[6px] rounded max-sm:text-sm ${
          theme == "dark" ? "bg-first text-dark" : "bg-second text-white"
        }`}
        onClick={handleClick}
      >
        {t("dashboard.class.search")}
      </button>
    </form>
  );
};
export default InputSearch;
