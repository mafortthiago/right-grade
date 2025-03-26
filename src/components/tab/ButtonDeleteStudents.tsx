import { FunctionComponent, useContext, useState } from "react";
import { useSelectedBox } from "../table/selectedBoxes";
import { themeContext } from "../../context/ThemeContext";
import { BsTrash3Fill } from "react-icons/bs";
import { useStudentStore } from "../../store/students/students";
import { useSnackbar } from "../../context/SnackBarContext";
import { t } from "i18next";
import { Detail } from "../utils/Detail";
import Confirm from "../utils/Confirm";

/**
 * ButtonDeleteStudent - Component that renders a button to delete selected students
 *
 * Features:
 * - Automatically disables when no valid students are selected
 * - Shows an explanatory tooltip when the button is disabled
 * - Automatically toggles between singular and plural based on selection count
 * - Displays success or error notifications upon completion
 *
 * Business Rules:
 * - Button is disabled when there are no selections
 * - Button is disabled when only the header is selected
 * - Before deletion, ensures data is synchronized with updateAPI()
 *
 * @returns {JSX.Element} Student deletion button with conditional tooltip
 */
const ButtonDeleteStudent: FunctionComponent = () => {
  const { selectedBoxes } = useSelectedBox();
  const { deleteStudents, updateAPI, hasInvalidValues } = useStudentStore();
  const { theme } = useContext(themeContext);
  const { showSnackbar } = useSnackbar();
  const [isTooltipDeleteNoAllowed, setIsTooltipDeleteNoAllowed] =
    useState<boolean>(false);
  const [isDeletingStudents, setIsDeletingStudents] = useState<boolean>(false);
  const hasNoSelections =
    Object.values(selectedBoxes).filter((b) => b === true).length === 0;
  const hasOnlyOneSelection =
    Object.values(selectedBoxes).filter((b) => b === true).length === 1;
  const isButtonDisabled =
    hasNoSelections || (hasOnlyOneSelection && selectedBoxes["head"]);

  const handleDeleteStudents = async () => {
    try {
      if (hasInvalidValues) {
        showSnackbar({
          title: t("error"),
          body: t("table.invalidValues"),
          isError: true,
        });
        return;
      }
      // wait saves the current students.
      await updateAPI();
      await deleteStudents(selectedBoxes);
      showSnackbar({
        title: t("class.gradingPeriod.success"),
        body: t("table.student.successDeleteStudents"),
        isError: false,
      });
    } catch (error: any) {
      showSnackbar({
        title: t("error"),
        body: t("table.student.errorDeleteStudents"),
        isError: true,
      });
    } finally {
      setIsDeletingStudents(false);
    }
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => isButtonDisabled && setIsTooltipDeleteNoAllowed(true)}
      onMouseLeave={() => setIsTooltipDeleteNoAllowed(false)}
    >
      {isTooltipDeleteNoAllowed && (
        <Detail>{t("table.student.notAllowedDelete")}</Detail>
      )}
      <button
        disabled={isButtonDisabled}
        className={`mr-4 rounded flex items-center px-2 h-7 ${
          theme == "dark"
            ? "bg-fourth hover:bg-zinc-800"
            : "bg-light-200 hover:bg-stone-300 text-third"
        }
        ${hasInvalidValues && "opacity-50 cursor-not-allowed"}
        `}
        onClick={() => setIsDeletingStudents(true)}
      >
        <BsTrash3Fill className="mr-1 text-red-500" />
        <span>
          {t("table.student.delete")}
          {!isButtonDisabled && "s"}
        </span>
      </button>
      {isDeletingStudents && (
        <Confirm
          title={t("table.student.confirmDelete")}
          message={t("table.student.deleteWarning")}
          confirmText={t("table.student.confirmButton")}
          onCancel={() => setIsDeletingStudents(false)}
          onConfirm={handleDeleteStudents}
        />
      )}
    </div>
  );
};

export default ButtonDeleteStudent;
