import { FunctionComponent, useState, MouseEvent, useContext } from "react";
import Input from "../Input";
import InputSubmit from "../InputSubmit";
import { themeContext } from "../../context/ThemeContext";
import { BsXSquareFill } from "react-icons/bs";
import { ErrorMessages as IErrorMessages } from "../../util/errorTranslator";
import { useAssessmentStore } from "../../store/assessments/assessments";
import { Assessment } from "../../store/assessments/interfaces/Assessment";
import ErrorMessages from "../error/ErrorMessages";
import { useTranslation } from "react-i18next";
import { useStudentStore } from "../../store/students/students";

interface AddAssessmentProps {
  setIsAddVisible: (value: boolean) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  gradingPeriodId: string;
}

/**
 * Sidebar drawer that allows adding a new assessment.
 *
 * This component is shown as a sliding panel from the right side of the screen
 * when the user clicks to add a new assessment. It provides a form to input
 * the assessment name and value.
 *
 * @param {object} props - Component properties
 * @param {boolean} props.loading - Indicates if an operation is in progress
 * @param {function} props.setLoading - Function to update the loading state
 * @param {function} props.setIsAddVisible - Function to control the visibility of this drawer
 * @param {string} props.gradingPeriodId - ID of the grading period to which the assessment will be added
 * @returns {JSX.Element} The rendered sidebar drawer component
 */
const AddAssessment: FunctionComponent<AddAssessmentProps> = ({
  loading,
  setLoading,
  setIsAddVisible,
  gradingPeriodId,
}): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<IErrorMessages>({});
  const { theme } = useContext(themeContext);
  const { addAssessment } = useAssessmentStore();
  const { updateAPI, setIsSaved } = useStudentStore();
  const { t } = useTranslation();
  const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault();
    try {
      setLoading(true);
      // wait saves the current students.
      await updateAPI();
      setIsSaved(true);
      const assessment: Assessment = {
        name,
        value: Number(value),
        gradingPeriodId,
      };
      const errorMessages: IErrorMessages = {
        incorrectName: t("class.error.name"),
      };
      await addAssessment(assessment, errorMessages);
      setIsAddVisible(false);
    } catch (error: any) {
      setError(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside
      className={`animate-slide-in-right fixed z-20 top-56 right-0  border border-stone-400 p-8 rounded-l-xl ${
        theme == "dark" ? "bg-third" : "bg-light-100"
      }`}
    >
      <h2 className="font-bold text-base flex justify-between items-center mb-2">
        <span>{t("table.assessment.add")}</span>
        <BsXSquareFill
          onClick={() => setIsAddVisible(false)}
          className="cursor-pointer w-5 h-5 -mr-3 text-red-400 hover:text-red-500 transition"
        />
      </h2>
      <form>
        <Input
          type="text"
          value={name}
          setValue={setName}
          textLabel={t("table.assessment.name")}
        />
        <Input
          type="text"
          value={String(value)}
          setValue={setValue}
          textLabel={t("table.assessment.value")}
        />
        <InputSubmit
          value={t("table.assessment.add")}
          handleSubmit={handleSubmit}
          isLoading={loading}
        />
      </form>
      <ErrorMessages error={error} />
    </aside>
  );
};

export default AddAssessment;
