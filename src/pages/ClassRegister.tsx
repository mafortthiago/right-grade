import { FormEvent, FunctionComponent, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { themeContext } from "../context/ThemeContext";
import { BsCardText, BsX } from "react-icons/bs";
import Input from "../components/Input";
import InputRadio from "../components/InputRadio";
import InputNumber from "../components/InputNumber";
import InputSubmit from "../components/InputSubmit";
import { useAuthStore } from "../store/auth";
import { ClassErrorMessages, Group, useClassStore } from "../store/classes";
import { ISnackbar } from "../components/Snackbar";
interface ClassRegisterProps {
  setSnackBarVisible: (isSnackbarVisible: boolean) => void;
  setIsAddClass: (isAddClass: boolean) => void;
  snackbarData: ISnackbar;
}
const ClassRegister: FunctionComponent<ClassRegisterProps> = ({
  setIsAddClass,
  setSnackBarVisible,
  snackbarData,
}) => {
  const { t } = useTranslation();
  const { theme } = useContext(themeContext);
  const [isGradeFrom0To100, setIsGradeFrom0To100] = useState<boolean>(true);
  const [minimumGrade, setMinimumGrade] = useState<number>(5);
  const [error, setError] = useState<Array<string>>([]);
  const [name, setName] = useState<string>("");
  const { id } = useAuthStore();
  let token = "";
  let storedToken = localStorage.getItem("jwt");
  if (storedToken) {
    token = storedToken;
  } else {
    setError(["Não há token"]);
  }
  const { createGroup } = useClassStore();
  const handleSubmit = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    const errorMessages: ClassErrorMessages = {
      incorrectName: t("dashboard.class.register.error.incorrectName"),
      incorrectGradeType: t(
        "dashboard.class.register.error.incorrectGradeType"
      ),
      incorrectTeacher: t("dashboard.class.register.error.incorrectTeacher"),
      incorrectMinimumGrade: t(
        "dashboard.class.register.error.incorrectMinimumGrade"
      ),
    };
    const group: Group = {
      gradesAverage: 0,
      studentsQuantity: 0,
      id: "",
      name,
      isGradeFrom0To100,
      teacherId: id,
      minimumGrade: minimumGrade,
      gradingPeriods: [],
    };

    const success = await createGroup(group, token, errorMessages, onError);
    if (success) {
      snackbarData.title = "Sucesso";
      snackbarData.body = `A turma ${name} foi adicionada com sucesso.`;
      snackbarData.isError = false;
      setSnackBarVisible(true);
      setIsAddClass(false);
    }
  };
  const onError = (error: any) => {
    setError(Object.values(error));
  };
  return (
    <>
      <div
        className={
          "absolute w-full h-full left-0 mt-2 flex justify-center z-20 " +
          (theme === "dark" ? "bg-dark/80" : "bg-light-200/75")
        }
      >
        <form
          className={
            "m-4 w-full lg:w-1/2 flex flex-col rounded px-5 pt-5 pb-2 h-fit lg:mt-20 mt-4 " +
            (theme === "dark" ? "bg-third" : "bg-light-100")
          }
        >
          <section className="flex items-center h-5 w-full justify-between mb-3">
            <h2 className="font-semibold">
              {t("dashboard.class.register.title")}
            </h2>
            <BsX
              className="h-7 w-7 cursor-pointer hover:bg-red-300 rounded hover:text-third "
              onClick={() => setIsAddClass(false)}
            />
          </section>
          <Input
            textLabel={t("dashboard.class.register.name")}
            type="text"
            icon={BsCardText}
            value={name}
            setValue={setName}
          />
          <InputRadio setIsGradeFrom0To100={setIsGradeFrom0To100} />
          <InputNumber
            isGradeFrom0To100={isGradeFrom0To100}
            minGrade={minimumGrade}
            setMinGrade={setMinimumGrade}
          />
          <InputSubmit
            value={t("dashboard.class.register.title")}
            handleSubmit={handleSubmit}
          />
          {error.length > 0 && (
            <>
              {error.map((e, key) => (
                <p className="p-error" key={key}>
                  {e}
                </p>
              ))}
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default ClassRegister;
