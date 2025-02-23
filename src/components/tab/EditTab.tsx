// imports
import { FormEvent, FunctionComponent, useContext, useState } from "react";
import { themeContext } from "../../context/ThemeContext";
import Input from "../Input";
import { BsXSquareFill } from "react-icons/bs";
import InputSubmit from "../InputSubmit";
import { ErrorMessages as IErrorMessages } from "../../util/errorTranslator";
import { t } from "i18next";
import { EditTabProps } from "./interfaces/EditTabProps";
import { useGradingPeriodStore } from "../../store/gradingPeriod/gradingPeriods";
import ErrorMessages from "../error/ErrorMessages";

/**
 *  Component for editing the grading period name.
 *
 * @Component
 * @example
 * ```
 * <EditTab
 *    setIsEditTabVisible={(visible:boolean) => void}
 *    gradingPeriod={{id: "16d9nh7...", name: "Semester"}}
 * />
 * ```
 * @param {EditTabProps} props - Components properties.
 * @param {Function} props.setIsEditTabVisible - Function to controll component visibility.
 * @param {Object} props.gradingPeriod - Object representing a grading period.
 *
 * @returns {TSX.Element} - A modal form for editing the period name.
 * @throws {ApiError} - Throws an error if the name is not between 2 and 100 characters.
 */
const EditTab: FunctionComponent<EditTabProps> = ({
  setIsEditTabVisible,
  gradingPeriod,
}) => {
  const { editGradingPeriod } = useGradingPeriodStore();
  const { theme } = useContext(themeContext);
  const [name, setName] = useState<string>(gradingPeriod.name);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<IErrorMessages>({});

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newGradingPeriod = structuredClone(gradingPeriod);
      newGradingPeriod.name = name;
      const errorMessages: IErrorMessages = {
        incorrectName: t("class.error.name"),
      };
      await editGradingPeriod(newGradingPeriod, errorMessages);
      setIsEditTabVisible(false);
    } catch (error: any) {
      setError(JSON.parse(error.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`p-2 absolute bg-stone-100 top-8 left-0 rounded w-max 
    ${
      theme == "dark" ? "bg-zinc-950" : "bg-stone-100 border border-stone-400"
    }`}
    >
      <h2 className="flex ml-2 justify-between mb-1.5">
        <span>{t("class.gradingPeriod.editTab")}</span>
        <button onClick={() => setIsEditTabVisible(false)}>
          <BsXSquareFill className="w-5 h-5 mr-1.5 text-red-400 hover:text-red-500 transition" />
        </button>
      </h2>
      <hr className="mx-2 text-first" />
      <form className="flex flex-col p-2 ">
        <Input textLabel="Name" value={name} type={"text"} setValue={setName} />
        <InputSubmit
          value={t("edit")}
          handleSubmit={handleEdit}
          isLoading={loading}
        />
      </form>
      <ErrorMessages error={error} />
    </div>
  );
};

export default EditTab;
