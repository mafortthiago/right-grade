import { FunctionComponent, useState } from "react";
import { useTranslation } from "react-i18next";

interface InputRadioProps {
  setIsGradeFrom0To100: (isGradeFrom0To100: boolean) => void;
}

const InputRadio: FunctionComponent<InputRadioProps> = ({
  setIsGradeFrom0To100,
}) => {
  const { t } = useTranslation();
  const [selectedRange, setSelectedRange] = useState<boolean>(true);

  const handleChange = (isGradeFrom0To100: boolean) => {
    setSelectedRange(isGradeFrom0To100);
    setIsGradeFrom0To100(isGradeFrom0To100);
  };

  return (
    <>
      <span>{t("dashboard.class.register.gradeRange")}:</span>
      <label className="custom-radio">
        <input
          type="radio"
          name="gradeRange"
          checked={!selectedRange}
          onChange={() => handleChange(false)}
        />
        <span className="ml-1">{t("dashboard.class.register.range0-10")}</span>
      </label>
      <label className="custom-radio">
        <input
          type="radio"
          name="gradeRange"
          checked={selectedRange}
          onChange={() => handleChange(true)}
        />
        <span className="ml-1">{t("dashboard.class.register.range0-100")}</span>
      </label>
    </>
  );
};

export default InputRadio;
