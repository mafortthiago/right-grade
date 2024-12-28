import { FunctionComponent, useContext } from "react";
import { themeContext } from "../../context/ThemeContext";
import { BsCaretRightFill } from "react-icons/bs";

export const CaretRight: FunctionComponent = () => {
  const { theme } = useContext(themeContext);
  return (
    <span
      aria-hidden="true"
      className={`ml-0.5 xs:ml-1 xs:p-0.5 rounded flex items-center ${
        theme == "dark" ? "bg-third" : "bg-light-100"
      }`}
    >
      <BsCaretRightFill className="p-0.5" />
    </span>
  );
};
