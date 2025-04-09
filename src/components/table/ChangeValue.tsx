import { useContext, useState } from "react";
import { Assessment } from "../../store/assessments/interfaces/Assessment";
import { themeContext } from "../../context/ThemeContext";
import InputSubmit from "../InputSubmit";
import { t } from "i18next";
import { changeAssessmentValue } from "../../store/assessments/functions/changeAssessmentValue";
import { useSnackbar } from "../../context/SnackBarContext";

interface ChangeValueProps {
  assessment: Assessment;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setIsMenuVisible: (value: boolean) => void;
}

const ChangeValue: React.FC<ChangeValueProps> = ({
  assessment,
  loading,
  setLoading,
}) => {
  const [value, setValue] = useState<number>(assessment.value);
  const { theme } = useContext(themeContext);
  const { showSnackbar } = useSnackbar();
  const handleValue = async () => {
    try {
      setLoading(true);
      assessment.value = value;
      await changeAssessmentValue(assessment);
      showSnackbar({
        title: t("success"),
        body: t("table.assessment.alteredValue"),
        isError: false,
      });
    } catch (error: any) {
      showSnackbar({
        title: t("error"),
        body: error.message,
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      className={`flex flex-col items-start absolute px-5 py-2 rounded 
        top-full right-0 w-40 font-normal z-10 border mt-1 ${
          theme == "dark"
            ? "bg-fourth border-gray-800"
            : "bg-light-100 border-gray-400"
        }`}
    >
      <input
        type="number"
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className={
          "p-1 mb-2 w-full border-b-2 border-gray-300 focus:border-b-2 focus:border-second focus:outline-0 " +
          (theme === "dark" ? "bg-third" : "bg-light-100")
        }
      />
      <InputSubmit
        value={t("table.assessment.changeValue")}
        handleSubmit={handleValue}
        isLoading={loading}
      />
    </div>
  );
};

export default ChangeValue;
