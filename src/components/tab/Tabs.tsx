// imports
import { FunctionComponent, useContext, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import { t } from "i18next";
import { TabsProps } from "./interfaces/TabsProps";
import { GradingPeriodErrorMessage } from "./interfaces/GradingPeriodErrorMessage";
import { useGradingPeriodStore } from "../../store/gradingPeriod/gradingPeriods";
import { GradingPeriod } from "../../store/gradingPeriod/interfaces/GradingPeriod";
import { useSnackbar } from "../../context/SnackBarContext";
import ButtonAddTab from "./ButtonAddTab";

/**
 * Tabs component to manage and display grading period tabs.
 * @param {TabsProps} props
 * The component's properties.
 * @param {React.ReactNode} props.children
 * The children components to be rendered within the tabs.
 * @param {string} props.groupId
 * The group ID to which the grading periods belong.
 * @returns {JSX.Element} The Tabs component.
 */
const Tabs: FunctionComponent<TabsProps> = ({
  children,
  groupId,
}: TabsProps): JSX.Element => {
  const [activeTab, setActiveTab] = useState<number>(0);
  const { theme } = useContext(themeContext);
  const { addGradingPeriod } = useGradingPeriodStore();
  const { showSnackbar } = useSnackbar();
  const [loading, setLoading] = useState<boolean>(false);

  const handleAddGradingPeriod = async () => {
    setLoading(true);
    const gradingPeriod: GradingPeriod = {
      name: t("class.semester"),
      groupId: groupId,
    };
    try {
      await addGradingPeriod(gradingPeriod);
    } catch (error: any) {
      onError(errorTranslator(JSON.parse(error.message)));
    } finally {
      setLoading(false);
    }
  };

  const onError = (error: GradingPeriodErrorMessage) => {
    showSnackbar({
      title: t("error"),
      body: Object.values(error)[0],
      isError: true,
    });
  };

  const errorTranslator = (error: GradingPeriodErrorMessage) => {
    let translatedError: GradingPeriodErrorMessage = {};
    if (error.name) {
      translatedError.name = t("class.error.name");
    }
    if (error.groupId) {
      translatedError.groupId = t("class.error.groupId");
    }
    return translatedError;
  };

  return (
    <div className={`mx-4 self-start w-11/12`}>
      <ButtonAddTab handleClick={handleAddGradingPeriod} loading={loading} />
      {children ? (
        <>
          <div className="flex overflow-x-auto overflow-y-clip ml-1">
            {children.map((tab, index) => (
              <button
                key={index}
                className={`text-sm:text-base px-2 py-1 pr-3 rounded ${
                  activeTab == index
                    ? theme == "dark"
                      ? "bg-third border-x-2 border-t-2 border-zinc-700 mx-1 scale-105"
                      : "bg-light-100 border-x-2 border-t-2 border-stone-400 px-1 mx-1 scale-105"
                    : theme == "dark"
                    ? "bg-dark border border-gray-600 mx-0.5"
                    : "bg-stone-300 border border-gray-400 mx-0.5"
                }`}
                onClick={() => setActiveTab(index)}
              >
                {tab.props.label}
              </button>
            ))}
          </div>
          <div className="">{children[activeTab]}</div>
        </>
      ) : (
        <div
          className={`rounded p-1 text-center ${
            theme == "dark" ? "bg-third" : "bg-light-100"
          }`}
        >
          {t("class.gradingPeriodsEmpty")}
        </div>
      )}
    </div>
  );
};

export default Tabs;
