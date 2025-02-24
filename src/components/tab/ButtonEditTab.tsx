// imports
import { FunctionComponent, useContext, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import { BsPencilSquare } from "react-icons/bs";
import EditTab from "./EditTab";
import { ButtonEditTabProps } from "./interfaces/ButtonEditTabProps";
import { t } from "i18next";

/**
 * Button component that triggers the grading period name editing modal.
 * @Component
 * @example
 * ```
 * <ButtonEditTab gradingPeriod={{id: "16d9nh7...", name: "Semester"}}/>
 * ```
 * @param {ButtonEditTabProps} props - Component properties.
 * @param {GradingPeriod} props.gradingPeriod The grading period to be editing.
 * @returns {JSX.Element} A button that opens the EditTab modal when clicked.
 * @author Thiago Mafort
 */
const ButtonEditTab: FunctionComponent<ButtonEditTabProps> = ({
  gradingPeriod,
}: ButtonEditTabProps): JSX.Element => {
  const { theme } = useContext(themeContext);
  const [isEditTabVisible, setIsEditTabVisible] = useState<boolean>(false);
  return (
    <div className="relative">
      <button
        className={`${
          theme == "dark"
            ? "bg-first hover:opacity-80 text-dark"
            : "bg-second hover:opacity-80 text-white"
        } flex items-center px-2 py-0.5 rounded hover:transition`}
        onClick={() => setIsEditTabVisible(!isEditTabVisible)}
      >
        <BsPencilSquare />
        <span className="ml-1">{t("class.gradingPeriod.edit")}</span>
      </button>
      {isEditTabVisible && (
        <EditTab
          setIsEditTabVisible={setIsEditTabVisible}
          gradingPeriod={gradingPeriod}
        />
      )}
    </div>
  );
};

export default ButtonEditTab;
