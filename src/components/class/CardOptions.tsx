import React, { useContext, useEffect, useRef, useState } from "react";
import {
  BsPencilFill,
  BsPenFill,
  BsThreeDots,
  BsTrash3Fill,
  BsX,
} from "react-icons/bs";
import { themeContext } from "../../context/ThemeContext";
import { t } from "i18next";
import { useSnackbar } from "../../context/SnackBarContext";
import Confirm from "../utils/Confirm";
import CardRename from "./CardRename";
import { Group } from "../../store/classes";
import { deleteClassCard } from "../../store/classes/deleteClassCard";
import ChangeMinimumGrade from "./ChangeMinimumGrade";

interface CardOptionsProps {
  group: Group;
}

/**
 * Card options Component
 *
 * This component renders a dropdown menu with options for managing classes.
 *
 * The menu includes actions like delete and rename, and update minimum grade.
 *
 * @component
 * @returns {JSX.Element} The rendered Card component.
 *
 * @example
 * <CardOptions group={group}/>
 */
const CardOptions: React.FC<CardOptionsProps> = ({ group }) => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const [isRenameVisible, setIsRenameVisible] = useState<boolean>(false);
  const [isDeletingCard, setIsDeletingCard] = useState<boolean>(false);
  const [isChangeMinimumGradeVisible, setIsChangeMinimumGradeVisible] =
    useState<boolean>(false);
  const { theme } = useContext(themeContext);
  const menuRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();
  const styles = {
    buttonOptions: `text-sm w-full flex items-center gap-1.5 text-start px-1 py-0.5 ${
      theme === "dark" ? "hover:bg-third" : "hover:bg-light-200"
    } ${loading ? "opacity-50 cursor-not-allowed" : ""}`,
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

  const toggleRename = () => {
    if (!loading) {
      setIsRenameVisible(!isRenameVisible);
      setIsChangeMinimumGradeVisible(false);
    }
  };

  const toggleMinimumGrade = () => {
    if (!loading) {
      setIsChangeMinimumGradeVisible(!isChangeMinimumGradeVisible);
      setIsRenameVisible(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClassCard(group);
      showSnackbar({
        title: t("success"),
        body: t("class.deleteSuccess"),
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
      setIsDeletingCard(false);
    }
  };

  return (
    <div
      className="w-full flex justify-end mb-1 absolute top-8 right-6"
      ref={menuRef}
    >
      <button
        className={`p-1 rounded border ${
          theme == "dark"
            ? "bg-fourth hover:bg-third border-gray-800"
            : "bg-light-100 border-gray-400 hover:bg-gray-200"
        } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={() => !loading && setIsMenuVisible(!isMenuVisible)}
        disabled={loading}
      >
        {isMenuVisible ? <BsX /> : <BsThreeDots />}
      </button>
      {isMenuVisible && (
        <div
          className={`flex flex-col items-start absolute px-5 py-2 rounded top-full right-0 w-40 font-normal z-10 border mt-1 ${
            theme == "dark"
              ? "bg-fourth border-gray-800"
              : "bg-light-100 border-gray-400"
          }`}
          style={{ boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)" }}
        >
          <h2 className="font-medium">{t("table.assessment.options")}</h2>
          <hr className="border-t border-gray-400 w-full mt-0.5 mb-1" />
          <button
            className={styles.buttonOptions}
            disabled={loading}
            onClick={() => setIsDeletingCard(true)}
          >
            <BsTrash3Fill />
            {t("table.assessment.delete")}
          </button>
          <button
            className={styles.buttonOptions}
            disabled={loading}
            onClick={toggleRename}
          >
            <BsPenFill /> {t("table.assessment.rename")}
          </button>
          <button
            className={styles.buttonOptions}
            disabled={loading}
            onClick={toggleMinimumGrade}
          >
            <BsPencilFill className="w-6" /> {t("class.updateMinimumGrade")}
          </button>
          {isDeletingCard && (
            <Confirm
              title={t("table.student.confirmDelete")}
              message={t("class.deleteWarning")}
              confirmText={t("table.student.confirmButton")}
              onCancel={() => setIsDeletingCard(false)}
              onConfirm={handleDelete}
            />
          )}
          {isRenameVisible && (
            <CardRename
              group={group}
              loading={loading}
              setLoading={setLoading}
              setIsMenuVisible={setIsMenuVisible}
            />
          )}
          {isChangeMinimumGradeVisible && (
            <ChangeMinimumGrade
              group={group}
              loading={loading}
              setLoading={setLoading}
              setIsMenuVisible={setIsMenuVisible}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default CardOptions;
