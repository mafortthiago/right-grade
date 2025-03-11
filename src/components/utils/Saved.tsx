import { FunctionComponent, useContext, useEffect, useState } from "react";
import {
  BsCloudArrowUpFill,
  BsCloudCheckFill,
  BsCloudMinusFill,
} from "react-icons/bs";
import { themeContext } from "../../context/ThemeContext";
import { useStudentStore } from "../../store/students/students";
import { Detail } from "./Detail";
import { KeyboardKey } from "./KeyboardKey";
import { updateAPI } from "../../store/students/functions/updateAPI";
import { useSnackbar } from "../../context/SnackBarContext";
import { t } from "i18next";

/**
 * The component that represents the application data state, whether it is saved or not.
 *
 * The component contains a cloud with three states and texts:
 * - Green - saved - salvo
 * - Yellow - saving - salvando
 * - Red - not saved - não salvo
 * It is also possible to save by using the shortcut shift + s.
 * @example
 * ```
 * <Saved />
 * ```
 * @returns {JSX.Element} Returns the button that, when clicked, saves the grades.
 **/
const Saved: FunctionComponent = (): JSX.Element => {
  const { theme } = useContext(themeContext);
  const { isSaved, students, setIsSaved, hasInvalidValues } = useStudentStore();
  const [isDetailVisbible, setIsDetailVisible] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { showSnackbar } = useSnackbar();

  const styles = {
    component: `relative flex items-center mt-14 mr-6 cursor-pointer self-start text-sm ml-4 
    px-2 py-1 rounded hover:shadow-sm sm:self-end sm:mt-6 ${
      theme == "dark"
        ? "bg-third hover:shadow-gray-700"
        : "bg-light-100 hover:shadow-gray-500"
    }`,
    cloudComponent: "flex",
    cloudChecked: `${
      theme == "dark" ? "text-first" : "text-second"
    } mr-1 h-5 w-5`,
    cloudMinus: `text-red-500 mr-1 h-5 w-5`,
    cloudArrowUp: `text-amber-300 mr-1 h-5 w-5`,
  };

  const handleSaveShortcut = async () => {
    if (hasInvalidValues) {
      showSnackbar({
        title: t("error"),
        body: t("table.invalidValues"),
        isError: true,
      });
      return;
    }
    try {
      setLoading(true);
      await updateAPI();
      setIsSaved(true);
    } catch (e) {
      showSnackbar({
        title: t("error"),
        body: t("table.saveError"),
        isError: true,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.shiftKey && event.key === "S") {
        handleSaveShortcut();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [students]);

  return (
    <div
      className={`${styles.component} ${
        hasInvalidValues ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
      }`}
      onMouseEnter={() => setIsDetailVisible(true)}
      onMouseLeave={() => setIsDetailVisible(false)}
      onClick={handleSaveShortcut}
    >
      {isSaved ? (
        <div className={styles.cloudComponent}>
          <BsCloudCheckFill className={styles.cloudChecked} />
          <span>{t("table.saved")}</span>
        </div>
      ) : loading ? (
        <div className={styles.cloudComponent}>
          <BsCloudArrowUpFill className={styles.cloudArrowUp} />
          <span>{t("table.saving")}</span>
        </div>
      ) : (
        <div className={styles.cloudComponent}>
          <BsCloudMinusFill className={styles.cloudMinus} />
          <span>{t("table.notSaved")}</span>
        </div>
      )}
      {isDetailVisbible && (
        <Detail>
          <span className="mr-1 text-xs">{t("table.save")}:</span>
          <KeyboardKey>Shift</KeyboardKey>
          <KeyboardKey>s</KeyboardKey>
        </Detail>
      )}
    </div>
  );
};

export default Saved;
