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
    <form className="flex">
      <label
        htmlFor="search"
        className={`p-2 text-white rounded -mr-[6px] z-10 ${
          theme == "dark" ? "bg-first text-black" : "bg-second"
        }`}
      >
        <BsSearch />
      </label>
      <input
        type="text"
        id="search"
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        placeholder={t("dashboard.class.search")}
        className={`pl-5 py-0.5 rounded ${
          theme == "dark" ? "bg-third border-y border-first" : "bg-light-100"
        } focus:outline-none`}
      />
      <button
        className={`px-2 -ml-[6px] rounded text-white ${
          theme == "dark" ? "bg-first text-black" : "bg-second"
        }`}
        onClick={handleClick}
      >
        Buscar
      </button>
    </form>
  );
};
export default InputSearch;
