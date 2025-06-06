import { FunctionComponent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { BsCircle, BsCheckCircleFill } from "react-icons/bs";
import { themeContext } from "../context/ThemeContext";

interface InputRadioProps {
  setIsGradeFrom0To100: (isGradeFrom0To100: boolean) => void;
}

const InputRadio: FunctionComponent<InputRadioProps> = ({
  setIsGradeFrom0To100,
}) => {
  const { t } = useTranslation();
  const { theme } = useContext(themeContext);
  const [selectedRange, setSelectedRange] = useState<boolean>(true);

  const handleChange = (isGradeFrom0To100: boolean) => {
    setSelectedRange(isGradeFrom0To100);
    setIsGradeFrom0To100(isGradeFrom0To100);
  };

  return (
    <>
      <span>{t("dashboard.class.register.gradeRange")}:</span>
      <label className="flex items-center cursor-pointer mr-4">
        <input
          type="radio"
          name="gradeRange"
          checked={!selectedRange}
          onChange={() => handleChange(false)}
          className="sr-only"
        />
        {!selectedRange ? (
          <BsCheckCircleFill
            className={`${theme == "dark" ? "text-fisrt" : "text-second"}`}
            size={20}
          />
        ) : (
          <BsCircle className="text-gray-400" size={20} />
        )}
        <span className="ml-2">{t("dashboard.class.register.range0-10")}</span>
      </label>
      <label className="flex items-center cursor-pointer">
        <input
          type="radio"
          name="gradeRange"
          checked={selectedRange}
          onChange={() => handleChange(true)}
          className="sr-only"
        />
        {selectedRange ? (
          <BsCheckCircleFill
            className={`${theme == "dark" ? "text-fisrt" : "text-second"}`}
            size={20}
          />
        ) : (
          <BsCircle className="text-gray-400" size={20} />
        )}
        <span className="ml-2">{t("dashboard.class.register.range0-100")}</span>
      </label>
    </>
  );
};

export default InputRadio;
