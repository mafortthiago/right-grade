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
import RenameAssessment from "./RenameAssessment";
import ChangeValue from "./ChangeValue";
import Confirm from "../utils/Confirm";

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
 * @param {Assessment} {@link Assessment} - The assessment object containing details for the column.
 *
 * @component
 * @returns {JSX.Element} The rendered ColumnOptions component.
 *
 * @example
 * <ColumnOptions assessment={assessment}/>
 */
const ColumnOptions: React.FC<ColumnOptionsProps> = ({ assessment }) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isRenameVisible, setIsRenameVisible] = useState<boolean>(false);
  const [isChangeValueVisible, setIsChangeValueVisible] =
    useState<boolean>(false);
  const [isDeletingAssessment, setIsDeletingAssessment] =
    useState<boolean>(false);
  const { theme } = useContext(themeContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const containerClasses = "w-full flex justify-end mb-1 relative";
  const toggleButtonBaseClasses = "p-1 rounded border";
  const toggleButtonThemeClasses =
    theme === "dark"
      ? "bg-fourth hover:bg-third border-gray-800"
      : "bg-light-100 border-gray-400 hover:bg-gray-200";
  const toggleButtonStateClasses = loading
    ? "opacity-50 cursor-not-allowed"
    : "";
  const dropdownMenuBaseClasses =
    "flex flex-col items-start absolute px-5 py-2 rounded top-full right-0 w-40 font-normal z-10 border mt-1";
  const dropdownMenuThemeClasses =
    theme === "dark"
      ? "bg-fourth border-gray-800"
      : "bg-light-100 border-gray-400";
  const titleClasses = "font-medium";
  const separatorClasses = "border-t border-gray-400 w-full mt-0.5 mb-1";
  const buttonOptionsClasses = `text-sm w-full flex items-center gap-1.5 text-start px-1 py-0.5 ${
    theme === "dark" ? "hover:bg-third" : "hover:bg-light-200"
  } ${loading ? "opacity-50 cursor-not-allowed" : ""}`;
  const recoveryButtonStateClasses = assessment.recoveryAssessmentId
    ? "opacity-50 cursor-not-allowed"
    : "";

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
      setIsMenuVisible(false);
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
      setIsMenuVisible(false);
    }
  };

  const toggleRename = () => {
    if (!loading) {
      setIsRenameVisible(!isRenameVisible);
      if (!isRenameVisible && isChangeValueVisible) {
        setIsChangeValueVisible(false);
      }
    }
  };

  const toggleChangeValue = () => {
    if (!loading) {
      setIsChangeValueVisible(!isChangeValueVisible);
      if (!isChangeValueVisible && isRenameVisible) {
        setIsRenameVisible(false);
      }
    }
  };

  return (
    <div className={containerClasses} ref={menuRef}>
      <button
        className={`${toggleButtonBaseClasses} ${toggleButtonThemeClasses} ${toggleButtonStateClasses}`}
        onClick={() => !loading && setIsMenuVisible(!isMenuVisible)}
        disabled={loading}
      >
        {isMenuVisible ? <BsX /> : <BsThreeDots />}
      </button>
      {isMenuVisible && (
        <div
          className={`${dropdownMenuBaseClasses} ${dropdownMenuThemeClasses}`}
          style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <h2 className={titleClasses}>{t("table.assessment.options")}</h2>
          <hr className={separatorClasses} />
          <button
            className={buttonOptionsClasses}
            onClick={() => setIsDeletingAssessment(true)}
            disabled={loading}
          >
            <BsTrash3Fill />
            {t("table.assessment.delete")}
          </button>
          <button
            className={buttonOptionsClasses}
            onClick={toggleRename}
            disabled={loading}
          >
            <BsPenFill /> {t("table.assessment.rename")}
          </button>
          <button
            className={buttonOptionsClasses}
            onClick={toggleChangeValue}
            disabled={loading}
          >
            <BsPencilSquare /> {t("table.assessment.changeValue")}
          </button>
          <button
            className={`${buttonOptionsClasses} ${recoveryButtonStateClasses}`}
            onClick={handleAddRecovery}
            disabled={loading || !!assessment.recoveryAssessmentId}
          >
            <BsPlusSquareFill className="min-w-3.5" />
            {t("table.assessment.addRecovery")}
          </button>
          {isRenameVisible && (
            <RenameAssessment
              assessment={assessment}
              loading={loading}
              setLoading={setLoading}
              setIsMenuVisible={setIsMenuVisible}
            />
          )}
          {isChangeValueVisible && (
            <ChangeValue
              assessment={assessment}
              loading={loading}
              setLoading={setLoading}
              setIsMenuVisible={setIsMenuVisible}
            />
          )}
          {isDeletingAssessment && (
            <Confirm
              title={t("table.student.confirmDelete")}
              message={t("table.assessment.deleteWarning")}
              confirmText={t("table.student.confirmButton")}
              onCancel={() => setIsDeletingAssessment(false)}
              onConfirm={handleDelete}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ColumnOptions;
