import { FunctionComponent, useContext } from "react";
import { TabProps } from "./interfaces/TabProps";
import ButtonOptions from "./ButtonOptions";
import { themeContext } from "../../context/ThemeContext";

const Tab: FunctionComponent<TabProps> = ({ children, gradingPeriod }) => {
  const { theme } = useContext(themeContext);
  return (
    <div
      className={`${
        theme == "dark" ? "bg-third" : "bg-light-100"
      } w-full h-full p-3  rounded-bl rounded-r relative ml-1`}
    >
      <div className={`relative flex justify-end`}>
        <ButtonOptions gradingPeriod={gradingPeriod} />
      </div>
      {children}
    </div>
  );
};

export default Tab;
