import { t } from "i18next";
import { forwardRef, useContext, useState } from "react";
import { themeContext } from "../context/ThemeContext";
import { deleteGradingPeriod } from "../store/gradingPeriod/functions/deleteGradingPeriod";
import { GradingPeriod } from "../store/gradingPeriod/interfaces/GradingPeriod";
import { useSnackbar } from "../context/SnackBarContext";
interface ConfirmProps {
  title: string;
  body: string;
  handleCancel: VoidFunction;
  gradingPeriod: GradingPeriod;
  modal: React.RefObject<HTMLDialogElement>;
}
/**
 * Modal that confirm and delete~s a grading period.
 * @example
 * ```
 * <Confirm
        title={t("class.gradingPeriod.areYouSure")}
        body={t("class.gradingPeriod.youAreDeleting", {
          gradingPeriodName: gradingPeriod.name,
        })}
        handleCancel={handleCancel}
        gradingPeriod={gradingPeriod}
        modal={modal}
    />
 * ```
 *  @param {ConfirmProps} ConfirmProps - The confirm props: {@link ConfirmProps}
 *  @returns {JSX.Element} The Confirm component.
 */
const Confirm = forwardRef<HTMLDialogElement, ConfirmProps>(
  ({ title, body, handleCancel, gradingPeriod, modal }, ref) => {
    const { showSnackbar } = useSnackbar();
    const [loading, setLoading] = useState<boolean>(false);
    const handleConfirm = async () => {
      try {
        setLoading(true);
        await deleteGradingPeriod(gradingPeriod);
        showSnackbar({
          title: t("class.gradingPeriod.success"),
          body: t("class.gradingPeriod.successDelete"),
          isError: false,
        });
      } catch (error: any) {
        showSnackbar({
          title: t("error"),
          body: t("class.gradingPeriod.error.delete"),
          isError: true,
        });
      } finally {
        modal.current?.close();
        setLoading(false);
      }
    };
    const { theme } = useContext(themeContext);
    return (
      <dialog
        ref={modal}
        className={`p-3 rounded ${
          theme == "dark" ? "bg-third text-white" : ""
        }`}
      >
        <h3 className="font-medium">{title}</h3>
        <p>{body}</p>
        <button
          onClick={() => handleCancel()}
          disabled={loading}
          className="bg-red-400 text-white px-2 py-1 rounded"
        >
          {t("class.cancel")}
        </button>
        <button
          onClick={() => handleConfirm()}
          className="ml-1.5 mt-1.5 bg-second text-white px-2 py-1 rounded"
          disabled={loading}
        >
          {t("class.confirm")}
        </button>
      </dialog>
    );
  }
);

export default Confirm;
