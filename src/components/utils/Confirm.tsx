import React, { useContext, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import Input from "../Input";
import ErrorMessages from "../error/ErrorMessages";
import { t } from "i18next";

interface ConfirmProps {
  title: string;
  message: string;
  confirmText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

/**
 * A reusable confirmation modal component.
 *
 * This component displays a modal with a title, message, and optional input field
 * for the user to type a confirmation text. It provides two buttons: one to confirm
 * the action and another to cancel it.
 *
 * @param {ConfirmProps} props - The props for the Confirm component.
 * @returns {JSX.Element} The rendered confirmation modal.
 */
const Confirm: React.FC<ConfirmProps> = ({
  title,
  message,
  confirmText,
  onConfirm,
  onCancel,
}) => {
  const { theme } = useContext(themeContext);
  const [textConfirm, setTextConfirm] = useState<string>("");
  const [error, setError] = useState<string>();
  return (
    <div className="fixed top-0 left-0 z-30 w-full h-full bg-dark flex items-center justify-center bg-opacity-40">
      <div
        className={`rounded flex flex-col items-center p-8 ${
          theme == "dark" ? "bg-fourth" : "bg-light-200"
        }`}
      >
        <h2 className="font-bold self-start mb-1">{title}</h2>
        <p>{message}</p>
        {confirmText && (
          <div className="self-start w-full">
            <p className="mb-1">
              {t("table.student.confirmPrompt")}
              <span className="font-bold">{confirmText} </span>
            </p>
            <Input
              value={textConfirm}
              setValue={setTextConfirm}
              textLabel=""
              type="text"
            />
          </div>
        )}

        <div className="w-full flex gap-1.5">
          <button
            onClick={() => {
              if (confirmText && confirmText == textConfirm) {
                onConfirm();
              } else {
                setError(t("table.student.confirmError"));
              }
            }}
            className={`font-medium hover:opacity-80 px-2 py-1 rounded w-1/2 ${
              theme == "dark" ? "bg-first text-dark" : "bg-second text-white"
            }`}
          >
            {t("table.student.confirmButton")}
          </button>
          <button
            onClick={onCancel}
            className="text-dark hover:opacity-80 font-medium bg-red-400 px-2 py-1 rounded w-1/2"
          >
            {t("table.student.cancelButton")}
          </button>
        </div>
        <div className="w-full pt-2">
          {error && <ErrorMessages error={{ incorrectName: error }} />}
        </div>
      </div>
    </div>
  );
};

export default Confirm;
