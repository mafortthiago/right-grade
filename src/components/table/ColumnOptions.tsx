import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BsPencilSquare,
  BsPenFill,
  BsPlusSquareFill,
  BsThreeDots,
  BsTrash3Fill,
  BsX,
} from "react-icons/bs";
import { themeContext } from "../../context/ThemeContext";
import { t } from "i18next";
import { Assessment } from "../../store/assessments/interfaces/Assessment";
import { addRecoveryAssessment } from "../../store/assessments/functions/addRecoveryAssessment";
import { deleteAssessment } from "../../store/assessments/functions/deleteAssessment";
import { useSnackbar } from "../../context/SnackBarContext";

interface ColumnOptionsProps {
  assessment: Assessment;
}

/**
 * ColumnOptions Component
 *
 * This component renders a dropdown menu with options for managing table columns.
 *
 * The menu includes actions like Delete, Rename, Change Value, and Add Recovery.
 *
 * @component
 * @returns {JSX.Element} The rendered ColumnOptions component.
 *
 * @example
 * <ColumnOptions />
 */
const ColumnOptions: React.FC<ColumnOptionsProps> = ({ assessment }) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const { theme } = useContext(themeContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const styles = {
    buttonOptions: `text-sm w-full flex items-center gap-1.5 text-start px-1 py-0.5 ${
      theme === "dark" ? "hover:bg-third" : "hover:bg-light-200"
    }`,
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteAssessment(assessment.id || "");
      showSnackbar({
        title: t("success"),
        body: t("table.assessment.successDelete"),
        isError: false,
      });
    } catch (e: any) {
      showSnackbar({
        title: t("error"),
        body: e.message,
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecovery = async () => {
    try {
      setLoading(true);
      const recoveryAssessment = {
        ...assessment,
        name: assessment.name + " (recovery)",
        isRecovery: true,
      };
      await addRecoveryAssessment(recoveryAssessment);
      setIsMenuVisible(false);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex justify-end mb-1 relative" ref={menuRef}>
      <button
        className={`p-1 rounded border ${
          theme == "dark"
            ? "bg-fourth hover:bg-third border-gray-800"
            : "bg-light-100 border-gray-400 hover:bg-gray-200"
        }`}
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        {isMenuVisible ? <BsX /> : <BsThreeDots />}
      </button>
      {isMenuVisible && (
        <div
          className={`flex flex-col items-start absolute px-5 py-2 rounded -right-41 w-40 font-normal z-10 border  ${
            theme == "dark"
              ? "bg-fourth border-gray-800"
              : "bg-light-100 border-gray-400"
          }`}
        >
          <h2 className="font-medium">{t("table.assessment.options")}</h2>
          <hr className="border-t border-gray-400 w-full mt-0.5 mb-1" />
          <button className={styles.buttonOptions} onClick={handleDelete}>
            <BsTrash3Fill />
            {t("table.assessment.delete")}
          </button>
          <button className={styles.buttonOptions}>
            <BsPenFill /> {t("table.assessment.rename")}
          </button>
          <button className={styles.buttonOptions}>
            <BsPencilSquare /> {t("table.assessment.changeValue")}
          </button>
          <button
            className={`${styles.buttonOptions} ${
              assessment.recoveryAssessmentId
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            onClick={handleAddRecovery}
            disabled={assessment.recoveryAssessmentId ? true : false}
          >
            <BsPlusSquareFill className="min-w-3.5" />
            {t("table.assessment.addRecovery")}
          </button>
        </div>
      )}
    </div>
  );
};

export default ColumnOptions;
