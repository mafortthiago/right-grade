import { t } from "i18next";
import { forwardRef, useContext } from "react";
import { themeContext } from "../context/ThemeContext";
interface ConfirmProps {
  title: string;
  body: string;
  handleConfirm: VoidFunction;
  handleCancel: VoidFunction;
}
const Confirm = forwardRef<HTMLDialogElement, ConfirmProps>(
  ({ title, body, handleConfirm, handleCancel }, ref) => {
    const { theme } = useContext(themeContext);
    return (
      <dialog
        ref={ref}
        className={`p-3 rounded ${
          theme == "dark" ? "bg-third text-white" : ""
        }`}
      >
        <h3 className="font-medium">{title}</h3>
        <p>{body}</p>
        <button
          onClick={() => handleCancel()}
          className="bg-red-400 text-white px-2 py-1 rounded"
        >
          {t("class.cancel")}
        </button>
        <button
          onClick={() => handleConfirm()}
          className="ml-1.5 mt-1.5 bg-second text-white px-2 py-1 rounded"
        >
          {t("class.confirm")}
        </button>
      </dialog>
    );
  }
);

export default Confirm;
