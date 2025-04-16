import React, { useContext, useRef, useState } from "react";
import ButtonEditTab from "./ButtonEditTab";
import {
  BsThreeDotsVertical,
  BsTrash3Fill,
  BsXSquareFill,
} from "react-icons/bs";
import Confirm from "../Confirm";
import { t } from "i18next";
import { themeContext } from "../../context/ThemeContext";
import { GradingPeriod } from "../../store/gradingPeriod/interfaces/GradingPeriod";

interface ButtonOptionProps {
  gradingPeriod: GradingPeriod;
}
/**
 * A component that open grading periods options. Such as edit and delete.
 * @Component
 * @example
 * ```tsx
 * <ButtonOptions gradingPeriod={gradingPeriod: GradingPeriod} />
 * ```
 * @param {GradingPeriod} props.gradingPeriod - {@link GradingPeriod} object.
 * @see {@link ButtonOptionProps} - Component props.
 * @return {JSX.Element} Component ButtonOptions.
 */
const ButtonOptions: React.FC<ButtonOptionProps> = ({
  gradingPeriod,
}): JSX.Element => {
  const [isMenuVisible, setIsMenuVisible] = useState<boolean>(false);
  const { theme } = useContext(themeContext);
  const modal = useRef<HTMLDialogElement>(null);

  const optionsButtonBaseClasses =
    "w-7 h-7 flex items-center justify-center hover:shadow-sm hover:cursor-pointer rounded";
  const optionsButtonThemeClasses =
    theme === "dark"
      ? "bg-third hover:shadow-gray-700 text-first"
      : "bg-light-100 hover:shadow-gray-500 text-second";
  const closeIconClasses = "w-5 h-5 text-red-400";
  const menuIconClasses = `w-5 h-5 ${
    theme === "dark" ? "hover:text-first" : "hover:text-second"
  }`;
  const dropdownMenuBaseClasses =
    "absolute top-8 z-20 right-0 flex flex-col p-2 rounded border";
  const dropdownMenuThemeClasses =
    theme === "dark"
      ? "bg-third border-fourth"
      : "bg-light-100 border-stone-300";
  const deleteButtonBaseClasses =
    "mt-1.5 w-full rounded flex items-center px-2";
  const deleteButtonThemeClasses =
    theme === "dark"
      ? "bg-fourth hover:bg-zinc-800"
      : "bg-light-200 hover:bg-stone-300 text-third";

  const handleCancel = () => {
    modal.current?.close();
  };

  const handleDelete = () => {
    modal.current?.showModal();
  };

  return (
    <>
      <Confirm
        title={t("class.gradingPeriod.areYouSure")}
        body={t("class.gradingPeriod.youAreDeleting", {
          gradingPeriodName: gradingPeriod.name,
        })}
        handleCancel={handleCancel}
        gradingPeriod={gradingPeriod}
        modal={modal}
      />
      <div
        className={`${optionsButtonBaseClasses} ${optionsButtonThemeClasses}`}
        onClick={() => setIsMenuVisible(!isMenuVisible)}
      >
        {isMenuVisible ? (
          <BsXSquareFill className={closeIconClasses} />
        ) : (
          <BsThreeDotsVertical className={menuIconClasses} />
        )}
      </div>
      {isMenuVisible && (
        <div
          className={`${dropdownMenuBaseClasses} ${dropdownMenuThemeClasses}`}
        >
          <ButtonEditTab gradingPeriod={gradingPeriod} />
          <button
            onClick={handleDelete}
            className={`${deleteButtonBaseClasses} ${deleteButtonThemeClasses}`}
          >
            <BsTrash3Fill className="mr-1 text-red-500" />
            <span>{t("class.gradingPeriod.delete")}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ButtonOptions;
