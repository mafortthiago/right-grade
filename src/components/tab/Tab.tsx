import { FunctionComponent, useContext } from "react";
import { TabProps } from "./interfaces/TabProps";
import ButtonOptions from "./ButtonOptions";
import { themeContext } from "../../context/ThemeContext";
import ButtonDeleteStudent from "./ButtonDeleteStudents";

const Tab: FunctionComponent<TabProps> = ({ children, gradingPeriod }) => {
  const { theme } = useContext(themeContext);

  const containerBaseClasses =
    "w-full h-full p-3 rounded-bl rounded-r relative ml-1";
  const containerThemeClasses = theme === "dark" ? "bg-third" : "bg-light-100";
  const buttonContainerClasses = "relative flex justify-between md:justify-end";

  return (
    <div className={`${containerThemeClasses} ${containerBaseClasses}`}>
      <div className={buttonContainerClasses}>
        <ButtonDeleteStudent />
        <ButtonOptions gradingPeriod={gradingPeriod} />
      </div>
      {children}
    </div>
  );
};

export default Tab;
