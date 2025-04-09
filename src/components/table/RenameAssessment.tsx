import { FunctionComponent, useContext, useState } from "react";
import Input from "../Input";
import { Assessment } from "../../store/assessments/interfaces/Assessment";
import { t } from "i18next";
import { useSnackbar } from "../../context/SnackBarContext";
import InputSubmit from "../InputSubmit";
import { themeContext } from "../../context/ThemeContext";
import { renameAssessment } from "../../store/assessments/functions/renameAssessment";

interface RenameAssessmentProps {
  assessment: Assessment;
  loading: boolean;
  setLoading: (value: boolean) => void;
  setIsMenuVisible: (value: boolean) => void;
}
const RenameAssessment: FunctionComponent<RenameAssessmentProps> = ({
  assessment,
  setLoading,
  setIsMenuVisible,
}) => {
  const [name, setName] = useState<string>(assessment.name);
  const { showSnackbar } = useSnackbar();
  const { theme } = useContext(themeContext);

  const handleName = async () => {
    try {
      setLoading(true);
      assessment.name = name;
      await renameAssessment(assessment);
      showSnackbar({
        title: t("error"),
        body: t("table.assessment.alteredName"),
        isError: false,
      });
    } catch (error: any) {
      showSnackbar({
        title: t("error"),
        body: JSON.parse(error.message).error,
        isError: true,
      });
    } finally {
      setLoading(false);
      setIsMenuVisible(false);
    }
  };

  return (
    <div
      className={`flex flex-col items-start absolute px-5 py-2 rounded top-full right-0 w-40 font-normal z-10 border mt-1 ${
        theme == "dark"
          ? "bg-fourth border-gray-800"
          : "bg-light-100 border-gray-400"
      }`}
    >
      <Input value={name} setValue={setName} textLabel="" type="text" />
      <InputSubmit
        value={t("table.assessment.rename")}
        handleSubmit={handleName}
      />
    </div>
  );
};

export default RenameAssessment;
